# Panel Académico: costos de docencia por carrera

Aplicación React (TypeScript + Vite) para revisar los costos de docencia por carrera, con análisis de anomalías generado por Google Gemini a través de AWS Lambda (con un simulador de respaldo).

## Instalación

Requisitos: Node.js LTS (22.22 o superior; el CI usa 24), npm y Git. El proyecto usa pnpm 11.17.0.

```bash
git clone https://github.com/eliasmadridmosquera/proyecto-bootcamps.git
cd proyecto-bootcamps
npm install -g pnpm@11.17.0
pnpm install --frozen-lockfile
```

| Comando | Para qué |
|---|---|
| `pnpm dev` | Ejecutar en local (http://localhost:5173) |
| `pnpm lint` | Validar la calidad con ESLint |
| `pnpm test` | Ejecutar las pruebas |
| `pnpm build` | Generar el build de producción en `dist/` |
| `pnpm preview` | Servir el build en local |

## Configuración pública

No hace falta configurar nada para ejecutar el proyecto: sin variables usa el simulador.

| Variable | Valor | Uso |
|---|---|---|
| `VITE_IA_API_URL` | vacía (por defecto) o la URL HTTPS de la Lambda | Vacía usa el simulador. En el sitio publicado se toma de GitHub Variables |
| `VITE_APP_VERSION` | la asigna el CI | Commit que se muestra en la cabecera; en local aparece `local` |

Para cambiarla, copia `.env.example` como `.env.local`. Toda variable `VITE_` queda **visible en el navegador**: las claves y secretos no van en el frontend ni en el repositorio. Un proveedor de IA que exija clave debe llamarse desde un backend.

### Contrato del servicio de IA

`POST` con `Content-Type: application/json`:

```json
{ "anio": 2026, "anomalias": [{ "fase": "1", "descripcion": "Contratos duplicados", "referencia": "contratos.csv" }] }
```

Respuesta esperada:

```json
{ "resumen": "texto", "recomendaciones": [{ "prioridad": "alta", "titulo": "texto", "detalle": "texto" }] }
```

`prioridad` es `alta`, `media` o `baja`. El servicio debe permitir CORS desde el origen del sitio.

### Backend en AWS Lambda

El código está en `lambda/index.mjs`. Se publica manualmente en la consola de AWS:

1. Función Node.js con el rol de ejecución `LabRole` y tiempo de espera de 30 s.
2. Variable de entorno `GEMINI_API_KEY` (solo en Lambda). Opcional: `GEMINI_MODEL`, por defecto `gemini-3.5-flash-lite`.
3. Function URL con autenticación `NONE` y CORS: origen del sitio S3 y `http://localhost:5173`, método `POST`, cabecera `content-type`.
4. La URL se guarda en la variable de GitHub `VITE_IA_API_URL`.

## Arquitectura

| Parte | En este proyecto |
|---|---|
| Frontend | SPA en React 19, Mantine, React Router (rutas con `#`), TanStack Query, Zustand y Zod |
| Backend o API | AWS Lambda (`lambda/index.mjs`) para el análisis. Los datos del panel siguen simulados en `localStorage` (`src/servicios/mock-servidor.ts`) |
| Proveedor de IA | Google Gemini, llamado solo desde Lambda: la clave nunca llega al navegador |
| Simulador (mock) | `src/validaciones/analisis-ia.ts`: respaldo sin URL o elegido en pantalla, con escenarios de respuesta inválida y servicio caído |

Flujo del análisis: la pantalla **Anomalías** valida la entrada (1 a 20 anomalías y límites de texto), llama a la Lambda (`src/servicios/analisis-ia.ts`, con límite de 15 s), que vuelve a validar y consulta a Gemini; después el navegador valida la respuesta con Zod y muestra el resultado. Cualquier fallo se convierte en un mensaje controlado con opción de reintentar.

### De `git push` al sitio publicado

1. **Push o Pull Request hacia `main`:** se ejecuta `.github/workflows/ci.yml`.
2. **Instalación:** `pnpm install --frozen-lockfile`.
3. **Validación:** ESLint y pruebas. Si algo falla, no se compila.
4. **Build:** `pnpm build` genera `dist/`, solo archivos estáticos (sin la Lambda), con el commit y la URL del servicio incluidos.
5. **Artifact:** `dist/` se guarda como `dist-<commit>`.
6. **Despliegue y hosting:** solo en `main`, el job `deploy` descarga ese artifact, se autentica en AWS y lo sincroniza con el bucket S3 (`aws s3 sync --delete`). Sitio: http://panel-academico-elias-madrid.s3-website-us-east-1.amazonaws.com
7. **CDN:** el sitio de S3 no usa CDN. Además, AWS Amplify compila y publica `main` automáticamente y entrega el sitio por HTTPS mediante la CDN de AWS (CloudFront).

## Limitaciones

- Las recomendaciones de IA pueden equivocarse y requieren revisión humana.
- La Function URL es **pública y sin autenticación**: CORS solo restringe navegadores, así que quien conozca la URL podría consumir la cuota de Gemini.
- El texto de las anomalías se envía a Google: usar solo datos de ejemplo.
- La Lambda se publica a mano, fuera del pipeline. La copia en Amplify usa el simulador.
- No hay backend de datos: son de ejemplo, viven en el navegador y no se comparten entre usuarios.
- El selector de rol es una guardia visual, no una autenticación ni una autorización.
- El endpoint de sitio web de S3 usa **HTTP**; para HTTPS se necesita otra capa, como CloudFront.
- AWS Academy Learner Lab usa sesiones y credenciales temporales y puede restringir servicios o permisos.
- El despliegue usa credenciales temporales de AWS Academy guardadas en GitHub Secrets: caducan al cerrar la sesión del laboratorio y hay que actualizarlas. Bucket y región se definen en GitHub Variables (`S3_BUCKET`, `AWS_REGION`).
- El archivo JavaScript supera los 500 kB; se podría dividir con carga diferida.

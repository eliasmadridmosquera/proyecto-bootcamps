# Panel Académico: costos de docencia por carrera

Aplicación React (TypeScript + Vite) para revisar los costos de docencia por carrera, con análisis de anomalías asistido por un servicio de IA (hoy simulado).

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
| `VITE_IA_API_URL` | vacía (por defecto) o una URL HTTPS | Vacía usa el simulador. Con URL, envía las anomalías a ese servicio |
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

## Arquitectura

| Parte | En este proyecto |
|---|---|
| Frontend | SPA en React 19, Mantine, React Router (rutas con `#`), TanStack Query, Zustand y Zod |
| Backend o API | No hay backend desplegado. `src/servicios/mock-servidor.ts` simula los datos en `localStorage` |
| Proveedor de IA | Ninguno por ahora: el análisis lo genera un simulador con reglas fijas |
| Simulador (mock) | `src/validaciones/analisis-ia.ts`, con escenarios de respuesta inválida y servicio caído |

Flujo del análisis: la pantalla **Anomalías** valida la entrada (1 a 20 anomalías y límites de texto), llama al servicio (`src/servicios/analisis-ia.ts`, con límite de 15 s), valida la respuesta con Zod y muestra el resultado. Cualquier fallo se convierte en un mensaje controlado con opción de reintentar.

### De `git push` al sitio publicado

1. **Push o Pull Request hacia `main`:** se ejecuta `.github/workflows/ci.yml`.
2. **Instalación:** `pnpm install --frozen-lockfile`.
3. **Validación:** ESLint y pruebas. Si algo falla, no se compila.
4. **Build:** `pnpm build` genera `dist/`, solo archivos estáticos, con el commit incluido.
5. **Artifact:** `dist/` se guarda como `dist-<commit>`.
6. **Hosting:** se descarga el artifact de la ejecución en `main` y se sube a Amazon S3 como sitio web estático (publicación manual).
7. **CDN:** el sitio de S3 no usa CDN. Además, AWS Amplify compila y publica `main` automáticamente y entrega el sitio por HTTPS mediante la CDN de AWS (CloudFront).

## Limitaciones

- El análisis es **simulado**: no interviene un modelo de IA real y sus recomendaciones requieren revisión humana.
- No hay backend: los datos son de ejemplo, viven en el navegador y no se comparten entre usuarios.
- El selector de rol es una guardia visual, no una autenticación ni una autorización.
- El endpoint de sitio web de S3 usa **HTTP**; para HTTPS se necesita otra capa, como CloudFront.
- AWS Academy Learner Lab usa sesiones y credenciales temporales y puede restringir servicios o permisos.
- La publicación en S3 es manual; el despliegue automático desde GitHub Actions no está configurado.
- El archivo JavaScript supera los 500 kB; se podría dividir con carga diferida.

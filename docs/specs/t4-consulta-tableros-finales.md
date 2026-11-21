---
slug: "t4-consulta-tableros-finales"
title: "T4 · Diseño técnico de la consulta de los tableros finales (E4)"
description: "Borrador de diseño técnico del frontend para la consulta de Rectorado y Decano: layout de consulta, selección de año y facultades en Zustand, consulta de identidad con TanStack Query, tableros con datos de ejemplo y descarga CSV. Propuesta documental; nada está implementado."
spec_kind: spec-tech
status: approved
created_at: "2026-11-10T20:40:11.955Z"
last_updated: "2026-11-11T03:18:15.334Z"
source_spec: e4-consulta-tableros-finales
---
## Source and current evidence

**Origen funcional.** Especificación funcional E4 (e4-consulta-tableros-finales), aprobada; last_updated 2026-11-05T06:48:05.457Z. Casos de origen: consultar-tableros-finales-todas-carreras-rectorado y consultar-tableros-finales-carreras-facultad-decano. Reglas: RN-41 a RN-49 (y RN-03, RN-36, RN-37, RN-39 de E3; RN-31 de E2). Criterios: CA-49 a CA-67. Ejemplos: EJ-18 a EJ-23. Pantallas de origen (fase 2): P5 Superávit y déficit, P6 Costo de clases, P7 Gestión docencia.

**Hechos sobre la base existente (repositorio, 2026-11-09).** Plantilla Vite con React 19.2.8 y TypeScript 6.0.3; src/ solo contiene App.tsx de demostración; React Router, TanStack Query, Zustand, Zod y Mantine NO están instalados. No hay tests. El health del harness es health.bat (pnpm build); su lanzamiento desde AHK 3.0.0 falla en este equipo y está documentado.

**Hechos sobre las fuentes remotas (según el autor; detalle en docs/proceso.md).**
- Servicio institucional de autoridades, consulta POST con lista de tipos de cargo: contrato VERIFICADO LEYENDO EL CÓDIGO de la aplicación real del autor. Devuelve todas las autoridades de esos tipos (no una por usuario), con campos opcionales; el filtrado por usuario lo hace hoy el servidor de esa aplicación. No identifica a Rectorado ni al Analista.
- Servicio de autoridades, consulta GET con el usuario en la ruta: solo hay un ejemplo de respuesta recibido de un compañero. NO verificado; disponibilidad sin probar.
- Rectorado: según el autor, uso previo en otro proyecto de un servicio de autoridades que identificó al Rector y al Vicerrector de Investigación. No verificado en esta sesión; no se sabe cuál de los dos servicios lo hace ni con qué parámetros.
- Tableros publicados: NO existe ninguna API. En la aplicación real del autor el servidor inyecta los datos en la página.

**Documentación oficial consultada (2026-11-10).**
- TanStack Query (Context7 /tanstack/query, React v5): queryKey identifica la consulta y sus entradas; enabled evita ejecutarla sin datos de entrada; con enabled en falso y sin datos la consulta queda en isPending pero no en isLoading, por lo que para «cargando» conviene isLoading; estados isPending, isError, isSuccess e isFetching. El índice no ofrece la 5.102.8 fijada (lista 5.103.2 y otras v5): compatibilidad POR COMPROBAR.
- Zustand (Context7 /pmndrs/zustand): create con tipo explícito create<T>()(...) y acciones dentro del store; los componentes leen con selectores. El índice lista hasta la v5.0.14 y el stack fija la 5.0.15: POR COMPROBAR.
- React Router (Context7 /remix-run/react-router): modo declarativo, rutas de layout sin path con Outlet, path="*" para ruta desconocida. El índice lista 7.x; la 8.3.1 fijada queda POR COMPROBAR.

## Boundaries, contracts, and design

**Alcance.** Layout de consulta (P5 a P7), consulta de identidad, selección compartida de año y facultades, tableros con datos de ejemplo y descarga CSV. Fuera: carga y cálculo (T1), revisión y anomalías (T2), publicación (T3).

**Rutas (decisión D58; nombres de ruta PROPUESTOS).** Un layout de consulta sin segmento de URL, con Outlet, que aloja la navegación entre los tres tableros y el selector de año y facultades. Hijas propuestas: superavit-deficit, costo-clases y gestion-docencia. Ruta desconocida con path="*". El layout del analista es de T2.

**Consulta de identidad (decisiones D53 y D62).** TanStack Query administra la identificación del rol y la facultad.
- Identidad de la consulta: ['autoridad', usuario].
- Condición de ejecución: enabled mientras exista usuario. De dónde sale el usuario es PENDIENTE y está fuera del alcance del autor.
- Función de consulta: GET con el usuario en la ruta, contrato (b), SIN verificar. No se fija aquí ninguna dirección ni ruta concreta.
- Estados que representa la interfaz: (1) sin usuario todavía; (2) cargando; (3) error, con estado y mensaje propios, sin «Reintentar» (decisión del autor; «Reintentar» es mejora futura); (4) éxito sin facultad asignada, con el mensaje fijado en RN-41: «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.»; (5) éxito con facultad. Mensaje del estado de error: PROPUESTO, pendiente de confirmar; no existe texto aprobado.
- La respuesta no se copia a Zustand ni a otro estado. La facultad del Decano se lee de esta consulta.
- Mientras no haya identificación válida no se muestran tableros. Esto es una guardia visual, no autorización: que un Decano vea solo su facultad exige un servidor que filtre (pendiente declarado).
- Plan alternativo si el contrato (b) se descarta: usar el contrato (a) o acordar un ajuste de alcance con el docente. Detalle pendiente.
- Pendientes de esta consulta: contrato real, acceso desde el navegador (red interna, CORS), autenticación, qué cargos devuelve, origen del usuario consultado, origen del acceso de Rectorado y del rol de Analista.

**Selección compartida con Zustand (decisión D57).** Un store del cliente con la selección de consulta, usado por el layout de consulta (selector) y por P5, P6 y P7 (lectores), que se enlazan entre sí según RN-49.
- Estado propuesto: año elegido (vacío si el usuario aún no eligió) y facultades elegidas (lista; vacía significa todas). Acciones propuestas: elegir año, elegir facultades, limpiar el filtro.
- El año mostrado se DERIVA al renderizar: el elegido si existe; si no, el que corresponda por RN-43 (año calendario actual si está publicado; si no, el publicado más reciente con el aviso; si no hay nada, la etiqueta «No existen datos procesados.»). Los años publicados NO se copian al store.
- Para el Decano el filtro por facultad no aplica (RN-45, D20); solo usa el año.
- Consecuencia declarada por el autor: la selección se pierde al recargar y no se puede compartir un enlace con ese estado en la primera versión. Sin persistencia local.
- Las respuestas de los tableros no se guardan en el store.

**Propiedad del estado.** Identidad (rol y facultad): TanStack Query. Selección de año y facultades: Zustand. Datos de los tres tableros: hoy no hay servicio; durante la construcción se usan datos de ejemplo locales generados con los cuadernos del autor, que no se presentan como estado remoto, no pasan por una consulta de Query y no se copian a Zustand (D54). Pestaña activa de cada tablero: estado local React (PROPUESTA, no decidido). Lista de facultades que Rectorado puede elegir: sin fuente definida (PENDIENTE). Sin useEffect para filtros, eventos ni estado derivado.

**Tableros y datos (límite de integración).** Contenido de cada tablero según RN-49, que se mantiene como hoy. Los datos de ejemplo deben ser FICTICIOS: sin nombres de personas, sin sueldos individuales y sin datos reales. Si en el futuro existe un servicio, una consulta tendría por identidad el tablero, el año y las facultades elegidas; es una HIPÓTESIS, no un contrato, y no se inventa ningún endpoint. Que un Decano vea solo su facultad exige un servidor que filtre; filtrar en el navegador es una vista, no una garantía.

**Descarga CSV (RN-46).** CSV con las columnas de la tabla vista, con año y filtro aplicados, sin nombres ni puestos de personas ni sueldos individuales. La proyección de columnas es una función pura propuesta, probable con pruebas puras. Nombre de archivo, separador y codificación: PENDIENTES (pendiente 5 de E4). Advertencia: si el navegador ya recibió los nombres para mostrarlos, excluirlos del CSV no los protege; la garantía real depende de qué datos entrega el servicio.

## Dependencies, rollout, risks, and validation

**Dependencias propuestas, NO instaladas (versiones de la cohorte).** react-router 8.3.1; @tanstack/react-query 5.102.8; zustand 5.0.15; @mantine/core 9.4.1 para los componentes visuales. Instalarlas requiere autorización aparte.

**Etapas propuestas (sin fechas).**
1. Layout de consulta, tres rutas y ruta desconocida; criterio: se navega entre P5 a P7 conservando el layout.
2. Store de selección con función pura del año por defecto y pruebas de EJ-18, EJ-21 y EJ-22.
3. Consulta de identidad con sus cinco estados; en la aplicación no se simula ningún servicio (D71): los estados de carga y error se prevé ejercitarlos en pruebas con Vitest (viabilidad por comprobar; ver pregunta 13), con dobles de prueba etiquetados como tales. Bloqueo externo: contrato (b), acceso, autenticación y origen del usuario.
4. Tableros con datos de ejemplo ficticios y pestañas de RN-49.
5. Descarga CSV con proyección de columnas.
Bloqueos externos: servicio de tableros, contrato de identidad, origen del usuario.

**Riesgos.** El contrato (b) puede no existir o no ser accesible desde el navegador (mitigación: estados diseñados, plan alternativo declarado y acuerdo con el docente). Confundir una guardia visual con autorización (mitigación: declararlo y registrar el pendiente del servidor). Mezclar datos de ejemplo con estado remoto (mitigación: aislarlos y rotularlos). Selección obsoleta si cambia la lista de facultades (mitigación: validar la selección contra la lista vigente al derivar). Diferencias entre la documentación consultada y las versiones fijadas.

**Validación PREVISTA (no ejecutada).**
- Pruebas con Vitest: año por defecto (CA-57, CA-58, CA-59), acciones del store, proyección de columnas del CSV (CA-62) y estados de carga y error de la identidad con dobles de prueba etiquetados (D71; viabilidad sin infraestructura adicional por comprobar).
- Recorrido de navegador: navegar entre los tres tableros con la misma selección (CA-65) y recargar y comprobar que la selección se pierde (consecuencia declarada). Qué se ve en el navegador sin identidad queda como pregunta abierta (D71). El Decano sin facultad (EJ-23, CA-53) y el estado de error de la identidad no se comprueban en el navegador mientras no exista el servicio: se prevé ejercitarlos en pruebas con Vitest (viabilidad por comprobar; ver pregunta 13).
- Petición real: NO es posible hoy; depende del contrato (b).
- El build de la plantilla solo demuestra que compila. Nada de esto se ha ejecutado.

## Decisions and open questions

**Decisiones confirmadas por el autor (conversación de Fase 3, 2026-11-10; numeración de docs/proceso.md).** D53 la consulta de identidad es el GET por usuario con TanStack Query; D54 tableros: bloqueo declarado, datos de ejemplo locales sin Query y consulta al docente según el autor; D57 Zustand guarda la selección de año y facultades; D58 dos layouts sin segmento de URL; D60 un spec-tech por cada E1 a E4; D62 error de identidad con estado y mensaje propios, sin «Reintentar»; D71 no se simula ningún servicio en la aplicación; dobles de prueba solo en pruebas.

**Preguntas abiertas (no son decisiones).**
1. Contrato real de la consulta de identidad y su acceso desde el navegador.
2. De dónde sale el usuario consultado; sin él la consulta queda desactivada.
3. Origen del acceso de Rectorado y del rol de Analista.
4. Texto del mensaje de error de la identidad (propuesto, no aprobado).
5. Fuente de la lista de facultades de Rectorado.
6. Nombre del archivo, separador y codificación del CSV.
7. Nombres de ruta y estado local de las pestañas.
8. Servicio de tableros y garantía de alcance del Decano en el servidor.
9. Comportamiento de los reintentos automáticos que TanStack Query aplica por defecto: comprobar en la documentación de la 5.102.8 antes de dar el diseño por cerrado.
10. Compatibilidad con React Router 8.3.1, TanStack Query 5.102.8 y Zustand 5.0.15.
11. El health automático de AHK falla al lanzar health.bat (D63 y D72).
12. Qué se ve en el navegador sin identidad, dada la tensión entre «sin identificación válida no se muestran tableros» y D54 (D71). Línea a explorar, sin decidir: la sección 5 de la entrega de fase 1 dice «ahora solo tenemos usuarios de prueba».
13. Cómo ejercitar los estados de una consulta de TanStack Query con Vitest sin añadir infraestructura (D71). Candidato, sin decidir: escribir el paso de «resultado de la consulta» a «estado de la interfaz» como una función pura (entra el estado de la consulta, sale uno de los cinco estados), que se prueba con Vitest sin DOM; la conexión real con TanStack Query quedaría sin probar. Sigue por comprobar si la consigna permite o no la infraestructura adicional.
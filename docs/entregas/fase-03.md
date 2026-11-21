# Fase 3 · Diseño técnico y plan de construcción — Panel Académico

> Documento acumulativo de la Fase 3, versión 3.0 (revisada y aprobada por el autor). Integra el contenido de las dos entregas anteriores (apartados 1 a 20, conservados de la Fase 2) y añade el diseño técnico del frontend y su plan de construcción (apartados 21 a 30). Es un documento de diseño: no hay nada implementado ni ejecutado del producto, y lo que aquí se llama «diseño» es una propuesta en borrador, no una decisión aprobada ni una afirmación de que algo funcione.

**Cómo leer las etiquetas de este documento.** Cada afirmación técnica se clasifica así:
- **BASE EXISTENTE**: algo que ya está en el repositorio o en el entorno y se comprobó leyéndolo.
- **DECISIÓN CONFIRMADA**: decisión del autor registrada en el registro de decisiones (D1 a D79). Que una decisión esté confirmada no significa que el documento técnico que la contiene esté aprobado.
- **PROPUESTA** (o **PROPUESTO**): diseño o texto sugerido por el asistente de IA que el autor todavía no ha decidido ni aprobado.
- **PENDIENTE DE DECISIÓN** o **PENDIENTE**: asunto abierto, que no se decide aquí.
- **HIPÓTESIS**: contrato o comportamiento externo no verificado.
- **EVIDENCIA EJECUTADA**: resultado real de una comprobación hecha; solo aparece en el apartado 10 y siempre separada de las pruebas futuras del producto.

De los cuatro documentos de diseño técnico, los cuatro (T1 a T4) están **approved** en AHK, aprobados por el autor (D75 a D78). La aprobación no autoriza implementar nada y los cuatro conservan sus preguntas abiertas (T1: 22, T2: 13, T3: 17, T4: 13). Las cuatro especificaciones funcionales (E1 a E4) y los seis casos de uso sí están aprobados.

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | Panel Académico (nombre **provisional**, declarado expresamente por el autor) |
| Entrega | Fase 3 · Diseño técnico |
| Autor | Elías Emilio Madrid Mosquera (trabajo individual) |
| Cohorte | 6 |
| Fecha | 2026-11-10 |
| Versión del documento | 3.0 (revisada y aprobada por el autor) |
| Proyecto en el repositorio | proyecto-bootcamp |

## 2. Problema y contexto

**Situación que se busca mejorar.** Cada año se calcula cuánto cuesta la docencia de la universidad por carrera y por facultad: el costo de las clases, la gestión docente asociada y si ese costo queda por encima o por debajo de lo esperado según el número de estudiantes (superávit o déficit).

**Quién la vive.** El autor, que hoy hace los cálculos, y quienes necesitan los resultados: el Rectorado y los Decanos. El producto pertenecería a la Gerencia de Planificación Estratégica.

**Cómo se resuelve hoy (hecho descrito por el autor).** El autor ejecuta a mano una serie de cuadernos de Python, por fases, desde los contratos del personal hasta el costo por carrera. Cada fase genera su propio tablero en HTML para revisar si hay anomalías, y los resultados se comparten como archivos que se abren con doble clic. No existe un sistema ni un sitio web. Hoy los tres tableros finales se generan con todas las carreras y un solo año, sin selector de año, sin filtro por facultad, sin descarga y sin diferencia de acceso entre Rectorado y Decano; tampoco existe un paso formal de «publicar».

**Dificultades que persisten.** (1) Se cometen errores en los pasos manuales. (2) Los resultados llegan con demora. (3) Quienes los necesitan no pueden consultarlos por su cuenta. (4) Todo depende del autor.

**Hechos observados y supuestos.**
- *Observación personal del autor:* todo lo anterior es la descripción que hace el autor de su propio trabajo. No se han hecho entrevistas ni se aporta ninguna estadística o estudio; las cuatro dificultades no están medidas y no son evidencia verificada.
- *Hecho descrito por el autor:* hoy las inconsistencias de los datos que no se pueden corregir no quedan registradas en ningún sitio.
- *Supuesto:* el comportamiento descrito en este documento no se ha contrastado con Rectorado ni con los Decanos.

## 3. Usuarios y objetivos

| Actor | Quién es | Resultado que busca |
|---|---|---|
| Analista | Persona de la Gerencia de Planificación Estratégica que prepara el cálculo del año | Subir los archivos del año, obtener el cálculo por fases, revisar los tableros de cada fase para detectar anomalías, registrar las que no se pueden corregir y publicar los resultados |
| Rectorado | Rol de consulta | Consultar por su cuenta los tableros finales de todas las carreras |
| Decano | Rol de consulta con una facultad asignada. Un Decano ve una sola facultad. Cada facultad tiene un Decano y un subdecano que entran con el mismo rol (Decano), ven lo mismo y el producto no los distingue | Consultar por su cuenta los mismos tableros finales, solo de las carreras de su facultad |

No hay sistemas externos que participen en los recorridos de la primera versión. No se añaden administradores, autenticación ni integraciones: se **supone** que los tres actores ya están identificados con su usuario institucional y su rol, y que el Decano ya tiene su facultad asignada. Cómo se logra eso es una decisión posterior (ver apartado 8).

## 4. Descripción general de la solución

El producto permite que el analista suba los archivos del año, y el sistema calcula las seis fases del costo de la docencia, desde los contratos del personal hasta el costo de clases y el superávit o déficit por carrera. En cada fase se aplican controles (cuadres entre totales) y se genera un tablero que el analista revisa. Cuando el analista publica, el Rectorado y los Decanos consultan por su cuenta los tres tableros finales, sin depender del autor. Con ello se busca reducir los pasos manuales, acortar la demora y eliminar la dependencia de una sola persona.

**Recorrido breve de principio a fin.** El analista indica el año y sube a la vez el conjunto completo: siete archivos originales, cinco archivos de apoyo y los equivalentes del año anterior de cuatro de los originales. El producto comprueba que estén los archivos y datos obligatorios y ejecuta las seis fases seguidas. El analista abre el tablero de cada fase y la marca como revisada; si encuentra una anomalía que no puede corregir, la deja registrada. Con las seis fases revisadas, confirma y publica el año. El Rectorado ve los tres tableros finales de todas las carreras, y cada Decano los de las carreras de su facultad, con el año y la fecha de publicación. Si algo falla (un archivo obligatorio ausente, un control en falla o una anomalía corregible), el analista corrige y vuelve a subir el conjunto completo, y se recalcula todo; mientras tanto, Rectorado y Decano siguen viendo lo ya publicado.

Esta descripción solo cubre comportamiento. No decide componentes, librerías ni almacenamiento.

## 5. Alcance inicial y exclusiones

**Capacidades comprometidas para la primera versión** (los seis casos de uso aprobados, apartado 7):
- Cargar el conjunto de archivos del año y obtener el cálculo por seis fases con sus controles (CU1, procesos PR-01).
- Revisar el tablero de cada fase y marcarla como revisada (CU2, PR-02).
- Registrar una anomalía de datos que no se puede corregir (CU3, PR-03).
- Publicar los resultados del año (CU4, PR-04).
- Consulta de los tres tableros finales por el Rectorado, todas las carreras (CU5, PR-05).
- Consulta de los tres tableros finales por el Decano, solo su facultad (CU6, PR-06).

**Excluidas de la primera versión y justificación registrada:**
- Reemplazar un solo archivo sin volver a subir el conjunto. Justificación: según RN-01, el cálculo depende de todos los archivos del conjunto, por lo que no se admiten cargas parciales. *Supuesto por validar:* el autor indicó en la primera entrega que casi nunca se corrige un solo archivo después de la primera carga; no se ha contrastado.
- Historial de publicaciones, comparar un cálculo con el anterior y conservar las anomalías entre cálculos: el autor no necesita demostrar qué vieron Rectorado y Decano en una fecha dada ni comparar cálculos, y el cálculo nuevo reemplaza al anterior.
- Retirar o despublicar una publicación (RN-34): en esta primera versión solo se sustituye publicando de nuevo ese año.
- Avisar a Rectorado y Decano cuando hay una publicación nueva (RN-35): la ven al entrar.
- Total o referencia institucional para el Decano (RN-47).

**Mejoras futuras declaradas por el autor** (sin casos de uso): roles Webmaster y Visitante; gestión de usuarios; promedios institucionales para Decanato; que las autoridades vean las anomalías registradas; conexión directa a la base de datos de la institución; integración con el sistema de identidad institucional.

**Motivo de las exclusiones, en palabras del autor (primera entrega).** Los roles quedaron para después, cuando tengamos el backend; ahora solo tenemos usuarios de prueba. Lo mismo para la gestión de usuarios, las bases de datos y la identidad. Las anomalías visibles y los promedios institucionales no eran valores que había pensado antes: se le ocurrieron durante el análisis, por lo que no puede implementarlos ahora, pero sí en el futuro.

El alcance no se amplía respecto de la primera entrega: los seis casos son los mismos.

## 6. Secciones o pantallas previstas

Propuesta del autor de siete pantallas, sin inicio de sesión ni gestión de usuarios. Se mantienen P1 a P7; solo se corrige lo que los procesos de este documento exigen. No se describen componentes ni rutas técnicas. Una pantalla puede participar en varios casos y un caso puede recorrer varias pantallas.

| N.º | Pantalla | Quién la usa | Casos | Procesos |
|---|---|---|---|---|
| P1 | Carga del año | Analista | CU1 | PR-01 |
| P2 | Estado del cálculo y publicación | Analista | CU1, CU2, CU4 | PR-01, PR-02, PR-04 |
| P3 | Tablero de fase | Analista | CU1, CU2, CU3 | PR-01, PR-02, PR-03 |
| P4 | Anomalías registradas | Analista | CU3 | PR-03 |
| P5 | Superávit y déficit | Rectorado y Decano | CU5, CU6 | PR-05, PR-06 |
| P6 | Costo de clases | Rectorado y Decano | CU5, CU6 | PR-05, PR-06 |
| P7 | Gestión docencia | Rectorado y Decano | CU5, CU6 | PR-05, PR-06 |

### P1 · Carga del año
- **Propósito.** Iniciar el cálculo del año subiendo el conjunto de archivos.
- **Información que muestra.** El año que se indica y los archivos del año (siete originales, cinco de apoyo y cuatro equivalentes del año anterior). Si la comprobación previa falla, un mensaje que indica qué archivo o dato falta.
- **Acciones que permite.** Indicar el año y subir todos los archivos a la vez. Para corregir, volver a subir el conjunto completo (RN-01).
- **Pendiente.** Columnas obligatorias de los cinco archivos de apoyo; si el archivo de ajustes manuales de componente y la lista de carreras, movilidades y componentes centrales se suben o forman parte del sistema (apartado 8).

### P2 · Estado del cálculo y publicación
- **Propósito.** Seguir el estado del cálculo del año, ver qué fases están revisadas y publicar.
- **Información que muestra.** Si el cálculo se completó o se detuvo en una fase indicando qué control falló, y qué fases están revisadas.
- **Acciones que permite.** Acceder al tablero de cada fase (P3) y publicar, solo con las seis fases revisadas; antes de publicar pide confirmación (RN-33). No ofrece retirar una publicación (RN-34).
- **Pendiente.** Texto exacto con que se indica que falta revisar una fase; qué ocurre si la publicación no puede completarse por otra causa; formato de la fecha de publicación.

### P3 · Tablero de fase
- **Propósito.** Revisar el tablero de una de las seis fases para detectar anomalías.
- **Información que muestra.** El tablero de la fase con la estructura de RN-28 (Resumen al inicio, Controles al final, pestañas de detalle) y los resultados de los controles (ok, aviso, falla). Si un control falló, también los tableros de las fases ya calculadas.
- **Acciones que permite.** Revisar, marcar la fase como revisada, quitar la marca antes de publicar y registrar una anomalía no corregible. Con el cálculo detenido por una falla, solo ver (RN-26). Con el cálculo publicado, solo lectura (RN-32).

### P4 · Anomalías registradas
- **Propósito.** Mostrar las anomalías registradas del cálculo en curso.
- **Quién la usa.** Solo el analista; Rectorado y Decano no la ven (RN-31).
- **Información que muestra.** La lista de registros (fase, descripción, referencia, fecha de registro), con filtro por fase.
- **Acciones que permite.** Registrar, editar y eliminar mientras el cálculo no esté publicado; el aviso de duplicado aparece aquí (RN-30).
- **Nota.** La ubicación exacta (pantalla propia o integrada en otra) se mantiene como propuesta del autor; las especificaciones solo fijan que es una pantalla del cálculo en curso.

### P5, P6 y P7 · Tableros finales
Superávit y déficit (P5), Costo de clases (P6) y Gestión docencia (P7). Comparten comportamiento.
- **Quién las usa.** Rectorado (todas las carreras) y Decano (solo su facultad; sin facultad asignada no ve ninguna carrera y ve un mensaje, RN-41).
- **Información que muestran.** El tablero final publicado con las pestañas de RN-49, el año y la fecha de publicación. Por defecto el año calendario actual; si no tiene nada publicado pero otros años sí, el año publicado más reciente con aviso; si no hay nada publicado, la etiqueta «No existen datos procesados.» (RN-43). No muestran tableros de fase ni anomalías.
- **Acciones que permiten.** Elegir entre los años publicados; descargar en CSV la tabla vista (el Decano, solo su facultad). Solo Rectorado filtra por una o varias facultades y ve totales agrupados por facultad (RN-45).
- **Pendiente.** Nombre del archivo, separador y codificación del CSV.

## 7. Casos de uso de la versión inicial

Los seis casos están en estado **aprobado** en AHK 3.0.0 (confirmado con una consulta al MCP el 2026-11-05). Las especificaciones E1 a E4, también aprobadas, desarrollan los casos en procesos, reglas y criterios (apartados 11 a 19).

### Catálogo

| Ref. | Nombre | Actor | Objetivo | Versión aprobada | Especificación |
|---|---|---|---|---|---|
| CU1 | Cargar los archivos del año y obtener el cálculo por fases | Analista | Subir el conjunto del año y obtener el cálculo por seis fases | 2026-11-04T20:01:42.345Z (reaprobado en esta fase; la primera aprobación fue 2026-10-26T02:27:17.038Z) | E1 |
| CU2 | Revisar los tableros de cada fase para detectar anomalías | Analista | Detectar inconsistencias antes de publicar | 2026-10-26T02:01:49.961Z | E2 |
| CU3 | Registrar una anomalía de los datos que no se puede corregir | Analista | Dejar registrada y visible una anomalía no corregible | 2026-10-26T02:06:50.551Z | E2 |
| CU4 | Publicar los resultados del año | Analista | Que Rectorado y Decano pasen a ver los tableros finales | 2026-10-26T02:15:33.302Z | E3 |
| CU5 | Consultar los tableros finales de todas las carreras (Rectorado) | Rectorado | Consultar los tres tableros finales de todas las carreras | 2026-10-26T02:52:29.135Z | E4 |
| CU6 | Consultar los tableros finales de las carreras de su facultad (Decano) | Decano | Consultar los tres tableros finales de su facultad | 2026-10-26T02:57:44.045Z | E4 |

**Los tres tableros finales** son: Superávit / Déficit (un solo tablero), Costo de Clases y Gestión docencia. **Las seis fases del cálculo** son: (1) contratos: sueldo de cada persona por periodo; (2) cargas: horas de clases de cada persona, incluida la que queda del periodo anterior; (3) costo de cada carga: el sueldo repartido entre las horas; (4) costo por categoría: ese costo agrupado por tipo de actividad; (5) gestión docencia: el costo de gestión por estudiante y carrera; (6) costo de clases y superávit o déficit por carrera. Los seis tableros de fase (uno por fase) son distintos de los tres tableros finales.

### CU1 · Cargar los archivos del año y obtener el cálculo por fases (versión reaprobada)

1. **Actor principal y objetivo.** Analista de la Gerencia de Planificación Estratégica (ya identificado con su rol). Subir los archivos del año y obtener el cálculo completo, fase por fase, desde los contratos del personal hasta el costo por carrera y el superávit o déficit.
2. **Situación que lo inicia.** El analista dispone del conjunto de archivos del año y decide cargarlo.
3. **Condiciones previas.** Está identificado con rol de analista. Dispone del conjunto completo, todos los archivos obligatorios:
   - *Siete archivos originales:* contratos del personal global, contratos de Admisiones, historial para fondo de reserva, cargas CTP (carga horaria), planificación de clases de grado, clases de postgrado y registros de estudiantes.
   - *Equivalentes del año anterior (cuatro, también obligatorios):* cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes. Los contratos (global, Admisiones y fondo de reserva) no tienen equivalente.
   - *Cinco archivos de apoyo:* carrera por persona, programas de postgrado, porcentajes de categorías, duración de carreras y NOVATOS de cada año.
4. **Pasos del recorrido principal.**
   1. El analista indica el año y sube todos los archivos del año a la vez.
   2. El sistema comprueba que estén todos los archivos y datos obligatorios.
   3. El sistema ejecuta las seis fases una tras otra, sin pausas intermedias, aplicando los controles de cada fase (cuadres entre totales). Cada control termina en ok, aviso o falla. Una falla detiene el cálculo; un aviso no.
   4. Al terminar, quedan disponibles para el analista los resultados y el tablero de cada fase, listos para su revisión (CU2).
   5. Los resultados no son visibles para Rectorado ni Decano hasta que el analista los publique (CU4).
5. **Alternativas, errores y restricciones.**
   - Si el analista corrige un archivo, vuelve a subir el conjunto completo y se recalcula todo. No se admiten cargas parciales.
   - Si ya existe un cálculo de ese año, el cálculo nuevo lo reemplaza; Rectorado y Decano siguen viendo lo último publicado hasta que se publique el nuevo.
   - Error de archivo (falta un archivo o dato obligatorio): se detecta antes de calcular; no se calcula nada y se muestra qué archivo o dato falla.
   - Falla de control: el sistema se detiene en esa fase, muestra qué control falló y no ejecuta las siguientes; el analista puede ver los tableros de las fases ya calculadas. Un aviso no detiene el cálculo.
   - Error de archivo y falla de control son comprobaciones distintas.
   - Anomalía de datos (datos procesables pero inconsistentes): no bloquea el cálculo; el analista la revisa en CU2.
   - Los registros de anomalías pertenecen al cálculo en curso; al recalcular se vuelven a registrar las que sigan presentes.
   - Fuera de alcance: reemplazar un solo archivo, historial de publicaciones, comparar con el cálculo anterior, conservar anomalías entre cálculos, conexión directa a la base de datos, integración con identidad institucional, gestión de usuarios, roles Webmaster y Visitante.
6. **Resultado observable.** El analista ve que el cálculo del año se completó y dispone de los resultados y del tablero de cada fase; o ve un mensaje que indica qué archivo o dato falta, o qué control de qué fase falló.
7. **Criterios de aceptación.**
   - Dado un conjunto completo de archivos del año, cuando el analista indica el año y lo sube, entonces el sistema ejecuta las seis fases en secuencia y deja disponibles los resultados y el tablero de cada fase.
   - Dado un conjunto al que le falta un archivo o dato obligatorio, cuando el analista lo sube, entonces el sistema no calcula nada y muestra qué archivo o dato falla.
   - Dado que un control de una fase falla, entonces el sistema se detiene en esa fase, indica qué control falló, no ejecuta las siguientes y el analista puede ver los tableros de las fases ya calculadas.
   - Dado un control con resultado aviso, entonces el cálculo continúa.
   - Dado un conjunto con anomalías de datos procesables, entonces el sistema calcula igualmente y las anomalías quedan para revisión.
   - Dado un año con cálculo previo, cuando el analista sube un conjunto nuevo, entonces el nuevo reemplaza al anterior y Rectorado y Decano siguen viendo lo último publicado.
   - Dado un cálculo recién completado o recalculado, entonces Rectorado y Decano no lo ven hasta que se publique.
8. **Reglas relacionadas.** RN-01, RN-02, RN-03, RN-04, RN-05, RN-06, RN-07, RN-08 y RN-10 a RN-22 (apartado 12).
9. **Nota sobre preguntas abiertas.** El texto aprobado del caso aún lista como abiertas los datos obligatorios de cada archivo y los controles de cada fase; ambos quedaron respondidos en E1 (RN-08, RN-10 a RN-15), pero el caso no se modificó por ello.

### CU2 · Revisar los tableros de cada fase para detectar anomalías

1. **Actor y objetivo.** Analista. Revisar los tableros de las seis fases y las anomalías de datos para detectar inconsistencias antes de publicar.
2. **Inicio y condiciones previas.** Existe un cálculo del año completado (CU1) con las seis fases y sus tableros disponibles. El analista tiene rol de analista.
3. **Pasos.**
   1. El analista abre el tablero de una fase.
   2. Lo revisa para detectar anomalías de datos (datos procesables con inconsistencias).
   3. Si no encuentra anomalías, o ya las trató, marca la fase como revisada.
   4. Repite para cada una de las seis fases.
   5. Con las seis fases marcadas, el cálculo queda listo para publicarse (CU4).
4. **Alternativas, errores y restricciones.**
   - Anomalía corregible: corrige el archivo y vuelve a subir el conjunto completo; se recalcula todo y las marcas se borran.
   - Anomalía no corregible, porque el dato de origen tiene la irregularidad: la deja registrada (CU3).
   - Si un control de una fase falló, el cálculo se detuvo; puede ver los tableros de las fases ya calculadas, pero no hay cálculo completo que publicar.
   - La revisión se marca por fase y solo se publica con las seis marcadas. Al recalcular se borran todas las marcas.
   - Una anomalía de datos no impide calcular ni revisar; una falla de control sí detiene el cálculo.
   - Las anomalías registradas las ve solo el analista.
   - Fuera de alcance: comparar con el cálculo anterior, conservar marcas o anomalías entre cálculos, que las autoridades vean anomalías, gestión de usuarios y roles.
5. **Resultado observable.** Cada una de las seis fases aparece como revisada y, cuando lo están todas, el cálculo queda listo para publicarse; o la revisión termina con una corrección (nuevo conjunto) o con una anomalía registrada.
6. **Criterios de aceptación.**
   - Dado un cálculo completado, cuando el analista abre el tablero de una fase, entonces puede revisarlo y marcarla como revisada.
   - Dado un cálculo con las seis fases revisadas, entonces puede publicarse; con alguna sin marcar, no.
   - Dado un cálculo que se recalcula, entonces se borran las marcas y las seis fases quedan sin revisar.
   - Dada una anomalía corregible, cuando el analista sube de nuevo el conjunto completo, entonces se recalcula todo y debe revisar de nuevo.
   - Dada una anomalía no corregible, el analista puede registrarla según CU3.
   - Dada una anomalía de datos procesable, entonces el cálculo ya se completó y la revisión puede realizarse.
7. **Reglas relacionadas.** RN-23 a RN-29, RN-32 (E2); RN-01, RN-02, RN-05, RN-07 (E1).

### CU3 · Registrar una anomalía de los datos que no se puede corregir

1. **Actor y objetivo.** Analista. Dejar registrada y visible una anomalía cuyo dato de origen tiene la irregularidad y no se corrige, para que no se pierda (hoy esas inconsistencias no quedan registradas).
2. **Inicio y condiciones previas.** Durante la revisión (CU2), el analista encuentra una anomalía que no puede corregir en los archivos. Hay un cálculo completado y el analista tiene rol de analista.
3. **Pasos.**
   1. El analista identifica una anomalía que no se puede corregir porque el dato de origen tiene la irregularidad.
   2. La deja registrada.
   3. El registro queda guardado y visible para el analista.
4. **Alternativas, errores y restricciones.**
   - Si la anomalía sí se puede corregir, no se registra: se corrige el archivo y se vuelve a subir el conjunto completo (CU1).
   - Las anomalías registradas las ve solo el analista; que las autoridades las vean es mejora futura.
   - Los registros pertenecen al cálculo en curso; si se recalcula, el analista vuelve a registrar las que sigan presentes.
   - Una anomalía de datos no impide calcular.
   - Fuera de alcance: conservar anomalías entre cálculos; que las autoridades las vean.
5. **Resultado observable.** Queda un registro de la anomalía, guardado y visible para el analista, dentro del cálculo en curso.
6. **Criterios de aceptación.**
   - Dada una anomalía no corregible, cuando el analista la registra, entonces el registro queda guardado y visible para el analista.
   - Dado un registro de anomalía, entonces Rectorado y Decano no lo ven.
   - Dado un cálculo que se recalcula, entonces los registros del cálculo anterior no se conservan.
   - Dada una anomalía corregible, entonces no se registra: se corrige y se vuelve a subir el conjunto.
7. **Reglas relacionadas.** RN-04, RN-26, RN-29, RN-30, RN-31, RN-32 (E2).
8. **Nota.** Las preguntas abiertas del texto aprobado del caso quedaron respondidas en E2 (RN-30, RN-31, RN-32); el caso no se modificó.

### CU4 · Publicar los resultados del año

1. **Actor y objetivo.** Analista. Hacer que Rectorado y Decano pasen a ver los tableros finales del año.
2. **Inicio y condiciones previas.** El analista termina la revisión (las seis fases marcadas) y decide publicar. Hay un cálculo del año completado y el analista tiene rol de analista.
3. **Pasos.**
   1. El analista publica los resultados del año.
   2. El sistema pone a disposición de Rectorado y Decano los tres tableros finales: superávit y déficit, costo de clases y gestión docencia.
   3. Rectorado ve los de todas las carreras y cada Decano los de las carreras de su facultad (CU5 y CU6).
4. **Alternativas, errores y restricciones.**
   - Si se detecta una anomalía después de publicar, se vuelve a calcular y se publica de nuevo; mientras tanto Rectorado y Decano siguen viendo lo último publicado.
   - Si alguna fase no está marcada como revisada, no se puede publicar.
   - Rectorado y Decano no ven resultados hasta que el analista publica; solo el analista publica.
   - Una publicación nueva sustituye a la última publicada; no hay historial de publicaciones. (La lectura precisa de esta frase, por año, se declara en el apartado 20.)
   - Un cálculo nuevo, mientras no se publique, no cambia lo que ven Rectorado y Decano.
   - La publicación incluye solo los tableros finales; los tableros de las fases los ve solo el analista.
   - Fuera de alcance: historial de publicaciones; comparar con el cálculo anterior.
5. **Resultado observable.** Rectorado y Decano pasan a ver los tableros finales del año publicado.
6. **Criterios de aceptación.**
   - Dado un cálculo con las seis fases revisadas, cuando el analista publica, entonces Rectorado y Decano pasan a ver los tableros finales.
   - Dado un cálculo con alguna fase sin revisar, entonces no se puede publicar.
   - Dado un cálculo sin publicar, entonces Rectorado y Decano no ven sus resultados.
   - Dada una nueva publicación, entonces sustituye a la última publicada.
   - Dado un cálculo nuevo sin publicar, entonces siguen viendo lo último publicado.
   - Dada una publicación, entonces ven los tres tableros finales y no los tableros de las fases.
7. **Reglas relacionadas.** RN-03, RN-33 a RN-40 (E3); RN-24, RN-26, RN-32 (E2).
8. **Nota.** Las seis preguntas abiertas del texto aprobado quedaron respondidas en E3; el caso no se modificó.

### CU5 · Consultar los tableros finales de todas las carreras (Rectorado)

1. **Actor y objetivo.** Rectorado (usuario con rol Rectorado, ya identificado). Consultar por su cuenta los tres tableros finales de todas las carreras, sin depender del analista.
2. **Inicio y condiciones previas.** Rectorado necesita consultar los resultados. El analista ha publicado resultados y Rectorado está identificado con su rol.
3. **Pasos.**
   1. Rectorado accede a los tableros finales.
   2. Ve por defecto el año en curso y puede elegir entre los años publicados.
   3. Ve los tres tableros finales de todas las carreras.
   4. Puede filtrar o agrupar por facultad.
   5. Puede descargar o exportar.
   6. Cada tablero muestra la fecha de publicación.
   7. Ve lo último publicado.
4. **Alternativas, errores y restricciones.**
   - Mientras se recalcula un cálculo nuevo, ve lo último publicado.
   - Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
   - No ve resultados sin publicar, ni los tableros de las fases, ni las anomalías registradas.
   - Ve todas las carreras, sin restricción por facultad; el filtro o la agrupación por facultad es opcional.
   - Fuera de alcance: promedios institucionales para Decanato, gestión de usuarios, roles Webmaster y Visitante, integración con identidad institucional.
5. **Resultado observable.** Rectorado ve los tres tableros finales publicados de todas las carreras.
6. **Criterios de aceptación.**
   - Dada una publicación, cuando Rectorado consulta, entonces ve los tres tableros finales de todas las carreras.
   - Dado un cálculo sin publicar, entonces no lo ve; dado un cálculo nuevo en curso, sigue viendo lo último publicado.
   - Dadas anomalías registradas, o los tableros de las fases, entonces no los ve.
   - Dados uno o más años publicados, entonces ve por defecto el año en curso y puede elegir entre los años publicados.
   - Dados tableros publicados, cuando filtra o agrupa por facultad, entonces ve los tableros según esa facultad.
   - Dados tableros publicados, cuando descarga o exporta, entonces obtiene la descarga.
   - Dado que no hay nada publicado, entonces se muestra una etiqueta que indica que no existen datos procesados.
   - Dada una publicación, entonces el tablero muestra la fecha de publicación.
7. **Reglas relacionadas.** RN-41 a RN-46, RN-48, RN-49 (E4); RN-03, RN-36, RN-37, RN-39 (E3); RN-31 (E2).
8. **Nota.** Las tres preguntas abiertas del texto aprobado quedaron respondidas en E4; el caso no se modificó.

### CU6 · Consultar los tableros finales de las carreras de su facultad (Decano)

1. **Actor y objetivo.** Decano (usuario con rol Decano y su facultad asignada, ya identificado). Consultar por su cuenta los mismos tres tableros finales que Rectorado, solo de las carreras de su facultad.
2. **Inicio y condiciones previas.** El Decano necesita consultar los resultados. El analista ha publicado resultados y el Decano está identificado con su rol y tiene su facultad asignada (cómo se asigna es una decisión posterior).
3. **Pasos.**
   1. El Decano accede a los tableros finales.
   2. Ve los tres tableros finales solo de las carreras de su facultad.
   3. Por defecto ve el año en curso y puede elegir entre los años publicados, siempre solo de las carreras de su facultad.
   4. Ve lo último publicado.
   5. Cada tablero muestra la fecha de publicación.
   6. Puede descargar o exportar, siempre solo de las carreras de su facultad.
4. **Alternativas, errores y restricciones.**
   - Mientras se recalcula un cálculo nuevo, ve lo último publicado.
   - Si no hay nada publicado, se muestra una etiqueta que indica que no existen datos procesados.
   - Si el Decano no tiene facultad asignada, no ve ninguna carrera (decisión de gobernanza).
   - No ve carreras de otras facultades, resultados sin publicar, tableros de las fases ni anomalías registradas.
   - No le aplica filtrar o agrupar por facultad, porque ya ve una sola facultad.
   - Fuera de alcance: promedios institucionales para Decanato, gestión de usuarios, integración con identidad institucional, roles Webmaster y Visitante.
5. **Resultado observable.** El Decano ve los tres tableros finales publicados solo de las carreras de su facultad.
6. **Criterios de aceptación.**
   - Dada una publicación, cuando el Decano consulta, entonces ve los tres tableros finales solo de las carreras de su facultad.
   - Dado un Decano de la facultad A, entonces no ve carreras de la facultad B.
   - Dado un cálculo sin publicar, entonces no lo ve; dado un cálculo nuevo en curso, sigue viendo lo último publicado.
   - Dadas anomalías registradas, o los tableros de las fases, entonces no los ve.
   - Dado un Decano sin facultad asignada, cuando consulta, entonces no ve ninguna carrera.
   - Dados uno o más años publicados, entonces ve por defecto el año en curso y puede elegir entre los años publicados, siempre solo de su facultad.
   - Dado un Decano de la facultad A, cuando descarga o exporta, entonces lo obtenido incluye solo las carreras de la facultad A.
   - Dado que no hay nada publicado, entonces ve una etiqueta que indica que no existen datos procesados.
   - Dada una publicación, entonces el tablero muestra la fecha de publicación.
7. **Reglas relacionadas.** RN-41 a RN-44, RN-46 a RN-49 (E4); RN-03, RN-36, RN-37, RN-39 (E3); RN-31 (E2).
8. **Nota.** Las cuatro preguntas abiertas del texto aprobado quedaron respondidas en E4; el caso no se modificó.

## 8. Decisiones y preguntas pendientes

Fuente: registro de decisiones del autor (D1 a D51), casos aprobados y especificaciones E1 a E4. Solo se consideran confirmadas las decisiones aprobadas y las dichas explícitamente por el autor. **No hay retroalimentación docente de la primera entrega**; los cambios de esta fase los decidió el autor al revisar su propio trabajo.

### 8.1 Decisiones confirmadas

| Tema | Contenido | Documentos |
|---|---|---|
| Seis casos de uso (D1) | Rectorado y Decano van separados por tener una regla de acceso distinta; las anomalías registradas las ve solo el analista | CU1 a CU6 |
| Cálculo y detención (D2, D6, D13) | Seis fases seguidas; una falla detiene en esa fase; un aviso no; error de archivo y falla de control son comprobaciones distintas | CU1, E1 (RN-05, RN-07) |
| Publicar es un caso aparte (D3) | Resultado propio: Rectorado y Decano pasan a ver los tableros | CU4, E3 |
| Conjunto completo y reemplazo (D4, D5) | Todo el conjunto de una vez; el cálculo nuevo reemplaza al anterior | CU1, E1 (RN-01, RN-02) |
| Revisión por fase (D8, D9) | Una marca por fase; solo se publica con las seis; al recalcular se borran | CU2, E2 (RN-23 a RN-25) |
| Tableros finales (D11, D12) | Son tres; la publicación incluye solo esos; Decano sin facultad no ve ninguna carrera | CU4 a CU6, E3, E4 |
| Año, descarga, etiqueta, fecha (D18, D20) | Año por defecto y elección entre años publicados; descarga; etiqueta si no hay nada; fecha visible; filtro por facultad solo Rectorado | CU5, CU6, E4 |
| Aprobaciones de los casos (D14 a D17, D19, D21; D24) | Aprobación explícita de CU1 a CU6; CU1 reaprobado en esta fase | CU1 a CU6 |
| Caso 1 revisado (D23, D26) | Siete archivos originales, cinco de apoyo, cuatro equivalentes del año anterior; columnas obligatorias de los siete originales; los grupos de personal son salidas del proceso, no archivos | CU1, E1 (RN-08) |
| Cuatro especificaciones (D25) | E1 a E4 vinculadas a los seis casos | E1 a E4 |
| Controles y parámetros (D27, D28, D29) | Clasificación falla/aviso de las seis fases tal como el autor describió su proceso actual; tolerancia única 0,01; parámetros configurables; reparto por defecto de categorías | E1 (RN-06, RN-10 a RN-15, RN-19) |
| Reglas de E1 confirmadas (D30) | Persona con cargas y sin contrato: aviso y costo sin asignar (con la salvedad de 8.3); un estudiante en dos carreras cuenta en cada una; un estudiante con registros en un solo término cuenta como completo | E1 (RN-17, RN-20) |
| Revisión y anomalías (D32 a D36) | Once decisiones sobre CU2 y CU3; precisiones de fecha, duplicado y solo lectura tras publicar; contenido de los tableros de fase; editar hasta duplicar se trata como duplicado | E2 (RN-23 a RN-32) |
| Publicación (D38 a D42) | Confirmación previa; sin retirar; sin aviso; año y fecha visibles; una publicación vigente por año; un cálculo nuevo que falla no cambia lo publicado; interpretación del caso 4 sin reabrirlo | E3 (RN-33 a RN-40) |
| Consulta (D44 a D49) | Año calendario actual; filtro y agrupación para Rectorado; un Decano ve una sola facultad (Decano y subdecano con el mismo rol); contenido de los tableros finales; CSV sin nombres, puestos ni sueldos; textos fijados | E4 (RN-41 a RN-49) |
| Tolerancia unificada (D51) | Unificar todos los cuadres en 0,01; comprobado solo con la corrida de 2026 | E1 (RN-06) |
| Aprobación de especificaciones (D31, D37, D43, D50) | E1 a E4 aprobadas por el autor con versión citada | E1 a E4 |

### 8.2 Supuestos por validar

- Los tres actores ya están identificados con su usuario institucional y rol, y el Decano ya tiene su facultad asignada. Cómo se logra queda como decisión posterior.
- Las cuatro dificultades del problema son observaciones personales del autor, sin medición ni entrevistas.
- Los casos y las reglas describen el comportamiento previsto y no se han contrastado con Rectorado ni con los Decanos.
- No permitir reemplazar un solo archivo se apoya en RN-01 (el cálculo depende de todos los archivos). Queda por validar la afirmación del autor de que casi nunca se corrige un solo archivo después de la primera carga (ver apartado 5).
- Los controles de las seis fases son los que el autor describió de su proceso actual; no existe un documento previo que los respalde.

### 8.3 Preguntas abiertas y pendientes

La columna «¿Bloquea el cierre?» recoge lo que dicen las fuentes: ninguna fuente declara que alguno de estos puntos impida cerrar el alcance o la fase; esa valoración está por confirmar por el autor.

| N.º | Pendiente | Estado y detalle | Documentos afectados | ¿Bloquea el cierre? |
|---|---|---|---|---|
| 1 | Estudiantes que cambian de carrera | Pendiente de confirmar con la jefa del autor. No es regla firme (distinto de «un estudiante en dos carreras cuenta en cada una», que está confirmado). RN-20 no lo define | E1 (RN-20, pendiente 1) | No consta como bloqueante; por confirmar |
| 2 | Persona con cargas y sin contrato | RN-17 confirmada por el autor; pendiente de contrastar con su jefa | E1 (RN-17, CA-11) | No consta como bloqueante; por confirmar |
| 3 | Clases sin registros de estudiantes que se quitan antes de costear | Lectura del autor pendiente de confirmar: las horas de la persona bajan y su sueldo se reparte entre sus otras cargas, o va a «Sin carga» si no le quedan | E1 (RN-12, pendiente 3) | No consta como bloqueante; por confirmar |
| 4 | Clases de grado con «aprobado» distinto de sí | Se costean igual hasta confirmar la regla; es una sola decisión pendiente (fases 2, 3 y 4) | E1 (RN-11, RN-12, RN-13) | No consta como bloqueante; por confirmar |
| 5 | Orígenes sin confirmar | Valor 100 del costo por hora; reparto por defecto de categorías de aproximadamente 60 % GD, 34 % GI y 6 % GV (según el autor, de un análisis previo de las cargas asignadas a los profesores durante el año, sin documento localizable); umbral de la línea base 2024 (definición y origen pendientes de la gerencia, sin valor) | E1 (RN-12, RN-19, RN-21; parámetros) | No consta como bloqueante; por confirmar |
| 6 | Archivo de ajustes manuales de componente | Archivo propio y opcional (puede estar vacío) que no está en la lista del caso 1; el autor decidirá si lo declara opcional o si revisa el caso 1. NO decidido | E1 (RN-13, pendiente 6), CU1 | No consta como bloqueante; por decidir |
| 7 | Lista de carreras, de «movilidades» y componentes centrales | Hoy están dentro del proceso; el autor decidirá si van como archivo de apoyo o como parte del sistema. NO decidido | E1 (pendiente 7), CU1 | No consta como bloqueante; por decidir |
| 8 | Columnas obligatorias de los cinco archivos de apoyo | Solo se indicó que son los datos de cada tabla; sin detallar | E1 (RN-08, pendiente 8) | No consta como bloqueante |
| 9 | Validar la tolerancia de 0,01 con otros años | Solo se comprobó con la corrida de 2026 | E1 (RN-06) | No consta como bloqueante |
| 10 | Mensajes comprensibles y ejemplos de reglas sin ejemplo | MS-01 a MS-03 son propuestos (pendientes de confirmación); en E1 solo hay ejemplos de RN-06, RN-12, RN-16, RN-18, RN-19, RN-20, RN-21 y RN-22; en E2, además de EJ-10 a EJ-13, faltan el texto exacto que pide completar un dato obligatorio y ejemplos de otras reglas; en E3, además de EJ-14 a EJ-17, el texto exacto con que se indica que falta revisar una fase; en E4, ejemplos de reglas distintas de las de EJ-18 a EJ-23 y mensajes distintos de los fijados | E1 a E4 | No consta como bloqueante |
| 11 | Detalles del CSV | Nombre del archivo, separador y codificación | E4 (RN-46, pendiente 5), PR-05, PR-06 | No consta como bloqueante |
| 12 | Fecha de publicación | Formato (y hora) y a quién se muestra: Rectorado y Decano, analista o ambos | E3 (RN-36, pendiente 3) | No consta como bloqueante |
| 13 | Publicación que no puede completarse por otra causa | Causa distinta de fases sin revisar o cálculo detenido: no se ha decidido qué ocurre | E3 (PR-04, pendiente 4) | No consta como bloqueante |
| 14 | Interpretación del caso 4 | «Sustituye a la última publicación del mismo año»; se declara en el apartado 20 de este documento (fila d). Queda pendiente la revisión del autor | CU4, E3 (pendiente 6) | No |
| 15 | Mensaje de confirmación de publicación (RN-33) | El mensaje dice «se sustituirá lo publicado antes de ese año», que puede leerse como «años anteriores», mientras que RN-37 dice que sustituye la publicación del mismo año. Queda pendiente reformularlo | E3 (RN-33, RN-37) | No |
| 16 | Especificación E2 desactualizada respecto de E3 | E2, aprobada antes de crear E3, todavía dice que E3 no está creada | E2, E3 | No |

**Cierre de operaciones aprobadas.** Ninguna operación de este documento se presenta como aprobada con su permiso, resultado o condición principal sin decidir. Los puntos 1 a 4 y 6 y 7 afectan a detalles de reglas o archivos y se describen en cada lugar como no firmes; los puntos 11 a 13 afectan a detalles secundarios (formato, nombre de archivo, causa de fallo no prevista) de operaciones cuyo resultado principal sí está decidido.

### 8.4 Fase 3 · Decisiones técnicas confirmadas

Los apartados 8.1 a 8.3 se conservan tal como estaban en la Fase 2. Este subapartado y los dos siguientes añaden lo propio de la Fase 3.

Fuente: registro de decisiones del autor (D52 a D79, tomadas en la conversación de trabajo del 2026-11-10). Una **decisión confirmada** es una elección que el autor aceptó; varias fueron propuestas por el asistente y aceptadas por el autor, y algunos detalles de cada una quedaron marcados como PROPUESTOS o PENDIENTES. **Ninguna de ellas hace que un documento técnico esté aprobado**: T1 a T4 están aprobados (D75 a D78), pero siguen conteniendo PROPUESTAS y PENDIENTES. «Dueño» es el documento técnico donde se describe la decisión (reparto D70); los demás documentos solo la referencian.

| Ref. | Decisión confirmada (resumen) | Dueño | Condición o salvedad |
|---|---|---|---|
| D52 | Fuentes remotas y hechos verificados: el servicio de autoridades con consulta POST tiene contrato verificado leyendo el código del autor; la consulta GET por usuario es solo un ejemplo recibido; para los tableros publicados no existe ninguna API (según el autor) | T4 (referencia a T1 y T3) | Es un registro de hechos, no una elección de diseño. Pendientes: acceso desde el navegador, autenticación, origen del usuario y de Rectorado |
| D53 | Identidad: la consulta remota de TanStack Query es el GET por usuario, con identidad `['autoridad', usuario]` y ejecución solo si hay usuario. Alternativas evaluadas: POST con filtrado en el cliente (choca con la privacidad de E4) y no cerrar la consulta todavía | T4 | Contrato GET sin verificar. Si se descarta, hay plan alternativo sin detallar |
| D54 | Tableros publicados: bloqueo declarado sin inventar endpoints (A), datos locales fijos y ficticios como sustituto sin Query (B) y ajuste de alcance acordado con el docente (C) | T4 | Según el autor, existe constancia de una consulta al docente, pero es sobre el servicio de autoridades (D53), no sobre el ajuste de alcance de los tableros (opción C), que sigue pendiente de acordar (ver D79 y 10.2) |
| D55 | Formulario real para Zod y Mantine Form: registro de anomalía (RN-30; EJ-11 a EJ-13). Alternativa evaluada: la carga de archivos del año | T2 | Zod 4.4.3 no se consultó directamente; el duplicado no lo decide Zod solo |
| D56 | Dos Modales de Mantine: formulario de anomalía (crear y editar) y confirmación de publicar | T2 (anomalía) y T3 (confirmar) | Dónde vive el componente reutilizado y el estado abierto del Modal: sin confirmar |
| D57 | Zustand guarda la selección de consulta (año elegido y facultades elegidas) usada por P5, P6 y P7. Alternativas: año de trabajo del analista y selección en la URL | T4 | Consecuencia declarada: la selección se pierde al recargar; compartir un enlace con ese estado queda fuera |
| D58 | Dos layouts sin segmento de URL (analista P1 a P4; consulta P5 a P7), P3 con parámetro de fase (1 a 6) y ruta desconocida | T2 (analista) y T4 (consulta) | Nombres de ruta sin decidir; el acceso por rol depende de la identificación |
| D59 | Cierre del Modal de anomalía: descartar lo escrito en todos los casos (X, Escape, clic fuera o Cancelar) | T2 | Mejora futura: confirmar si hay cambios sin guardar |
| D60 | Agrupación del diseño técnico: cuatro documentos, T1 a T4, uno por cada E1 a E4 | Meta | Los cuatro existen y están aprobados (D75 a D78) |
| D61 | Entorno y herramientas AHK: hechos del 2026-11-10 sobre el health, la creación de T2 y T4 y la reclamación de la tarea | Meta | Corregida en parte por D72 |
| D62 | Error de la consulta de identidad: estado y mensaje propios, sin «Reintentar» | T4 | El texto del error es PROPUESTO, sin aprobar |
| D63 | Bloqueo del health automático de AHK 3.0.0 en Windows: causa, evidencia y decisión de declararlo y llevarlo al docente | Meta | Ver 10.2 y 30.2. No se actualizó AHK |
| D64 | Ciclo del Modal de confirmar publicar: queda abierto con el botón en «publicando» y sin cierre hasta tener resultado; éxito cierra; fallo mantiene abierto con un mensaje | T3 | Texto del error y comportamiento tras el fallo: PROPUESTOS, sin aprobar |
| D65 | Sincronización tras publicar: mutación de TanStack Query con invalidación de las consultas de P2 y de los años publicados | T3 | Diseño previsto condicionado a que exista un servicio de publicación; no existe |
| D66 | Botón «Publicar» de P2 siempre clicable; con alguna fase sin revisar no abre el Modal y el mensaje nombra la fase que falta | T3 | Texto del mensaje PROPUESTO; varios detalles sin decidir |
| D67 | Qué comprueba el cliente al subir los archivos del año (P1): solo que el año esté indicado y que cada archivo requerido esté seleccionado, sin leer su contenido | T1 | Es una comodidad, no una garantía; el servicio debe volver a comprobar |
| D68 | Estado del cálculo en P2: consulta de TanStack Query con identidad `['calculo', año]`; estados de la interfaz: en curso, completado, detenido en la fase N con el control que falló, y error de archivo | T1 | Condicionado a que exista un servicio; «en curso» es un estado de la interfaz, no del negocio |
| D69 | Año de trabajo del analista (P1 a P4): parámetro de consulta de la URL (`?anio=2026`), no un segmento de ruta | T2 (referencia en T1 y T3) | Qué ocurre si falta o es inválido: sin decidir. Compatibilidad con react-router 8.3.1 sin verificar |
| D70 | Reparto de dueños de D54 a D69 entre T1 a T4 (una decisión, un dueño) | Meta | La composición de la pantalla P2, que junta tres partes, no tiene dueño |
| D71 | Regla única: la aplicación no simula ningún servicio; los dobles de prueba pueden existir solo dentro de las pruebas, etiquetados como tales | T4 (propuesta de dueño) | Cómo ejercitar los estados de una consulta en pruebas sin infraestructura nueva: por comprobar |
| D72 | Corrección de D61 y D63 sin editarlas: el builder pudo editar el registro de decisiones sin acción registrada; T2 y T4 los editó el lead con herramientas de AHK | Meta | Se declara en 10.2 y 30.2 |
| D73 | Se excluyó la revisión por fases (PR-02) y el tablero de fase de P3 del diseño técnico de la Fase 3 | Meta | **REVOCADA por D74** |
| D74 | Revocación de D73: PR-02 vuelve al diseño técnico como estaba antes de D73, **abierto y sin diseñar**; D73 no se edita y queda como historial | T2 (D70) | Se declara como no diseñado con su justificación; consulta al docente sobre si debe diseñarse o puede declararse como no cubierto: sin decidir |
| D75 | Aprobación del diseño técnico T2 (versión 2026-11-11T02:05:40.682Z) por el autor, con la frase «con PR-02 declarado como no diseñado». AHK marcó approved con last_updated 2026-11-11T02:42:42.039Z; el cuerpo no cambió | T2 | **La aprobación no autoriza implementar nada.** Las preguntas abiertas 9 a 13 de T2 siguen abiertas y el autor lo consultará con el docente. Cualquier edición posterior de T2 lo devuelve a needs-decision. T1, T3 y T4 se aprobaron después (D76 a D78) |
| D76 | Aprobación del diseño técnico T3 (versión 2026-11-11T01:24:18.003Z) por el autor, con una frase del tipo «apruebo T3 (t3-publicacion-de-resultados), versión 2026-11-11T01:24:18.003Z», tras responder a la revisión del documento (un recorrido, una decisión y una alternativa). AHK marcó approved con last_updated 2026-11-11T03:02:27.869Z | Meta | **La aprobación no autoriza implementar nada.** Las preguntas abiertas de T3 siguen abiertas (17). Cualquier edición posterior de T3 lo devuelve a needs-decision |
| D77 | Aprobación del diseño técnico T4 (versión 2026-11-11T01:24:42.728Z) por el autor, con una frase del tipo «apruebo T4 (t4-consulta-tableros-finales), versión 2026-11-11T01:24:42.728Z», tras responder a la revisión del documento (un recorrido, una decisión y una alternativa). AHK marcó approved con last_updated 2026-11-11T03:18:15.334Z | Meta | **La aprobación no autoriza implementar nada.** Las preguntas abiertas de T4 siguen abiertas (13). Cualquier edición posterior de T4 lo devuelve a needs-decision |
| D78 | Aprobación del diseño técnico T1 (versión 2026-11-11T01:23:55.130Z) por el autor, con una frase del tipo «apruebo T1 (t1-carga-y-calculo-por-fases), versión 2026-11-11T01:23:55.130Z», tras responder a la revisión del documento (un recorrido, una decisión y una alternativa). AHK marcó approved con last_updated 2026-11-11T03:25:22.581Z | Meta | **La aprobación no autoriza implementar nada.** Las preguntas abiertas de T1 siguen abiertas (22). Cualquier edición posterior de T1 lo devuelve a needs-decision |
| D79 | Aclaración sobre D53 y D54: la constancia de la consulta al docente (2026-11-09 consulta, 2026-11-10 respuesta de voz, según el resumen del autor) corresponde al servicio de autoridades (D53) y no cubre el ajuste de alcance de los tableros publicados (D54, opción C). D53 y D54 no se editan | Meta | Según el autor, la consulta no trató los tableros ni la garantía de alcance del Decano en el servidor; ese ajuste sigue pendiente de acordar con el docente. El docente no precisó si hablaba del GET o del POST. La captura la conserva el autor (ver 10.2) |

**Sobre PR-02 (revisión por fases).** Por D73 el autor la sacó del diseño técnico y por D74 la restableció tal como estaba, sin diseñarla; por D75 aprobó T2 declarándola «no diseñada». Hoy PR-02 (marcar cada fase como revisada y quitar la marca, RN-23 a RN-28) sigue siendo una operación comprometida en las especificaciones funcionales y en este documento (apartados 5, 7, 11, 12 y 18), pero **no tiene diseño técnico en esta fase**: T2 la lista como preguntas abiertas y no la diseña. Esto es un hueco declarado, no una decisión de excluirla.

### 8.5 Fase 3 · Supuestos

- Las cuatro especificaciones funcionales (E1 a E4) y los seis casos están aprobados y son el origen de cada decisión técnica. De los documentos de diseño técnico, los cuatro (T1 a T4) están aprobados (D75 a D78): **la aprobación no autoriza implementar nada**, los cuatro conservan sus preguntas abiertas y siguen conteniendo PROPUESTAS y PENDIENTES.
- Según el autor, hoy no existe ningún servicio de tableros publicados, de publicación, de carga de archivos, de cálculo ni de validación de columnas (D52, D54, D65, D67, D68). Es una afirmación del autor, no una comprobación hecha en esta redacción.
- Se supone que el usuario ya está identificado y que su identificador estará disponible para la consulta de identidad. De dónde sale ese usuario está fuera del alcance del autor y queda pendiente (T4, pregunta 2).
- La documentación oficial se consultó en versiones que no siempre coinciden con las versiones fijadas del curso (ver 10.2). Se supone que el comportamiento descrito vale para las versiones fijadas; **no está comprobado**.
- Los datos de ejemplo de los tableros serán ficticios, sin nombres de personas ni sueldos individuales (D54).
- Los supuestos del apartado 8.2 (Fase 2) siguen vigentes.

### 8.6 Fase 3 · Preguntas abiertas, impacto y bloqueos

Todas las preguntas siguientes están **sin decidir**. Se agrupan por documento técnico y conservan su número y su origen. La columna «Etapa o bloqueo» recoge lo que el propio documento técnico declara; «—» significa que el documento no la asocia a una etapa.

**T1 · Carga del año y estado del cálculo (E1)** — estado: **approved** (D78; la aprobación no autoriza implementar nada; conserva sus preguntas abiertas).

| N.º | Pregunta abierta | Origen | Etapa o bloqueo |
|---|---|---|---|
| 1 | Archivo de ajustes manuales de componente (archivo propio y opcional) | Pendiente 6 de E1 | Etapa 1 |
| 2 | Lista de carreras, movilidades y componentes centrales: archivo de apoyo o parte del sistema | Pendiente 7 de E1 | Etapa 1 |
| 3 | Columnas obligatorias de los cinco archivos de apoyo | Pendiente 8 de E1 | Etapa 1 |
| 4 | Confirmación de los textos MS-01 a MS-03 (propuestos) | Pendiente 9 de E1, D67 | Etapa 2 |
| 5 | Qué es un año válido (E1 no lo define) | D67 | Etapa 1 |
| 6 | Dónde y cómo aparece el mensaje de archivo faltante (MS-01) | D67 | Etapa 2 |
| 7 | Qué componente selecciona los archivos | D67 | Etapa 1 |
| 8 | Si la subida se modela con TanStack Query, como D65 | D67 | Etapa 4 (bloqueada) |
| 9 | Servicio de carga y de validación de columnas (contrato, errores, respuesta) | D67 | Etapa 4 (bloqueada) |
| 10 | Sondeo periódico y contrato del servicio del cálculo | D68 | Etapa 4 (bloqueada) |
| 11 | Reparto de las consultas de P2 (cálculo, marcas de revisión, publicación) | D68, D70 | Etapa 3 |
| 12 | Qué ve P2 tras un error de archivo (¿el cálculo anterior de ese año o nada?) | D68; E1 no lo dice | Etapa 3 |
| 13 | Qué ocurre si el año falta o es inválido en la URL | D68, D69 | Etapa 3 |
| 14 | Cómo llega el año a la URL tras subir los archivos en P1 | D69, D70 | Etapa 4 (bloqueada) |
| 15 | Composición de la pantalla P2 (sin dueño) | D70 | Etapa 3 |
| 16 | Qué se ve en P1 y P2 en el navegador sin servicio | D71 | Etapa 3 |
| 17 | Cómo ejercitar en pruebas los estados de la consulta del cálculo | D71 | Etapa 3 |
| 18 | Dónde se guardan los archivos seleccionados antes de enviarlos (propuesta: estado local de React) | T1 | Etapa 1 |
| 19 | Compatibilidad con TanStack Query 5.102.8 y React Router 8.3.1 | Fuentes oficiales | — |
| 20 | El health automático de AHK falla al lanzar health.bat | D63, D72 | — |
| 21 | Si el cliente impide enviar mientras falte un archivo requerido o solo lo avisa | RN-07, CA-02, CA-08 | Etapas 1 y 2 |
| 22 | Si P1 usa Mantine Form | D67 | — |

**T2 · Registro de anomalías y layout del analista (E2)** — estado: **approved** (D75, con PR-02 declarado como no diseñado; sus preguntas abiertas 9 a 13 siguen abiertas).

| N.º | Pregunta abierta | Origen | Etapa o bloqueo |
|---|---|---|---|
| 1 | Mensaje exacto de campo obligatorio (sin texto aprobado) | Pendiente 2 de E2 | — |
| 2 | Longitud máxima de descripción y referencia; espacios al inicio y al final | No definido | — |
| 3 | Dónde se comprueba el duplicado y con qué datos | RN-30 | — |
| 4 | Confirmación al eliminar un registro | E2 no la define | — |
| 5 | Fuente y persistencia de anomalías, estado del cálculo y marcas de revisión | Sin servicio | Bloqueo externo |
| 6 | Estado abierto del Modal y filtro por fase: confirmar propiedad | D56 | — |
| 7 | Compatibilidad con React Router 8.3.1 y Mantine 9.4.1 | Fuentes oficiales | — |
| 8 | El health automático de AHK falla al lanzar health.bat | D63, D72 | — |
| 9 | Composición de la pantalla P2 (sin dueño) | D70 | — |
| 10 | Qué se ve en P2 y P4 en el navegador sin servicio | D71 | Etapa 5 |
| 11 | Diseño de las marcas por fase y del tablero de fase de P3 (PR-02) | D74 | **Sin diseñar** |
| 12 | Si el selector de fase de P3 viene preseleccionado con la fase del tablero abierto | RN-30 | — |
| 13 | Qué componente se usa para el selector de fase y los demás campos | T2 | — |

**T3 · Publicación de los resultados (E3)** — estado: **approved** (D76; la aprobación no autoriza implementar nada; conserva sus preguntas abiertas).

| N.º | Pregunta abierta | Origen | Etapa o bloqueo |
|---|---|---|---|
| 1 | Formato de la fecha de publicación y a quién se muestra | Pendiente 3 de E3 | — |
| 2 | Qué ocurre si la publicación no puede completarse por otra causa, y texto del fallo | Pendiente 4 de E3, D64 | Etapa 3 |
| 3 | Textos de los mensajes distintos del de confirmación (por ejemplo, el de la fase faltante) | Pendiente 5 de E3, D66 | Etapa 1 |
| 4 | Qué ofrece el botón con el cálculo detenido por una falla de control | D66, RN-26 | Etapa 1 |
| 5 | Qué ofrece el botón con el cálculo ya publicado | D66, RN-32 | Etapa 1 |
| 6 | Quién ve el botón si no es el analista | D66, RN-40, CA-47 | Etapa 1 |
| 7 | Si hay varias fases sin revisar, si el mensaje nombra todas o solo la primera | D66 | Etapa 1 |
| 8 | Dónde aparece el mensaje de la fase faltante | D66 | Etapa 1 |
| 9 | Plazo de espera y qué se muestra si el servicio no responde con el Modal en «publicando» | D64 | Etapa 3 |
| 10 | Relación del estado «publicando» con el estado de la mutación y con el plazo | D64, D65 | Etapa 3 |
| 11 | Contrato del servicio de publicación y nombres de las consultas a invalidar | D65 | Etapa 4 (bloqueada) |
| 12 | Qué año muestra el mensaje de confirmación (propuesta: el año de trabajo) | T3 | — |
| 13 | Composición de la pantalla P2 (sin dueño) | D70 | — |
| 14 | Interpretación del caso 4 («sustituye a la última publicación del mismo año») | Pendiente 6 de E3, D40 | Se declara en el apartado 20 |
| 15 | Compatibilidad con Mantine 9.4.1 (Modal) y TanStack Query 5.102.8 (useMutation) | Fuentes oficiales | — |
| 16 | El health automático de AHK falla al lanzar health.bat | D63, D72 | — |
| 17 | Qué se ve en P2 en el navegador sin servicio | D71 | Etapa 1 |

**T4 · Consulta de los tableros finales (E4)** — estado: **approved** (D77; la aprobación no autoriza implementar nada; conserva sus preguntas abiertas).

| N.º | Pregunta abierta | Origen | Etapa o bloqueo |
|---|---|---|---|
| 1 | Contrato real de la consulta de identidad y su acceso desde el navegador | D52, D53 | Bloqueo externo (etapa 3) |
| 2 | De dónde sale el usuario consultado; sin él la consulta queda desactivada | D52, D53 | Bloqueo externo (etapa 3) |
| 3 | Origen del acceso de Rectorado y del rol de Analista | D52 | — |
| 4 | Texto del mensaje de error de la identidad (propuesto) | D62 | — |
| 5 | Fuente de la lista de facultades de Rectorado | D57 | — |
| 6 | Nombre del archivo, separador y codificación del CSV | Pendiente 5 de E4 | — |
| 7 | Nombres de ruta y estado local de las pestañas | D58 | — |
| 8 | Servicio de tableros y garantía de alcance del Decano en el servidor | D54 | Bloqueo externo |
| 9 | Reintentos automáticos que TanStack Query aplica por defecto | D62 | — |
| 10 | Compatibilidad con React Router 8.3.1, TanStack Query 5.102.8 y Zustand 5.0.15 | Fuentes oficiales | — |
| 11 | El health automático de AHK falla al lanzar health.bat | D63, D72 | — |
| 12 | Qué se ve en el navegador sin identidad (tensión entre «sin identificación válida no se muestran tableros» y los datos de ejemplo de D54) | D71 | — |
| 13 | Cómo ejercitar los estados de una consulta con Vitest sin añadir infraestructura | D71 | Etapa 3 |

**Bloqueos que se desprenden de lo anterior** (resumen; no se decide nada):
1. No hay servicio de tableros, publicación, carga, cálculo ni validación de columnas (según el autor): todo lo que depende de ellos es diseño previsto y está bloqueado.
2. El contrato de la consulta de identidad (GET por usuario) no está verificado y el origen del usuario consultado queda fuera del alcance del autor.
3. La revisión por fases (PR-02) está abierta y sin diseñar (D74).
4. La lista final de archivos requeridos de la carga (pendientes 6, 7 y 8 de E1) condiciona P1.
5. El health automático de AHK 3.0.0 falla en este equipo (D63): la tarea de trabajo no puede cerrarse como terminada mientras falle.
6. Los cuatro diseños (T1 a T4) están aprobados (D75 a D78) pero conservan abiertas sus preguntas (T1: 22, T2: 13, T3: 17, T4: 13); T2 conserva además PR-02 sin diseñar.

**Impacto:** ninguna de las preguntas abiertas cambia las reglas funcionales aprobadas. Las que tocan textos (mensajes) o comportamientos nuevos (por ejemplo «Reintentar») no pueden convertirse en regla sin pasar por la revisión funcional de la especificación correspondiente.

## 9. Decisiones propias y uso de IA

### 9.1 Fase 2 (conservado)

**Herramienta utilizada.** Claude Code con Agent Harness Kit 3.0.0 (skills ahk-spec y ahk-use-case y el MCP del proyecto).

#### Regla que precisé: tolerancia de 0,01 (RN-06)

"La regla que quiero explicar es la de la tolerancia de 0,01. La elegí porque esta regla es importante ya que estamos trabajando en términos de dinero, y siempre se manejan 2 decimales (por los centavos). Esto implica que si hay una diferencia de hasta 0,01 entre dos totales se acepta, si la diferencia es mayor a dicho valor el control falla y el cálculo se detiene en esa fase. Es importante porque sirven para verificar que los valores calculados cuadren, es decir, la suma del sueldo que se reparte entre los términos del año debe ser igual al sueldo total de la persona. La regla salió luego de revisarlo en mis notebooks donde casi todos los cuadres usaban 0,01."

#### Alternativa evaluada y motivo

"En mis notebooks había dos cuadres globales con tolerancia 1 y el resto con 0,01. La opción era mantener esa diferencia o unificar todo en 0,01, y yo elegí unificar para mantener consistencia entre todos los procesados."

#### Comprobación realizada

"Lo comprobé con la última corrida (la del año 2026). En los dos cuadres globales, la diferencia fue prácticamente cero: en el de contratos (suma del archivo global contra la suma de sus categorías) fue menor que un centavo, y en el de sueldos (entrada contra salida) fue exactamente 0,00. Con la tolerancia de 0,01 ambos habrían pasado igual. Lo que no he comprobado es que ocurra lo mismo en otros años; eso queda como algo que sigo sin validar."

#### Ejemplo válido

"La persona A recibe en el año un sueldo de $10.000,00; al ejecutar el procesamiento por término se obtiene: PAE $2.000,00 - PAOI $4.000,00 - PAOII $4.000,00. Al sumar en el cuadre se obtiene $10.000,00, es decir, la diferencia con el sueldo anual es de 0,00, que es menor o igual que la tolerancia de 0,01, y el control cuadra."

#### Ejemplo inválido

"La persona A tiene un sueldo anual de $10.000,00, pero al procesar por término se obtiene PAE $1.999,98 - PAOI $4.000,00 - PAOII $4.000,00. Al sumar en el cuadre se obtiene $9.999,98, es decir, la diferencia con el sueldo anual es de 0,02, que es mayor que la tolerancia de 0,01. El control falla y el cálculo se detiene en esa fase (la fase 1), y el analista ve en el tablero el control que falló."

#### Caso borde

"PAE $1.999,99 - PAOI $4.000,00 - PAOII $4.000,00 = $9.999,99. La diferencia es de 0,01, la cual se acepta, porque está dentro de la tolerancia (menor o igual que 0,01)."

#### Qué cambió desde la fase 1

"El caso 1 se revisó y se reaprobó. Inicialmente hablaba de seis archivos originales y el cálculo real usa siete, más cinco archivos de apoyo y las versiones del año anterior de cuatro de ellos. Las reglas ahora están escritas y con identificadores. Antes la fase 1 describía el producto en general; ahora hay reglas compartidas, la clasificación de controles falla/aviso por fase (que antes solo vivía en mi código) y ejemplos válidos e inválidos. La tolerancia de 0,01 es una regla nueva, en la fase 1 no la mencionaba. La publicación es por año, lo que obligó a leer el caso 4 de una forma más precisa sin cambiarlo. Hay cuatro especificaciones aprobadas (E1 a E4), vinculadas a los seis casos, en lugar de solo los casos. Detalle de los datos de cada archivo que sube el analista: está en RN-08 de E1: las columnas obligatorias de cada uno de los siete archivos originales; antes solo se decía que eran obligatorios, sin decir cuáles; para los cinco archivos de apoyo solo se dijo que sus datos obligatorios son los de cada tabla, y el detalle de columnas sigue pendiente. Contenido de los tableros: está en RN-28 de E2 (las pestañas de los seis tableros de fase) y en RN-49 de E4 (los tres tableros finales, con sus pestañas); antes se hablaba de los tableros sin detallar qué mostraban; los tableros finales muestran nombres y puestos en pantalla, pero el CSV de descarga no. Las preguntas abiertas de la fase 1 que ahora tienen respuesta (año en curso, filtrar o agrupar, Decano, total institucional, descarga) son un cambio real. Como no recibí retroalimentación del docente, estos cambios los decidí yo al revisar mi propio trabajo. Lo que no cambió: los usuarios junto con sus roles se mantienen, con dos precisiones nuevas: un Decano ve una sola facultad, y cada facultad tiene un Decano y un subdecano con el mismo rol; la idea general del proyecto se mantiene."

#### Lo que sigo sin validar

"La tolerancia de 0,01 solo se comprobó con la corrida de 2026, no con otros años. Persona con cargas y sin contrato: la regla que yo confirmé, pero no la he contrastado con mi jefa. Estudiantes que cambian de carrera: pendiente de confirmar con mi jefa. Orígenes sin confirmar: el reparto por defecto (aproximadamente 60 %, 34 % y 6 %, sin documento del análisis), el valor 100 del costo por hora, y el umbral de la línea base de 2024 (pendiente de la gerencia). Archivos y datos por decidir: el archivo de ajustes manuales, y si la lista de carreras, las movilidades y los componentes centrales van como archivo de apoyo o dentro del sistema; además, el detalle de columnas de los cinco archivos de apoyo. Mensajes comprensibles y ejemplos de las reglas restantes: solo se escribieron para algunas reglas. Nada de esto está ejecutado en un producto: las especificaciones describen el comportamiento esperado; no se afirma que funcione. Y la prueba de entorno (ahk health) no pasó: falló al lanzar health.bat; creo que es un error conocido de Windows de AHK 3.0.0, pero no lo comprobé más allá de esa salida."

### 9.2 Fase 3

Respuestas del autor durante la revisión de cada diseño técnico (T2, T3, T4 y T1), copiadas textualmente.

**Revisión de T2 · Recorrido**

> Aqui va la ruta detallada:
>
> El recorrido del analista comprende las siguientes etapas, desde el hallazgo en el tablero hasta su consulta en la lista:
>
> 1. Detección en el tablero de fase (P3)
> * Dónde está: El analista se encuentra en la pantalla P3 (Tablero de fase) dentro del layout de analista, trabajando sobre una fase específica (por ejemplo, la fase 2) y con el año fijado en la URL (por ejemplo, `?anio=2026`).
> * Qué hace: Mientras revisa los datos de esa fase, detecta una inconsistencia en los datos de entrada que no puede ser corregida (siguiendo el caso de uso de registrar anomalía no corregible).
> * Acción: Hace clic en la acción «Registrar anomalía» disponible en la pantalla.
>
> 2. Apertura e interacción con el Modal
> * Qué ve: Sin abandonar la pantalla de P3, se superpone un componente Modal de Mantine.
> * Contenido del formulario: El modal contiene tres campos editables y dos botones de acción:
>    * Fase: Selector obligatorio (fases 1 a 6).
>    * Descripción: Campo de texto obligatorio para detallar el problema.
> * Referencia al archivo o dato: Campo obligatorio para ubicar el dato exacto (por ejemplo, nombre de archivo, fila, etc.).
> * Nota: El analista no ve ni llena un campo de fecha, ya que el sistema la asigna de manera interna.
> * Botones: «Guardar» y «Cancelar».
>
> 3. Guardado exitoso de la anomalía
> * Qué hace: Completa los tres campos requeridos con datos válidos y pulsa «Guardar».
> * Qué pasa: Mantine Form valida que el esquema cumpla las reglas. Al confirmarse el guardado, el Modal se cierra de inmediato y el formulario se restablece a sus valores iniciales en limpio.
>
> 4. Navegación hacia P4 y visualización en la lista
> * Qué hace: El analista se desplaza mediante el menú del layout hacia la pantalla P4 (Anomalías registradas). El parámetro del año (`?anio=2026`) acompaña la navegación.
> * Qué ve en pantalla: Una tabla o lista con todas las anomalías cargadas. Ahí aparece el nuevo registro junto a su fase, descripción, referencia y la fecha automática. Si la lista es extensa, el analista puede usar el filtro por fase para acotar la visualización. Desde aquí también cuenta con la opción de abrir el modal en modo «Editar» si requiriera ajustar el texto más adelante.
>
> 5. ¿Qué ocurre si intenta registrar exactamente la misma anomalía?
> Si el analista vuelve a abrir el modal de registro (sea en P3 o en P4) e introduce un registro duplicado:
>    1. Condición de duplicado: Coinciden la misma fase y la misma referencia, considerándose idénticas incluso si varían mayúsculas y minúsculas.
>    2. Qué hace el sistema: No permite completar el guardado y no genera un nuevo registro.
>    3. Qué ve en pantalla:
>         * El Modal no se cierra.
>         * Los datos que el analista escribió no se borran.
>         * Se muestra en pantalla un mensaje de error explícito y fijo:
>           «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.»*
>    4. Resolución: El analista debe corregir la referencia o cerrar/cancelar el modal, acción que descartará lo que intentó ingresar y dejará la lista previa intacta.

**Revisión de T2 · Decisión (D59)**

> - Qué se decidió: cerrar el Modal de anomalía de cualquier forma (la X, Escape, un clic fuera o «Cancelar») descarta lo escrito. Al reabrirlo, el formulario vuelve a sus valores iniciales: vacío al crear, o con el registro guardado al editar.
> - Por qué: Evita que al editar otra anomalía aparezca lo escrito en otra.
> - Consecuencia que se acepta: si alguien cierra el Modal por error, pierde lo que había escrito.

**Revisión de T2 · Alternativa**

> Evalué la alternativa "Confirmar al cerrar", la cual consistía en que si hay cambios sin guardar, el Modal pregunta antes de cerrar. El problema que tenía era que añadía un tercer Modal solo para eso

**Revisión de T3 · Recorrido**

> Caso 1: faltan fases por revisar - Con alguna fase sin revisar no se abre el Modal.
> Caso 2: las seis revisadas - Al pulsar, se abre el Modal con el mensaje de confirmación ya fijado.

**Revisión de T3 · Recorrido (continuación)**

> en el caso 1 el analista ve un mensaje que nombra la fase que falta
> en el caso 2 al confirmar el Modal sigue abierto con el botón en publicando, al cancelar no se publica nada y nada cambia y si hay éxito el Modal se cierra y P2 refleja la publicación o fallo el Modal sigue abierto con un mensaje.

**Revisión de T3 · Decisión (D66)**

> - Qué decidí: el botón Publicar siempre se puede pulsar. Si falta alguna fase por revisar, no se abre el Modal y aparece un mensaje que nombra la fase que falta.
> - Por qué: La regla de fondo es que con alguna fase sin revisar no se puede publicar
> - Qué consecuencia aceptas: El analista puede pulsar un botón y recibir un «no» con una explicación.

**Revisión de T3 · Alternativa**

> La alternativa que evalué fue el del Botón deshabilitado, con la razón visible. Consistía en que el botón no se puede pulsar mientras falte alguna fase, y al lado se ve por qué. No se lo eligió porque también cumple la regla (RN-24), pero se aparta del ejemplo EJ-15: el analista no llegaría a «intentar publicar»

**Revisión de T4 · Recorrido**

> Primero se prevé que haya una consulta de identidad que le dice al Decano/Subdecano su rol y su facultad. Un Decano y Subdecano ve las carreras de una sola facultad, es decir, ambos ven los mismo.
> - Si su facultad está identificada y hay resultados publicados: Ve los tres tableros finales (Superávit / Déficit, Costo de Clases y Gestión docencia), solo de las carreras de su facultad
> - Si no hay nada publicado: Ve la etiqueta «No existen datos procesados.»
> - Si no tiene facultad asignada: No ve ninguna carrera y ve «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.»

**Revisión de T4 · Recorrido (continuación)**

> el Decano ve por defecto el año calendario actual. Si elige otro año esa elección se guarda en un almacén compartido (Zustand)

**Revisión de T4 · Decisión (D57)**

> - Qué decidí: Zustand guarda la selección de consulta, es decir, el año elegido y las facultades elegidas, que usan P5, P6 y P7.
> - Porqué: Los tres tableros se enlazan entre sí. Si el usuario elige un año o un filtro en uno, los otros dos deben mostrar lo mismo al navegar.
> - Consecuencia que acepto: la selección se pierde al recargar la página y no se puede compartir un enlace con ese estado en la primera versión.

**Revisión de T4 · Alternativa**

> la alternativa que evalué fue "Selección en la URL". Consiste en que El año y las facultades viajarían en la dirección. No lo elegí porque dejaba a Zustand sin uso, y la consigna pide un uso justificado de esa herramienta

**Revisión de T1 · Recorrido**

> Cuando falta algún archivo requerido o no ha indicado el año.
> el cliente lo detecta sin leer el contenido de los archivos, y no se calcula nada.
>
> Cuando todo está seleccionado y envía.
> la subida es una llamada a un servicio que hoy no existe. Es diseño previsto, sin simular nada. El servicio ejecuta las seis fases.
>
> Qué estados ve en P2 sobre el cálculo.
> En curso
> Completado.
> Detenido en la fase N
> Error de archivo

**Revisión de T1 · Decisión (D68)**

> - Qué decidí: el estado del cálculo en P2 se pide con una consulta de TanStack Query, identificada por el año.
> - Por qué: El estado depende del año y lo conoce el servidor.
> - Qué consecuencia acepto: Es un diseño previsto, condicionado a que exista un servicio, y no se simula el cálculo ni su progreso.

**Revisión de T1 · Alternativa**

> La alternativa que evalué fue la de guardar el estado del cálculo en el cliente. Consise en que la interfaz mantiene su propia copia del estado, actualizada cuando se envía la subida. No la elegí porque Duplica lo que el servidor ya sabe, y la consigna prohíbe duplicar estado remoto. Si se guardara en Zustand, saldría del alcance que D57 le dio

Uso de IA en esta fase. En esta fase trabajé con dos herramientas de IA, como en la Fase 1. La primera fue Claude Code con Agent Harness Kit 3.0.0: el agente lead coordinó el trabajo, propuso las opciones de cada decisión y redactó los textos de las decisiones D52 a D79 y de los diseños T1 a T4, y el agente builder insertó esos textos en docs/proceso.md y en esta entrega. La segunda fue otro asistente de IA, en una conversación aparte, que usé para evaluar las recomendaciones del lead, preparar mis correcciones y prepararme para las preguntas de la revisión. En proceso.md, la mayoría de las decisiones técnicas llevan el motivo marcado como «propuesto por el asistente y aceptado por el autor»: la propuesta y su razonamiento vinieron de la IA y yo los acepté tras leerlos. Las marcadas como «Motivo del autor (textual)» o «Decisión del autor» son las que escribí o decidí yo. Un caso en que cambié de criterio fue PR-02: pedí quitarlo del diseño técnico (D73) y después lo restablecí por haberlo pedido por error (D74). Una recomendación que necesité entender mejor antes de aceptarla fue la de D66, el botón «Publicar» siempre clicable: en la revisión de T3 mi primera explicación daba la regla («no se puede publicar») y no la razón de elegir esa opción, que es seguir el ejemplo EJ-15. Los datos de los tableros y de la publicación los administraría un servicio que todavía no existe, y la identidad vendría de un servicio institucional de autoridades: el contrato de la consulta POST lo verifiqué leyendo mi código, pero el de la consulta GET por usuario, que es la elegida (D53), no está verificado (D52).

Lo que no validé. No resolví el fallo de ahk health en Windows: su causa está identificada en D63 (AHK 3.0.0 lanza health.bat con las comillas mal escapadas), pero no actualicé AHK ni lo ejecuté con la versión 3.7.0, de la que solo se leyó el código. En la Fase 2 yo decía sobre ese fallo «creo que es un error conocido de Windows de AHK 3.0.0, pero no lo comprobé más allá de esa salida»; ahora tiene causa y evidencia. El builder escribió en proceso.md y en esta entrega sin acción registrada en el harness, y el lead editó los diseños con las herramientas de AHK, lo que se aparta de su rol (D72); la tarea del harness sigue sin cerrarse, y la verificación de lo escrito la hizo el lead de forma manual (posiciones, copias previas y frases clave), sin comparar palabra por palabra cada texto insertado en proceso.md. La revisión por fases (PR-02) quedó sin diseño técnico (pregunta 11 de T2) y la consultaré con el docente. La consulta que sí hice al docente fue sobre el servicio de autoridades, no sobre los tableros (D79). Los cuatro diseños están aprobados como documentos, pero nada está implementado ni probado, y cada uno conserva sus preguntas abiertas. Tampoco consulté directamente la documentación de Zod 4.4.3, ni contrasté con las versiones fijadas el comportamiento de Mantine, React Router y TanStack Query que describen los diseños, ni la viabilidad de las pruebas de estados con Vitest.


## 10. Fuentes y comprobaciones de esta fase

### 10.1 Fase 2

#### Casos de uso y especificaciones (identificadores y archivos)

| Ref. | Identificador | Estado | Archivo |
|---|---|---|---|
| CU1 | cargar-archivos-anio-calculo-por-fases | approved | docs/use-cases/cargar-archivos-anio-calculo-por-fases.md |
| CU2 | revisar-tableros-fase-detectar-anomalias | approved | docs/use-cases/revisar-tableros-fase-detectar-anomalias.md |
| CU3 | registrar-anomalia-datos-no-corregible | approved | docs/use-cases/registrar-anomalia-datos-no-corregible.md |
| CU4 | publicar-resultados-del-anio | approved | docs/use-cases/publicar-resultados-del-anio.md |
| CU5 | consultar-tableros-finales-todas-carreras-rectorado | approved | docs/use-cases/consultar-tableros-finales-todas-carreras-rectorado.md |
| CU6 | consultar-tableros-finales-carreras-facultad-decano | approved | docs/use-cases/consultar-tableros-finales-carreras-facultad-decano.md |
| E1 | e1-carga-y-calculo-por-fases | approved | docs/specs/e1-carga-y-calculo-por-fases.md |
| E2 | e2-revision-y-anomalias | approved | docs/specs/e2-revision-y-anomalias.md |
| E3 | e3-publicacion-de-resultados | approved | docs/specs/e3-publicacion-de-resultados.md |
| E4 | e4-consulta-tableros-finales | approved | docs/specs/e4-consulta-tableros-finales.md |

También se usó el registro de decisiones del autor (D1 a D51) y la primera entrega (Fase 1, versión 1.0).

**Fuentes externas.** Una descarga de nodejs.org (copia portátil de Node v22.23.4, el 2026-11-05) usada solo para comprobar el entorno de la fase, y la consigna del curso. Además, los recursos de las skills ahk-spec y ahk-use-case de la instalación local de AHK 3.0.0. Ninguna otra fuente externa web.

#### Comprobaciones

| Comprobación | Fecha | Resultado | Límite |
|---|---|---|---|
| `ahk --version` | 2026-11-05 16:09 (-05:00) | 3.0.0 | Confirma la versión del CLI, nada más |
| `ahk doctor` (herramienta MCP ahk_doctor) | 2026-11-05 16:09 (-05:00) | lib version [!] 3.0.0 → 3.7.0 disponible (no se actualizó porque la consigna exige 3.0.0); agent files [✓] all present; harness skills [✓] all present and up to date; aviso de que existe la versión 3.7.0 | Diagnóstico del entorno; no prueba las decisiones del producto |
| Llamada MCP real `specs.list` | 2026-11-04 y 2026-11-05 | El 2026-11-04 respondió con los 6 casos; el 2026-11-05 con 10 documentos en estado approved (6 casos y 4 especificaciones) | Prueba que el flujo documental responde, no que las decisiones sean correctas |
| Validación documental `specs.validate` | 2026-11-05 | `valid: true`, sin errores | Valida formato y vínculos, no que las reglas sean correctas |
| Trazabilidad en AHK | 2026-11-05 | `sourceUseCases` de E1 = CU1; E2 = CU2 y CU3; E3 = CU4; E4 = CU5 y CU6. `specs.related` de E1 devolvió lista vacía | Los vínculos entre especificaciones existen solo como referencias en el texto, no como relaciones declaradas en AHK |
| `ahk health` | 2026-11-05 12:15 (-05:00) | **FALLÓ**, código de salida 1. Pasaron las verificaciones de configuración del harness (cinco agentes, base de datos, .mcp.json), pero falló al lanzar health.bat con el mensaje: «"C:\proyectos\proyecto-bootcamp\health.bat" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.» health.bat existe en la raíz | No se ejecutó el build real de la plantilla a través de AHK. El autor lo atribuye a un error conocido de Windows (atribución del autor, no comprobada aquí) |
| `pnpm build` directo | 2026-11-05 12:15 (-05:00) | Pasó (`tsc -b && vite build`, código de salida 0) | Comprobación **separada**; no sustituye a `ahk health` ni demuestra que las reglas sean correctas |
| Versiones del entorno (comprobación del autor) | 2026-11-05 | Node v24.21.0 por defecto en este equipo, pnpm 11.17.0, AHK 3.0.0. El proyecto declara node ≥ 22.22.0 (se cumple con Node 24 y con Node 22) | La consigna pide la línea 22; para comprobarlo se usó una copia portátil de Node v22.23.4 (descargada de nodejs.org, con suma SHA-256 verificada), usada solo en esta sesión; el Node instalado en el equipo sigue siendo el 24. Salidas observadas por el autor |
| `pnpm build` con Node v22.23.4 (observado por el autor) | 2026-11-05 16:06 (-05:00) | Pasó, código de salida 0 | No demuestra que las reglas del negocio sean correctas |
| `ahk health` con Node v22.23.4 (observado por el autor) | 2026-11-05 16:06 (-05:00) | **FALLÓ** igual que con Node 24, código de salida 1: las verificaciones de configuración del harness pasan y falla al lanzar health.bat, con el mismo mensaje de comillas dobles | El build real a través de AHK no se cumplió; el fallo no depende de la versión de Node |
| `health.bat` ejecutado directamente con su ruta completa y Node v22.23.4 (observado por el autor) | 2026-11-05 16:07 (-05:00) | Pasó, código de salida 0; ejecuta `pnpm build` | No es un `ahk health` exitoso; es una comprobación separada que no sustituye a AHK |
| Revisión propia | 2026-11-05 | El autor revisó el documento acumulativo completo y lo aprobó para entrega el 2026-11-05. El autor aprobó explícitamente cada caso y especificación con versión citada (ver apartado 8) | — |
| Ejecución de funcionalidades | — | **No hay.** Las especificaciones describen comportamiento esperado | Ninguna regla ni criterio se ha probado en un producto |

### 10.2 Fase 3

Este subapartado separa tres cosas: (a) los documentos de AHK que son fuente de esta fase, (b) la documentación oficial leída para decidir el diseño y (c) las comprobaciones reales del entorno. **Nada de esto es una prueba del producto**: las pruebas futuras del producto se planifican en el apartado 28 y no se han ejecutado.

#### (a) Documentos de AHK (casos de uso y especificaciones)

Estado y fecha leídos del encabezado (frontmatter) de cada archivo del proyecto el 2026-11-10. Las fechas están en hora UTC; las del 2026-11-11 entre las 01:07 y las 02:42 UTC corresponden a la tarde y noche del 2026-11-10 en la zona horaria (-05:00) usada en las comprobaciones anteriores.

| Ref. | Identificador (slug) | Tipo | Estado | Última actualización (UTC) | Origen declarado |
|---|---|---|---|---|---|
| CU1 | cargar-archivos-anio-calculo-por-fases | caso de uso | approved | 2026-11-04T20:06:15.070Z | — |
| CU2 | revisar-tableros-fase-detectar-anomalias | caso de uso | approved | 2026-10-26T02:39:46.702Z | — |
| CU3 | registrar-anomalia-datos-no-corregible | caso de uso | approved | 2026-10-26T02:44:32.344Z | — |
| CU4 | publicar-resultados-del-anio | caso de uso | approved | 2026-10-26T02:47:46.336Z | — |
| CU5 | consultar-tableros-finales-todas-carreras-rectorado | caso de uso | approved | 2026-10-26T02:54:27.786Z | — |
| CU6 | consultar-tableros-finales-carreras-facultad-decano | caso de uso | approved | 2026-10-26T02:58:55.435Z | — |
| E1 | e1-carga-y-calculo-por-fases | especificación funcional | approved | 2026-11-05T04:53:21.308Z | CU1 |
| E2 | e2-revision-y-anomalias | especificación funcional | approved | 2026-11-05T06:14:34.746Z | CU2 y CU3 |
| E3 | e3-publicacion-de-resultados | especificación funcional | approved | 2026-11-05T06:29:32.577Z | CU4 |
| E4 | e4-consulta-tableros-finales | especificación funcional | approved | 2026-11-05T06:48:05.457Z | CU5 y CU6 |
| T1 | t1-carga-y-calculo-por-fases | especificación técnica (spec-tech) | **approved** (D78) | 2026-11-11T03:25:22.581Z | E1 |
| T2 | t2-revision-y-anomalias | especificación técnica (spec-tech) | **approved** (D75) | 2026-11-11T02:42:42.039Z | E2 |
| T3 | t3-publicacion-de-resultados | especificación técnica (spec-tech) | **approved** (D76) | 2026-11-11T03:02:27.869Z | E3 |
| T4 | t4-consulta-tableros-finales | especificación técnica (spec-tech) | **approved** (D77) | 2026-11-11T03:18:15.334Z | E4 |

Los archivos de estos documentos están en las carpetas `docs/use-cases/` y `docs/specs/` del proyecto, con el identificador de la tabla como nombre. Las fuentes funcionales (CU1 a CU6, E1 a E4) están aprobadas. **T2 fue aprobado por el autor durante la redacción de este borrador** (D75; la primera lectura de su encabezado lo mostraba en draft y la segunda, hacia las 21:47 -05:00, en approved); **T3, T4 y T1 se aprobaron después** (D76, D77 y D78), de modo que los cuatro están approved. Ninguna aprobación autoriza implementar nada. Según el registro de la sesión, la lista de documentos se leyó también con una llamada real de lectura al MCP de AHK (`specs_list`); su salida no se reproduce aquí. Estados y fechas pueden haber cambiado después de esta lectura.

#### (b) Documentación oficial consultada

Consulta hecha con Context7 el **2026-11-10**. El índice documental de Mintlify no está disponible en este proyecto; no se usó. La consulta de cada decisión se registró en el registro de decisiones. Las versiones fijadas son las de la cohorte (sección 5 de la consigna); en varios casos el índice consultado no coincide con ellas.

| Librería (fuente Context7) | Versión fijada | Concepto consultado | Enlaces | Decisión | Salvedad declarada |
|---|---|---|---|---|---|
| TanStack Query, React v5 (`/tanstack/query`) | `@tanstack/react-query` 5.102.8 | `queryKey`, `enabled`, `isLoading` frente a `isPending`, estados de una consulta | https://github.com/tanstack/query/blob/main/docs/framework/react/reference/functions/useQuery.md y https://github.com/tanstack/query/blob/main/docs/framework/react/guides/queries.md | D53 (reutilizada en D62 y D68) | El índice no lista la 5.102.8; ofrece la 5.103.2 y otras v5. Compatibilidad por comprobar |
| TanStack Query, React v5 | `@tanstack/react-query` 5.102.8 | `useMutation`, `isPending` e `isError`, `onSuccess` con `queryClient.invalidateQueries` (devolver la promesa de la invalidación mantiene la mutación pendiente hasta el refetch) | https://github.com/tanstack/query/blob/main/docs/framework/react/guides/invalidations-from-mutations.md, https://github.com/tanstack/query/blob/main/docs/framework/react/reference/functions/useMutation.md y https://github.com/tanstack/query/blob/main/docs/framework/react/quick-start.md | D65 | Igual que la fila anterior. Comportamiento por comprobar contra la 5.102.8 |
| Mantine Form (`/mantinedev/mantine`) | `@mantine/form` 9.4.1 | `schemaResolver` integrado con Zod v4 importado de `zod/v4`; `form.reset` | https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/form/schema-validation.mdx y https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/form/use-form.mdx | D55 | El índice describe la rama 9.x; comportamiento por defecto por comprobar contra la 9.4.1 |
| Zustand (`/pmndrs/zustand`) | `zustand` 5.0.15 | `create<T>()(...)` con acciones y selectores | https://github.com/pmndrs/zustand/blob/main/docs/learn/guides/beginner-typescript.md y https://github.com/pmndrs/zustand/blob/main/docs/learn/guides/advanced-typescript.md | D57 | El índice llega a la v5.0.14; la fijada es la 5.0.15. Por comprobar |
| React Router (`/remix-run/react-router`) | `react-router` 8.3.1 | Modo declarativo, rutas de layout sin `path`, `Outlet`, rutas índice, `path="*"` | https://github.com/remix-run/react-router/blob/main/docs/start/declarative/routing.md y https://github.com/remix-run/react-router/blob/main/docs/api/components/Outlet.md | D58 | El índice lista 7.x; no consta la 8.3.1. Compatibilidad por comprobar |
| React Router | `react-router` 8.3.1 | `useSearchParams` en modo declarativo (leer con `searchParams.get`, escribir con `setSearchParams`) | https://github.com/remix-run/react-router/blob/main/docs/start/declarative/url-values.md y https://github.com/remix-run/react-router/blob/main/docs/api/hooks/useSearchParams.md | D69 | Igual que la fila anterior. La consulta no halló nada que lo haga inviable, pero no se verificó contra la 8.3.1 |
| Mantine Modal (`/mantinedev/mantine`) | `@mantine/core` 9.4.1 | `closeOnClickOutside` y `closeOnEscape` activos por defecto; `keepMounted` en falso (contenido desmontado al cerrar) | https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/core/modal.mdx y https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/Modal/Modal.tsx | D59 | El código consultado indica la 9.7.5; valores por defecto por comprobar contra la 9.4.1 |
| Mantine Modal | `@mantine/core` 9.4.1 | Controlar `closeOnClickOutside` y `closeOnEscape`; impedir el cierre durante una operación asíncrona | https://github.com/mantinedev/mantine/blob/master/apps/help.mantine.dev/src/pages/q/how-to-prevent-modal-from-closing.mdx y el mismo `Modal.tsx` | D64 | Igual que la fila anterior |

**Fuentes que NO se consultaron (declaración expresa).**
- **Zod 4.4.3: no se consultó su documentación directamente.** Solo se vio su uso en un ejemplo de la documentación de Mantine. Queda pendiente consultarla (D55).
- React y React DOM 19.2.8: no se consultaron; son la base que ya trae la plantilla.
- Vitest: la consigna pide usarlo pero no da versión; no se consultó.
- D56, D66, D67 y D70 a D74 no se apoyan en documentación nueva de librerías.

**Compatibilidad declarada entre paquetes: NO verificada.** No se consultaron los metadatos publicados de los paquetes (por ejemplo, qué versiones de React o de Zod admite cada uno). Por eso este documento no afirma que las versiones fijadas sean compatibles entre sí; lo que se tiene es la lista de versiones de la consigna y la documentación leída en versiones cercanas, no idénticas. La consigna indica que sus referencias se contrastaron el 19 de octubre de 2026.

#### (c) Comprobaciones reales del entorno (EVIDENCIA EJECUTADA)

Hechas en modo de solo lectura el 2026-11-10 al redactar este borrador, salvo las que se indican como observadas antes en la sesión.

| Comprobación | Cuándo | Resultado observado | Límite |
|---|---|---|---|
| `node --version` | 2026-11-10 | `v24.21.0` | La consigna pide la línea 22 (desde 22.22.0); el proyecto declara `node >= 22.22.0`, que se cumple. El equipo usa la línea 24 (en la Fase 2 se probó una copia portátil de Node 22.23.4; ver 10.1) |
| `pnpm --version` | 2026-11-10 | `11.17.0` | Coincide con la versión pedida |
| `ahk --version` | 2026-11-10 | `3.0.0` | Confirma el CLI, nada más |
| `ahk doctor` | 2026-11-10 | `lib version [!] 3.0.0 → 3.7.0 available`; `agent files [✓] all present`; `harness skills [✓] all present and up to date`; aviso de que existe la versión 3.7.0 | Diagnóstico del entorno. No se actualizó AHK: la consigna fija la 3.0.0 y prohíbe migrar automáticamente. No se capturó el código de salida del comando |
| Health de AHK (`ahk_health` por MCP y health automático al reclamar la tarea 1) | Observado el 2026-11-10 | **Falla** al lanzar `health.bat` con el mensaje literal: «"\"c:\proyectos\proyecto-bootcamp\health.bat\"" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.» | Causa y evidencia en D63: AHK 3.0.0 pasa la ruta entre comillas y Node en Windows las escapa. En la Fase 2, `health.bat` ejecutado directamente con su ruta completa pasó con código 0 (ver 10.1). **No se ejecutó `ahk health` al redactar este borrador** |
| Línea de Node | 2026-11-10 | Pedida: 22. Instalada en el equipo: v24.21.0 | Ya declarado en la Fase 2 |
| Versión de AHK | 2026-11-10 | Instalada 3.0.0; disponible 3.7.0, sin actualizar | Leer el código del paquete 3.7.0 (D63) no es ejecutarlo; no se encontraron notas de versión |
| Lectura real de `specs_list` por el MCP de AHK | Observado en la sesión de trabajo | Respondió con los documentos de AHK | Prueba que el flujo documental responde; no que las decisiones sean correctas |
| Extracción del texto de la consigna | Observado en la sesión (D73) | Se instaló temporalmente `pdfjs-dist` 4.10.38 en una carpeta fuera del proyecto, solo para leer el PDF de la consigna | **No es una dependencia del producto** ni está en `package.json` |

**Cómo se hicieron las escrituras (declaración de proceso, D61, D63, D72 y D74).**
- El builder pudo editar el registro de decisiones (`docs/proceso.md`) y restaurar archivos de diseño sin tener una acción registrada en el harness: `actions.start` falló con la tarea en estado pendiente y la tarea 1 quedó en modo de reparación sin pasar a terminada. Las tres restauraciones de T1, T2 y T3 (D74) las hizo el builder copiando archivos sin acción registrada.
- Los cambios de T2 y T4 los hizo el lead con las herramientas de AHK (`specs_create`, `specs_update_content`, `specs_update_metadata`), sin builder ni reviewer, validados con `specs_validate`. Esto se aparta de la regla del rol lead de no modificar archivos del repositorio.
- El flujo normal (acción del builder, revisión del reviewer, cierre de la tarea) no se ejecutó para esas escrituras; se sustituyó por una verificación manual del lead que no comparó palabra por palabra cada texto insertado.
- La aprobación de T2 (D75) la hizo el autor con la frase citada en el registro; AHK marcó el documento approved, sin cambiar su cuerpo. Ocurrió mientras se redactaba este borrador (hacia las 21:42 -05:00 del 2026-11-10).
- Este borrador de la Fase 3 también lo escribió el builder sin acción registrada, con autorización del autor del 2026-11-10 para este único archivo.
- Según D63, la tarea 1 queda `in_progress` en modo de reparación y no pasa a `done` mientras el health falle; su estado actual no se volvió a comprobar al redactar este borrador.

**Separación de evidencias.** Lo anterior es lectura de documentos y del entorno. No hay ninguna prueba ejecutada del producto: no hay pruebas puras, ni recorrido de navegador, ni petición real, ni despliegue. **La documentación consultada no demuestra que la integración esté implementada**: una librería documentada no es una integración funcionando en este proyecto.

#### (d) Retroalimentación docente y constancia de la consulta

- No recibí retroalimentación docente de la entrega 1 ni de la entrega 2. La respuesta del docente a mi consulta sobre el servicio de autoridades (el punto siguiente) es la respuesta a una consulta mía, no retroalimentación de una entrega.
- El 2026-11-09 consulté al docente por mensajería si podía usar el servicio institucional de autoridades como consulta remota real de TanStack Query para identificar el rol y la facultad, indicándole que el proyecto no tiene backend y que el rol de Analista quedaría pendiente porque ese servicio no lo incluye. El 2026-11-10 respondió con un mensaje de voz de unos 15 segundos, que no transcribo; según mi resumen, dijo que no había problema y que lo propuesto estaba bien. Conservo la captura de la conversación como constancia. La consulta no trató los tableros publicados sin API ni la garantía de alcance del Decano en el servidor. La constancia corresponde a la consulta sobre el servicio de autoridades (D52 y D53). No cubre el ajuste de alcance de los tableros publicados mencionado en D54 (opción C), que sigue pendiente de acordar con el docente. El docente no precisó si se refería al método GET o POST del servicio, así que su respuesta no valida un contrato concreto.

## 11. Procesos detallados

Seis procesos, uno por caso de uso, sin recorridos duplicados: CU1→PR-01 (E1); CU2→PR-02 y CU3→PR-03 (E2); CU4→PR-04 (E3); CU5→PR-05 y CU6→PR-06 (E4). Todos los usuarios están ya identificados con su rol (supuesto, apartado 8.2).

### PR-01 · Cargar el conjunto anual y obtener el cálculo por fases
- **Caso:** CU1. **Actor:** analista. **Inicio:** dispone del conjunto de archivos del año y decide cargarlo, indicando el año.
- **Condiciones previas:** rol de analista; conjunto completo (RN-08).
- **Datos de entrada:** año; siete archivos originales; cuatro equivalentes del año anterior; cinco archivos de apoyo (apartado 13).

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Indica el año y sube todos los archivos a la vez | — |
| 2 | — | Comprueba que estén todos los archivos y datos obligatorios (RN-08). Si falta algo: error de archivo, no calcula nada e indica qué falta (RN-07) |
| 3 | — | Ejecuta las seis fases en secuencia, sin pausas, aplicando los controles (RN-05, RN-06, RN-10 a RN-15) |
| 4 | — | Una falla detiene el cálculo en esa fase, indica qué control falló y no ejecuta las siguientes; un aviso no detiene |
| 5 | Dispone de los resultados y del tablero de cada fase (la revisión es PR-02) | Deja el cálculo sin visibilidad para Rectorado y Decano hasta publicar (RN-03) |
| 6 | Si corrige un archivo, sube el conjunto completo | Recalcula todo y sustituye el cálculo anterior (RN-01, RN-02) |

- **Decisiones del proceso:** ¿falta algún archivo o dato? ¿algún control falla? ¿es aviso o falla? Las anomalías de datos no bloquean.
- **Reglas:** RN-01, RN-02, RN-03, RN-04, RN-05, RN-06, RN-07, RN-08, RN-10 a RN-22.
- **Resultado:** *éxito:* cálculo completo con resultados y tablero de cada fase. *Fallo por error de archivo:* no se calcula nada. *Fallo por control:* se detiene en la fase. *Cancelación:* no está descrita en E1.

### PR-02 · Revisar tableros y marcar fases
- **Caso:** CU2. **Actor:** analista. **Inicio:** existe un cálculo del año completado.
- **Condiciones previas:** cálculo completo y no publicado (RN-26, RN-32). **Entrada:** tablero de cada fase; decisión de marcar.

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Abre el tablero de una fase | Muestra resultados, controles (ok, aviso, falla) y excepciones (RN-28) |
| 2 | Revisa para detectar anomalías de datos | — |
| 3 | Si no hay anomalías, o ya las trató, marca la fase como revisada | Lo permite aunque no haya abierto el tablero (RN-27) |
| 4 | Repite para las seis fases. Puede quitar la marca de una fase antes de publicar | Quitar la marca solo cambia esa fase (RN-23) |
| 5 | — | Con las seis marcadas, el cálculo queda listo para publicarse (RN-24) |

- **Decisiones:** ¿anomalía corregible? Sí: corrige y vuelve a subir (PR-01); se borran todas las marcas (RN-25). No: la registra (PR-03). (RN-29)
- **Reglas:** RN-23 a RN-29, RN-32, y RN-01, RN-02, RN-05, RN-07 de E1.
- **Resultado:** *éxito:* las seis fases revisadas. *Cancelación:* el analista sale sin marcar y no cambia ninguna marca. *Fallo:* con el cálculo detenido por una falla ve los tableros de las fases calculadas pero no puede marcar (RN-26); con el cálculo publicado, las marcas son de solo lectura (RN-32).

### PR-03 · Registrar una anomalía no corregible
- **Caso:** CU3. **Actor:** analista. **Inicio:** durante la revisión encuentra una anomalía cuyo dato de origen tiene la irregularidad.
- **Condiciones previas:** cálculo completo, no publicado. **Entrada:** fase, descripción, referencia al archivo o dato.

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Identifica la anomalía no corregible | — |
| 2 | La registra con fase, descripción y referencia (obligatorios) | Pone la fecha de registro (RN-30) |
| 3 | — | Guarda el registro y lo deja visible para el analista, en la lista del cálculo en curso con filtro por fase (RN-31) |

- **Variantes:** duplicado (misma fase y misma referencia): avisa y no crea (RN-30). Falta un dato obligatorio: no guarda y pide completarlo. Edición y eliminación hasta que se publique; editar hasta duplicar se trata como duplicado. Si la anomalía es corregible, no se registra (RN-29).
- **Reglas:** RN-04, RN-26, RN-29, RN-30, RN-31, RN-32.
- **Resultado:** *éxito:* registro guardado. *Fallo:* sin dato obligatorio, duplicado, cálculo detenido (RN-26) o publicado (RN-32): no se guarda ni cambia nada. *Cancelación:* no descrita en E2.

### PR-04 · Publicar los resultados del año
- **Caso:** CU4. **Actor:** analista (solo él publica). **Inicio:** terminó la revisión y decide publicar.
- **Condiciones previas:** cálculo del año completado y seis fases revisadas (RN-24).

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Decide publicar | Pide confirmar con el mensaje de RN-33 |
| 2 | Confirma | Pone a disposición de Rectorado y Decano los tres tableros finales con el año y la fecha de publicación (RN-36, RN-39) |
| 3 | — | La publicación nueva es la vigente de ese año y sustituye a la anterior de ese mismo año; los demás años no cambian (RN-37) |
| 4 | — | El cálculo publicado queda en solo lectura (RN-32) |
| 5 | — | No avisa a Rectorado ni a Decano; la ven al entrar (RN-35) |

- **Decisiones:** ¿seis fases revisadas? ¿confirma? ¿ese año ya tenía publicación?
- **Reglas:** RN-03, RN-33 a RN-40, RN-24, RN-32, RN-26, RN-02, RN-05, RN-07.
- **Resultado:** *éxito:* la publicación vigente del año queda actualizada. *Cancelación:* si no confirma, no se publica y nada cambia. *Fallo:* fases sin revisar o cálculo detenido: no se publica y nada cambia; un cálculo nuevo que falla no cambia lo publicado (RN-38). La causa de fallo distinta de estas no está decidida.

### PR-05 · Rectorado consulta los tableros finales
- **Caso:** CU5. **Actor:** Rectorado. **Inicio:** necesita consultar resultados; el analista ha publicado.
- **Entrada:** año elegido; facultades del filtro (opcional).

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Accede a los tableros finales | — |
| 2 | Puede elegir entre los años publicados | Muestra por defecto el año según RN-43 |
| 3 | Ve los tres tableros de todas las carreras | Muestra la fecha de publicación en cada tablero (RN-44) |
| 4 | Puede filtrar por una o varias facultades | Muestra los tableros filtrados y totales agrupados por facultad (RN-45) |
| 5 | Puede descargar la tabla vista en CSV | Aplica año y filtro (RN-46) |

- **Decisiones:** ¿hay algo publicado? ¿el año actual está publicado? ¿elige facultad?
- **Reglas:** RN-41 a RN-46, RN-48, RN-49, RN-03, RN-31, RN-36, RN-37, RN-38, RN-39.
- **Resultado:** *éxito:* ve los tres tableros. *Fallo:* sin nada publicado ve «No existen datos procesados.». *Durante un cálculo nuevo* ve lo ya publicado (RN-48). *Cancelación:* no aplica (solo consulta; no cambia nada del cálculo ni de la publicación).

### PR-06 · El Decano consulta los tableros finales
- **Caso:** CU6. **Actor:** Decano (incluye al subdecano, con el mismo rol). **Inicio:** necesita consultar resultados; el analista ha publicado; tiene facultad asignada.

| Paso | Usuario | Producto |
|---|---|---|
| 1 | Accede a los tableros finales | — |
| 2 | Puede elegir entre los años publicados | Muestra por defecto el año según RN-43, solo de las carreras de su facultad |
| 3 | Ve los tres tableros de su facultad | Muestra la fecha de publicación (RN-44) |
| 4 | Puede descargar la tabla vista en CSV | Limita lo descargado a su facultad (RN-46) |

- **Decisiones:** ¿tiene facultad asignada? ¿hay algo publicado? ¿el año actual está publicado?
- **Reglas:** RN-41 a RN-44, RN-46 a RN-49, RN-03, RN-31, RN-36, RN-37, RN-38, RN-39.
- **Resultado:** *éxito:* ve los tres tableros de su facultad. *Fallo:* sin facultad asignada no ve ninguna carrera y ve el mensaje de RN-41; sin nada publicado ve la etiqueta. *Cancelación:* no aplica (solo consulta).

## 12. Reglas del negocio

Cada regla compartida aparece una sola vez, en la especificación que la define. RN-09 no existe en las especificaciones. «Motivo: no registrado» significa que ninguna fuente lo declara. «Procesos» indica los procesos donde la regla se define o se aplica.

### 12.1 Reglas de E1 (carga y cálculo)

| ID | Condición | Comportamiento exigido | Motivo | Procesos |
|---|---|---|---|---|
| RN-01 | Se sube el conjunto del año | Completo y de una vez; no se admiten cargas parciales | El cálculo depende de todos los archivos | PR-01 (referenciada por E2) |
| RN-02 | Existe cálculo del año y se sube un conjunto nuevo | El cálculo nuevo sustituye al anterior | En la primera entrega: el autor no necesita demostrar qué vieron Rectorado y Decano en una fecha ni comparar cálculos | PR-01 (referenciada por E2, E3) |
| RN-05 | Un control termina | Resultado ok, aviso o falla. La falla detiene el cálculo en esa fase y se muestra qué control falló; el aviso no detiene y el analista lo revisa | No registrado | PR-01 |
| RN-06 | Un cuadre entre totales | Acepta una diferencia de hasta 0,01 (2 decimales); si es mayor, el control falla. Una sola regla para todos los cuadres; 0,01 es parámetro configurable | Se trabaja con dinero con centavos; consistencia entre todos los procesados (apartado 9) | PR-01 |
| RN-07 | Error de archivo frente a falla de control | El error de archivo se detecta antes de calcular y no calcula nada; la falla de control se evalúa sobre los resultados de una fase y detiene el cálculo en ella | No registrado | PR-01 |
| RN-08 | Se sube el conjunto | Todos los archivos son obligatorios, también los equivalentes del año anterior. Si falta un archivo o dato obligatorio: error de archivo, no se calcula nada y se indica cuál falta. Detalle en el apartado 13 | No registrado | PR-01 |
| RN-10 a RN-15 | Controles por fase | Ver 12.6 (clasificación falla/aviso de las seis fases) | Son los controles que el autor describió de su proceso actual; no se añaden otros | PR-01 |
| RN-16 | Persona con sueldo en un término y ninguna hora | Se crea una carga «Sin carga» con cero horas que recibe el sueldo completo del término; va a gestión docencia, o a investigación en la variante «Sin carga (investigación)» | El sueldo no se pierde | PR-01 |
| RN-17 | Persona con cargas y sin contrato | Su costo no se asigna, se avisa y se muestra el motivo; no detiene el cálculo. Confirmada por el autor, pendiente de contrastar con su jefa | No registrado | PR-01 |
| RN-18 | Cargas que quedan del periodo anterior (cola) | Entran al año como un término aparte, con horas proporcionales a la fracción de días de la cola respecto del término. La fracción debe estar entre 0 y 1; fuera de ese rango el control falla (RN-11, bloque B) | No registrado | PR-01 |
| RN-19 | Costo de cada carga | Se agrupa en D, I, V, GD, GI y GV con el reparto de la tabla de porcentajes de categorías; los porcentajes de una carga suman 100 (RN-13). Reparto por defecto: si el tipo de carga no tiene ningún porcentaje (todas sus categorías en cero), se reparte solo entre GD, GI y GV en proporciones aproximadas de 60 %, 34 % y 6 % (parámetro configurable), con un aviso y el cálculo continúa. Origen pendiente | No registrado (origen según el autor en el apartado 8.3, punto 5) | PR-01 |
| RN-20 | Conteo de estudiantes para gestión docencia | Solo cuentan los estudiantes del año; los que están solo en la cola no entran en el denominador. Un estudiante en dos carreras cuenta en cada una. Un estudiante con registros en un solo término cuenta como completo. Se quitan los que pasaron el plazo de su carrera (duración de la carrera y año de ingreso: NOVATOS y estudiantes a considerar). El cambio de carrera no está definido (pendiente) | Decisión del autor (un solo término cuenta como completo) | PR-01 |
| RN-21 | Superávit o déficit por carrera | Costo real = clases + gestión de clases + gestión docencia + costo de los cursos sin estudiantes (repartido entre las carreras de los estudiantes de los registros completos en proporción a su número) + costo de la cola sin estudiantes (rubro aparte). Esperado = estudiantes × umbral (línea base 2024). Superávit o déficit = esperado − costo real: positivo es superávit, negativo déficit; si es exactamente cero, no cuenta como superávit. El umbral es parámetro con origen pendiente de la gerencia | No registrado | PR-01 |
| RN-22 | Costo de clases de grado de cada curso | Se divide entre los estudiantes del curso y se separa en «clases» y «gestión de clases» según las horas planificadas. Horas de clases = horas por semana × porcentaje de dedicación × semanas (20 ordinario, 8 corto). Gestión de clases = resto de las horas planificadas; si da cero o negativa, se pone 0, las horas de clases son las totales y se registra un aviso. Un curso con varios profesores suma el costo de los que tienen contrato; el de un profesor sin contrato no se costea | No registrado | PR-01 |

Fórmula de la fase 3: costo por hora de una persona en un término = sueldo del término ÷ horas de ese término; costo de cada carga = sus horas × ese costo por hora.

### 12.2 Reglas de E2 (revisión y anomalías)

| ID | Condición | Comportamiento exigido | Motivo | Procesos |
|---|---|---|---|---|
| RN-04 | Registros de anomalías | Pertenecen al cálculo en curso. Al recalcular no se conservan; el analista vuelve a registrar las que sigan presentes | No registrado | PR-03 (referenciada por E1) |
| RN-23 | Revisión | Se marca por fase: el analista marca cada una de las seis fases y puede quitar la marca antes de publicar. Quitar la marca de una fase solo cambia esa fase; los registros de anomalía y las demás marcas no cambian | Se rechazó publicar siempre disponible y una sola marca global (decisión del autor) | PR-02 |
| RN-24 | Publicar | Solo cuando las seis fases están marcadas; con alguna sin marcar, no puede publicarse | No registrado | PR-02 (referenciada por E3) |
| RN-25 | Recalcular | Todas las marcas se borran y las seis fases quedan sin revisar | Conservar marcas de fases sin cambios exigiría comparar con el cálculo anterior (rechazado) | PR-02 |
| RN-26 | Cálculo detenido por una falla de control | El analista ve los tableros de las fases ya calculadas, pero no puede marcar fases ni registrar anomalías | No hay cálculo completo | PR-02, PR-03 |
| RN-27 | Marcar una fase | El producto no exige haber abierto el tablero; la responsabilidad es del analista | No registrado | PR-02 |
| RN-28 | Tablero de cada fase | Pestaña «Resumen» al inicio, «Controles» al final con el resultado de cada control, y pestañas intermedias de detalle, excepciones y alertas; los avisos aparecen con sus casos. Pestañas por fase en el apartado 13. Los de las fases 1 a 4 contienen nombres de personas; los de las fases 5 y 6, solo códigos. Solo el analista los ve | Tal como los genera hoy el proceso del autor | PR-02 |
| RN-29 | Anomalía de datos | No impide calcular ni revisar. Si se puede corregir, se corrige y se vuelve a subir el conjunto completo y no se registra. Solo si el dato de origen tiene la irregularidad y no se puede corregir, se registra | No registrado | PR-02, PR-03 |
| RN-30 | Registro de anomalía | Tiene fase, descripción, referencia al archivo o dato y fecha de registro; se asocia a una fase. Fase, descripción y referencia son obligatorias; la fecha la pone el producto. Registrar no es obligatorio antes de marcar ni de publicar. Se puede registrar en cualquier momento de la revisión, y editar y eliminar mientras no esté publicado. Duplicado: misma fase y misma referencia (texto idéntico sin distinguir mayúsculas): avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no crea; al editar, si pasa a coincidir con otro, mismo aviso y no se guarda el cambio | No registrado | PR-03 |
| RN-31 | Visibilidad de las anomalías | Las ve solo el analista; Rectorado y Decano no. La lista está en una pantalla del cálculo en curso con filtro por fase | Que las autoridades las vean es mejora futura | PR-03 (referenciada por E4) |
| RN-32 | Cálculo publicado | Las marcas y los registros de anomalía quedan solo de lectura; para cambiar algo hay que recalcular y se vuelve a empezar | No registrado | PR-02, PR-03, PR-04 |

### 12.3 Reglas de E3 (publicación)

| ID | Condición | Comportamiento exigido | Motivo | Procesos |
|---|---|---|---|---|
| RN-03 | Cálculo sin publicar | Rectorado y Decano no ven los resultados hasta que el analista los publica; un cálculo nuevo sin publicar no cambia lo que ven (siguen viendo la publicación vigente de cada año) | No registrado | PR-04 (referenciada por E1, E4) |
| RN-33 | Antes de publicar | El producto pide confirmar: «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.» | No registrado | PR-04 |
| RN-34 | Publicación existente | No se puede retirar ni despublicar; solo se sustituye publicando de nuevo ese año | Primera versión (decisión del autor) | PR-04 |
| RN-35 | Publicación nueva | No se avisa a Rectorado y Decano; la ven al entrar | Primera versión (decisión del autor) | PR-04 |
| RN-36 | Publicación | Muestra el año publicado y la fecha en que se publicó | No registrado | PR-04 (referenciada por E4) |
| RN-37 | Publicar un año | Hay una publicación vigente por año y puede haber varios años publicados a la vez. Publicar de nuevo un año sustituye la anterior de ese año; los demás años no cambian. No hay historial | Corrige una decisión previa que contradecía la elección entre años publicados (casos 5 y 6) | PR-04 |
| RN-38 | Cálculo nuevo que falla en una fase | Lo publicado no cambia; Rectorado y Decano siguen viendo lo ya publicado | No registrado | PR-04 |
| RN-39 | Contenido de la publicación | Solo los tres tableros finales; los tableros de fase no se publican | No registrado | PR-04 (referenciada por E4) |
| RN-40 | Quién y cuándo publica | Solo el analista, y solo con las seis fases revisadas | No registrado | PR-04 |

### 12.4 Reglas de E4 (consulta)

| ID | Condición | Comportamiento exigido | Motivo | Procesos |
|---|---|---|---|---|
| RN-41 | Alcance por rol | Rectorado ve todas las facultades. El Decano ve solo las carreras de su facultad (una sola); Decano y subdecano tienen el mismo rol y ven lo mismo. Sin facultad asignada no ve ninguna carrera y ve «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» | Decisión de gobernanza | PR-05, PR-06 |
| RN-42 | Qué se ve | Solo los tres tableros finales publicados; no resultados sin publicar, ni tableros de fase, ni anomalías | No registrado | PR-05, PR-06 |
| RN-43 | Año por defecto | El año calendario actual. Si no tiene nada publicado pero otros años sí, el año publicado más reciente con el aviso «Se muestra el año [año publicado] porque el año [año actual] aún no tiene resultados publicados.» Si no hay nada publicado, la etiqueta «No existen datos procesados.» Se puede elegir entre los años publicados | No registrado | PR-05, PR-06 |
| RN-44 | Fecha | Cada tablero muestra la fecha de publicación | No registrado | PR-05, PR-06 |
| RN-45 | Filtro y agrupación (solo Rectorado) | Puede elegir una o varias facultades para filtrar y ver totales agrupados por facultad (estudiantes, costo real, esperado y diferencia); sin elegir, ve todas. No aplica al Decano | El Decano ve una sola facultad | PR-05 |
| RN-46 | Descarga | Se descarga en CSV la tabla vista, con año y filtro aplicados, con las columnas de la tabla pero sin nombres ni puestos de personas ni sueldos individuales; el Decano solo su facultad. Nombre del archivo, separador y codificación pendientes | No registrado | PR-05, PR-06 |
| RN-47 | Total institucional | El Decano no ve total ni referencia institucional | Los promedios institucionales para Decanato son mejora futura | PR-06 |
| RN-48 | Cálculo nuevo sin publicar | Rectorado y Decano siguen viendo lo ya publicado | No registrado | PR-05, PR-06 |
| RN-49 | Contenido de los tres tableros finales | Ver apartado 13. En pantalla muestran nombres y puestos de personas (Gestión docencia y Costo de Clases), nunca sueldos individuales | Decisión del autor: se mantiene como hoy | PR-05, PR-06 |

### 12.5 Parámetros configurables

| Parámetro | Valor | Regla | Origen |
|---|---|---|---|
| Tolerancia de cuadres | 0,01 | RN-06 | Decisión del autor; solo comprobado con la corrida de 2026 |
| Costo por hora (umbral de aviso) | 100 | RN-12 | Pendiente de confirmar |
| Tramo de clases de grado | 270 días | RN-11 | No registrado |
| Desvío respecto de la línea base | 10 % | RN-15 | No registrado |
| Umbral de la línea base 2024 | Sin valor | RN-21, RN-15 | Pendiente de la gerencia |
| Semanas del periodo | 20 (ordinario) y 8 (corto) | RN-22 | No registrado |
| Reparto por defecto GD / GI / GV | Aproximadamente 60 % / 34 % / 6 % (valores exactos del cuaderno actual) | RN-19 | Según el autor, de un análisis previo; sin documento localizable; pendiente |

### 12.6 Controles por fase (RN-10 a RN-15)

Son los controles descritos por el autor de su proceso actual; no se añaden otros. Toda diferencia entre totales usa RN-06 (0,01).

#### RN-10 · Fase 1, contratos (sueldo de cada persona por periodo)

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | Coherencia de cada contrato (en cada grupo: global, especiales, admisiones, autoridades, nombramientos, civiles y ocasionales) | Meses o días trabajados negativos o más de 12 meses en el año; fecha de fin anterior a la de inicio; sueldo cero o negativo, o remuneración vacía o en cero; contratos duplicados (misma persona, mismo contrato y mismas fechas); ingresos totales más aporte patronal distinto del sueldo total |
| FALLA | Cuadre del sueldo por término | La suma de los sueldos de los términos de una persona no es igual a su sueldo anual (en cada grupo); la suma del archivo global no es igual a la suma de sus categorías; persona con sueldo anual sin filas por término, o al revés; término fuera de los permitidos, sueldo negativo o filas repetidas (persona, grupo y término) |
| FALLA | Contrato principal por término | Un término sin contrato principal o con más de uno; fechas del contrato fuera de la ventana de su término o días distintos de las fechas; persona con sueldo en un término sin contrato en ese término, o al revés |
| FALLA | Cuadre de personas del archivo de origen | Una persona del archivo de origen no aparece en ninguna salida y no hay motivo conocido |
| AVISO | — | Contratos clonados que se conservan; personas del archivo de origen fuera de las salidas pero con motivo conocido (por ejemplo, un tipo de personal que no se costea) |

#### RN-11 · Fase 2, cargas (horas de clases de cada persona, incluida la cola del periodo anterior)

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | A, cargas del año | Las horas de cada componente (carga horaria CTP, clases de grado, clases de postgrado) no son iguales a las de origen; persona sin identificador; término fuera de PAE, PAOI y PAOII; horas negativas; filas duplicadas exactas; clases de grado con fechas vacías o con fecha de fin anterior a la de inicio |
| AVISO | A, cargas del año | Filas del CTP sin ningún término (no generan carga); filas con cero horas; profesores con tramos de fechas que se cruzan en el mismo curso (se suman igual); clases de grado con un tramo de más de 270 días (parámetro); clases de grado con aprobado distinto de sí (se suman igual, decisión pendiente) |
| FALLA | B, cola del periodo anterior (término aparte, RN-18) | Las horas de cada componente no son iguales a las de origen multiplicadas por la fracción de días de la cola respecto del término; alguna fila no es del término de la cola o no es del año anterior; persona sin identificador u horas negativas; la fracción no está entre 0 y 1 |
| AVISO | B, cola | Filas duplicadas exactas (actividades distintas que quedan iguales en ese periodo; se conservan); personas de la cola sin sueldo en el periodo de la cola (sus horas no se pueden costear) |
| FALLA | C, sueldos y cuadre con las cargas | Personas repetidas; sueldo cero o negativo; unidad sin sigla; la suma de sueldos de salida no es igual a la de los archivos de entrada |
| AVISO | C | Identificación vacía o con formato dudoso; personas con cargas y sin sueldo (con el motivo: está en Admisiones o en Especiales y se procesa aparte, está en el personal global sin salida procesada, o no tiene contrato en ninguna parte, ver RN-17); personas con sueldo y sin cargas |

#### RN-12 · Fase 3, costo de cada carga (sueldo del término repartido entre las horas; la cola es un término aparte)

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | A, costo | El costo repartido de una persona en un término no es igual a su sueldo del término; costo de una carga vacío, infinito o negativo; carga con costo en un término donde la persona no tiene sueldo; término fuera de PAE, PAOI, PAOII y la cola; el costo de las cargas más «Sin carga» no es igual al sueldo del término; carga «Sin carga» con horas, repetida por persona y término, o con monto distinto del sueldo del término |
| FALLA | B, salida | Filas repetidas por carga; cargas de la cola que no son del año anterior, o del año anterior que no son de la cola; horas de la salida distintas de las horas de las cargas con sueldo |
| FALLA | C, cuadre del sueldo | El sueldo total no es igual al costo asignado más el sueldo sin carga; el sueldo anual de una persona no es igual a la suma de sus términos; persona con sueldo anual sin sueldo por término |
| AVISO | D, excepciones | Personas con sueldo y sin cargas, o con sueldo en un término sin horas (se asigna como «Sin carga»); cargas «Sin carga» (a gestión docencia) y «Sin carga (investigación)» (a investigación); cargas en un término sin sueldo (se les asigna cero y se marcan); cargas de personas sin sueldo y cargas de la cola de personas sin sueldo (no se costean); clases sin registros de estudiantes que se quitan antes de costear (decisión pendiente); clases de grado con relevo de profesores en el mismo curso que se costean (las horas son las de cada tramo y se suman); clases de grado con aprobado distinto de sí que se costean igual hasta confirmar la regla; personas y términos con costo por hora mayor a un umbral, parámetro con valor 100 (origen pendiente) |

#### RN-13 · Fase 4, costo por categoría (categorías D, I, V, GD, GI y GV)

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | A, costo | El costo por categoría no suma el costo de entrada de la fase 3; una carga con costo por categoría distinto del costo de entrada de la carga; costo por categoría vacío, infinito o negativo |
| FALLA | B, estructura | Cargas repetidas, cargas de entrada que no están en la salida o al revés; filas repetidas (carga y categoría); porcentajes de categoría de una carga que no suman 100; categoría distinta de D, I, V, GD, GI o GV; horas de la salida distintas de las de entrada; término distinto de PAE, PAOI, PAOII y la cola |
| FALLA | C, componente y contrato | Carga sin componente estimado; con tipo de componente sin clasificar o fuera de la lista conocida; sin unidad académica del componente; sin unidad, puesto o tipo de contrato |
| FALLA | D, carreras | Filas repetidas en la tabla de carreras (persona, término y unidad de carga); cargas sin carrera; una persona con más de una carrera en el mismo término y unidad de carga |
| AVISO | E | Personas con carrera estimada porque no están en la tabla de carreras (se deben agregar); cargas con la carrera fuera de la unidad del contrato; cargas con el reparto de categorías por defecto (RN-19; origen por confirmar); cargas con el contrato del término más cercano porque la persona no tiene contrato en el término de la carga; filas de excepción de carrera aplicadas (personas con cambio de carrera durante el año; son filas del archivo de apoyo «carrera por persona», con una columna de motivo); filas de ajustes manuales de componente (pendiente); personas que cambian de unidad entre términos sin fila de excepción de carrera; clases de grado con relevo de profesores que se costean; clases de grado con aprobado distinto de sí que se costean igual hasta confirmar la regla |

#### RN-14 · Fase 5, gestión docencia (categoría GD)

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | A, costo GD | El costo GD asignado a las carreras no es igual al costo GD total; el costo por estudiante de una carrera no es la suma de sus partes (carrera, facultad y centrales); costo por estudiante vacío, infinito o negativo |
| FALLA | B, estructura | Filas repetidas por carrera; carreras de la lista que faltan; carreras sin estudiantes; el número de estudiantes de una carrera no es el número de estudiantes del año (los que solo están en la cola no cuentan) |
| FALLA | C, componentes | Un componente que no se puede repartir (carrera fuera de la lista, facultad desconocida o tipo no reconocido); un componente con costo GD que no llega a ninguna carrera; una carga GD sin componente |
| FALLA | D, estudiantes (en el año y en la cola) | Registros sin estudiante o sin carrera; carreras de los registros que no están en la lista de carreras; estudiantes con carrera sin facultad; carreras de los registros sin duración (salvo las movilidades) |
| AVISO | E | Estudiantes quitados por haber pasado el plazo de su carrera; estudiantes quitados en una carrera y conservados en otra; cursos que quedan sin ningún estudiante tras el filtro; estudiantes con matrícula del año límite de su carrera que no están en NOVATOS (se conservan sin poder verificar su término de ingreso); estudiantes en más de una carrera (cuentan en cada una); estudiantes con registros en un solo término (cuentan como estudiante completo); carreras sin cargas GD propias (solo reciben costo de facultad y centrales); componentes centrales que no estaban en el proceso original; de la cola: estudiantes solo de la cola (no cuentan en el denominador), estudiantes de la cola quitados por plazo, cursos de la cola sin estudiantes, y estudiantes de la cola con matrícula del año límite sin ingreso conocido |

#### RN-15 · Fase 6, costo de clases y superávit o déficit por carrera

| Resultado | Bloque | Condición |
|---|---|---|
| FALLA | A, costo de clases | El costo por profesor y curso no suma el costo de las clases de grado de la fase 3; el costo de clases no queda asignado completo (estudiantes más cursos sin estudiantes más cola sin estudiantes); el costo real de las carreras no es clases más gestión docencia; costo de clases sin asignar a ninguna carrera; clases más gestión de clases no es igual al costo por estudiante y curso; costo de un estudiante vacío, infinito o negativo; el rubro de la cola sin estudiantes de la tabla del superávit no suma el de las filas de los estudiantes |
| FALLA | B, superávit y déficit | El esperado de una carrera no es estudiantes por umbral; la diferencia no es esperado menos costo real; el indicador de superávit no coincide con el signo de la diferencia |
| FALLA | C, estructura | Filas repetidas por carrera; carreras de la gestión docencia que faltan en el superávit o al revés; carreras cuyo número de estudiantes no es el de la gestión docencia; estudiantes repetidos en una carrera; registros sin costo por estudiante |
| FALLA | D, cursos y planificación | Profesores y cursos con costo que no están en la planificación; profesores y cursos planificados con horas en cero; clases más gestión de clases no es igual a las horas planificadas; cursos sin estudiantes distintos de los de la fase 5 (en el año y en la cola) |
| AVISO | E | El costo de clases de la cola sin estudiantes queda fuera de los estudiantes del año, como rubro aparte; el promedio real del año se aparta más de 10 % de la línea base (parámetro); cursos con todos los profesores sin contrato (sin costo de clases); cursos de coteaching con un profesor sin contrato (costo parcial); cursos sin planificación, posibles itinerarios (sin costo de clases); profesores sin contrato con cursos planificados; filas de planificación con gestión de clases en cero o negativa; cursos que quedaron sin estudiantes tras el filtro de estudiantes antiguos (su costo se reparte entre las carreras de sus estudiantes); de la cola: cursos sin estudiantes, profesores sin costo (sin contrato o sin sueldo en la cola) y cursos con todos los profesores sin costo, con costo parcial o sin planificación |

## 13. Datos necesarios y su significado

No se describen tablas de base de datos, tipos, formatos de intercambio ni almacenamiento. «Quién ve o modifica»: las fuentes solo registran qué ve cada actor sobre resultados; sobre los archivos de entrada solo consta que los sube el analista.

### 13.1 Datos que sube el analista (RN-08)

| Dato | Significado | Origen | Obligatoriedad | Quién lo ve o modifica |
|---|---|---|---|---|
| Año | Año del cálculo | Lo indica el analista | Obligatorio | Analista |
| Contratos del personal global y de Admisiones | Contratos del personal. Datos obligatorios: identificador de la persona, cargo, remuneración, número de contrato, tipo de vínculo, unidad, fecha de inicio, fecha de fin, fecha de desvinculación, estado, total de ingresos y aporte patronal. Admisiones agrega un tipo | Lo sube el analista | Obligatorio (sin equivalente del año anterior) | Analista |
| Historial para fondo de reserva | Datos obligatorios: persona, contrato, inicio y fin de la racha, años cumplidos y si aplica el fondo | Lo sube el analista | Obligatorio (sin equivalente del año anterior) | Analista |
| Cargas CTP (carga horaria) | Datos obligatorios: persona, términos, horas, tipo de actividad, nombre de la carga, unidad de la carga y si es una carga | Lo sube el analista | Obligatorio, y su equivalente del año anterior también | Analista |
| Planificación de clases de grado | Datos obligatorios: persona, curso, término, paralelo, horas teóricas y prácticas, total de horas, porcentaje, aprobado, fecha de inicio y fecha de fin | Lo sube el analista | Obligatorio, y su equivalente del año anterior también | Analista |
| Clases de postgrado | Datos obligatorios: persona, programa, horas, término y si es una carga | Lo sube el analista | Obligatorio, y su equivalente del año anterior también | Analista |
| Registros de estudiantes | Datos obligatorios: curso, paralelo, profesor, código de estudiante, carrera, tipo y término | Lo sube el analista | Obligatorio, y su equivalente del año anterior también | Analista |
| Equivalentes del año anterior (cuatro) | Versión del año anterior de cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes. El detalle de columnas se define en E1 para los archivos originales y no se especifica por separado para estos | Lo sube el analista | Obligatorio | Analista |
| Cinco archivos de apoyo | Carrera por persona (incluye filas de excepción con una columna de motivo), programas de postgrado, porcentajes de categorías, duración de carreras y NOVATOS de cada año | Lo sube el analista | Obligatorio; sus datos obligatorios son los de cada tabla; **detalle de columnas pendiente** | Analista |
| Ajustes manuales de componente | Archivo propio y opcional (puede estar vacío) | — | **Pendiente de decidir** si se declara opcional o se revisa el caso 1 | — |
| Lista de carreras, movilidades y componentes centrales | Hoy están dentro del proceso | — | **Pendiente de decidir** si son archivo de apoyo o parte del sistema | — |

Los grupos de personal (global, especiales, admisiones, autoridades, nombramientos, civiles y ocasionales) no son archivos: son salidas del proceso generadas a partir de los contratos global y de Admisiones.

### 13.2 Datos de resultado de cada fase (tableros de fase, RN-28)

Solo los ve el analista. Todos tienen «Resumen» al inicio y «Controles» al final.

| Fase | Pestañas |
|---|---|
| 1, contratos | Resumen, Poblaciones, Pérdida de personas, Anomalías, Fondo de reserva, Cargas, Controles |
| 2, cargas | Resumen, Cuadre de horas, Cargas sin sueldo, Sueldos sin cargas, Clases de grado, Sobrecarga, Controles |
| 3, costo de cada carga | Resumen, Detalle por término y persona, Cuadre del sueldo, Sueldo sin carga, Carga sin contrato o sin sueldo, Clases sin registros, Controles |
| 4, costo por categoría | Resumen, Costo por componente, Categorías, Reparto por defecto, Carreras, Contratos, Controles |
| 5, gestión docencia | Resumen, Costo por estudiante, Composición, Estudiantes, Cobertura de componentes, Controles |
| 6, clases y superávit o déficit | Resumen, Superávit y déficit, Cola del PAOII, Costo por estudiante, Alertas de cursos, Cursos sin estudiantes, Gestión de clases, Controles |

Las fases 1 a 4 contienen nombres de personas; las fases 5 y 6, solo códigos.

### 13.3 Datos del registro de anomalía (RN-30)

| Dato | Significado | Origen | Obligatoriedad | Quién ve o modifica |
|---|---|---|---|---|
| Fase | Una de las seis fases a la que se asocia | La elige el analista | Obligatorio | Solo el analista (ve, edita, elimina) |
| Descripción | Qué irregularidad se encontró | La escribe el analista | Obligatorio | Solo el analista |
| Referencia | Archivo o dato donde está la irregularidad | La escribe el analista | Obligatorio | Solo el analista |
| Fecha de registro | Día del registro | La pone el producto | Automático | Solo el analista la ve |

Datos de la revisión: estado de cada fase (sin revisar o revisada), conocido por el producto; lo marca y lo ve solo el analista.

### 13.4 Datos de la publicación (E3)

| Dato | Significado | Origen | Obligatoriedad | Quién ve |
|---|---|---|---|---|
| Año publicado | El del cálculo publicado | Del cálculo | Automático | Rectorado y Decano (RN-36) |
| Fecha de publicación | Día en que se publicó (formato, hora y a quién se muestra: pendiente) | La conoce el producto | Automático | Rectorado y Decano ven la fecha en cada tablero (RN-44) |
| Los tres tableros finales | Superávit / Déficit, Costo de Clases y Gestión docencia | Del cálculo | Automático | Rectorado y Decano |

El analista no introduce datos: solo confirma. Hay una publicación vigente por año.

### 13.5 Datos de los tableros finales (RN-49, RN-45)

| Tablero | Pestañas y datos |
|---|---|
| Superávit / Déficit | «Resultado por carrera»: por carrera, esperado (estudiantes por la línea base), costo real (clases más gestión docencia más cursos sin estudiantes más cola sin estudiantes), diferencia, de dónde sale cada rubro, y un gráfico de esperado contra real. «Cuadre y metodología»: de dónde sale cada número, cuadre contra las fuentes y reglas aplicadas |
| Costo de Clases | «Costo de materias» (por materia y paralelo, con sus profesores y sin sueldos individuales), «Costo por estudiante» y «Costo promedio por carrera» |
| Gestión docencia | «Resumen general», «Por carrera», «Detalle de cargas GD» y «Drill-down de carrera» (de dónde viene cada dólar de gestión docencia, por componente, carrera, carga y persona) |

Los tres tableros se enlazan entre sí. Se muestran en pantalla nombres y puestos de personas (Gestión docencia y Costo de Clases), nunca sueldos individuales. Totales agrupados por facultad (solo Rectorado): estudiantes, costo real, esperado y diferencia.

### 13.6 Datos que conoce o elige el usuario en la consulta

| Dato | Origen | Quién |
|---|---|---|
| Años publicados, año calendario actual, facultad asignada a cada Decano | Los conoce el producto | — |
| Año elegido | Lo elige el usuario | Rectorado y Decano (respuesta temporal de la pantalla) |
| Facultades del filtro | Las elige el usuario | Solo Rectorado (respuesta temporal) |
| Columnas del CSV | Las de la tabla vista, sin nombres, puestos ni sueldos individuales | Rectorado y Decano descargan |

## 14. Validaciones, permisos y restricciones

Los mensajes **fijados** son textos confirmados por el autor. Los **PROPUESTOS** (MS-01 a MS-03) están pendientes de confirmación. Un «—» en mensaje significa que no hay texto exacto decidido.

### 14.1 Analista

| Acción | Condiciones y validaciones | Respuesta ante datos ausentes, inválidos o acción no permitida | Mensaje | ¿Se puede corregir o reintentar? |
|---|---|---|---|---|
| Subir el conjunto del año | Año indicado; todos los archivos y datos obligatorios (RN-08); conjunto completo (RN-01) | No se calcula nada y se indica qué falta (RN-07, CA-08) | MS-01 archivo faltante y MS-02 dato faltante (PROPUESTOS, apartado 14.4) | Sí: subir el conjunto completo |
| Cálculo | Controles de las seis fases (RN-10 a RN-15, tolerancia RN-06) | Una falla detiene el cálculo en esa fase; un aviso continúa | MS-03 control fallido (PROPUESTO) | Sí: corregir y subir el conjunto completo |
| Ver tableros de fase | Cálculo completado o detenido (en este caso solo las fases calculadas) | — | — | — |
| Marcar o quitar la marca de una fase | Cálculo completo y no publicado (RN-26, RN-32); no exige haber abierto el tablero (RN-27) | Con el cálculo detenido o publicado no puede | — | Sí, antes de publicar |
| Registrar una anomalía | Fase, descripción y referencia obligatorias (RN-30); cálculo completo y no publicado; no es una anomalía corregible (RN-29) | Sin un dato obligatorio: no guarda y pide completarlo. Duplicado: no crea | Duplicado (fijado): «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.»; dato obligatorio: sin texto exacto | Sí: completar o cambiar |
| Editar o eliminar un registro | Cálculo no publicado (RN-30, RN-32); al editar, no debe coincidir con otro | Si coincide: no guarda el cambio | Mismo aviso de duplicado | Sí |
| Publicar | Seis fases revisadas (RN-24, RN-40); confirmación (RN-33) | Con fases sin revisar: no publica e indica cuál falta (EJ-15). Si no confirma: no publica | Confirmación (fijado): «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.»; falta revisar una fase: sin texto exacto | Sí: revisar y reintentar |
| Retirar o despublicar | No existe (RN-34) | No se ofrece | — | Solo se sustituye publicando de nuevo ese año |

Solo el analista ve los tableros de fase y las anomalías (RN-28, RN-31). Un usuario que no es el analista no puede publicar (CA-47).

### 14.2 Rectorado

| Acción | Condiciones | Respuesta ante lo ausente o no permitido | Mensaje |
|---|---|---|---|
| Consultar los tres tableros finales de todas las carreras | Hay algo publicado | Sin nada publicado: etiqueta | «No existen datos procesados.» |
| Año por defecto y elección | Año calendario actual; elegir entre años publicados (RN-43) | Año actual sin publicar con otros años publicados: año más reciente con aviso | «Se muestra el año [año publicado] porque el año [año actual] aún no tiene resultados publicados.» |
| Filtrar y agrupar por facultad | Una o varias facultades; sin elegir, todas (RN-45) | — | — |
| Descargar CSV | Tabla vista con año y filtro; sin nombres, puestos ni sueldos individuales (RN-46) | — | — |

No ve resultados sin publicar, tableros de fase ni anomalías (RN-42). No modifica nada. Puede reintentar la consulta o cambiar de año.

### 14.3 Decano (y subdecano, mismo rol)

| Acción | Condiciones | Respuesta ante lo ausente o no permitido | Mensaje |
|---|---|---|---|
| Consultar los tres tableros finales de su facultad | Facultad asignada (RN-41); algo publicado | Sin facultad asignada: no ve ninguna carrera. Sin nada publicado: etiqueta | «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» y «No existen datos procesados.» |
| Año por defecto y elección | Igual que Rectorado, solo su facultad (RN-43) | Igual que Rectorado | Mismo aviso del año por defecto |
| Descargar CSV | Solo las carreras de su facultad (RN-46) | — | — |

No ve carreras de otras facultades, resultados sin publicar, tableros de fase, anomalías, ni total institucional (RN-47). No filtra ni agrupa por facultad. No modifica nada. Ocultar una opción no define el permiso: el alcance se define por RN-41.

### 14.4 Mensajes propuestos (PROPUESTOS, pendientes de confirmación del autor)

- **MS-01 · Archivo faltante (error de archivo).** «Falta el archivo "nombre del archivo" (por ejemplo, "Cargas CTP del año anterior"). No se calculó nada. Súbelo junto con los demás archivos del año y vuelve a cargar el conjunto completo.»
- **MS-02 · Dato obligatorio faltante (error de archivo).** «En el archivo "nombre del archivo" falta el dato "nombre del dato" (por ejemplo, "fecha de inicio" en "Contratos del personal global"). No se calculó nada. Corrige el archivo y vuelve a cargar el conjunto completo.»
- **MS-03 · Control fallido (falla de control).** «El cálculo se detuvo en la fase N ("nombre de la fase"). Falló el control "descripción del control": detalle de lo que no cuadra. Las fases siguientes no se calcularon. Puedes ver los tableros de las fases anteriores para buscar el origen. Corrige el archivo y vuelve a cargar el conjunto completo.» Ejemplo con EJ-02: «El cálculo se detuvo en la fase 3 ("costo de cada carga"). Falló el control "el costo repartido de una persona no es igual a su sueldo del término": la persona A suma 2.999,98 y su sueldo del término es 3.000,00 (diferencia 0,02; se acepta hasta 0,01). Las fases 4, 5 y 6 no se calcularon.»

En los tres casos se puede corregir y reintentar subiendo el conjunto completo.

## 15. Estados y cambios permitidos

### 15.1 Estados del producto

**Fase en la revisión (E2).** Dos estados por fase: sin revisar y revisada.

| Desde | Hacia | Quién y condición |
|---|---|---|
| (inicial) | sin revisar | Al completarse el cálculo o al recalcular |
| sin revisar | revisada | El analista marca; cálculo completo y no publicado (RN-26, RN-32) |
| revisada | sin revisar | El analista quita la marca antes de publicar; solo cambia esa fase (RN-23) |
| cualquiera | sin revisar | Al recalcular, todas las fases (RN-25) |
| cualquiera | (solo lectura) | Tras publicar, ya no se puede cambiar (RN-32) |

El cálculo está **listo para publicarse** cuando las seis fases están revisadas (RN-24); si se quita una marca, deja de estarlo.

**Cálculo de un año respecto de la publicación (E3).**

| Desde | Hacia | Quién y condición |
|---|---|---|
| sin publicar | publicado | El analista; seis fases revisadas y confirmación (RN-24, RN-33). Es la publicación vigente de ese año, sustituye a la anterior de ese año, no cambia los demás años y deja el cálculo en solo lectura (RN-37, RN-32) |
| publicado | (sin retirada) | No se puede retirar; solo se sustituye publicando de nuevo ese año (RN-34) |
| publicado o no | cálculo nuevo sin publicar | Un cálculo nuevo reemplaza al del año (RN-02), empieza sin publicar y con las seis fases sin revisar (RN-25); la publicación vigente no cambia hasta publicar de nuevo |

**Lo que ven Rectorado y Decano (E3, E4).** Nada publicado (etiqueta); año calendario actual sin publicar con otros años publicados (año más reciente con aviso); o una o varias publicaciones vigentes (una por año). Es consecuencia del estado de publicación, no un estado propio.

Los registros de anomalía no tienen ciclo de estados propio: se registran, editan o eliminan hasta publicar, y desaparecen al recalcular (RN-04).

### 15.2 Estados frente a respuestas temporales

Son **respuestas temporales** de una ejecución o de la pantalla, no estados del producto: el resultado de una carga (cálculo completo, cálculo detenido por una falla, error de archivo); el año elegido y el filtro de facultades en la consulta; el aviso de duplicado; el mensaje de confirmación de publicación.

### 15.3 Procesos sin ciclo de estados propio

- **E1 (carga y cálculo).** Las especificaciones no definen un ciclo de estados para la carga. Cada subida produce un resultado (cálculo completo, detenido por una falla de control o error de archivo) y lo que persiste y cambia con el tiempo (revisión, publicación) pertenece a E2 y E3. «Cálculo detenido» solo funciona como condición (RN-26, RN-38). *Esta justificación es una lectura de este documento a partir de las especificaciones, no una regla escrita en E1.*
- **E4 (consulta).** Declarado en E4: la consulta es de solo lectura y no tiene ciclo de estados propio; lo que se ve depende del estado de la publicación (E3).

## 16. Cálculos y ejemplos

Moneda y redondeo: los importes se manejan en dólares con 2 decimales. Las especificaciones no fijan un método de redondeo distinto de esa precisión: **método de redondeo no registrado**. Los ejemplos son **ilustrativos**: valores inventados solo para ilustrar la regla (por ejemplo, el umbral 2.000,00 de EJ-05), no datos reales.

### 16.1 Tolerancia de cuadres (RN-06)
- **Entradas:** dos totales que deben ser iguales (por ejemplo, la suma de los términos y el sueldo anual).
- **Regla:** diferencia = |total esperado − total obtenido|. Si es menor o igual que 0,01, cuadra; si es mayor, el control falla y el cálculo se detiene en esa fase.
- **Unidades y límites:** dólares; 2 decimales; 0,01 configurable. **Ejemplos del autor** (sueldo anual de la persona A: 10.000,00):

| Caso | PAE | PAOI | PAOII | Suma | Diferencia | Resultado |
|---|---|---|---|---|---|---|
| Válido | 2.000,00 | 4.000,00 | 4.000,00 | 10.000,00 | 0,00 | Cuadra |
| Inválido | 1.999,98 | 4.000,00 | 4.000,00 | 9.999,98 | 0,02 | Falla; se detiene en la fase 1 y el analista ve en el tablero el control que falló |
| Borde | 1.999,99 | 4.000,00 | 4.000,00 | 9.999,99 | 0,01 | Se acepta (dentro de la tolerancia) |

Ver también EJ-02 y EJ-03.

### 16.2 Costo por hora y costo de cada carga (fase 3, RN-12)
- **Entradas:** sueldo del término (dólares), horas del término.
- **Regla:** costo por hora = sueldo del término ÷ horas del término; costo de cada carga = sus horas × ese costo por hora; la suma de los costos debe igualar el sueldo del término (tolerancia 0,01).
- **EJ-01 (válido):** sueldo 3.000,00 y 100 horas en PAOI: costo por hora 30,00. Cargas de 60 h (1.800,00) y 40 h (1.200,00): suma 3.000,00, cuadra.
- **EJ-02 (inválido):** el costo asignado suma 2.999,98 en vez de 3.000,00: diferencia 0,02 mayor que 0,01, falla; se detiene en la fase 3 y no se ejecutan las fases 4, 5 y 6; el analista ve los tableros de las fases 1 a 3.
- **EJ-03 (límite):** si la diferencia fuera exactamente 0,01, el control no falla.
- **EJ-04 (RN-16):** persona B, PAOII, sueldo 2.500,00 y ninguna hora: se crea la carga «Sin carga» con cero horas y costo 2.500,00; el cálculo continúa con un aviso.
- **Aviso:** costo por hora mayor que el umbral 100 (parámetro).

### 16.3 Cola del periodo anterior (RN-18)
- **Entradas:** días de la cola, días del término, horas de origen.
- **Regla:** fracción = días de la cola ÷ días del término, entre 0 y 1; horas de la cola = horas de origen × fracción.
- **EJ-07:** término de 100 días y cola de 40: fracción 0,4; 100 horas de origen entran como 40 horas (100 × 0,4 = 40,00); cuadra con el control de la fase 2. *Inválido:* fracción 1,2, fuera de 0 a 1, el control falla; se detiene en la fase 2.

### 16.4 Reparto por categorías (RN-19)
- **Entradas:** costo de la carga; porcentajes de la tabla (D, I, V, GD, GI, GV); suman 100.
- **Regla:** costo de categoría = costo × porcentaje ÷ 100. Sin ningún porcentaje: reparto por defecto GD, GI y GV con 60 / 34 / 6 aproximadamente (parámetro) y aviso.
- **EJ-08:** costo 1.000,00 con D = 60, I = 30, V = 10: D 600,00, I 300,00, V 100,00; suma 1.000,00; cuadra. *Inválido:* D = 60, I = 30, V = 5 suman 95: falla; se detiene en la fase 4. *Por defecto:* 1.000,00 queda en GD 600,00, GI 340,00 y GV 60,00 con un aviso; continúa.

### 16.5 Conteo de estudiantes (RN-20)
- **Entradas:** registros de estudiantes del año y de la cola, duración de la carrera, año de ingreso.
- **Regla:** cuenta cada estudiante del año una vez por carrera donde tenga registros; los que solo están en la cola no entran; quien tiene registros en un solo término cuenta completo; se quitan los que pasaron el plazo de su carrera.
- **EJ-06:** el estudiante 1 (Carreras 01 y 02) cuenta en cada una; el 2, solo en la cola, no cuenta en el denominador; el 3, con registros en un solo término, cuenta completo.
- *Unidad:* número de estudiantes (entero). El cambio de carrera no está definido.

### 16.6 Horas de clases y gestión de clases (RN-22)
- **Entradas:** horas por semana, porcentaje de dedicación, semanas (20 o 8), horas planificadas, costo del curso, estudiantes del curso.
- **Regla:** horas de clases = horas por semana × porcentaje × semanas; gestión de clases = horas planificadas − horas de clases (si ≤ 0, se pone 0, las horas de clases son las totales y hay aviso); costo por estudiante = costo del curso ÷ estudiantes.
- **EJ-09:** 4 × 0,5 × 20 = 40 horas de clases; 60 − 40 = 20 horas de gestión de clases; costo 6.000,00 ÷ 20 estudiantes = 300,00 por estudiante. *Límite:* horas planificadas 30: 30 − 40 = −10, se pone 0, horas de clases 30, aviso. *Periodo corto:* 8 semanas.

### 16.7 Esperado y superávit o déficit (RN-21)
- **Entradas:** estudiantes de la carrera, umbral (línea base 2024; pendiente), clases, gestión de clases, gestión docencia, costo de cursos sin estudiantes, costo de la cola sin estudiantes.
- **Regla:** esperado = estudiantes × umbral; costo real = suma de los rubros; diferencia = esperado − costo real; positiva: superávit; negativa: déficit; exactamente cero: no cuenta como superávit.
- **EJ-05** (Carrera 01, 100 estudiantes, umbral 2.000,00, valor inventado; esperado 200.000,00; cursos sin estudiantes y cola en 0,00):

| Caso | Clases | Gestión de clases | Gestión docencia | Costo real | Diferencia | Resultado |
|---|---|---|---|---|---|---|
| Superávit | 100.000,00 | 20.000,00 | 50.000,00 | 170.000,00 | +30.000,00 | Superávit |
| Déficit | 130.000,00 | 30.000,00 | 50.000,00 | 210.000,00 | −10.000,00 | No cuenta como superávit |
| Límite | 120.000,00 | 30.000,00 | 50.000,00 | 200.000,00 | 0,00 | No cuenta como superávit |

## 17. Alternativas, errores y recuperación

Solo escenarios dentro del alcance. «Recuperación» indica cómo continuar.

| Escenario | Qué ve el usuario | Qué cambia o permanece | Cómo continuar | Fuente |
|---|---|---|---|---|
| Falta un archivo o dato obligatorio (error de archivo) | Mensaje que indica qué archivo o dato falta (MS-01 y MS-02 propuestos) | No se calcula nada; permanece lo publicado | Corregir y subir el conjunto completo | RN-07, RN-08, CA-02 |
| Intento de subir solo una parte del conjunto | Se indica qué falta | No se calcula nada | Subir el conjunto completo | RN-01, CA-08 |
| Falla de control en una fase | El control que falló (MS-03 propuesto); tableros de las fases ya calculadas | Cálculo detenido; no se ejecutan las fases siguientes; no se puede marcar ni registrar anomalías; lo publicado no cambia | Corregir y subir el conjunto completo | RN-05, RN-26, RN-38, CA-03, CA-18, CA-41 |
| Control con aviso | El aviso en el tablero | El cálculo continúa | El analista revisa el aviso | RN-05, CA-04 |
| Anomalía de datos procesable | La ve en el tablero | Se calcula igual | Revisar; corregir y resubir si es corregible, registrar si no | RN-29, CA-05, CA-21 |
| Anomalía corregible | — | No se registra | Corregir y subir el conjunto completo; se recalcula todo y se borran las marcas | RN-29, CA-22, CA-29 |
| Persona con cargas y sin contrato | Aviso con el motivo | Su costo no se asigna; el cálculo continúa | Revisar el aviso (regla pendiente de contrastar con la jefa del autor) | RN-17, CA-11 |
| Datos incompletos en un registro de anomalía | Se le pide completar el dato que falta (sin texto exacto decidido) | No se guarda | Completar y registrar de nuevo | RN-30, CA-30, EJ-13 |
| Operación repetida: registro duplicado | «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» | No se crea (o no se guarda la edición) | Cambiar fase o referencia, o no registrar | RN-30, CA-25, CA-32, EJ-12 |
| Operación repetida: publicar de nuevo un año | Confirmación habitual | Solo se sustituye la publicación de ese año; los demás años no cambian | — | RN-37, CA-39, CA-48, EJ-16 |
| Operación repetida: recalcular | — | Se borran todas las marcas y los registros de anomalía; la publicación vigente no cambia hasta publicar de nuevo | Revisar de nuevo las seis fases y volver a registrar las anomalías que sigan | RN-25, RN-04, CA-17, CA-28 |
| Cancelación al revisar | — | Si el analista sale sin marcar, no cambia ninguna marca | Retomar la revisión | PR-02 |
| Cancelación al publicar (no confirma) | — | No se publica y nada cambia | Volver a intentar | RN-33, CA-38, EJ-16 |
| Publicar con fases sin revisar | Se indica que falta revisar la fase (texto exacto pendiente) | No se publica; Rectorado y Decano no ven nada nuevo | Revisar la fase y reintentar | RN-24, CA-35, EJ-15 |
| Publicar con el cálculo detenido | No hay cálculo completo que publicar | Sin cambios | Corregir y recalcular | RN-26, PR-04 |
| Usuario que no es el analista intenta publicar | No puede | Sin cambios | — | RN-40, CA-47 |
| Cambiar algo tras publicar | Marcas y registros de solo lectura | Nada cambia | Recalcular; se vuelve a empezar | RN-32, CA-31, CA-46 |
| Intento de retirar una publicación | No se ofrece | La publicación vigente permanece | Publicar de nuevo ese año | RN-34, CA-43 |
| Publicación que no puede completarse por otra causa | No decidido | No decidido | **Pendiente** | Pendiente 13 (apartado 8.3) |
| Resultados vacíos: nada publicado | «No existen datos procesados.» | Sin cambios | Esperar a que el analista publique | RN-43, CA-59, EJ-22 |
| Año calendario actual sin publicar, otros años sí | Año publicado más reciente con aviso | Sin cambios | Elegir otro año publicado si lo desea | RN-43, CA-58, EJ-21 |
| Decano sin facultad asignada | No ve ninguna carrera; mensaje «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» | Sin cambios | Fuera de alcance: cómo se asigna la facultad es una decisión posterior | RN-41, CA-53, EJ-23 |
| Cálculo nuevo en curso o que falla, con publicación vigente | Lo ya publicado | Lo publicado no cambia | — | RN-03, RN-38, RN-48, CA-40, CA-41, CA-55, EJ-17 |
| Control por porcentajes que no suman 100 o fracción fuera de 0 a 1 | Falla del control en la fase 4 o 2 | Cálculo detenido | Corregir y subir el conjunto completo | RN-18, RN-19, EJ-07, EJ-08 |

## 18. Criterios de aceptación y ejemplos comprobables

Los criterios describen **comportamiento esperado**. **No se ejecutaron pruebas** porque las funcionalidades no existen; nada se afirma como comprobado. Los ejemplos EJ-01 a EJ-23 son ilustrativos (valores inventados para el ejemplo). Se agrupan por proceso. Formato: Dado (condición inicial) · Cuando (acción) · Entonces (resultado esperado); «—» cuando el criterio no expresa una acción explícita.

### 18.1 PR-01 · Carga y cálculo (E1)

| ID | Proceso; reglas | Dado | Cuando | Entonces | Ejemplos |
|---|---|---|---|---|---|
| CA-01 | PR-01; RN-05, RN-10 a RN-15 | Un conjunto completo de archivos del año | El analista indica el año y lo sube | Se ejecutan las seis fases en secuencia y quedan disponibles los resultados y el tablero de cada fase | EJ-01 |
| CA-02 | PR-01; RN-07, RN-08 | Un conjunto al que le falta un archivo o dato obligatorio | El analista lo sube | No se calcula nada y se indica qué archivo o dato falta (MS-01, MS-02) | — |
| CA-03 | PR-01; RN-05, RN-07 | Un control de una fase falla | — | El cálculo se detiene en esa fase, se indica qué control falló (MS-03), no se ejecutan las siguientes y el analista puede ver los tableros de las fases ya calculadas | EJ-02 |
| CA-04 | PR-01; RN-05 | Un control con resultado aviso | — | El cálculo continúa con las fases siguientes y el analista puede revisar el aviso | — |
| CA-05 | PR-01; RN-04 | Un conjunto con anomalías de datos procesables | — | Se calcula igualmente y las anomalías quedan para revisión | — |
| CA-06 | PR-01; RN-02, RN-03 | Un año con cálculo previo | El analista sube un conjunto nuevo | El nuevo reemplaza al anterior; Rectorado y Decano siguen viendo lo último publicado | — |
| CA-07 | PR-01; RN-03 | Un cálculo recién completado o recalculado | — | Rectorado y Decano no lo ven hasta que se publique | — |
| CA-08 | PR-01; RN-01 | Un intento de subir solo una parte del conjunto | — | No se calcula nada y se indica qué falta | — |
| CA-09 | PR-01; RN-06 | Un cuadre con diferencia de 0,01 o menos, o mayor | — | Con 0,01 o menos el control no falla por esa diferencia; si es mayor que 0,01, falla | EJ-02, EJ-03 |
| CA-10 | PR-01; RN-12, RN-16 | Una persona con sueldo en un término y sin horas | — | Se crea la carga «Sin carga» con cero horas y el sueldo completo del término; el cálculo continúa con un aviso | EJ-04 |
| CA-11 | PR-01; RN-11, RN-17 | Una persona con cargas y sin contrato | — | Su costo no se asigna, se muestra el motivo como aviso y el cálculo continúa | — |
| CA-12 | PR-01; RN-21 | Una carrera con diferencia entre esperado y costo real exactamente cero, positiva o negativa | — | Cero: no cuenta como superávit. Positiva: superávit. Negativa: déficit | EJ-05 |

### 18.2 PR-02 y PR-03 · Revisión y anomalías (E2)

| ID | Proceso; reglas | Dado | Cuando | Entonces | Ejemplos |
|---|---|---|---|---|---|
| CA-13 | PR-02; RN-23 | Un cálculo completado | El analista abre el tablero de una fase | Puede revisarlo y marcar esa fase como revisada | — |
| CA-14 | PR-02; RN-24 | Un cálculo con las seis fases marcadas | — | Puede publicarse | EJ-10 |
| CA-15 | PR-02; RN-24 | Un cálculo con alguna fase sin marcar | — | No puede publicarse | EJ-10 |
| CA-16 | PR-02; RN-23 | Una fase marcada y un cálculo sin publicar | El analista quita la marca | La fase queda sin revisar; las demás marcas y los registros no cambian; el cálculo deja de estar listo para publicarse | EJ-10 |
| CA-17 | PR-02; RN-25 | Un cálculo que se recalcula | — | Todas las marcas se borran y las seis fases quedan sin revisar | EJ-10 |
| CA-18 | PR-02, PR-03; RN-26 | Un cálculo detenido por una falla de control | — | El analista ve los tableros de las fases ya calculadas y no puede marcar fases ni registrar anomalías | — |
| CA-19 | PR-02; RN-27 | Un tablero que el analista no abrió | Marca la fase como revisada | El producto lo permite | — |
| CA-20 | PR-02; RN-28 | El tablero de una fase | — | Muestra los resultados de los controles (ok, aviso, falla), los avisos con sus casos y los resultados principales | — |
| CA-21 | PR-02; RN-29 | Una anomalía de datos procesable | — | El cálculo ya se completó y la revisión puede realizarse | — |
| CA-22 | PR-02; RN-29, RN-01, RN-02 | Una anomalía corregible | El analista sube de nuevo el conjunto completo | Se recalcula todo, se borran las marcas y debe revisar de nuevo | — |
| CA-23 | PR-03; RN-30 | Una anomalía no corregible | El analista la registra con fase, descripción y referencia | El registro queda guardado con la fecha puesta por el producto, visible para el analista y asociado a esa fase | EJ-11 |
| CA-24 | PR-03; RN-30 | Una anomalía registrada y un cálculo sin publicar | El analista la edita o la elimina | El cambio se aplica a la lista | — |
| CA-25 | PR-03; RN-30 | Un registro con la misma fase y la misma referencia (texto idéntico sin distinguir mayúsculas) que uno existente | El analista intenta registrarlo | Se avisa «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» y no se crea | EJ-12 |
| CA-26 | PR-03; RN-30 | Un cálculo con fases sin revisar y sin anomalías registradas | — | El analista puede registrar anomalías en cualquier momento y puede marcar fases y publicar sin haber registrado ninguna | — |
| CA-27 | PR-03; RN-31 | Un registro de anomalía | — | Rectorado y Decano no lo ven; el analista lo ve en la lista del cálculo en curso, filtrable por fase | — |
| CA-28 | PR-03; RN-04 | Un cálculo que se recalcula | — | Los registros anteriores no se conservan; el analista debe volver a registrar los que sigan presentes | — |
| CA-29 | PR-03; RN-29 | Una anomalía corregible | — | No se registra: se corrige y se vuelve a subir el conjunto | — |
| CA-30 | PR-03; RN-30 | Un intento de registrar sin fase, descripción o referencia | — | No se guarda y se pide completar el dato que falta | EJ-13 |
| CA-31 | PR-02, PR-03; RN-32 | Un cálculo publicado | — | Marcas y registros solo se pueden leer; para cambiar algo hay que recalcular y se vuelve a empezar con las seis fases sin revisar | — |
| CA-32 | PR-03; RN-30 | Un registro existente y otro distinto | El analista edita uno hasta que coincida con el otro | Se avisa con el mismo mensaje de duplicado y no se guarda el cambio | — |
| CA-33 | PR-02; RN-28 | El tablero de cualquiera de las seis fases | — | Tiene «Resumen» al inicio, «Controles» al final y pestañas intermedias; solo el analista ve los tableros de fase | — |

### 18.3 PR-04 · Publicación (E3)

| ID | Proceso; reglas | Dado | Cuando | Entonces | Ejemplos |
|---|---|---|---|---|---|
| CA-34 | PR-04; RN-24, RN-40 | Un cálculo con las seis fases revisadas | El analista publica y confirma | Rectorado y Decano pasan a ver los tres tableros finales de ese año | EJ-14 |
| CA-35 | PR-04; RN-24 | Un cálculo con alguna fase sin revisar | — | No se puede publicar | EJ-15 |
| CA-36 | PR-04; RN-03 | Un cálculo sin publicar | — | Rectorado y Decano no ven sus resultados | — |
| CA-37 | PR-04; RN-33 | El analista decide publicar | — | El producto pide confirmar con el mensaje de RN-33 y no publica hasta que confirma | EJ-14 |
| CA-38 | PR-04; RN-33 | El mensaje de confirmación | El analista no confirma | No se publica y nada cambia | EJ-16 |
| CA-39 | PR-04; RN-37 | Una publicación nueva de un año que ya tiene publicación vigente | — | Sustituye a la anterior de ese mismo año, es la única vigente de ese año y no hay historial | EJ-16 |
| CA-40 | PR-04; RN-03 | Un cálculo nuevo sin publicar | — | Rectorado y Decano siguen viendo lo ya publicado | — |
| CA-41 | PR-04; RN-38 | Un cálculo nuevo que falla en una fase | — | Lo publicado no cambia | EJ-17 |
| CA-42 | PR-04; RN-39 | Una publicación | — | Rectorado y Decano ven los tres tableros finales y no los tableros de las fases | EJ-14 |
| CA-43 | PR-04; RN-34 | Una publicación vigente | — | El producto no ofrece retirarla ni despublicarla; solo se sustituye publicando de nuevo ese año | — |
| CA-44 | PR-04; RN-35 | Una publicación nueva | — | Rectorado y Decano no reciben aviso y la ven al entrar | — |
| CA-45 | PR-04; RN-36 | Una publicación | — | Muestra el año publicado y la fecha en que se publicó | EJ-14 |
| CA-46 | PR-04; RN-32 | Un cálculo publicado | — | Marcas y registros solo se pueden leer; para cambiar algo hay que recalcular | — |
| CA-47 | PR-04; RN-40 | Un usuario que no es el analista | — | No puede publicar | — |
| CA-48 | PR-04; RN-37 | Dos años ya publicados | El analista publica de nuevo uno | Solo se sustituye la publicación de ese año; la del otro no cambia y ambos siguen publicados | EJ-16 |

### 18.4 PR-05 y PR-06 · Consulta (E4)

| ID | Proceso; reglas | Dado | Cuando | Entonces | Ejemplos |
|---|---|---|---|---|---|
| CA-49 | PR-05; RN-41, RN-42 | Una publicación | Rectorado consulta | Ve los tres tableros finales de todas las carreras | EJ-18 |
| CA-50 | PR-06; RN-41, RN-42 | Una publicación | El Decano consulta | Ve los tres tableros finales solo de las carreras de su facultad | EJ-20 |
| CA-51 | PR-06; RN-41 | Un Decano de la facultad A | — | No ve carreras de la facultad B | EJ-20 |
| CA-52 | PR-06; RN-41 | El Decano y el subdecano de una misma facultad, con el mismo rol | — | Ven exactamente lo mismo | EJ-20 |
| CA-53 | PR-06; RN-41 | Un Decano sin facultad asignada | Consulta | No ve ninguna carrera y ve «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» | EJ-23 |
| CA-54 | PR-05, PR-06; RN-42, RN-03 | Un cálculo sin publicar | — | Rectorado y Decano no lo ven | — |
| CA-55 | PR-05, PR-06; RN-48 | Un cálculo nuevo en curso | — | Siguen viendo lo ya publicado | — |
| CA-56 | PR-05, PR-06; RN-42 | Anomalías registradas; una publicación | — | No ven las anomalías ni los tableros de las fases | EJ-20 |
| CA-57 | PR-05, PR-06; RN-43 | Uno o más años publicados, incluido el año calendario actual | Consultan | Ven por defecto el año calendario actual y pueden elegir entre los años publicados | EJ-18 |
| CA-58 | PR-05, PR-06; RN-43 | El año calendario actual sin nada publicado y otros años sí | Consultan | Ven por defecto el año publicado más reciente con el aviso «Se muestra el año [año publicado] porque el año [año actual] aún no tiene resultados publicados.» | EJ-21 |
| CA-59 | PR-05, PR-06; RN-43 | Nada publicado | Consultan | Ven «No existen datos procesados.» | EJ-22 |
| CA-60 | PR-05, PR-06; RN-44 | Una publicación | Ven un tablero | El tablero muestra la fecha de publicación | EJ-18 |
| CA-61 | PR-05; RN-45 | Tableros finales publicados | Rectorado elige una o varias facultades, o ninguna | Con facultades: tableros filtrados y totales agrupados por facultad (estudiantes, costo real, esperado y diferencia); con ninguna: todas las carreras | EJ-19 |
| CA-62 | PR-05, PR-06; RN-46 | Tableros finales publicados | Descargan | Obtienen un CSV con las columnas de la tabla, año y filtro aplicados, sin nombres ni puestos ni sueldos individuales | EJ-19 |
| CA-63 | PR-06; RN-46 | Un Decano | Descarga | Lo obtenido incluye solo las carreras de su facultad | — |
| CA-64 | PR-06; RN-47 | Un Decano | — | No ve total ni referencia institucional para comparar | — |
| CA-65 | PR-05, PR-06; RN-49 | Cada uno de los tres tableros finales | — | Tiene las pestañas de RN-49 y se enlaza con los otros dos | — |
| CA-66 | PR-05, PR-06; RN-49 | Los tableros de Gestión docencia y de Costo de Clases | — | Muestran en pantalla nombres y puestos de las personas y nunca sueldos individuales | — |
| CA-67 | PR-05; RN-45 | Rectorado que no elige ninguna facultad; un Decano | — | Rectorado ve todas las carreras; el Decano no tiene filtro ni agrupación por facultad | — |

### 18.5 Ejemplos ilustrativos

| ID | Reglas | Resumen | Criterios |
|---|---|---|---|
| EJ-01 | RN-12 | Costo por carga que cuadra (apartado 16.2) | CA-01 |
| EJ-02 | RN-12, RN-06 | Diferencia 0,02: falla y se detiene en la fase 3 | CA-03, CA-09 |
| EJ-03 | RN-06 | Diferencia exactamente 0,01: no falla | CA-09 |
| EJ-04 | RN-16 | «Sin carga» con cero horas y sueldo completo | CA-10 |
| EJ-05 | RN-21 | Superávit, déficit y límite cero (apartado 16.7) | CA-12 |
| EJ-06 | RN-20 | Conteo de tres estudiantes | — |
| EJ-07 | RN-18 | Cola con fracción 0,4; inválido con fracción 1,2 | — |
| EJ-08 | RN-19 | Reparto por categorías: válido, inválido y por defecto | — |
| EJ-09 | RN-22 | Horas de clases y gestión de clases; límite y periodo corto | — |
| EJ-10 | RN-23, RN-24, RN-25 | Marcar fases, quitar la marca de la fase 3 y recalcular | CA-14 a CA-17 |
| EJ-11 | RN-30 | Registro válido (fase 2, «Horas sin término en el archivo de cargas») | CA-23 |
| EJ-12 | RN-30 | Intento de registro duplicado | CA-25 |
| EJ-13 | RN-30 | Registro sin descripción | CA-30 |
| EJ-14 | RN-24, RN-33, RN-36, RN-39 | Publicación válida del 2026 | CA-34, CA-37, CA-42, CA-45 |
| EJ-15 | RN-24 | Fase 4 sin revisar: no se publica | CA-35 |
| EJ-16 | RN-33, RN-37 | Varios años: 2025 publicado, se publica 2026, se republica 2026; sin confirmar no cambia nada | CA-38, CA-39, CA-48 |
| EJ-17 | RN-38 | 2026 publicado; un conjunto corregido se detiene en la fase 3; siguen viendo el 2026 | CA-41 |
| EJ-18 | RN-41, RN-43, RN-44 | Facultad A (Carreras 01 a 03) y B (04 y 05); publicados 2025 y 2026; Rectorado ve 2026 con cinco carreras | CA-49, CA-57, CA-60 |
| EJ-19 | RN-45, RN-46 | Rectorado filtra la Facultad B y descarga el CSV | CA-61, CA-62 |
| EJ-20 | RN-41, RN-42 | Decano y subdecano de A ven lo mismo (01 a 03) | CA-50, CA-51, CA-52, CA-56 |
| EJ-21 | RN-43 | Año actual 2027 sin publicar: se muestra 2026 con aviso | CA-58 |
| EJ-22 | RN-43 | Nada publicado: etiqueta | CA-59 |
| EJ-23 | RN-41 | Decano sin facultad: mensaje | CA-53 |

Los ejemplos de tolerancia del autor (válido, inválido y borde) no tienen identificador propio; están en los apartados 9 y 16.1. Los ejemplos de las reglas restantes están pendientes (apartado 8.3).

## 19. Relación entre casos, procesos, reglas y criterios

Las reglas transversales aparecen en varias filas. Todos los identificadores citados existen en las especificaciones aprobadas.

| Caso de uso | Proceso | Reglas | Datos o estados relevantes | Criterios de aceptación | Especificación fuente |
|---|---|---|---|---|---|
| CU1 | PR-01 | RN-01, RN-02, RN-03, RN-04, RN-05, RN-06, RN-07, RN-08, RN-10 a RN-15, RN-16, RN-17, RN-18, RN-19, RN-20, RN-21, RN-22 | Año; siete archivos originales, cinco de apoyo y cuatro equivalentes; parámetros configurables; resultado de la carga (completo, detenido, error de archivo); EJ-01 a EJ-09 | CA-01 a CA-12 | E1 |
| CU2 | PR-02 | RN-23, RN-24, RN-25, RN-26, RN-27, RN-28, RN-29, RN-32; de E1: RN-01, RN-02, RN-05, RN-07 | Estado de cada fase (sin revisar, revisada); cálculo listo para publicar; tableros de fase (pestañas); EJ-10 | CA-13 a CA-22, CA-31, CA-33 (CA-18 compartido con PR-03) | E2 |
| CU3 | PR-03 | RN-04, RN-26, RN-29, RN-30, RN-31, RN-32 | Registro de anomalía (fase, descripción, referencia, fecha); lista del cálculo en curso con filtro por fase; EJ-11 a EJ-13 | CA-18, CA-23 a CA-32 (CA-31 compartido con PR-02) | E2 |
| CU4 | PR-04 | RN-03, RN-33, RN-34, RN-35, RN-36, RN-37, RN-38, RN-39, RN-40; de E2: RN-24, RN-26, RN-32; de E1: RN-02, RN-05, RN-07 | Estado sin publicar / publicado; publicación vigente por año; año y fecha; EJ-14 a EJ-17 | CA-34 a CA-48 | E3 |
| CU5 | PR-05 | RN-41, RN-42, RN-43, RN-44, RN-45, RN-46, RN-48, RN-49; de E3: RN-03, RN-36, RN-37, RN-38, RN-39; de E2: RN-31 | Años publicados; año calendario actual; facultades del filtro; tres tableros finales; CSV; EJ-18, EJ-19, EJ-21, EJ-22 (EJ-20 en CA-56) | CA-49, CA-54 a CA-62, CA-65 a CA-67 | E4 |
| CU6 | PR-06 | RN-41, RN-42, RN-43, RN-44, RN-46, RN-47, RN-48, RN-49; de E3: RN-03, RN-36, RN-37, RN-38, RN-39; de E2: RN-31 | Facultad asignada al Decano (Decano y subdecano con el mismo rol); años publicados; tres tableros finales; CSV de su facultad; EJ-18, EJ-20, EJ-21, EJ-22, EJ-23 (EJ-19 en CA-62) | CA-50 a CA-60, CA-62 a CA-66 | E4 |

**Observación sobre los vínculos.** En AHK solo está declarada la relación de cada especificación con sus casos de uso (E1→CU1; E2→CU2 y CU3; E3→CU4; E4→CU5 y CU6). Las referencias entre especificaciones (por ejemplo, RN-24 de E2 usada en E3) existen solo como texto en los documentos; la consulta de especificaciones relacionadas devolvió una lista vacía.

## 20. Cambios respecto de la primera entrega

La primera versión (Fase 1, versión 1.0) no se elimina ni se sustituye. **No hubo retroalimentación docente**: estos cambios los decidió el autor al revisar su propio trabajo. Tipos: *redacción* (corrección de texto), *regla* (precisión de reglas) y *alcance* (modificación del alcance).

| Ref. | Qué cambió | Cómo se describía antes | Decisión actual | Por qué | Fuentes afectadas | Tipo |
|---|---|---|---|---|---|---|
| a | Archivos del caso 1 (reaprobado) | Seis archivos originales (contratos de admisiones y global, cargas CTP, planificación de clases, registros de estudiantes, histórico de contratos para el fondo de reserva); pendiente si había archivos mantenidos a mano | Siete archivos originales (contratos globales, contratos de Admisiones, historial para fondo de reserva, cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes), cinco archivos de apoyo y equivalentes del año anterior de cuatro de ellos | El cálculo real usa siete archivos, más cinco de apoyo y las versiones del año anterior de cuatro. Se evaluó y rechazó dejar el caso 1 sin cambios y registrar la lista solo en la especificación, porque habría dejado una contradicción entre documentos | CU1, E1 | Regla (y alcance de archivos) |
| b | Reglas y controles | La fase 1 describía el producto en general; los controles concretos y su clasificación estaban abiertos y solo vivían en el código del autor | Reglas con identificador (RN), clasificación falla/aviso por fase (RN-10 a RN-15) y ejemplos válidos e inválidos | Se pasó a la fase de reglas; los controles son los que el autor describió de su proceso actual | E1 a E4 | Regla |
| c | Tolerancia de 0,01 | La fase 1 no la mencionaba | Regla nueva (RN-06): todos los cuadres aceptan una diferencia de hasta 0,01. Alternativa evaluada: mantener dos cuadres globales con tolerancia 1 o unificar todo en 0,01; se decidió unificar | Consistencia entre todos los procesados. Comprobada solo con la corrida de 2026; sin validar con otros años | E1 | Regla |
| d | Publicación por año | CU4 dice «una publicación nueva sustituye a la última publicada», y CU5 y CU6 permiten elegir entre años publicados; no se había decidido a qué se refería «la última»  | Se lee como «sustituye a la última publicación **del mismo año**» (RN-37): hay una publicación vigente por año y puede haber varios años publicados. El caso 4 no se reabre. **Declarada aquí** (pendiente 6 de E3) | Lo exige la elección entre años publicados de CU5 y CU6. Se corrigió una decisión previa que hablaba de una sola publicación vigente | CU4, E3 | Regla |
| e | Especificaciones | Solo los seis casos | Cuatro especificaciones aprobadas (E1 a E4) vinculadas a los seis casos | Desarrollar los casos en procesos, reglas y criterios; se evaluaron dos y tres especificaciones y se eligieron cuatro | E1 a E4 | Alcance de la documentación |
| f | Columnas obligatorias | Solo se decía que los datos eran obligatorios, sin decir cuáles | Columnas obligatorias de los siete archivos originales (RN-08). Para los cinco de apoyo, detalle pendiente | Cerrar la pregunta abierta de CU1 | CU1, E1 | Regla |
| g | Contenido de los tableros | Se hablaba de los tableros sin detallar qué mostraban | Seis tableros de fase (RN-28, E2) y tres tableros finales (RN-49, E4), con sus pestañas. Los tableros finales muestran nombres y puestos en pantalla; el CSV de descarga no | Se mantiene como los genera hoy el proceso del autor | E2, E4 | Regla |
| h | Preguntas abiertas de la fase 1 que ahora tienen respuesta | Abiertas en CU5, CU6 y CU4 | **Año en curso:** año calendario actual; si no tiene nada publicado se muestra el publicado más reciente con aviso. **Filtrar o agrupar por facultad:** ambas, solo Rectorado. **Decano:** ve una sola facultad; cada facultad tiene un Decano y un subdecano con el mismo rol. **Total institucional para el Decano:** no en la primera versión. **Qué se descarga:** CSV de la tabla vista, sin nombres, puestos ni sueldos individuales. Además, se respondieron las de E2 y E3 (confirmación previa a publicar, sin retirar, sin aviso, fecha visible, anomalías: datos, edición, duplicado, pantalla con filtro por fase) | Cierre de preguntas con decisiones del autor | CU4, CU5, CU6, E2, E3, E4 | Regla |
| i | Roles | Analista, Rectorado y Decano | Se mantienen, con dos precisiones nuevas: un Decano ve una sola facultad, y Decano y subdecano tienen el mismo rol | Cierra la pregunta sobre varios Decanos o varias facultades | CU6, E4 | Regla |
| j | Lo que **no** cambió | — | La idea general del proyecto y los usuarios con sus roles; los seis casos y el alcance de la primera versión | — | — | — |

**Correcciones de redacción.** Se actualizaron las cifras de archivos (de seis a siete, cinco y cuatro), los pendientes de las pantallas P1 a P4, el estado de las comprobaciones y se ordenó la información en apartados; no cambian el alcance. **Fecha y versión:** la fecha del documento pasa a 2026-11-05 y la versión a 2.0.

**Modificaciones del alcance.** La documentación crece (E1 a E4, apartados 11 a 20), pero no se añaden casos ni actores; las únicas decisiones nuevas que acotan la primera versión son las exclusiones de RN-34, RN-35 y RN-47, que responden preguntas abiertas de la primera entrega.


### Adición de la Fase 3 al apartado 20

El registro anterior se conserva sin cambios. Lo siguiente se añade, sin sustituirlo.

**Interpretación del caso 4 (CU4), declarada de nuevo.** El caso de uso aprobado dice «una publicación nueva sustituye a la última publicada». Como Rectorado y Decano eligen entre años publicados (CU5 y CU6, D18 y D20), esa frase se lee como «sustituye a la última publicación **del mismo año**» (RN-37 de E3; D39 y D40). El caso 4 no se reabre ni se modifica: el texto aprobado conserva su frase original y la lectura precisa queda declarada aquí y en la fila d del registro anterior. Origen: pendiente 6 de E3. Estado: declarada; **la revisión del autor sobre esta lectura sigue pendiente** (apartado 8.3, n.º 14). Esta lectura no cambia ningún diseño técnico (T3, pregunta 14).

**Correcciones posteriores a las decisiones de la segunda entrega.** Según las fuentes, no hay ninguna corrección funcional posterior. Se declaran estos hechos:
- Ninguna de las fuentes funcionales (CU1 a CU6, E1 a E4) tiene una fecha de última actualización posterior al 2026-11-05T06:48:05.457Z (apartado 10.2). No se reabrió ningún caso ni ninguna especificación funcional desde la Fase 2.
- El mensaje de confirmación de la publicación (RN-33, «se sustituirá lo publicado antes de ese año») puede leerse como «años anteriores», mientras que RN-37 dice que sustituye la publicación del mismo año. Se mantiene como pendiente 15 del apartado 8.3; **no se reformuló**.
- La revisión por fases (PR-02) se excluyó brevemente del diseño técnico (D73) y se restableció (D74). Ninguna de las dos decisiones modificó E2, el caso 2 ni E3: PR-02 sigue siendo una operación comprometida con las seis marcas de revisión como condición de publicación (RN-24).
- Los apartados 2 a 7 y 11 a 19 se conservan de la Fase 2 sin cambios de contenido.

El registro de qué cambió en el diseño técnico desde la segunda entrega es distinto de este y está en el apartado 30.

## 21. Stack y matriz de herramientas obligatorias

Todo lo de este apartado es diseño: **ninguna de las herramientas obligatorias, salvo React y React DOM, está instalada**, y no se ha ejecutado nada del producto.

### 21.1 Base existente (BASE EXISTENTE, leída de `package.json`)

| Elemento | Valor real |
|---|---|
| Plantilla | Vite 8.2.2 con React y TypeScript 6.0.3 |
| Dependencias instaladas | `react` 19.2.8 y `react-dom` 19.2.8 |
| Otras herramientas de desarrollo instaladas | `@vitejs/plugin-react` ^6.1.0, `oxlint` ^1.79.0, tipos de React y de Node |
| Scripts | `dev`, `build` (`tsc -b && vite build`), `lint` (`oxlint`) y `preview`. No hay script de pruebas |
| Gestor y motor | pnpm 11.17.0 y `node >= 22.22.0` |
| Código del producto | Solo la pantalla de demostración de la plantilla (`App.tsx`, estilos y recursos); no hay rutas, componentes, servicios ni pruebas del producto |
| Health del harness | `health.bat`, que ejecuta `pnpm build`; su lanzamiento desde AHK 3.0.0 falla en este equipo (apartado 10.2) |

### 21.2 Paquetes de la consigna, estado y motivo

La columna «Compatibilidad declarada» solo recoge lo que la consigna y las fuentes dicen; **no está verificada con metadatos publicados** de los paquetes (apartado 10.2).

| Paquete | Versión de la cohorte | Estado en `package.json` | Compatibilidad declarada | Motivo de la elección |
|---|---|---|---|---|
| `react` y `react-dom` | 19.2.8 | **YA INSTALADOS** | Base de la plantilla; no se cambia | Componentes, props y estado local de todos los recorridos |
| `react-router` | 8.3.1 | PROPUESTO, no instalado | No verificada con metadatos publicados. Modo declarativo (sin loaders ni actions de Router) | Navegación entre P1 a P7 con dos layouts y parámetros (D58, D69) |
| `@tanstack/react-query` | 5.102.8 | PROPUESTO, no instalado | No verificada con metadatos publicados | Datos remotos: identidad de la autoridad (D53), estado del cálculo (D68) y sincronización tras publicar (D65) |
| `zustand` | 5.0.15 | PROPUESTO, no instalado | No verificada con metadatos publicados | Selección de consulta compartida por tres tableros (D57) |
| `zod` | 4.4.3 (imports desde `zod/v4`) | PROPUESTO, no instalado | No verificada con metadatos publicados. Su documentación no se consultó directamente | Reglas del registro de anomalía (RN-30, D55) |
| `@mantine/form` | 9.4.1 | PROPUESTO, no instalado | No verificada con metadatos publicados. Resolver integrado `schemaResolver`; no se añade `mantine-form-zod-resolver` | Valores y errores del formulario de anomalía (D55) |
| `@mantine/core` | 9.4.1 (misma versión que `@mantine/form`) | PROPUESTO, no instalado | No verificada con metadatos publicados | Componentes visuales y los dos Modales (D56) |
| Vitest | **PENDIENTE: la consigna no da versión** | PROPUESTO, no instalado | Sin dato | Pruebas puras de schemas y de funciones (apartado 28) |

No se verificó si `@mantine/core` exige otros paquetes de Mantine ni hojas de estilo adicionales para la versión fijada: **PENDIENTE de comprobar** al decidir la instalación. No se propone ninguna librería de notificaciones (la consigna no la exige) ni ningún otro paquete. Instalar cualquiera de las dependencias propuestas requiere una autorización aparte; este documento no la da.

### 21.3 Dependencias propuestas frente a instaladas

| YA INSTALADAS (según `package.json`) | PROPUESTAS, NO instaladas |
|---|---|
| `react` 19.2.8, `react-dom` 19.2.8 | `react-router` 8.3.1, `@tanstack/react-query` 5.102.8, `zustand` 5.0.15, `zod` 4.4.3, `@mantine/form` 9.4.1, `@mantine/core` 9.4.1 y Vitest (versión pendiente) |

### 21.4 Matriz de herramientas obligatorias

Cada fila responde: de qué caso o regla viene el uso, qué responsabilidad concreta tiene, quién la consume y cómo se comprobará. Los cuatro diseños mencionados (T1 a T4) están aprobados (D75 a D78). Ninguna fila usa «No aplica».

| Herramienta | Caso o regla de origen | Responsabilidad concreta | Pantalla o módulo consumidor | Comprobación prevista (no ejecutada) |
|---|---|---|---|---|
| React y React DOM | CU1 a CU6; D56 y D64 | Componentes, props y estado local: archivos seleccionados en P1 (PROPUESTA), estado abierto de los dos Modales (PROPUESTA) y pestaña activa de cada tablero (PROPUESTA) | P1 a P7 | Build de la plantilla (solo compila) y recorrido de navegador de cada pantalla |
| React Router (modo declarativo) | Todos los casos; D58 y D69 | Dos layouts sin segmento de URL con `Outlet`; ruta de P3 con parámetro de fase (1 a 6); parámetro de consulta `?anio` para el año del analista; ruta desconocida; enlaces entre pantallas | Layout del analista (P1 a P4) y layout de consulta (P5 a P7) | Recorrido de navegador: navegar entre pantallas conservando el layout, abrir una ruta desconocida, leer y cambiar `?anio` |
| TanStack Query | CU5 y CU6 (RN-41, CA-53); CU1 (RN-05, RN-07, CA-03); CU4 (RN-37, RN-38, CA-39) | Consulta de identidad `['autoridad', usuario]` (D53); consulta del estado del cálculo `['calculo', año]` (D68); mutación de publicar con invalidación (D65). Las dos últimas, condicionadas a que exista un servicio | Layout de consulta (identidad); P2 (estado del cálculo y publicar) | Prueba pura del paso «estado de la consulta → estado de la interfaz» con Vitest (D71, por comprobar); la petición real no es posible hoy |
| Zustand | CU5 y CU6 (RN-43, RN-45, RN-49; CA-57 a CA-59, CA-61, CA-65); D57 | Selección de consulta compartida: año elegido y facultades elegidas, con acciones para elegir el año, elegir las facultades y limpiar el filtro | Selector del layout de consulta (quien modifica) y P5, P6 y P7 (quienes leen) | Pruebas de las acciones con Vitest; recorrido de navegador: misma selección en los tres tableros y pérdida al recargar |
| Zod (importado de `zod/v4`) | CU3 (RN-30; CA-23, CA-25, CA-30, CA-32; EJ-11 a EJ-13); D55 | Schema del registro de anomalía: fase, descripción y referencia obligatorias | Formulario de anomalía (módulo de validaciones) | Pruebas puras con Vitest de `safeParse`: entrada válida, inválida e incompleta |
| Mantine Form (con `schemaResolver`) | CU3 (RN-30); D55 y D59 | Valores iniciales, errores por campo, envío y restablecimiento (`reset`) del formulario de anomalía; conecta el schema Zod con la interfaz | Formulario de anomalía, dentro del Modal de P3 y P4 | Recorrido de navegador: errores visibles por campo, envío válido y restablecimiento al reabrir |
| Mantine Core (componentes visuales) | CU1 a CU6 | Componentes visuales de las pantallas. **Decidido solo el Modal**; el resto (selección de archivos, selector de fase, pestañas, tablas) está sin decidir (T1, pregunta 7; T2, pregunta 13) | P1 a P7 | Recorrido de navegador; build |
| Mantine Modal | CU3 (RN-30; D56 y D59); CU4 (RN-33, CA-37, CA-38; D41, D64) | Modal del formulario de anomalía (crear y editar) y Modal de confirmar publicar | P3 y P4 (anomalía); P2 (confirmar publicar) | Recorrido de navegador: abrir, cancelar, guardar, duplicado y cierre con X, Escape y clic fuera; comportamiento por defecto por comprobar contra 9.4.1 |

## 22. Arquitectura y responsabilidades

> **PROPUESTA del asistente, pendiente de decisión del autor.** Todo este apartado, incluido el árbol de carpetas, es un plan derivado de T1 a T4 (T1 a T4 aprobados, D75 a D78). No son archivos generados: hoy `src/` solo contiene la demostración de la plantilla. Los nombres de carpetas, archivos y piezas no están decididos.

### 22.1 Piezas y relaciones (PROPUESTA)

Flujo general: una **página** (o componente) recibe la acción del usuario; un **hook de caso de uso** coordina la consulta o la acción; el **acceso a servicios** habla con el exterior solo cuando existe un servicio; las **validaciones** son funciones y schemas puros que no dependen de la interfaz; un **store** guarda únicamente la selección compartida.

| Pieza | Responsabilidad reconocible | Se relaciona con | Origen | Estado |
|---|---|---|---|---|
| Arranque de la aplicación | Reunir el router, el cliente de consultas y, si la documentación de Mantine para 9.4.1 lo exige, su proveedor de tema (no consultado: PENDIENTE) | Todas las demás | Todos | PROPUESTA |
| Layout del analista | Marco compartido (navegación) de P1 a P4; ruta de layout sin segmento de URL con `Outlet` | Páginas P1 a P4 | T2, D58 | DECISIÓN CONFIRMADA (D58); realización PROPUESTA |
| Layout de consulta | Marco compartido de P5 a P7: navegación entre los tres tableros y selector de año y facultades | P5 a P7; store de selección; hook de identidad | T4, D58 | DECISIÓN CONFIRMADA (D58); realización PROPUESTA |
| Página P1 · Carga del año | Indicar el año y seleccionar los archivos requeridos | Función pura de archivos faltantes; estado local | T1, D67 | PROPUESTA |
| Página P2 · Estado del cálculo y publicación | Mostrar el estado del cálculo y ofrecer «Publicar»; **su composición no tiene dueño** (D70) | Hook del estado del cálculo; botón y Modal de publicar | T1, T3 (T2 sin diseñar) | PROPUESTA; composición PENDIENTE |
| Página P3 · Tablero de fase | Mostrar el tablero de una fase (parámetro de fase) y abrir el Modal de anomalía | Modal de anomalía | T2 | **Sin diseñar el tablero ni las marcas (D74)**; solo el disparador del Modal |
| Página P4 · Anomalías registradas | Listar las anomalías con filtro por fase; abrir el Modal para crear y editar | Modal de anomalía; lista de anomalías | T2 | PROPUESTA |
| Páginas P5, P6, P7 · Tableros finales | Mostrar cada tablero final con sus pestañas, año y fecha, y ofrecer la descarga CSV | Layout de consulta; store; datos de ejemplo locales | T4 | PROPUESTA |
| Pantalla de ruta desconocida | Informar de que la dirección no existe | Router | D58 | PROPUESTA |
| Modal de anomalía (con su formulario) | Crear y editar una anomalía sin salir de la pantalla; ciclo de D59 | Esquema de anomalía; Mantine Form; P3 y P4 | T2, D56, D59 | DECISIÓN CONFIRMADA (D56, D59); ubicación del componente PENDIENTE |
| Modal de confirmar publicar y botón «Publicar» | Confirmar la publicación; ciclo de D64 y reglas del botón de D66 | Hook de publicar; P2 | T3, D64, D66 | DECISIÓN CONFIRMADA; textos de error PROPUESTOS |
| Hook de identidad | Exponer el estado de la consulta `['autoridad', usuario]` como uno de cinco estados de la interfaz | Servicio de autoridades; layout de consulta | T4, D53, D62 | DECISIÓN CONFIRMADA; condicionado al contrato (b) |
| Hook del estado del cálculo | Exponer el estado de `['calculo', año]` | P2 | T1, D68 | Condicionado a que exista un servicio |
| Hook de publicar | Mutación de publicar y su invalidación | Modal de confirmar | T3, D65 | Condicionado a que exista un servicio |
| Acceso a servicios | Llamadas al exterior; **solo se prevé una pieza**, la de autoridades (contrato (b)), y se añadirán otras cuando exista el servicio correspondiente | Hooks | T4 | HIPÓTESIS (contrato sin verificar) |
| Validaciones y funciones puras | Schema de anomalía, comparación de duplicados sin distinguir mayúsculas, archivos faltantes, año por defecto, estado de la identidad como función pura, proyección de columnas del CSV, decisión del botón «Publicar» | Formularios, hooks, páginas | T1 a T4 | PROPUESTAS (cada una marcada así en su documento) |
| Store de selección de consulta | Año elegido y facultades elegidas (apartado 24) | Selector del layout de consulta; P5, P6, P7 | T4, D57 | DECISIÓN CONFIRMADA (D57) |
| Datos de ejemplo locales | Datos ficticios de los tableros hasta que exista un servicio; rotulados, fuera de Query y fuera de Zustand | P5 a P7 | T4, D54 | DECISIÓN CONFIRMADA (D54); contenido sin definir |

No se crean capas sin responsabilidad: por ejemplo, no hay carpeta de servicios para la publicación, la carga ni el cálculo mientras esos servicios no existan.

### 22.2 Árbol de carpetas (PROPUESTA del asistente, pendiente de decisión del autor)

Convención propuesta: carpetas y archivos en kebab-case; los archivos de componentes de React en PascalCase. Es una interpretación de la consigna, pendiente de confirmar. Esto es un plan: ninguno de estos archivos existe.

```
src/
  main.tsx                          (existe en la plantilla; se adaptaría)
  app/
    app-router.tsx                  rutas y layouts
    proveedores.tsx                 router, cliente de consultas y, si hace falta, tema
  layouts/
    LayoutAnalista.tsx              P1 a P4
    LayoutConsulta.tsx              P5 a P7
  paginas/
    analista/
      CargaAnio.tsx                 P1
      EstadoCalculo.tsx             P2
      TableroFase.tsx               P3 (solo disparador del Modal; tablero sin diseñar)
      AnomaliasRegistradas.tsx      P4
    consulta/
      SuperavitDeficit.tsx          P5
      CostoClases.tsx               P6
      GestionDocencia.tsx           P7
    NoEncontrada.tsx                ruta desconocida
  componentes/
    anomalia/
      ModalAnomalia.tsx
      FormularioAnomalia.tsx
    publicacion/
      BotonPublicar.tsx
      ModalConfirmarPublicar.tsx
    consulta/
      SelectorAnioFacultades.tsx
  hooks/
    use-autoridad.ts                consulta de identidad
    use-estado-calculo.ts           condicionado a servicio
    use-publicar.ts                 condicionado a servicio
  servicios/
    autoridad-service.ts            solo la consulta de identidad (contrato (b), sin verificar)
  validaciones/
    anomalia-schema.ts              schema Zod
    archivos-faltantes.ts           función pura
    duplicado-anomalia.ts           función pura
    anio-por-defecto.ts             función pura
    estado-identidad.ts             función pura
    columnas-csv.ts                 función pura
    decision-publicar.ts            función pura
  stores/
    seleccion-consulta-store.ts     Zustand
  datos-ejemplo/                    datos ficticios rotulados (contenido sin definir)
```

Las pruebas con Vitest, cuando se decida instalarlo, convivirían con las funciones que prueban; su ubicación no está decidida. Los nombres de las carpetas en español, la separación entre `paginas/analista` y `paginas/consulta` y los archivos de funciones puras son propuestas y se pueden agrupar de otra forma.

## 23. Navegación con React Router

Modo declarativo: rutas, enlaces y parámetros, sin loaders ni actions de Router. **Estructura confirmada (D58):** dos layouts sin segmento de URL (analista, para P1 a P4; consulta, para P5 a P7), un parámetro de fase en P3 (1 a 6) y una ruta desconocida. **Los nombres de ruta no están decididos:** los de P5 a P7 los propone T4 y los de P1 a P4 los propone este documento; todos son PROPUESTOS.

### 23.1 Tabla de rutas

| Ruta (PROPUESTA salvo indicación) | Layout | Pantalla | Propósito | Parámetros | Casos |
|---|---|---|---|---|---|
| `/carga` | Analista | P1 · Carga del año | Indicar el año y seleccionar los archivos | `?anio` (D69) | CU1 (PR-01) |
| `/calculo` | Analista | P2 · Estado del cálculo y publicación | Ver el estado del cálculo y publicar | `?anio` (D69) | CU1, CU2, CU4 (PR-01, PR-02, PR-04) |
| `/fase/:fase` | Analista | P3 · Tablero de fase | Revisar el tablero de una fase y abrir el Modal de anomalía | Parámetro de ruta `fase` (1 a 6, D58); `?anio` | CU1, CU2, CU3 (PR-01, PR-02, PR-03) |
| `/anomalias` | Analista | P4 · Anomalías registradas | Listar, crear, editar y eliminar anomalías | `?anio`; filtro por fase (en la URL o local: sin decidir) | CU3 (PR-03) |
| `/superavit-deficit` (propuesta de T4) | Consulta | P5 · Superávit y déficit | Tablero final | Ninguno en la URL (la selección va en Zustand, D57) | CU5, CU6 (PR-05, PR-06) |
| `/costo-clases` (propuesta de T4) | Consulta | P6 · Costo de clases | Tablero final | Ninguno en la URL | CU5, CU6 (PR-05, PR-06) |
| `/gestion-docencia` (propuesta de T4) | Consulta | P7 · Gestión docencia | Tablero final | Ninguno en la URL | CU5, CU6 (PR-05, PR-06) |
| `*` (D58) | Ninguno | Pantalla de ruta desconocida | Informar de que la dirección no existe | — | Transversal |
| `/` (raíz) | — | **PENDIENTE DE DECISIÓN** | Qué muestra o a dónde lleva la raíz, según el rol | — | — |

Notas:
- Un layout sin segmento de URL agrupa rutas sin añadir un prefijo; por eso los nombres de P1 a P7 viven en el mismo nivel y no deben repetirse.
- El año de trabajo del analista viaja en el parámetro de consulta `?anio` (por ejemplo `?anio=2026`) y no en la ruta, para no cambiar D58 (D69). Qué se muestra si falta, qué ocurre con un año inválido, cómo llega el año a la URL tras subir los archivos y si el parámetro se conserva al navegar entre P1 y P4: **sin decidir** (T1, preguntas 13 y 14; T2).
- En P5 a P7 el año y las facultades elegidos no están en la URL: se guardan en Zustand (D57). Consecuencia declarada: la selección se pierde al recargar y no se puede compartir un enlace con ese estado en la primera versión.
- Si el filtro por fase de P4 va en la URL o en estado local: sin decidir (T2).

### 23.2 Enlaces y navegación de vuelta

- P2 enlaza al tablero de cada fase (P3) con el número de fase; P3 y P4 se alcanzan desde la navegación del layout del analista. Los tres tableros finales se enlazan entre sí (RN-49) mediante la navegación del layout de consulta.
- Navegación de vuelta: se apoya en el historial del navegador y en la navegación del layout. Un enlace explícito de P3 de vuelta a P2 es una PROPUESTA, no decidida.
- Ruta desconocida: `path="*"` muestra una pantalla propia (D58). Su texto no está definido (PROPUESTO).

### 23.3 Abrir o recargar una URL directamente

**PENDIENTE DE DECISIÓN. No se decide en este documento.** Preguntas que hay que resolver antes de construir:
- Qué se espera al abrir directamente una pantalla del analista sin año en la URL o con un año inválido.
- Qué ocurre con un número de fase fuera de 1 a 6 en `/fase/:fase`.
- Qué se espera al recargar un tablero final: la selección de Zustand se reinicia (consecuencia declarada de D57); qué año se muestra entonces lo fija RN-43 (año calendario actual, o el publicado más reciente con aviso, o la etiqueta de «No existen datos procesados.»).
- Qué se muestra mientras la identidad no se conoce o falla (T4, pregunta 12).
- Si en el futuro se publicara la aplicación, el servidor de destino tendría que devolver la misma página para estas direcciones; eso depende de un destino que no está decidido (apartado 29).

### 23.4 Accesos por rol

| Rol | Pantallas previstas | Regla funcional | Cómo se sabría el rol |
|---|---|---|---|
| Analista | P1 a P4 | RN-31 (solo el analista ve las anomalías), RN-40 (solo el analista publica) | **PENDIENTE:** el rol de Analista no sale de ningún servicio de los conocidos (D52) |
| Rectorado | P5 a P7, todas las carreras | RN-41 | **PENDIENTE:** el origen del acceso de Rectorado no está confirmado (D52) |
| Decano (y subdecano, mismo rol) | P5 a P7, solo las carreras de su facultad | RN-41, RN-45 | La facultad vendría de la consulta de identidad (D53); contrato sin verificar |

**Una guardia visual no es una autorización del servicio.** El layout o la ruta pueden ocultar pantallas según el rol que conozca la interfaz, pero cualquiera puede escribir una URL (por eso D58 descartó prefijos como `/analista` o `/consulta`, que parecen restricciones y no lo son). Que un Decano vea solo su facultad, que solo el analista publique y que solo el analista vea las anomalías son garantías que dependen de un servicio que filtre y autorice, y hoy ese servicio no existe (D54).

## 24. Propiedad del estado y uso de Zustand

Principios (de la consigna y de D57): TanStack Query administra las respuestas remotas y no se copian a otro estado; Mantine Form administra valores y errores del formulario; Zustand solo guarda una necesidad compartida del cliente; el estado local de React cubre lo que usa un solo componente; la URL guarda entradas de navegación.

### 24.1 Quién administra cada dato

| Dato | Quién lo administra | Motivo | Estado |
|---|---|---|---|
| Año de trabajo del analista | URL (`?anio`) | Es una entrada de navegación que debe sobrevivir a recargas y enlaces directos (D69) | DECISIÓN CONFIRMADA |
| Fase abierta en P3 | URL (parámetro de ruta) | Identifica el tablero que se muestra (D58) | DECISIÓN CONFIRMADA |
| Archivos seleccionados en P1 | Estado local de React | Los usa solo P1 hasta enviarlos | PROPUESTA (T1, pregunta 18) |
| Resultado del cálculo del año | TanStack Query `['calculo', año]` | Dato remoto que depende del año (D68) | Condicionado a que exista un servicio |
| Marcas de revisión por fase | Datos del servidor; mecanismo sin decidir | Son estado de E2; PR-02 sin diseñar (D74) | PENDIENTE |
| Valores y errores del formulario de anomalía | Mantine Form | Es su responsabilidad (D55) | DECISIÓN CONFIRMADA |
| Fecha de registro de la anomalía | El producto (servicio); no es un campo | RN-30 | Regla aprobada |
| Abierto o cerrado de los dos Modales | Estado local de React de la pantalla que los abre | Lo usa un solo componente; no justifica un store | PROPUESTA, sin confirmar (D56, D64) |
| Estado «publicando» y error de publicar | Estado de la mutación de TanStack Query | Previsto (D65); su relación con el cierre del Modal no está decidida | PENDIENTE |
| Lista de anomalías | Datos del servidor | Hoy sin servicio | PENDIENTE (T2, pregunta 5) |
| Filtro por fase de P4 | Estado local o URL | No decidido | PENDIENTE |
| Identidad (rol y facultad del Decano) | TanStack Query `['autoridad', usuario]` | Dato remoto (D53); **no va al store** | DECISIÓN CONFIRMADA |
| Selección de año y facultades de consulta | **Zustand** | Compartida por P5, P6 y P7 (D57) | DECISIÓN CONFIRMADA |
| Año mostrado en P5 a P7 | Se deriva al renderizar a partir de la selección y de los años publicados | Evita guardar un segundo valor | PROPUESTA del lead, sin confirmar (D57) |
| Años publicados y datos de los tableros | Servidor (futuro); hoy datos de ejemplo locales | No se copian al store ni pasan por Query mientras sean locales (D54) | DECISIÓN CONFIRMADA |
| Lista de facultades que Rectorado puede elegir | Sin fuente definida | — | PENDIENTE (T4, pregunta 5) |
| Pestaña activa de cada tablero | Estado local de React | Solo la usa el tablero | PROPUESTA, sin decidir |

### 24.2 El store de Zustand (DECISIÓN CONFIRMADA, D57; nombres PROPUESTOS)

| Aspecto | Contenido |
|---|---|
| Qué guarda | **Año elegido** (vacío si el usuario aún no eligió) y **facultades elegidas** (lista; vacía significa todas las carreras) |
| Acciones propuestas | Elegir año, elegir facultades, limpiar el filtro |
| Quién lo modifica | El selector de año y facultades del layout de consulta |
| Quién lo consume | El layout de consulta y las pantallas P5, P6 y P7 |
| Por qué es global | El usuario elige un año o un filtro en un tablero y los otros dos, enlazados entre sí (RN-49), deben mostrar lo mismo al navegar. Son tres consumidores identificados |
| Para el Decano | Solo usa el año: el filtro por facultad no aplica (RN-45, D45) |
| Persistencia | Ninguna. La selección se pierde al recargar y compartir un enlace con ese estado queda fuera de la primera versión (consecuencia declarada, D57) |
| Alternativas evaluadas | Año de trabajo del analista (riesgo de duplicar estado del servidor) y selección en la URL (deja a Zustand sin uso) |

### 24.3 Qué queda fuera y cómo se evitan duplicaciones

- Las respuestas de la identidad, del cálculo y de los tableros **no se guardan en el store**: la clave del dato (año y facultad) alimentaría a Query o a los datos locales, no se copia el dato.
- Los valores del formulario de anomalía no van a Zustand ni a otro estado: los administra Mantine Form.
- El año mostrado no se almacena: se calcula al renderizar.
- Los años publicados no se copian al store; si cambia la lista de facultades, la selección guardada se valida contra la lista vigente al derivar (mitigación propuesta por T4).
- La facultad del Decano sale de la consulta de identidad y no se copia al store.
- No hay persistencia local, no se guardan tokens ni existe un «store universal».

## 25. Datos, servicios y límites de integración

Este apartado separa lo **verificado** de lo **hipotético** y de lo que **no existe**. No se inventa ningún endpoint ni se supone que una API esté disponible. No se incluyen direcciones de servidor, usuarios ni nombres de personas. No se implementa ni se modifica ningún backend.

### 25.1 Fuentes remotas, operaciones y contratos

| Fuente | Operación | Entrada | Salida | Estado del contrato | Uso en el diseño |
|---|---|---|---|---|---|
| Servicio institucional de autoridades, consulta **POST** | Pedir las autoridades de ciertos tipos de cargo | Lista de textos con tipos de cargo | Lista de objetos con 17 campos, todos opcionales salvo un indicador booleano de subrogación | **VERIFICADO leyendo el código de la aplicación real del autor** (el 2026-11-10); **no se llamó al servicio**. La ruta viene de configuración del servidor y su valor no se vio | Alternativa (a) de D53: descarga todas las autoridades de esos tipos (el filtrado por usuario lo hace hoy el servidor de la aplicación real), lo que choca con la privacidad de E4. Sirve como plan alternativo |
| Servicio de autoridades, consulta **GET con el usuario en la ruta** | Obtener la autoridad de un usuario | El usuario | Los mismos campos de respuesta que el POST | **HIPÓTESIS**: solo hay un ejemplo de respuesta que le pasó un compañero, sin verificar; disponibilidad sin probar | Es la consulta remota de TanStack Query (D53) |
| Identificación de Rectorado | — | — | — | **No verificado.** Según el autor, uso previo en otro proyecto de un servicio de autoridades; no se sabe cuál de los dos servicios lo hace ni con qué parámetros | Pendiente (D52) |
| Identificación del Analista | — | — | — | No sale de ningún servicio conocido | Pendiente (D52) |
| Tableros publicados | — | — | — | **No existe ninguna API** (según el autor; en su aplicación real el servidor inyecta los datos en la página) | Bloqueo declarado; datos de ejemplo locales (D54) |
| Publicación de resultados | — | — | — | **No existe** servicio | Diseño previsto condicionado (D65) |
| Carga de archivos del año y validación de columnas | — | — | — | **No existe** servicio | Diseño previsto condicionado (D67) |
| Estado del cálculo | — | — | — | **No existe** servicio | Diseño previsto condicionado (D68) |

### 25.2 Errores y dependencias de acceso

- Ante un fallo del servicio de autoridades, la aplicación real del autor deniega el acceso sin explicar. En este diseño, el error de la consulta de identidad tiene estado y mensaje propios, distintos de «sin facultad asignada» (D62). El texto del mensaje de error es PROPUESTO, sin aprobar.
- Reintentos: TanStack Query puede reintentar automáticamente por defecto; su efecto en el estado de error no está comprobado en la 5.102.8 (T4, pregunta 9).
- Dependencias de acceso sin resolver: acceso directo desde el navegador a un servicio de red interna (política de orígenes cruzados), autenticación del servicio, qué cargos devuelve el GET, y de dónde sale el usuario consultado (fuera del alcance del autor).

### 25.3 Bloqueos declarados

1. **No hay servicio de tableros publicados, de publicación, de carga, de cálculo ni de validación de columnas.** Por eso la mutación de publicar, la subida y la consulta del estado del cálculo son diseño previsto y no se da por resuelto el uso de Query para ellas.
2. El contrato GET de identidad no está verificado: la consulta de identidad es la única consulta remota real del diseño y depende de él.
3. La garantía de que un Decano vea solo su facultad exige un servidor que filtre; filtrar en el navegador es una vista, no una garantía.
4. Si se decidiera plantear la integración con un servicio que requiera un secreto, el navegador no puede guardarlo: habría que registrar la dependencia y acordar una solución antes de presentarla como lista (ver 25.5).

### 25.4 Datos proyectados a la interfaz y frontera de validación

- De la identidad, la interfaz necesita solo el rol (si el contrato lo permite) y la facultad del Decano. Los demás campos de la respuesta no se proyectan (PROPUESTA). Cómo se obtiene el rol depende de qué cargos devuelva el GET (pregunta abierta).
- Si la respuesta de un servicio externo se valida con un schema en la frontera, no está decidido (PENDIENTE DE DECISIÓN): un schema de Zod para esa respuesta no puede definirse mientras el contrato (b) no esté verificado. El uso obligatorio de Zod de este diseño es el formulario de anomalía (apartado 26).
- Los datos de ejemplo de los tableros se mantienen ficticios y rotulados, y no pasan por una consulta de Query.

### 25.5 Configuración del cliente y secretos

La URL pública o la configuración del cliente **no es un lugar para claves, credenciales ni tokens**: en una aplicación que corre en el navegador, cualquier valor de configuración incluido en ella puede ser leído por quien la use. Este documento no propone guardar ningún secreto en el cliente. Si un servicio exigiera un secreto, habría que registrar esa dependencia y acordar una solución con el docente antes de plantearlo como integración lista.

## 26. Formularios, Zod y Mantine Modal

### 26.1 Formulario elegido: registro de anomalía (DECISIÓN CONFIRMADA, D55)

Origen: RN-30 de E2 (proceso PR-03, caso CU3), criterios CA-23, CA-25, CA-30 y CA-32, ejemplos EJ-11, EJ-12 y EJ-13. Se eligió porque ya tiene todas sus reglas aprobadas y valores válidos e inválidos claros, y encaja con el Modal. Alternativa evaluada y no elegida: la carga de archivos del año (E1), porque lo difícil (las columnas de cada archivo) depende del contenido y no de campos simples.

**Campos y reglas**

| Campo | Quién lo da | Obligatorio | Regla | Valor inicial | Mensaje si falta |
|---|---|---|---|---|---|
| Fase | El analista | Sí | Una de las seis fases (RN-30). Cómo se representa (texto o número) y si en P3 viene preseleccionada con la fase abierta: sin decidir | Vacío al crear; el valor guardado al editar | PROPUESTO: «Elige la fase.» |
| Descripción | El analista | Sí | Texto no vacío. Longitud máxima y espacios al inicio y al final: sin definir (T2, pregunta 2) | Vacío al crear; el valor guardado al editar | PROPUESTO: «Escribe la descripción.» |
| Referencia al archivo o dato | El analista | Sí | Texto no vacío; misma regla de longitud y espacios sin definir | Vacío al crear; el valor guardado al editar | PROPUESTO: «Escribe la referencia al archivo o dato.» |
| Fecha de registro | **El producto** | — | No es un campo del formulario | — | — |

Los tres mensajes «Elige…» y «Escribe…» son **PROPUESTOS por el asistente, sin aprobar**: E2 solo dice que el producto «pide completar el dato que falta» (pendiente 2 de E2; T2, pregunta 1). El único texto aprobado es el aviso de duplicado: «Ya existe un registro igual en esta fase con esa referencia. No se creó otro.» (RN-30).

**Schema propuesto (PROPUESTA; forma ilustrativa, no ejecutada ni comprobada contra Zod 4.4.3 ni Mantine 9.4.1).** Un objeto con tres campos de texto no vacíos: `fase`, `descripcion` y `referencia`, cada uno con el mensaje de la tabla. Se importaría de `zod/v4`.

```ts
import { z } from 'zod/v4';

const anomaliaSchema = z.object({
  fase: z.string().min(1, 'Elige la fase.'),
  descripcion: z.string().min(1, 'Escribe la descripción.'),
  referencia: z.string().min(1, 'Escribe la referencia al archivo o dato.'),
});
// Una derivación de tipo con z.infer<typeof anomaliaSchema> solo describe la forma.
// NO ejecuta ninguna validación.
```

**Cadena de la regla a lo que ve el usuario (PROPUESTA)**

1. **Regla funcional (RN-30):** fase, descripción y referencia son obligatorias.
2. **Schema de Zod:** expresa esa regla; valida cuando se ejecuta (`safeParse` o el resolver), no por existir.
3. **Mantine Form con `schemaResolver`:** el formulario recibe el schema mediante el resolver integrado de `@mantine/form` (con `sync: true` si el schema es síncrono, según la documentación consultada, por comprobar en la 9.4.1) y guarda valores y errores por campo.
4. **Respuesta visible:** al enviar, si hay errores, cada mensaje aparece en su campo y el Modal sigue abierto. Si pasa, sigue la comprobación de duplicado y el guardado.

Cuándo se ejecuta la validación (al enviar, al escribir o al salir del campo): sin decidir; el comportamiento por defecto de Mantine Form se comprobará contra la 9.4.1.

**Entradas válidas e inválidas**

| Caso | Entrada | Resultado esperado | Fuente |
|---|---|---|---|
| Válida | Fase 2; descripción «Horas sin término en el archivo de cargas»; referencia «Cargas CTP del año, fila de la persona A» | El schema pasa; se guarda con la fecha que pone el producto; el Modal se cierra y la lista refleja el cambio | EJ-11, CA-23 |
| Inválida: falta la descripción | Descripción vacía | El schema falla en ese campo; se muestra el mensaje en el campo; no se guarda; el Modal sigue abierto y no se descarta lo escrito | EJ-13, CA-30 |
| Inválida: falta la fase o la referencia | Campo vacío | Igual que la fila anterior para ese campo | CA-30 |
| Duplicado | Misma fase 2 y misma referencia, sin distinguir mayúsculas de minúsculas | **El schema pasa** (los campos están completos); el duplicado se detecta aparte y se muestra el aviso fijo; no se crea; el Modal sigue abierto | EJ-12, CA-25 |
| Duplicado al editar | Editar un registro hasta que coincida con otro | Mismo aviso; no se guarda el cambio | CA-32 |

**El duplicado no lo decide Zod solo**: necesita conocer los registros existentes. Dónde se comprueba y con qué datos queda PENDIENTE (T2, pregunta 3). Propuesta no confirmada: una función pura que compara fase y referencia sin distinguir mayúsculas, usada en el cliente con la lista disponible, y como garantía real el servicio que persista (dependencia sin resolver).

**Comportamiento del submit (PROPUESTA salvo lo indicado)**
- Con campos vacíos: no se llama a ninguna operación de guardado; se muestran los errores (RN-30).
- Con campos completos: se comprueba el duplicado; si no lo es, se guarda. **Guardar requiere un servicio de persistencia que hoy no existe**: el paso queda condicionado y no se simula (D71).
- Éxito: el Modal se cierra y la lista refleja el cambio (regla ya aprobada, RN-30 y CA-25).
- Fallo al persistir: PENDIENTE (sin servicio definido).
- Mientras haya un guardado en curso, impedir el cierre del Modal es una PROPUESTA que no está en D56 ni en D59; qué pasa con el botón Cancelar en ese caso: sin decidir.

### 26.2 Modal del formulario de anomalía (DECISIONES CONFIRMADAS D56 y D59)

| Aspecto | Descripción |
|---|---|
| Propósito | Crear o editar una anomalía sin salir de la pantalla |
| Quién lo abre y cuándo | El analista: «Registrar anomalía» desde P3 y P4; «Editar» en una fila de P4 (D56). Un solo componente reutilizado; dónde vive: sin decidir |
| Contenido | Los tres campos del formulario y los botones Guardar y Cancelar |
| Cierre | Cerrar de cualquier forma (X, Escape, clic fuera o Cancelar) **descarta lo escrito** (D59) |
| Cancelación | Igual que el cierre: se descarta lo escrito y no se guarda nada |
| Éxito | Guardar correctamente cierra el Modal y la lista refleja el cambio |
| Error | Un campo vacío o un duplicado mantienen el Modal abierto con su mensaje y sin descartar lo escrito (RN-30, CA-25, CA-30, CA-32). Fallo al persistir: pendiente |
| Qué conserva y qué descarta | Al cerrar, descarta todo lo escrito. Al reabrir, el formulario vuelve a sus valores iniciales: vacío al crear, el registro guardado al editar. No se conservan borradores |
| Dónde se administra | Valores y errores: Mantine Form (`reset` restablece valores y limpia errores). Abierto o cerrado: estado local de React de la pantalla que lo abre (PROPUESTA, sin confirmar); **no va a Zustand** |
| Comportamiento por defecto de Mantine | Cierre por clic fuera y por Escape activos, y contenido desmontado al cerrar: según la documentación consultada, **por comprobar contra la 9.4.1** |
| Consecuencia aceptada | Si alguien cierra el Modal por error pierde lo escrito; con tres campos es aceptable en la primera versión. Mejora futura: confirmar si hay cambios sin guardar |

### 26.3 Modal de confirmar publicar (DECISIÓN CONFIRMADA D64; detalles de fallo PROPUESTOS)

| Aspecto | Descripción |
|---|---|
| Propósito | Confirmar la publicación del año (RN-33 de E3) |
| Quién lo abre | El analista, desde P2, si las seis fases están revisadas (D66). Con alguna fase sin revisar, el botón «Publicar» no abre el Modal y el mensaje nombra la fase que falta (EJ-15; texto PROPUESTO) |
| Contenido | El mensaje fijado en D41: «¿Publicar los resultados del año [año]? Rectorado y Decano pasarán a verlos y se sustituirá lo publicado antes de ese año.», con los botones Confirmar y Cancelar. Qué año muestra: PROPUESTA, el año de trabajo del analista (D69), sin confirmar |
| Cancelar antes de confirmar | No se publica y nada cambia (CA-38, EJ-16). Que el Modal se cierre en ese caso es una decisión de diseño, no una regla de E3 |
| Al confirmar | El Modal permanece abierto con el botón en estado «publicando» y **no puede cerrarse** (ni con la X, ni con Escape, ni con clic fuera; el botón Cancelar queda deshabilitado) hasta que haya resultado |
| Éxito | Se cierra y P2 refleja la publicación |
| Fallo | Permanece abierto con un mensaje. El texto y el comportamiento tras el fallo (propuesta: se habilita el cierre y lo ya publicado no cambia) son **PROPUESTOS, sin aprobar** y tocan el pendiente 4 de E3. Sin botón «Reintentar» (D64; sería un cambio funcional) |
| Qué administra el estado | Abierto o cerrado: estado local de React (PROPUESTA). «Publicando» y error: relación con el estado de la mutación sin decidir (D64, D65) |
| Estado hoy | **No existe servicio de publicación**; se diseña el estado del Modal y no se afirma que funcione ni que se haya probado |
| Riesgo declarado | Si el servicio no responde, el Modal queda bloqueado en «publicando»: plazo de espera y qué se muestra al agotarlo, sin decidir (T3, pregunta 9) |

No es obligatorio que todo formulario viva en un Modal ni que todos los modales dependan de Zustand: aquí ninguno de los dos Modales usa Zustand.

## 27. Recorridos técnicos y sincronización con TanStack Query

Todos son **diseño previsto**; los que dependen de un servicio están condicionados a que exista, y no se simula ningún servicio en la aplicación (D71). No se usa `useEffect` para copiar respuestas, disparar consultas administradas por Query ni mantener filtros derivados.

### 27.1 Recorridos principales

| Recorrido | Pantalla y acción | Validación | Acceso a datos | Estado | Resultado visible | Condición |
|---|---|---|---|---|---|---|
| R1 · Cargar el conjunto del año (CU1) | P1: el analista indica el año y selecciona los archivos | Función pura (PROPUESTA): el año está indicado y cada archivo requerido está seleccionado, sin leer su contenido (D67) | Subida: mutación hacia un servicio que no existe | Archivos: estado local (PROPUESTA); año: `?anio` | Lista de archivos que faltan (MS-01, texto propuesto) | Subida **BLOQUEADA**; la comprobación del cliente es una comodidad, no una garantía |
| R2 · Ver el estado del cálculo (CU1) | P2: abrir con un año | — | Consulta `['calculo', año]` (apartado 27.3) | Datos del servidor en Query | Uno de los estados de la interfaz | Condicionado a que exista un servicio |
| R3 · Revisar una fase y marcarla (CU2, PR-02) | P3 y P2 | — | — | — | — | **Sin diseñar (D74)** |
| R4 · Registrar una anomalía (CU3) | P3 o P4: «Registrar anomalía» abre el Modal | Schema Zod por Mantine Form; duplicado aparte | Guardado: servicio de persistencia inexistente | Valores: Mantine Form; Modal: estado local | Errores por campo, aviso de duplicado o cierre con la lista actualizada | Guardado **BLOQUEADO** |
| R5 · Editar una anomalía (CU3) | P4: «Editar» abre el Modal con el registro | Igual que R4 (CA-32) | Igual que R4 | Igual que R4 | Igual que R4 | Igual que R4 |
| R6 · Publicar los resultados (CU4) | P2: «Publicar» → Modal de confirmar | Decisión del botón (función pura, PROPUESTA): seis fases revisadas o fase que falta | Mutación de publicar (apartado 27.4) | «Publicando» y error: sin decidir su dueño | Modal que se cierra y P2 que refleja la publicación; o mensaje de fallo | Publicar **BLOQUEADA** |
| R7 · Consulta de Rectorado (CU5) | P5 a P7: ve los tableros, elige año y facultades, descarga CSV | Selección contra los años publicados y las facultades vigentes | Identidad por Query; tableros: datos de ejemplo locales | Selección: Zustand; año mostrado: derivado | Tablero con año y fecha; aviso de año por defecto o etiqueta «No existen datos procesados.» (RN-43) | Tableros reales **BLOQUEADOS** |
| R8 · Consulta del Decano (CU6) | P5 a P7: igual, sin filtro por facultad | La facultad llega de la identidad | Identidad por Query | Selección: solo el año | Solo las carreras de su facultad, o el mensaje de RN-41 si no tiene facultad | Garantía de alcance **depende del servidor** (D54) |

### 27.2 Consulta remota requerida: identidad (DECISIONES CONFIRMADAS D53 y D62)

| Elemento | Diseño |
|---|---|
| Datos de entrada | El usuario consultado (su origen está pendiente y fuera del alcance del autor) |
| Query key (identidad de los datos) | `['autoridad', usuario]` |
| Función de consulta | GET con el usuario en la ruta (contrato (b), **HIPÓTESIS**). No se fija ninguna dirección |
| Condición de ejecución | `enabled` mientras exista usuario |
| Qué devuelve | La autoridad del usuario; la interfaz usa de ella el rol y la facultad (apartado 25.4) |
| Dónde se guarda la respuesta | Solo en la caché de Query. **No se copia a Zustand ni a otro estado** |

Estados que representa la interfaz (cinco):

| Estado de la interfaz | Cuándo ocurre | Qué ve el usuario |
|---|---|---|
| 1. Sin usuario todavía | No hay usuario; la consulta no se ejecuta | No se muestran tableros (guardia visual, no autorización). Qué se ve exactamente: sin decidir (T4, pregunta 12) |
| 2. Cargando | La consulta se está ejecutando | Indicación de carga. Con `enabled` en falso la consulta queda pendiente pero no «cargando» (según la documentación consultada), por eso se distingue del estado 1 |
| 3. Error | La consulta falla | Estado y mensaje propios, **sin «Reintentar»** (D62). Texto PROPUESTO, sin aprobar. Reintentos automáticos por defecto de Query: por comprobar |
| 4. Éxito sin facultad asignada | Responde pero el Decano no tiene facultad | «Tu usuario no tiene una facultad asignada. No hay carreras para mostrar.» (RN-41, texto aprobado) |
| 5. Éxito con facultad | Responde con facultad | Los tableros de esa facultad (el alcance real lo garantiza un servidor) |

El paso «resultado de la consulta → uno de estos cinco estados» se escribiría como una función pura (PROPUESTA, T4 pregunta 13) para poder probarlo sin DOM; la conexión real con Query quedaría sin probar. Plan alternativo si el contrato (b) se descarta: usar el contrato (a) o acordar un ajuste de alcance con el docente (detalle pendiente).

### 27.3 Consulta del estado del cálculo (DECISIÓN CONFIRMADA D68; condicionada a un servicio)

| Elemento | Diseño |
|---|---|
| Datos de entrada | El año de trabajo, leído del parámetro `?anio` (D69) |
| Query key | `['calculo', año]` |
| Función de consulta | Sin contrato: no existe servicio. Sondeo periódico: sin decidir |
| Condición de ejecución | Sin decidir qué ocurre si el año falta o es inválido |
| Estados de la interfaz | **En curso** (estado de la interfaz, de carga, no del negocio), **completado**, **detenido en la fase N con el control que falló** (RN-05, MS-03 propuesto) y **error de archivo** (RN-07; MS-01 y MS-02 propuestos). El fallo de la propia consulta (por ejemplo de red) no está cubierto por D68: sin decidir |
| Vacío | Qué ve P2 sin cálculo o tras un error de archivo (¿el cálculo anterior de ese año o nada?): E1 no lo dice; sin decidir |

### 27.4 Mutación de publicar y sincronización (DECISIÓN CONFIRMADA D65; diseño previsto condicionado)

**No existe servicio de publicación (D54): el diseño no se afirma probado ni funcionando, y no se usa ninguna función simulada que «publique».**

| Pregunta de la consigna | Diseño previsto |
|---|---|
| Qué modifica | La publicación del año (sustituye la anterior de ese mismo año, RN-37) |
| Cuándo se considera confirmado el cambio | Cuando la mutación de TanStack Query termina con éxito |
| Qué consultas quedan desactualizadas | Las de P2 y las de los años publicados |
| Cómo se sincronizan | Al confirmarse, se invalidan esas consultas para que se vuelvan a pedir. Según la documentación consultada, devolver la promesa de la invalidación mantiene la mutación pendiente hasta que termine la nueva petición (por comprobar en la 5.102.8) |
| Qué no se hace | No se actualiza a mano una copia local de P2 (alternativa descartada) |
| Pendientes | Contrato del servicio; nombres de las consultas a invalidar (la del estado del cálculo es `['calculo', año]`, de T1); relación del estado «publicando» con el estado de la mutación y con el plazo de espera |

La subida de archivos (R1) sería también una mutación hacia un servicio inexistente (D67); si se modela con Query y qué consultas invalidaría queda sin decidir (T1, pregunta 8). Registrar, editar y eliminar anomalías también modificarían datos remotos mediante un servicio de persistencia que no existe; si se modelan como mutaciones de Query y qué invalidarían no está decidido (T2, pregunta 5). En las fuentes aprobadas, las operaciones de Rectorado y Decano son de consulta y no modifican datos remotos, por eso en P5 a P7 no se inventa ninguna mutación.

## 28. Estrategia de verificación y límites de evidencia

**Nada de lo que describe este apartado se ha ejecutado.** Un test previsto no es un test ejecutado, y el build de la plantilla (`pnpm build`) solo demuestra que el código compila: no demuestra navegación, store, consulta remota, formularios ni Modales. No se muestran capturas ni resultados porque no existen.

### 28.1 Tipos de comprobación y qué demuestra cada una

| Tipo | Herramienta o entorno | Qué puede demostrar | Qué NO demuestra | Estado hoy |
|---|---|---|---|---|
| Pruebas puras (schemas y funciones) | Vitest (versión pendiente; no instalado). Sin DOM y sin infraestructura nueva por defecto | Que un schema o una función da el resultado esperado para entradas dadas | Que la pantalla muestre el resultado; que Query, Router o Mantine funcionen | No ejecutadas |
| Build | `pnpm build` (`tsc -b && vite build`) | Que el código compila | Cualquier comportamiento | Solo la plantilla pasó en la Fase 2 (observado por el autor); no hay build de código del producto |
| Recorrido de navegador | Servidor de desarrollo (`pnpm dev`) y navegador | Que el usuario ve y hace lo previsto en pantalla | Garantías del servidor (permisos, alcance del Decano) | No ejecutado |
| Pruebas de componentes (estados de carga y error, Modal «publicando») | Requeriría un entorno de DOM y una librería de pruebas de componentes que no están en la cohorte | Comportamiento de componentes | — | **Viabilidad por comprobar (D71)**; no se instala infraestructura adicional por defecto |
| Petición real | Un servicio disponible | Que el contrato funciona | — | **No es posible hoy**: no hay servicio verificado |
| Despliegue | — | — | — | **No decidido** (apartado 29) |

**Regla de no simular servicios (D71):** la aplicación no simula ningún servicio; los dobles de prueba pueden existir solo dentro de las pruebas, etiquetados como tales, y no se presentan como estado remoto. Los datos de ejemplo de los tableros son datos locales rotulados (D54), no un servicio simulado.

### 28.2 Matriz de comprobación prevista

| Criterio funcional | Comprobación prevista | Resultado esperado | Herramienta o entorno | Límite de la evidencia |
|---|---|---|---|---|
| CA-02, CA-08 (lado del cliente), MS-01 propuesto | Función pura de archivos faltantes: ninguno falta, falta uno, faltan varios, no hay ninguno | Devuelve exactamente los que faltan | Vitest | No lee el contenido de los archivos; el dato faltante dentro de un archivo (MS-02) y las columnas dependen del servicio. Es una comodidad, no una garantía |
| CA-30, EJ-13 | `safeParse` del schema con fase, descripción o referencia vacías | Falla en el campo vacío y el mensaje es el de ese campo | Vitest; después recorrido de navegador | El texto del mensaje es propuesto; el recorrido no se ha hecho |
| CA-23, EJ-11 | `safeParse` con la entrada de EJ-11 | Pasa | Vitest | El guardado real y la fecha del producto dependen de un servicio |
| CA-25, CA-32, EJ-12 | Función de comparación de duplicados con mayúsculas distintas y al editar | Detecta el duplicado y no el caso distinto | Vitest | Solo vale con la lista de registros disponible en el cliente; la garantía real es del servicio (T2, pregunta 3) |
| Modal de anomalía (D59; CA-25, CA-30) | Abrir; cancelar con Cancelar, X, Escape y clic fuera; reabrir | Al reabrir, el formulario vuelve vacío (crear) o al registro guardado (editar); error o duplicado mantienen el Modal abierto con lo escrito | Recorrido de navegador | Defaults de Mantine por comprobar contra la 9.4.1; pruebas de componentes: viabilidad por comprobar |
| Botón «Publicar» (CA-34, CA-35, EJ-14, EJ-15) | Función pura que decide si abre el Modal o qué fase falta; recorrido con las seis fases revisadas y con una sin revisar | Con las seis, abre el Modal; con una sin revisar, no abre y nombra la fase | Vitest; recorrido de navegador | Qué datos usa el navegador sin servicio: sin decidir (T3, pregunta 17). Que solo el analista publique es del servicio (CA-47) |
| Modal de confirmar (CA-37, CA-38, EJ-16) | Texto fijo; abrir y cancelar sin cambios | El texto es el de RN-33 y cancelar no cambia nada | Vitest para el texto; recorrido de navegador | El estado «publicando» (cierre bloqueado) requiere pruebas de componentes: por comprobar. La publicación real requiere servicio |
| Navegación (D58, D69) | Recorrer P1 a P4 y P5 a P7 conservando el layout; abrir una ruta desconocida; abrir P3 con una fase; leer y cambiar `?anio` | Cada pantalla se muestra en su layout; la ruta desconocida muestra su pantalla | Recorrido de navegador | Una guardia visual no es autorización; el comportamiento al abrir o recargar directamente está sin decidir |
| Store de Zustand (D57; CA-57, CA-58, CA-59, CA-61, CA-65; EJ-18, EJ-21, EJ-22) | Acciones de elegir año, elegir facultades y limpiar; función pura del año por defecto; recorrido entre los tres tableros; recarga | La misma selección se ve en los tres tableros; el año por defecto sigue RN-43; la selección se pierde al recargar | Vitest; recorrido de navegador | Los datos son de ejemplo locales; la recarga es una consecuencia declarada, no un defecto detectado |
| Consulta remota de identidad (CA-49 a CA-53, EJ-23) | Función pura «estado de la consulta → uno de cinco estados de la interfaz», con dobles de prueba etiquetados | Cada entrada da el estado esperado, incluido el Decano sin facultad (mensaje de RN-41) | Vitest | **La conexión real con TanStack Query queda sin probar**; la petición real no es posible hoy; el estado de error y el reintento por defecto se comprobarán aparte |
| Estado del cálculo (CA-01, CA-03, EJ-02) | Función pura análoga para los estados de la interfaz | Cada entrada da el estado esperado | Vitest (viabilidad por comprobar) | El estado real del cálculo, la detención por falla de control y el reemplazo requieren servicio |
| Descarga CSV (RN-46, CA-62) | Función pura de proyección de columnas | El CSV tiene las columnas de la tabla vista y ninguna de nombres, puestos ni sueldos individuales | Vitest | No prueba qué datos entrega el servidor; si el navegador ya recibió los nombres, excluirlos del CSV no los protege |
| Alcance del Decano (CA-50 a CA-52) | — | — | — | **No comprobable en el cliente**: requiere un servidor que filtre (D54) |
| Sincronización tras publicar (CA-39, CA-41, CA-48, EJ-17) | — | — | — | **No comprobable sin servicio**: sustitución por año, cálculo nuevo que falla y solo lectura (CA-46) son garantías del servicio |
| Revisión por fases (PR-02; CA-13 a CA-17, CA-19) | — | — | — | **Sin diseño técnico ni comprobación prevista** (D74) |

### 28.3 Lo ejecutado frente a lo previsto

- **Ejecutado y real:** las comprobaciones del entorno y de lectura del apartado 10.2 y, en la Fase 2, el build de la plantilla. Nada de ello comprueba el producto.
- **Previsto y no ejecutado:** todo lo de la matriz anterior.
- **Imposible hoy:** toda comprobación que necesite un servicio de carga, cálculo, publicación, tableros o validación de columnas, o el contrato de identidad.

## 29. Plan de construcción, dependencias y riesgos

Este plan es una PROPUESTA del asistente derivada de las etapas de T1 a T4 (T1 a T4 aprobados, D75 a D78), reordenada por dependencias. **No autoriza instalar, implementar ni desplegar nada**: la implementación necesita una autorización separada. No se asignan fechas. La columna «Origen» remite a las etapas de cada documento técnico.

### 29.1 Etapas

| Etapa | Objetivo | Requisitos cubiertos | Archivos o módulos previstos | Criterio de cierre observable | Bloqueos externos o decisiones previas | Origen |
|---|---|---|---|---|---|---|
| 0 | Decidir y autorizar la instalación de las dependencias propuestas y de Vitest | Todas las herramientas obligatorias | `package.json` | El autor y el docente autorizan por escrito; se fija la versión de Vitest | Autorización separada; versión de Vitest; compatibilidad entre versiones sin verificar; qué más exige `@mantine/core` | — |
| 1 | Base: dependencias instaladas, arranque con router, cliente de consultas y, si hace falta, tema | Stack del apartado 21 | `main.tsx`, `app/` | `pnpm build` pasa con las dependencias instaladas y la aplicación arranca con una ruta vacía | Etapa 0 | — |
| 2 | Layouts y rutas con pantallas vacías | D58, D69 | `layouts/`, `paginas/`, `app-router.tsx` | Se navega entre P1 a P4 y entre P5 a P7 conservando su layout, y la ruta desconocida muestra su pantalla | Nombres de ruta; qué muestra la raíz; comportamiento al abrir una URL directamente | T2 etapa 1, T4 etapa 1 |
| 3 | Schema de la anomalía con pruebas puras | RN-30; CA-23, CA-25, CA-30, CA-32; EJ-11 a EJ-13 | `validaciones/anomalia-schema.ts`, `duplicado-anomalia.ts` | Las pruebas de EJ-11, EJ-12 y EJ-13 pasan | Etapa 0; mensajes sin aprobar; longitud y espacios sin definir; dónde se comprueba el duplicado | T2 etapa 2 |
| 4 | Formulario con Mantine Form y `schemaResolver`, sin Modal | RN-30 | `FormularioAnomalia.tsx` | Los errores aparecen en cada campo vacío y el envío válido no muestra errores | Etapa 3; qué componente selecciona la fase | T2 etapa 3 |
| 5 | Modal de anomalía con su ciclo de cierre | D56, D59 | `ModalAnomalia.tsx` | Cancelar, X, Escape y clic fuera descartan lo escrito; error y duplicado mantienen el Modal abierto | Etapa 4; defaults de Mantine contra 9.4.1 | T2 etapa 4 |
| 6 | Store de selección y año por defecto | D57; RN-43; EJ-18, EJ-21, EJ-22 | `stores/seleccion-consulta-store.ts`, `anio-por-defecto.ts` | Las pruebas del año por defecto y de las acciones pasan | Etapa 0; fuente de la lista de facultades | T4 etapa 2 |
| 7 | Consulta de identidad y sus cinco estados | D53, D62; RN-41 | `use-autoridad.ts`, `servicios/autoridad-service.ts`, `estado-identidad.ts` | La función pura da el estado esperado en las pruebas; la conexión real **no se da por probada** | Contrato (b), acceso desde el navegador, autenticación y origen del usuario | T4 etapa 3 |
| 8 | Tableros P5 a P7 con datos de ejemplo ficticios y navegación entre ellos | RN-49; CA-65 | `paginas/consulta/`, `datos-ejemplo/` | Se navega entre los tres tableros con la misma selección | Etapas 2, 6 y 7; contenido de los datos de ejemplo; qué se ve sin identidad | T4 etapa 4 |
| 9 | Descarga CSV | RN-46; CA-62 | `columnas-csv.ts` | La prueba de proyección de columnas pasa | Nombre del archivo, separador y codificación | T4 etapa 5 |
| 10 | P1: año y archivos requeridos, con la función pura de archivos faltantes | D67; CA-02, CA-08 | `CargaAnio.tsx`, `archivos-faltantes.ts` | Con una selección incompleta se observa la lista de archivos que faltan | Lista final de archivos (pendientes 6, 7, 8 de E1); qué es un año válido; textos de MS-01 | T1 etapas 1 y 2 |
| 11 | Botón «Publicar» y Modal de confirmar | D64, D66; CA-34, CA-35, CA-37, CA-38 | `BotonPublicar.tsx`, `ModalConfirmarPublicar.tsx`, `decision-publicar.ts` | Con una fase sin revisar se ve el mensaje y no abre el Modal; con las seis, abre el Modal; cancelar no cambia nada | Qué datos usa P2 sin servicio; composición de P2 sin dueño; textos | T3 etapas 1 a 3 |
| 12 | Lista de anomalías de P4 con filtro por fase | RN-31 | `AnomaliasRegistradas.tsx` | Se ve la lista y se filtra por fase | Qué datos usa sin servicio; propiedad del filtro | T2 etapa 5 |
| 13 | **BLOQUEADA** · Integración con servicios (subida, estado del cálculo, publicar con invalidación, persistencia de anomalías, tableros reales, identidad real) | D65, D67, D68 | `servicios/`, hooks de Query | Una petición real funciona y se prueba | Existencia de cada servicio y de su contrato | T1 etapa 4, T3 etapa 4 |
| — | **No programada** · Revisión por fases (PR-02) y tablero de fase | RN-23 a RN-28 | — | — | Abierto y sin diseñar (D74); consulta al docente | — |

Orden por dependencias: 0 → 1 → 2; la cadena de la anomalía (3 → 4 → 5 → 12) y la cadena de la consulta (6 → 7 → 8 → 9) pueden avanzar de forma independiente tras la etapa 2; la etapa 10 y la etapa 11 dependen solo de las etapas 1 y 2; la etapa 13 depende de servicios que hoy no existen.

### 29.2 Publicación y despliegue

**PENDIENTE DE DECISIÓN.** El alcance de publicación o despliegue de la aplicación no está decidido: no hay destino propuesto, variables necesarias ni comprobaciones de navegación y servicios allí. Si el autor decide incluirlo, el plan deberá indicar el destino, las variables necesarias y qué se comprobará allí. Este documento no autoriza crear cuentas, pagar servicios ni desplegar, y no añade infraestructura.

### 29.3 Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| No existen servicios de tableros, publicación, carga, cálculo ni validación de columnas | Estados diseñados; datos de ejemplo locales rotulados (D54); no simular servicios (D71); acordar el ajuste de alcance con el docente |
| El contrato GET de identidad puede no existir o no ser accesible desde el navegador | Plan alternativo declarado (contrato POST o ajuste de alcance); estados de error y de carga diseñados |
| Las versiones fijadas no coinciden con las consultadas y su compatibilidad no está verificada | Comprobar contra cada versión al instalar; build y pruebas puras; consultar la documentación de Zod 4.4.3, que falta |
| Probar los estados de una consulta puede exigir infraestructura que la consigna no da por defecto | Funciones puras sin DOM; declarar que la conexión real queda sin probar; consultar si la consigna permite infraestructura adicional |
| Una guardia visual se confunde con autorización | Declararlo (apartado 23); registrar que la garantía depende del servidor |
| Datos personales: los tableros muestran nombres y puestos en pantalla y el CSV no | Datos de ejemplo ficticios; advertir que excluirlos del CSV no protege datos ya entregados al navegador |
| Mezclar datos de ejemplo con estado remoto | Aislarlos, rotularlos y no pasarlos por Query ni Zustand |
| El Modal de publicar queda bloqueado en «publicando» si el servicio no responde | Decidir plazo de espera y qué se muestra al agotarlo antes de construir la etapa 11 |
| La pantalla P2 reúne tres partes sin dueño | Decidir su composición antes de construir P2 |
| Cierre accidental del Modal de anomalía pierde lo escrito | Aceptado en la primera versión; mejora futura: confirmar si hay cambios sin guardar |
| Cambios en la lista final de archivos requeridos | Mantener la lista como dato y no como código fijo (propuesta de T1) |
| Selección obsoleta si cambia la lista de facultades | Validar la selección contra la lista vigente al derivar (propuesta de T4) |
| PR-02 queda comprometida en lo funcional y sin diseño técnico | Declararlo (apartados 8.4 y 30); consultar al docente si debe diseñarse o puede declararse como no cubierta |
| Los cuatro diseños están aprobados (D75 a D78) con sus preguntas abiertas, y cualquier documento aprobado vuelve a necesitar reconciliación si cambia su fuente o su cuerpo | Si una fuente cambia o un diseño queda por reconciliar, resolverlo y aprobar de nuevo antes de construir |
| El health automático de AHK falla en Windows (D63) | Declararlo; llevarlo al docente; el build real se comprueba ejecutando `health.bat` directamente, que es una comprobación separada |

## 30. Trazabilidad técnica y cambios respecto de la segunda entrega

### 30.1 Matriz de trazabilidad técnica

Todos los identificadores citados existen en las especificaciones funcionales aprobadas (E1 a E4) y en los documentos técnicos T1 a T4 (T1 a T4 aprobados, D75 a D78). «Pieza» remite al apartado 22 (PROPUESTA).

| Caso y regla | Especificación funcional | Especificación técnica | Pieza responsable | Herramienta | Criterio y comprobación previstos |
|---|---|---|---|---|---|
| CU1: RN-01, RN-07, RN-08 (lado del cliente: año indicado y archivos presentes) | E1 | T1 (D67) | P1; función pura de archivos faltantes | React; Mantine Core (componente sin decidir) | CA-02, CA-08, MS-01 (propuesto); Vitest |
| CU1: RN-05, RN-07 (estado del cálculo mostrado) | E1 | T1 (D68) | P2; hook del estado del cálculo | TanStack Query | CA-01, CA-03, EJ-02; función pura (viabilidad por comprobar); servicio bloqueado |
| CU1: RN-02, RN-03, RN-04, RN-06, RN-10 a RN-22 (cálculo, controles, reemplazo y visibilidad) | E1 (RN-03 de E3, RN-04 de E2) | T1 (los declara garantías del servicio, D60) | Sin pieza de cliente: corren en el servidor | — | CA-04 a CA-12; no comprobables en el cliente |
| CU2 · PR-02: RN-23 a RN-28 (revisión por fases) | E2 | **Sin especificación técnica en esta fase (abierto y sin diseñar; D73 revocado por D74)**. T2, aprobado (D75), lo declara no diseñado | — | — | CA-13 a CA-17, CA-19, CA-20, CA-33: sin comprobación prevista |
| CU3: RN-30 (campos, obligatoriedad y mensajes) | E2 | T2 (D55) | Esquema de anomalía; Formulario de anomalía | Zod; Mantine Form | CA-23, CA-30; EJ-11, EJ-13; Vitest y recorrido de navegador |
| CU3: RN-30 (duplicado, también al editar) | E2 | T2 | Función de duplicado | Zod (el schema no lo decide solo); Mantine Form | CA-25, CA-32; EJ-12; Vitest |
| CU3: RN-30 (ciclo del Modal) | E2 | T2 (D56, D59) | Modal de anomalía | Mantine Modal; React | CA-25, CA-30, CA-32; recorrido de navegador |
| CU3: RN-31 (solo el analista ve las anomalías) | E2 | T2 (layout del analista, D58) | Layout del analista; lista de P4 | React Router | CA-27; la garantía es del servicio |
| CU3: RN-32 (cálculo publicado solo de lectura) y RN-26 (cálculo detenido) | E2 | T2 (habilitación del formulario) | Estado del cálculo, dato del servidor | TanStack Query | CA-18, CA-31, CA-46; sin servicio, no comprobables |
| CU4: RN-24, RN-40 (botón «Publicar») | E3 (RN-24 de E2) | T3 (D66) | Botón «Publicar»; función pura de decisión | React; Mantine Core | CA-34, CA-35; EJ-14, EJ-15; Vitest y recorrido de navegador |
| CU4: RN-33 (confirmación) | E3 | T3 (D64) | Modal de confirmar publicar | Mantine Modal | CA-37, CA-38; EJ-16; recorrido de navegador |
| CU4: RN-37, RN-38, RN-39 (sustitución por año, cálculo nuevo que falla, contenido) | E3 | T3 (D65) | Hook de publicar; invalidación | TanStack Query | CA-39, CA-41, CA-48; EJ-17; sin servicio, no comprobables |
| CU4: RN-34, RN-35, RN-36 (sin retirar, sin aviso, año y fecha) | E3 | T3 (P2 no ofrece retirar) | P2 | React | CA-43, CA-44, CA-45; recorrido de navegador |
| CU5 y CU6: RN-41 (alcance por rol, Decano sin facultad) | E4 | T4 (D53, D62) | Hook de identidad; layout de consulta | TanStack Query; React Router | CA-49 a CA-53; EJ-20, EJ-23; función pura de estados |
| CU5 y CU6: RN-43, RN-44, RN-45 (año por defecto, fecha, filtro por facultad) | E4 (RN-36 de E3) | T4 (D57) | Store de selección; selector del layout de consulta | Zustand | CA-57 a CA-61; EJ-18, EJ-19, EJ-21, EJ-22; Vitest y recorrido |
| CU5 y CU6: RN-42, RN-47, RN-48, RN-49 (qué se ve, sin total para el Decano, contenido y enlace de los tableros) | E4 (RN-03 de E3) | T4 (D54, D58) | P5, P6 y P7; datos de ejemplo locales | React Router; Mantine Core | CA-54 a CA-56, CA-64 a CA-66; recorrido de navegador |
| CU5 y CU6: RN-46 (descarga CSV) | E4 | T4 | Función de proyección de columnas | React | CA-62, CA-63; Vitest |
| Todos los casos: navegación (layouts, parámetro de fase y `?anio`) | E1 a E4 | T2 (D58, D69), T4 (D58) | Router; layouts | React Router | Recorrido de navegador |

**Cobertura de herramientas obligatorias (todas con uso trazable):** React y React DOM (filas de P1, P2, P4 a P7); React Router (navegación, layouts, RN-31 y RN-41); TanStack Query (estado del cálculo, publicar, identidad); Zustand (RN-43, RN-45, RN-49); Zod (RN-30); Mantine Form (RN-30); Mantine Core y Mantine Modal (RN-30 y RN-33). Cada una tiene además su fila de comprobación en el apartado 21.4.

**Operaciones comprometidas sin diseño técnico en esta fase:** PR-02 (arriba) y las partes de PR-01 a PR-04 que dependen de un servicio inexistente (subida, cálculo, publicación y persistencia), que están diseñadas solo como previstas y bloqueadas.

### 30.2 Registro de cambios desde la segunda entrega

Las versiones anteriores (`fase-01.md`, `fase-02.md` y sus PDF) se conservan sin modificar. Este registro es distinto del apartado 20, que cubre la evolución de la primera a la segunda entrega.

**Cambios en este documento respecto de la Fase 2**

| Ref. | Qué cambió | Motivo | Fuentes afectadas | Revisión |
|---|---|---|---|---|
| a | Se cambian la portada del documento, la fecha (2026-11-10) y la versión (3.0) | Nueva entrega | Apartado 1 | Revisada y aprobada por el autor |
| b | Se añaden los subapartados 8.4 a 8.6, 9.2, 10.2 y la adición del apartado 20, y los apartados 21 a 30 | Índice obligatorio de la Fase 3 | Apartados 8, 9, 10, 20 a 30 | Pendiente de revisión del autor |
| c | Los apartados 2 a 7 y 11 a 19 se conservan sin cambios de contenido | Cambios funcionales: ninguno | Apartados 2 a 7 y 11 a 19 | — |

**Decisiones técnicas nuevas (no son cambios funcionales)**

| Ref. | Qué cambió | Motivo | Fuentes afectadas | Revisión |
|---|---|---|---|---|
| d | D52 a D72 (más D75 a D78, las aprobaciones de T2, T3, T4 y T1): fuentes remotas, identidad, tableros, formulario, Modales, Zustand, rutas, agrupación en cuatro documentos técnicos, publicación, carga, estado del cálculo, año en la URL, reparto de dueños y regla de no simular servicios (apartado 8.4) | Diseño técnico de la Fase 3 | T1 a T4; este documento | Cada decisión la confirmó el autor en la conversación del 2026-11-10. Los cuatro documentos técnicos están aprobados (D75 a D78); la aprobación no autoriza implementar nada |
| e | Creación de T1 a T4 como documentos técnicos, uno por cada E1 a E4 (D60) | Cada diseño apunta a una sola fuente funcional | T1, T2, T3, T4 | Los cuatro: approved (D75 a D78); conservan sus preguntas abiertas |
| f | D73: PR-02 y el tablero de fase de P3 salen del diseño técnico | Ver D73 (motivo del autor, textual, en proceso.md) | T1, T2, T3 y el registro de decisiones | **Revocada por D74** |
| g | D74: PR-02 vuelve al diseño técnico, abierto y sin diseñar; T1, T2 y T3 se restauraron a la versión anterior a D73 (idénticas byte a byte a la copia previa, según D74); D73 no se edita | Conservar el historial; la consigna dice «no ocultes la evolución» | T1, T2, T3 y el registro de decisiones | Consulta al docente sobre si PR-02 debe diseñarse técnicamente o puede declararse como no cubierta: sin decidir |
| h | D61, D63 y D72: el health automático de AHK 3.0.0 falla en Windows al lanzar `health.bat`; AHK no se actualiza; escrituras sin acción registrada del builder y ediciones de T2 y T4 por el lead (apartado 10.2) | Declarar el proceso real y el bloqueo del entorno | Registro de decisiones; apartado 10.2 | Pendiente de llevar al docente |

**Cambios funcionales que debieron volver a aprobarse**

| Ref. | Qué cambió | Motivo | Fuentes afectadas | Revisión |
|---|---|---|---|---|
| i | **Ninguno.** Ninguna fuente funcional (CU1 a CU6, E1 a E4) tiene una fecha de última actualización posterior al 2026-11-05T06:48:05.457Z, y el registro de decisiones no contiene decisiones funcionales entre D52 y D74 | — | — | — |

Lo que se evitó cambiar: no se añadió «Reintentar» (D62, D64: sería un cambio funcional y tendría que pasar por la revisión funcional), no se reformuló el mensaje de confirmación de la publicación y no se modificó E2 ni el caso 2 al excluir y restablecer PR-02. Los textos nuevos de mensajes (errores, campos obligatorios, fase faltante) son PROPUESTOS; si el autor los quiere como regla, deben pasar por la revisión de la especificación funcional correspondiente.

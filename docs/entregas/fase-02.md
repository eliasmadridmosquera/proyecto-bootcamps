# Fase 2 · Procesos y reglas del negocio — Panel Académico

> Documento acumulativo de la Fase 2, versión 2.0. Integra el contenido revisado de la primera entrega (apartados 1 a 10) y añade procesos, reglas, datos, validaciones, estados, cálculos, criterios de aceptación y trazabilidad (apartados 11 a 20). Describe comportamiento esperado: no hay nada implementado ni ejecutado.

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | Panel Académico (nombre **provisional**, declarado expresamente por el autor) |
| Entrega | Fase 2 · Procesos y reglas del negocio |
| Autor | Elías Emilio Madrid Mosquera (trabajo individual) |
| Cohorte | 6 |
| Fecha | 2026-11-05 |
| Versión del documento | 2.0 |
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

## 9. Decisiones propias y uso de IA

**Herramienta utilizada.** Claude Code con Agent Harness Kit 3.0.0 (skills ahk-spec y ahk-use-case y el MCP del proyecto).

### Regla que precisé: tolerancia de 0,01 (RN-06)

"La regla que quiero explicar es la de la tolerancia de 0,01. La elegí porque esta regla es importante ya que estamos trabajando en términos de dinero, y siempre se manejan 2 decimales (por los centavos). Esto implica que si hay una diferencia de hasta 0,01 entre dos totales se acepta, si la diferencia es mayor a dicho valor el control falla y el cálculo se detiene en esa fase. Es importante porque sirven para verificar que los valores calculados cuadren, es decir, la suma del sueldo que se reparte entre los términos del año debe ser igual al sueldo total de la persona. La regla salió luego de revisarlo en mis notebooks donde casi todos los cuadres usaban 0,01."

### Alternativa evaluada y motivo

"En mis notebooks había dos cuadres globales con tolerancia 1 y el resto con 0,01. La opción era mantener esa diferencia o unificar todo en 0,01, y yo elegí unificar para mantener consistencia entre todos los procesados."

### Comprobación realizada

"Lo comprobé con la última corrida (la del año 2026). En los dos cuadres globales, la diferencia fue prácticamente cero: en el de contratos (suma del archivo global contra la suma de sus categorías) fue menor que un centavo, y en el de sueldos (entrada contra salida) fue exactamente 0,00. Con la tolerancia de 0,01 ambos habrían pasado igual. Lo que no he comprobado es que ocurra lo mismo en otros años; eso queda como algo que sigo sin validar."

### Ejemplo válido

"La persona A recibe en el año un sueldo de $10.000,00; al ejecutar el procesamiento por término se obtiene: PAE $2.000,00 - PAOI $4.000,00 - PAOII $4.000,00. Al sumar en el cuadre se obtiene $10.000,00, es decir, la diferencia con el sueldo anual es de 0,00, que es menor o igual que la tolerancia de 0,01, y el control cuadra."

### Ejemplo inválido

"La persona A tiene un sueldo anual de $10.000,00, pero al procesar por término se obtiene PAE $1.999,98 - PAOI $4.000,00 - PAOII $4.000,00. Al sumar en el cuadre se obtiene $9.999,98, es decir, la diferencia con el sueldo anual es de 0,02, que es mayor que la tolerancia de 0,01. El control falla y el cálculo se detiene en esa fase (la fase 1), y el analista ve en el tablero el control que falló."

### Caso borde

"PAE $1.999,99 - PAOI $4.000,00 - PAOII $4.000,00 = $9.999,99. La diferencia es de 0,01, la cual se acepta, porque está dentro de la tolerancia (menor o igual que 0,01)."

### Qué cambió desde la fase 1

"El caso 1 se revisó y se reaprobó. Inicialmente hablaba de seis archivos originales y el cálculo real usa siete, más cinco archivos de apoyo y las versiones del año anterior de cuatro de ellos. Las reglas ahora están escritas y con identificadores. Antes la fase 1 describía el producto en general; ahora hay reglas compartidas, la clasificación de controles falla/aviso por fase (que antes solo vivía en mi código) y ejemplos válidos e inválidos. La tolerancia de 0,01 es una regla nueva, en la fase 1 no la mencionaba. La publicación es por año, lo que obligó a leer el caso 4 de una forma más precisa sin cambiarlo. Hay cuatro especificaciones aprobadas (E1 a E4), vinculadas a los seis casos, en lugar de solo los casos. Detalle de los datos de cada archivo que sube el analista: está en RN-08 de E1: las columnas obligatorias de cada uno de los siete archivos originales; antes solo se decía que eran obligatorios, sin decir cuáles; para los cinco archivos de apoyo solo se dijo que sus datos obligatorios son los de cada tabla, y el detalle de columnas sigue pendiente. Contenido de los tableros: está en RN-28 de E2 (las pestañas de los seis tableros de fase) y en RN-49 de E4 (los tres tableros finales, con sus pestañas); antes se hablaba de los tableros sin detallar qué mostraban; los tableros finales muestran nombres y puestos en pantalla, pero el CSV de descarga no. Las preguntas abiertas de la fase 1 que ahora tienen respuesta (año en curso, filtrar o agrupar, Decano, total institucional, descarga) son un cambio real. Como no recibí retroalimentación del docente, estos cambios los decidí yo al revisar mi propio trabajo. Lo que no cambió: los usuarios junto con sus roles se mantienen, con dos precisiones nuevas: un Decano ve una sola facultad, y cada facultad tiene un Decano y un subdecano con el mismo rol; la idea general del proyecto se mantiene."

### Lo que sigo sin validar

"La tolerancia de 0,01 solo se comprobó con la corrida de 2026, no con otros años. Persona con cargas y sin contrato: la regla que yo confirmé, pero no la he contrastado con mi jefa. Estudiantes que cambian de carrera: pendiente de confirmar con mi jefa. Orígenes sin confirmar: el reparto por defecto (aproximadamente 60 %, 34 % y 6 %, sin documento del análisis), el valor 100 del costo por hora, y el umbral de la línea base de 2024 (pendiente de la gerencia). Archivos y datos por decidir: el archivo de ajustes manuales, y si la lista de carreras, las movilidades y los componentes centrales van como archivo de apoyo o dentro del sistema; además, el detalle de columnas de los cinco archivos de apoyo. Mensajes comprensibles y ejemplos de las reglas restantes: solo se escribieron para algunas reglas. Nada de esto está ejecutado en un producto: las especificaciones describen el comportamiento esperado; no se afirma que funcione. Y la prueba de entorno (ahk health) no pasó: falló al lanzar health.bat; creo que es un error conocido de Windows de AHK 3.0.0, pero no lo comprobé más allá de esa salida."

## 10. Fuentes y comprobaciones de esta fase

### Casos de uso y especificaciones (identificadores y archivos)

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

### Comprobaciones

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

---
slug: "e1-carga-y-calculo-por-fases"
title: "E1 · Carga de archivos del año y cálculo por fases"
description: "Especificación funcional de la carga del conjunto anual de archivos, la comprobación previa, las seis fases del cálculo, sus controles (falla/aviso) y las reglas de costo y superávit o déficit por carrera."
spec_kind: spec
status: approved
created_at: "2026-11-05T04:14:29.275Z"
last_updated: "2026-11-05T04:53:21.308Z"
source_use_cases:
  - cargar-archivos-anio-calculo-por-fases
---
## Upstream use cases and scope

Caso fuente (aprobado, versión 2026-11-04T20:06:15.070Z): cargar-archivos-anio-calculo-por-fases (caso 1).

Alcance de E1:
- PR-01 · Cargar el conjunto anual de archivos y obtener el cálculo por fases. Actor: analista de la Gerencia de Planificación Estratégica, ya identificado con su rol. Inicio: el analista dispone del conjunto de archivos del año y decide cargarlo, indicando el año.
- Comprobación previa de archivos y datos obligatorios (error de archivo).
- Las seis fases del cálculo y sus controles: (1) contratos, (2) cargas, (3) costo de cada carga, (4) costo por categoría, (5) gestión docencia, (6) costo de clases y superávit o déficit por carrera.
- Resultado: resultados y tablero de cada fase disponibles para el analista, o un mensaje que indica qué archivo o dato falta o qué control de qué fase falló.

Fuera de E1 (otras especificaciones): revisión de tableros y anomalías (E2), publicación (E3), consulta de Rectorado y Decano (E4).

Etiquetas de este documento: RN = regla del negocio, PR = proceso, CA = criterio de aceptación, EJ = ejemplo. No reemplazan los identificadores de AHK. Reglas compartidas con otras especificaciones: RN-01 a RN-07; en esta especificación se definen RN-01, RN-02, RN-05, RN-06 y RN-07; RN-03 se define en E3 y RN-04 en E2, y E1 solo las referencia.

## Rules, exclusions, and acceptance criteria

### Proceso PR-01 (resumen)
1. El analista indica el año y sube todos los archivos del año a la vez.
2. El producto comprueba que estén todos los archivos y datos obligatorios (RN-08). Si falta algo: error de archivo, no se calcula nada y se indica qué archivo o dato falta (RN-07).
3. Si está todo, ejecuta las seis fases en secuencia, sin pausas, aplicando los controles de cada fase (RN-05, RN-06, RN-10 a RN-15).
4. Una falla detiene el cálculo en esa fase, indica qué control falló y no ejecuta las siguientes; el analista puede ver los tableros de las fases ya calculadas. Un aviso no detiene.
5. Al terminar quedan disponibles los resultados y el tablero de cada fase para el analista (la revisión es E2).
6. Si corrige un archivo, vuelve a subir el conjunto completo y se recalcula todo (RN-01, RN-02).
Distinción: éxito (cálculo completo), fallo por error de archivo (no se calcula nada), fallo por control (se detiene en la fase). Las anomalías de datos no bloquean (se calcula y el analista las revisa, E2).

### Reglas compartidas
- RN-01. Conjunto completo y de una vez. El conjunto del año se sube completo y de una vez; no se admiten cargas parciales. Motivo: el cálculo depende de todos los archivos. Procesos: PR-01. Referenciada por E2.
- RN-02. Reemplazo. El cálculo nuevo de un año sustituye al anterior. Procesos: PR-01. Referenciada por E2 y E3.
- RN-03. Visibilidad hasta publicar (definida en E3). Rectorado y Decano no ven un cálculo hasta que se publique y siguen viendo lo último publicado. E1 solo la referencia: el cálculo recién completado o recalculado no es visible para ellos.
- RN-04. Anomalías del cálculo en curso (definida en E2). Los registros de anomalías pertenecen al cálculo en curso. E1 solo la referencia.
- RN-05. Resultado de un control. Cada control termina en ok, aviso o falla. La falla detiene el cálculo en esa fase y el producto muestra qué control falló; el aviso no detiene y el analista lo revisa.
- RN-06. Tolerancia única. Todos los cuadres entre totales aceptan una diferencia de hasta 0,01 (2 decimales). Si la diferencia es mayor, el control falla. Es una sola regla para todos los cuadres; el valor 0,01 es un parámetro configurable.
- RN-07. Error de archivo frente a falla de control. El error de archivo se detecta antes de calcular (falta un archivo o dato obligatorio) y no calcula nada; la falla de control se evalúa sobre los resultados de una fase y detiene el cálculo en esa fase. Son comprobaciones distintas.

### Archivos y datos obligatorios
- RN-08. Archivos y datos obligatorios. Todos los archivos del conjunto son obligatorios, también los equivalentes del año anterior. Si falta un archivo o alguno de los datos obligatorios, es un error de archivo: no se calcula nada y se indica cuál falta.
  - Siete archivos originales: contratos del personal global, contratos de Admisiones, historial para fondo de reserva, cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes. Cuatro tienen además su equivalente del año anterior, también obligatorio: cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes. Los contratos no.
  - Cinco archivos de apoyo: carrera por persona, programas de postgrado, porcentajes de categorías, duración de carreras y NOVATOS de cada año. Sus datos obligatorios son los de cada tabla (el detalle de columnas queda pendiente).
  - Datos obligatorios de cada archivo original:
    - Contratos (global y Admisiones): identificador de la persona, cargo, remuneración, número de contrato, tipo de vínculo, unidad, fecha de inicio, fecha de fin, fecha de desvinculación, estado, total de ingresos y aporte patronal. Admisiones agrega un tipo.
    - Historial para fondo de reserva: persona, contrato, inicio y fin de la racha, años cumplidos y si aplica el fondo.
    - Cargas CTP: persona, términos, horas, tipo de actividad, nombre de la carga, unidad de la carga y si es una carga.
    - Planificación de clases de grado: persona, curso, término, paralelo, horas teóricas y prácticas, total de horas, porcentaje, aprobado, fecha de inicio y fecha de fin.
    - Clases de postgrado: persona, programa, horas, término y si es una carga.
    - Registros de estudiantes: curso, paralelo, profesor, código de estudiante, carrera, tipo y término.
  - Los grupos de personal (global, especiales, admisiones, autoridades, nombramientos, civiles y ocasionales) no son archivos que sube el analista: son salidas que el proceso genera a partir de los contratos del personal global y de Admisiones.

### Controles por fase
Los controles son los que el autor describió de su proceso actual, no un documento previo. No se añaden otros. Toda diferencia entre totales usa RN-06.

RN-10. Fase 1 · contratos (sueldo de cada persona por periodo).
- FALLA:
  - Coherencia de cada contrato (en cada grupo de personal: global, especiales, admisiones, autoridades, nombramientos, civiles y ocasionales): meses o días trabajados negativos o más de 12 meses en el año; fecha de fin anterior a la de inicio; sueldo cero o negativo, o remuneración vacía o en cero; contratos duplicados (misma persona, mismo contrato y mismas fechas); ingresos totales más aporte patronal distinto del sueldo total.
  - Cuadre del sueldo por término: la suma de los sueldos de los términos de una persona no es igual a su sueldo anual (en cada grupo); la suma del archivo global no es igual a la suma de sus categorías; una persona con sueldo anual sin filas por término, o al revés; término fuera de los permitidos, sueldo negativo o filas repetidas (persona, grupo y término).
  - Contrato principal por término: un término sin contrato principal o con más de uno; fechas del contrato fuera de la ventana de su término o días distintos de las fechas; persona con sueldo en un término sin contrato en ese término, o al revés.
  - Cuadre de personas del archivo de origen: una persona del archivo de origen no aparece en ninguna salida y no hay motivo conocido.
- AVISO: contratos clonados que se conservan; personas del archivo de origen fuera de las salidas pero con motivo conocido (por ejemplo, un tipo de personal que no se costea).

RN-11. Fase 2 · cargas (horas de clases de cada persona, incluida la cola del periodo anterior).
- Bloque A, cargas del año. FALLA: las horas de cada componente (carga horaria CTP, clases de grado, clases de postgrado) no son iguales a las de origen; persona sin identificador; término fuera de PAE, PAOI y PAOII; horas negativas; filas duplicadas exactas; clases de grado con fechas vacías o con fecha de fin anterior a la de inicio. AVISO: filas del CTP sin ningún término (no generan carga); filas con cero horas; profesores con tramos de fechas que se cruzan en el mismo curso (se suman igual); clases de grado con un tramo de más de 270 días (parámetro); clases de grado con aprobado distinto de sí (se suman igual, ver decisión pendiente).
- Bloque B, cola del periodo anterior (entra al año como un término aparte, RN-18). FALLA: las horas de cada componente no son iguales a las de origen multiplicadas por la fracción de días de la cola respecto del término; alguna fila no es del término de la cola o no es del año anterior; persona sin identificador u horas negativas; la fracción no está entre 0 y 1. AVISO: filas duplicadas exactas (actividades distintas que quedan iguales en ese periodo; se conservan); personas de la cola sin sueldo en el periodo de la cola (sus horas no se pueden costear).
- Bloque C, sueldos y cuadre con las cargas. FALLA: personas repetidas; sueldo cero o negativo; unidad sin sigla; la suma de sueldos de salida no es igual a la de los archivos de entrada. AVISO: identificación vacía o con formato dudoso; personas con cargas y sin sueldo (con el motivo: está en Admisiones o en Especiales y se procesa aparte, está en el personal global sin salida procesada, o no tiene contrato en ninguna parte, ver RN-17); personas con sueldo y sin cargas.

RN-12. Fase 3 · costo de cada carga (sueldo del término repartido entre las horas de ese término; la cola es un término aparte).
- FALLA, bloque A, costo: el costo repartido de una persona en un término no es igual a su sueldo del término; costo de una carga vacío, infinito o negativo; carga con costo en un término donde la persona no tiene sueldo; término fuera de PAE, PAOI, PAOII y la cola; el costo de las cargas más «Sin carga» no es igual al sueldo del término; carga «Sin carga» con horas, repetida por persona y término, o con monto distinto del sueldo del término.
- FALLA, bloque B, salida: filas repetidas por carga; cargas de la cola que no son del año anterior, o del año anterior que no son de la cola; horas de la salida distintas de las horas de las cargas con sueldo.
- FALLA, bloque C, cuadre del sueldo: el sueldo total no es igual al costo asignado más el sueldo sin carga; el sueldo anual de una persona no es igual a la suma de sus términos; persona con sueldo anual sin sueldo por término.
- AVISO, bloque D, excepciones: personas con sueldo y sin cargas, o con sueldo en un término sin horas (se asigna como «Sin carga»); cargas «Sin carga» (a gestión docencia) y «Sin carga (investigación)» (a investigación); cargas en un término sin sueldo (se les asigna cero y se marcan); cargas de personas sin sueldo y cargas de la cola de personas sin sueldo (no se costean); clases sin registros de estudiantes que se quitan antes de costear (ver decisión pendiente); clases de grado con relevo de profesores en el mismo curso que se costean (las horas son las de cada tramo y se suman); clases de grado con aprobado distinto de sí que se costean igual hasta confirmar la regla; personas y términos con costo por hora mayor a un umbral, parámetro con valor 100 (origen pendiente de confirmar).

RN-13. Fase 4 · costo por categoría (categorías D, I, V, GD, GI y GV).
- FALLA, bloque A, costo: el costo por categoría no suma el costo de entrada de la fase 3; una carga con costo por categoría distinto del costo de entrada de la carga; costo por categoría vacío, infinito o negativo.
- FALLA, bloque B, estructura: cargas repetidas, cargas de entrada que no están en la salida o al revés; filas repetidas (carga y categoría); porcentajes de categoría de una carga que no suman 100; categoría distinta de D, I, V, GD, GI o GV; horas de la salida distintas de las de entrada; término distinto de PAE, PAOI, PAOII y la cola.
- FALLA, bloque C, componente y contrato: carga sin componente estimado; con tipo de componente sin clasificar o fuera de la lista conocida; sin unidad académica del componente; sin unidad, puesto o tipo de contrato.
- FALLA, bloque D, carreras: filas repetidas en la tabla de carreras (persona, término y unidad de carga); cargas sin carrera; una persona con más de una carrera en el mismo término y unidad de carga.
- AVISO, bloque E: personas con carrera estimada porque no están en la tabla de carreras (se deben agregar); cargas con la carrera fuera de la unidad del contrato; cargas con el reparto de categorías por defecto (RN-19; origen por confirmar); cargas con el contrato del término más cercano porque la persona no tiene contrato en el término de la carga; filas de excepción de carrera aplicadas (personas con cambio de carrera durante el año; son filas del archivo de apoyo «carrera por persona», con una columna de motivo); filas de ajustes manuales de componente (ver pendiente); personas que cambian de unidad entre términos sin fila de excepción de carrera; clases de grado con relevo de profesores que se costean; clases de grado con aprobado distinto de sí que se costean igual hasta confirmar la regla (misma regla pendiente).

RN-14. Fase 5 · gestión docencia (categoría GD).
- FALLA, bloque A, costo GD: el costo GD asignado a las carreras no es igual al costo GD total; el costo por estudiante de una carrera no es la suma de sus partes (carrera, facultad y centrales); costo por estudiante vacío, infinito o negativo.
- FALLA, bloque B, estructura: filas repetidas por carrera; carreras de la lista que faltan; carreras sin estudiantes; el número de estudiantes de una carrera no es el número de estudiantes del año (los que solo están en la cola no cuentan).
- FALLA, bloque C, componentes: un componente que no se puede repartir (carrera fuera de la lista, facultad desconocida o tipo no reconocido); un componente con costo GD que no llega a ninguna carrera; una carga GD sin componente.
- FALLA, bloque D, estudiantes (en el año y en la cola): registros sin estudiante o sin carrera; carreras de los registros que no están en la lista de carreras; estudiantes con carrera sin facultad; carreras de los registros sin duración (salvo las movilidades).
- AVISO, bloque E: estudiantes quitados por haber pasado el plazo de su carrera; estudiantes quitados en una carrera y conservados en otra; cursos que quedan sin ningún estudiante tras el filtro; estudiantes con matrícula del año límite de su carrera que no están en NOVATOS (se conservan sin poder verificar su término de ingreso); estudiantes en más de una carrera (cuentan en cada una); estudiantes con registros en un solo término (cuentan como estudiante completo); carreras sin cargas GD propias (solo reciben costo de facultad y centrales); componentes centrales que no estaban en el proceso original; de la cola: estudiantes solo de la cola (no cuentan en el denominador), estudiantes de la cola quitados por plazo, cursos de la cola sin estudiantes, y estudiantes de la cola con matrícula del año límite sin ingreso conocido.

RN-15. Fase 6 · costo de clases y superávit o déficit por carrera.
- FALLA, bloque A, costo de clases: el costo por profesor y curso no suma el costo de las clases de grado de la fase 3; el costo de clases no queda asignado completo (estudiantes más cursos sin estudiantes más cola sin estudiantes); el costo real de las carreras no es clases más gestión docencia; costo de clases sin asignar a ninguna carrera; clases más gestión de clases no es igual al costo por estudiante y curso; costo de un estudiante vacío, infinito o negativo; el rubro de la cola sin estudiantes de la tabla del superávit no suma el de las filas de los estudiantes.
- FALLA, bloque B, superávit y déficit: el esperado de una carrera no es estudiantes por umbral; la diferencia no es esperado menos costo real; el indicador de superávit no coincide con el signo de la diferencia.
- FALLA, bloque C, estructura: filas repetidas por carrera; carreras de la gestión docencia que faltan en el superávit o al revés; carreras cuyo número de estudiantes no es el de la gestión docencia; estudiantes repetidos en una carrera; registros sin costo por estudiante.
- FALLA, bloque D, cursos y planificación: profesores y cursos con costo que no están en la planificación; profesores y cursos planificados con horas en cero; clases más gestión de clases no es igual a las horas planificadas; cursos sin estudiantes distintos de los de la fase 5 (en el año y en la cola).
- AVISO, bloque E: el costo de clases de la cola sin estudiantes queda fuera de los estudiantes del año, como rubro aparte; el promedio real del año se aparta más de 10 % de la línea base (parámetro); cursos con todos los profesores sin contrato (sin costo de clases); cursos de coteaching con un profesor sin contrato (costo parcial); cursos sin planificación, posibles itinerarios (sin costo de clases); profesores sin contrato con cursos planificados; filas de planificación con gestión de clases en cero o negativa; cursos que quedaron sin estudiantes tras el filtro de estudiantes antiguos (su costo se reparte entre las carreras de sus estudiantes); de la cola: cursos sin estudiantes, profesores sin costo (sin contrato o sin sueldo en la cola) y cursos con todos los profesores sin costo, con costo parcial o sin planificación.

### Reglas de costo
- RN-16. El sueldo no se pierde. Si una persona tiene sueldo en un término pero ninguna hora, se crea una carga «Sin carga» con cero horas que recibe el sueldo completo de ese término. Va a gestión docencia, o a investigación en la variante «Sin carga (investigación)».
- RN-17. Persona con cargas y sin contrato. Su costo no se asigna, se avisa y se muestra el motivo; no detiene el cálculo. Confirmada por el autor, pendiente de contrastar con su jefa.
- RN-18. Cola del periodo anterior (ver EJ-07). Las cargas que quedan del periodo anterior entran al año como un término aparte, con sus horas proporcionales a la fracción de días de la cola respecto del término. La fracción debe estar entre 0 y 1; fuera de ese rango, el control falla (RN-11, bloque B).
- RN-19. Reparto por categorías (ver EJ-08). El costo de cada carga se agrupa en las categorías D, I, V, GD, GI y GV con el reparto porcentual de la tabla de porcentajes de categorías (archivo de apoyo); los porcentajes de una carga deben sumar 100 (RN-13, bloque B). Reparto por defecto: se aplica a una carga cuando su tipo de carga no tiene ningún porcentaje en la tabla de porcentajes de categorías (todas sus categorías en cero). Se reparte solo entre las categorías de gestión: gestión docencia (GD), gestión investigación (GI) y gestión vinculación (GV), con proporciones aproximadas de 60 %, 34 % y 6 %; los valores exactos son parámetros del cuaderno actual y se escriben como parámetro configurable, no como constante. Al aplicarlo se registra un aviso (RN-13, bloque E) y el cálculo continúa. Origen del reparto por defecto: pendiente de confirmar (pendiente 5).
- RN-20. Conteo de estudiantes para gestión docencia (ver EJ-06). Solo cuentan los estudiantes del año; los que están solo en la cola del periodo anterior no entran en el denominador. Un estudiante en dos carreras cuenta en cada una. Un estudiante con registros en un solo término cuenta como estudiante completo (decisión del autor). Se quitan los estudiantes que pasaron el plazo de su carrera, con la duración de la carrera y el año de ingreso (NOVATOS y estudiantes a considerar). Lo que ocurre cuando un estudiante cambia de carrera no está definido aquí: es la decisión pendiente 1.
- RN-21. Superávit o déficit por carrera (ver EJ-05). Costo real = clases + gestión de clases + gestión docencia + costo de los cursos sin estudiantes (repartido entre las carreras de los estudiantes que tenían en los registros completos, en proporción a su número) + costo de la cola sin estudiantes (rubro aparte, no se reparte entre los estudiantes del año). Esperado = estudiantes de la carrera × umbral (línea base 2024). Superávit o déficit = esperado − costo real: positivo es superávit, negativo es déficit; si es exactamente cero, la carrera no cuenta como superávit. El umbral es un parámetro con origen y definición pendientes de la gerencia.
- RN-22. Horas de clases y gestión de clases (ver EJ-09). Costo de clases de grado de cada curso dividido entre los estudiantes del curso y separado en «clases» y «gestión de clases» según las horas planificadas. Horas de clases = horas por semana × porcentaje de dedicación × semanas (20 en periodo ordinario, 8 en el corto; parámetros). La gestión de clases es el resto de las horas planificadas; si da cero o negativa, se pone 0, las horas de clases son las totales y se registra un aviso. Un curso con varios profesores suma el costo de los que tienen contrato; el de un profesor sin contrato no se costea.
- Fórmula de la fase 3: costo por hora de una persona en un término = sueldo del término ÷ horas de ese término; costo de cada carga = sus horas × ese costo por hora.

### Parámetros configurables
0,01 (tolerancia, RN-06); 100 (costo por hora, origen pendiente); 270 días (tramo de clases de grado); 10 % (desvío respecto de la línea base); umbral de la línea base 2024 (sin valor, pendiente de la gerencia); 20 y 8 semanas (periodo ordinario y corto); proporciones del reparto por defecto de GD, GI y GV (aproximadamente 60 %, 34 % y 6 %; valores exactos del cuaderno actual, origen pendiente).

### Exclusiones
Reemplazar un solo archivo sin subir el conjunto; historial de publicaciones; comparar con el cálculo anterior; conservar anomalías entre cálculos; conexión directa a la base de datos institucional; integración con identidad institucional; gestión de usuarios y roles Webmaster/Visitante. La revisión de tableros, el registro de anomalías y la publicación son otras especificaciones. No se define aquí ninguna implementación técnica.

### Criterios de aceptación (comportamiento esperado; no se afirma ejecución)
- CA-01 (PR-01; RN-05, RN-10 a RN-15). Dado un conjunto completo de archivos del año, cuando el analista indica el año y lo sube, entonces el producto ejecuta las seis fases en secuencia y deja disponibles los resultados y el tablero de cada fase.
- CA-02 (PR-01; RN-07, RN-08). Dado un conjunto al que le falta un archivo o dato obligatorio, cuando el analista lo sube, entonces no se calcula nada y se indica qué archivo o dato falta (mensajes MS-01 y MS-02).
- CA-03 (PR-01; RN-05, RN-07). Dado que un control de una fase falla, entonces el cálculo se detiene en esa fase, se indica qué control falló (mensaje MS-03), no se ejecutan las siguientes y el analista puede ver los tableros de las fases ya calculadas (EJ-02).
- CA-04 (PR-01; RN-05). Dado un control con resultado aviso, entonces el cálculo continúa con las fases siguientes y el analista puede revisar el aviso.
- CA-05 (PR-01; RN-04). Dado un conjunto con anomalías de datos procesables, entonces se calcula igualmente y las anomalías quedan para revisión.
- CA-06 (PR-01; RN-02, RN-03). Dado un año con cálculo previo, cuando el analista sube un conjunto nuevo, entonces el nuevo reemplaza al anterior y Rectorado y Decano siguen viendo lo último publicado.
- CA-07 (PR-01; RN-03). Dado un cálculo recién completado o recalculado, entonces Rectorado y Decano no lo ven hasta que se publique.
- CA-08 (PR-01; RN-01). Dado un intento de subir solo una parte del conjunto, entonces no se calcula nada y se indica qué falta.
- CA-09 (PR-01; RN-06). Dado un cuadre cuya diferencia es de 0,01 o menos, entonces el control no falla por esa diferencia; si es mayor que 0,01, falla (EJ-02 y EJ-03).
- CA-10 (PR-01; RN-12, RN-16). Dada una persona con sueldo en un término y sin horas, entonces se crea la carga «Sin carga» con cero horas y el sueldo completo de ese término, y el cálculo continúa con un aviso (EJ-04).
- CA-11 (PR-01; RN-11, RN-17). Dada una persona con cargas y sin contrato, entonces su costo no se asigna, se muestra el motivo como aviso y el cálculo continúa.
- CA-12 (PR-01; RN-21). Dada una carrera cuya diferencia entre esperado y costo real es exactamente cero, entonces no cuenta como superávit (EJ-05, caso límite). Si la diferencia es positiva, cuenta como superávit; si es negativa, es déficit (EJ-05).

### Ejemplos ilustrativos (escritos por el autor; son ejemplos de la regla, no datos reales)
- EJ-01 (RN-12, CA-01; ejemplo válido). Persona A, término PAOI, sueldo del término 3.000,00 y 100 horas en ese término. El costo por hora es 30,00. Tiene una carga de 60 horas (1.800,00) y otra de 40 horas (1.200,00). La suma es 3.000,00, el control cuadra y el cálculo continúa.
- EJ-02 (RN-12, RN-06, CA-03 y CA-09; ejemplo inválido). El costo asignado de la persona A suma 2.999,98 en vez de 3.000,00. La diferencia es 0,02, mayor que 0,01, el control FALLA, el cálculo se detiene en la fase 3 y no se ejecutan las fases 4, 5 y 6. El analista ve los tableros de las fases 1 a 3.
- EJ-03 (RN-06, CA-09; límite). Si la diferencia fuera exactamente 0,01, el control no falla.
- EJ-04 (RN-16, CA-10). Persona B, término PAOII, sueldo 2.500,00 y ninguna hora. Se crea la carga «Sin carga» con cero horas y costo 2.500,00. El cálculo continúa con un aviso.
- EJ-05 (RN-21, CA-12). Carrera 01 con 100 estudiantes y un umbral de 2.000,00 (valor inventado solo para el ejemplo). El esperado es 200.000,00. Para simplificar, el costo de los cursos sin estudiantes y el de la cola sin estudiantes son 0,00.
  - Superávit (ejemplo válido): el costo real es 170.000,00 (clases 100.000,00 más gestión de clases 20.000,00 más gestión docencia 50.000,00). La diferencia es +30.000,00, y la carrera cuenta como superávit.
  - Déficit: el costo real es 210.000,00 (clases 130.000,00 más gestión de clases 30.000,00 más gestión docencia 50.000,00). La diferencia es -10.000,00, y la carrera no cuenta como superávit.
  - Límite: el costo real es 200.000,00 (clases 120.000,00 más gestión de clases 30.000,00 más gestión docencia 50.000,00). La diferencia es exactamente 0,00, y la carrera no cuenta como superávit.
- EJ-06 (RN-20). El estudiante 1 tiene registros en la Carrera 01 y en la Carrera 02: cuenta como un estudiante en cada una de las dos. El estudiante 2 solo tiene registros en la cola del periodo anterior: no cuenta en el denominador de ninguna carrera. El estudiante 3 tiene registros en un solo término del año: cuenta como estudiante completo.
- EJ-07 (RN-18, cola del periodo anterior). El término tiene 100 días y la cola del periodo anterior tiene 40 días, así que la fracción es 0,4. Una carga de 100 horas del periodo anterior entra al año como un término aparte con 40 horas. Cuadra con el control de la fase 2: las horas de la salida son las de origen por la fracción (100 × 0,4 = 40,00).
  - Ejemplo inválido: la fracción vale 1,2. Está fuera de 0 a 1 y el control FALLA; el cálculo se detiene en la fase 2.
- EJ-08 (RN-19, reparto por categorías). Una carga tiene un costo de 1.000,00 y el tipo de carga está en la tabla de porcentajes con D = 60, I = 30 y V = 10. El costo por categoría queda en D 600,00, I 300,00 y V 100,00. La suma es 1.000,00 y los porcentajes suman 100, así que el control cuadra.
  - Ejemplo inválido: los porcentajes de la tabla son D = 60, I = 30 y V = 5. Suman 95, no 100, y el control FALLA; el cálculo se detiene en la fase 4.
  - Ejemplo de reparto por defecto: si el tipo de carga no tiene ningún porcentaje, el costo se reparte entre GD, GI y GV con las proporciones aproximadas de 60 / 34 / 6. Un costo de 1.000,00 queda en GD 600,00, GI 340,00 y GV 60,00, y se registra un aviso; el cálculo continúa.
- EJ-09 (RN-22, horas de clases y gestión de clases). Un curso tiene 4 horas por semana, un porcentaje de dedicación de 50 % y 20 semanas (periodo ordinario). Las horas de clases son 4 × 0,5 × 20 = 40. Las horas planificadas del curso son 60, así que las horas de gestión de clases son 60 − 40 = 20. El costo del curso es 6.000,00 y se divide entre sus 20 estudiantes: 300,00 por estudiante.
  - Ejemplo límite: las horas planificadas son 30. La gestión de clases da 30 − 40 = −10; se pone 0 y las horas de clases son las totales (30). Se registra un aviso: gestión de clases en cero o negativa.
  - En un periodo corto las semanas son 8 en vez de 20.
Los ejemplos de las reglas restantes (distintas de RN-06, RN-12, RN-16, RN-18, RN-19, RN-20, RN-21 y RN-22) se completan en la revisión.

### Mensajes propuestos al analista (PROPUESTA, pendiente de confirmación del autor)
Lenguaje del analista, sin términos técnicos. Cada mensaje indica qué archivo, dato o control falló y cómo continuar.
- MS-01 · Archivo faltante (error de archivo). «Falta el archivo "nombre del archivo" (por ejemplo, "Cargas CTP del año anterior"). No se calculó nada. Súbelo junto con los demás archivos del año y vuelve a cargar el conjunto completo.»
- MS-02 · Dato obligatorio faltante (error de archivo). «En el archivo "nombre del archivo" falta el dato "nombre del dato" (por ejemplo, "fecha de inicio" en "Contratos del personal global"). No se calculó nada. Corrige el archivo y vuelve a cargar el conjunto completo.»
- MS-03 · Control fallido (falla de control). «El cálculo se detuvo en la fase N ("nombre de la fase"). Falló el control "descripción del control": detalle de lo que no cuadra. Las fases siguientes no se calcularon. Puedes ver los tableros de las fases anteriores para buscar el origen. Corrige el archivo y vuelve a cargar el conjunto completo.» Ejemplo con EJ-02: «El cálculo se detuvo en la fase 3 ("costo de cada carga"). Falló el control "el costo repartido de una persona no es igual a su sueldo del término": la persona A suma 2.999,98 y su sueldo del término es 3.000,00 (diferencia 0,02; se acepta hasta 0,01). Las fases 4, 5 y 6 no se calcularon.»
En los tres casos se puede corregir y reintentar subiendo el conjunto completo (RN-01, RN-02).

## Decisions and open questions

Decisiones confirmadas por el autor (referencia: docs/proceso.md): agrupación en cuatro especificaciones (E1 carga y cálculo; E2 revisión y anomalías; E3 publicación; E4 consulta de Rectorado y Decano); lista de archivos obligatorios y sus datos obligatorios (RN-08); los siete grupos de personal son salidas del proceso, no archivos; clasificación falla/aviso de los controles de las seis fases tal como se describe (RN-10 a RN-15); tolerancia única de 0,01 (RN-06); el valor 100 y los demás parámetros listados; un estudiante con registros en un solo término cuenta como completo; un estudiante en dos carreras cuenta en cada una; el reparto por defecto de categorías se aplica solo a GD, GI y GV, cuando todas las categorías del tipo de carga están en cero en la tabla de porcentajes (RN-19); ejemplos EJ-01 a EJ-09.

Pendientes (no son reglas firmes):
1. Qué ocurre cuando un estudiante cambia de carrera: pendiente de confirmar con la jefa del autor. No se escribe como regla firme.
2. RN-17 (persona con cargas y sin contrato): confirmada por el autor, pendiente de contrastar con su jefa.
3. Clases sin registros de estudiantes que se quitan antes de costear: las horas de la persona bajan y su sueldo se reparte entre sus otras cargas, o va a «Sin carga» si no le quedan; lectura pendiente de confirmar por el autor.
4. Clases de grado con aprobado distinto de sí: se costean igual hasta confirmar la regla; una sola decisión pendiente (fases 2, 3 y 4).
5. Orígenes sin confirmar: el valor 100 del costo por hora; la definición y el origen del umbral de la línea base 2024 (pendiente de la gerencia); el reparto por defecto de categorías (aproximadamente 60 % GD, 34 % GI y 6 % GV): origen según el autor, sin documento localizable; pendiente de confirmar. Según el autor, salió de un análisis previo de las cargas asignadas a los profesores durante el año, donde docencia representa aproximadamente 60 %, investigación 34 % y vinculación 6 %.
6. Archivo de ajustes manuales de componente: archivo propio y opcional (puede estar vacío) que no está en la lista de archivos de apoyo del caso 1; el autor decidirá si lo declara como archivo opcional o si se revisa el caso 1.
7. Lista de carreras, lista de «movilidades» y componentes centrales: hoy están dentro del proceso; el autor decidirá si van como archivo de apoyo o como parte del sistema.
8. Detalle de las columnas obligatorias de los cinco archivos de apoyo: solo se indicó que son los datos de cada tabla.
9. Los ejemplos de las reglas restantes (distintas de RN-06, RN-12, RN-16, RN-18, RN-19, RN-20, RN-21 y RN-22) y la confirmación de los mensajes MS-01 a MS-03 se completan en la revisión con el autor.

---
slug: "cargar-archivos-anio-calculo-por-fases"
title: "Cargar los archivos del año y obtener el cálculo por fases"
description: "El analista de la Gerencia de Planificación Estratégica sube el conjunto completo de archivos del año y el sistema ejecuta las seis fases del cálculo, desde los contratos del personal hasta el costo por carrera y el superávit o déficit."
spec_kind: use-case
status: approved
created_at: "2026-10-26T01:43:41.088Z"
last_updated: "2026-11-04T20:06:15.070Z"
---
## Actor, goal, and trigger

- Actor: analista de la Gerencia de Planificación Estratégica (ya identificado con su usuario institucional y rol; cómo se hace eso queda fuera).
- Objetivo: subir los archivos del año y obtener el cálculo completo, fase por fase, desde los contratos del personal hasta el costo por carrera y el superávit o déficit.
- Disparador: el analista dispone del conjunto de archivos del año y decide cargarlo.

Contexto: sistema de la Gerencia que calcula cada año el costo de la docencia por carrera y facultad (clases, gestión docente asociada) y si queda por encima o por debajo de lo esperado según número de estudiantes (superávit/déficit). Hoy se hace con cuadernos de Python manuales. Primera versión; fuera de alcance: ver lista de exclusiones.

## Preconditions and main flow

Precondiciones:

- El analista está identificado con rol de analista.
- Dispone del conjunto completo de archivos del año, todos obligatorios. Siete archivos originales: contratos del personal global, contratos de Admisiones, historial para fondo de reserva, cargas CTP (carga horaria), planificación de clases de grado, clases de postgrado y registros de estudiantes. De estos, cuatro tienen además su equivalente del año anterior, también obligatorio: cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes. Los contratos (global, Admisiones y fondo de reserva) no tienen equivalente del año anterior. Cinco archivos de apoyo: carrera por persona, programas de postgrado, porcentajes de categorías, duración de carreras y NOVATOS de cada año. Los datos obligatorios dentro de cada archivo están pendientes (fase de reglas).

Flujo principal:

1. El analista indica el año y sube todos los archivos del año a la vez.
2. El sistema comprueba que estén todos los archivos y datos obligatorios.
3. El sistema ejecuta las seis fases del cálculo una tras otra, sin pausas intermedias, aplicando los controles de cada fase. Las seis fases, en orden, son: (1) contratos: sueldo de cada persona por periodo; (2) cargas: horas de clases de cada persona, incluida la que queda del periodo anterior; (3) costo de cada carga: el sueldo repartido entre las horas; (4) costo por categoría: ese costo agrupado por tipo de actividad; (5) gestión docencia: el costo de gestión por estudiante y carrera; (6) costo de clases y superávit o déficit por carrera. Cada fase aplica controles, que son cuadres entre totales. Cada control termina en ok, aviso o falla. Una falla detiene el cálculo; un aviso no lo detiene.
4. Al terminar, quedan disponibles para el analista los resultados y el tablero de cada fase, listos para su revisión (caso aparte).
5. Los resultados no son visibles para Rectorado ni Decano hasta que el analista los publique (caso aparte).

## Alternatives, failures, and rules

Alternativas:

- Si el analista corrige un archivo, vuelve a subir el conjunto completo y se recalcula todo.
- Si ya existe un cálculo de ese año, el cálculo nuevo lo reemplaza.

Fallos:

- Error de archivo: falta un archivo obligatorio o información obligatoria. El sistema no calcula nada y muestra un mensaje con una referencia de qué archivo o dato falla.
- Falla un control de una fase: el sistema se detiene en esa fase, muestra qué control falló y no ejecuta las siguientes; el analista puede ver los tableros de las fases ya calculadas para buscar el origen del problema. Un control con resultado "aviso" no detiene el cálculo.
- Error de archivo y falla de control son comprobaciones distintas: el error de archivo se detecta antes de calcular y el control se evalúa sobre los resultados de una fase.
- Anomalía de datos (datos procesables pero con inconsistencias): NO bloquea el cálculo; el sistema calcula y el analista las revisa en el caso de revisión.

Reglas de negocio:

- El conjunto del año se sube completo y de una vez; no se admiten cargas parciales.
- El cálculo nuevo de un año sustituye al anterior.
- Rectorado y Decano siguen viendo lo último publicado hasta que se publique el cálculo nuevo.
- Los registros de anomalías pertenecen al cálculo en curso; al recalcular, el analista vuelve a registrar las que sigan presentes.

Exclusiones (fuera de este caso y de la primera versión): reemplazar un solo archivo sin subir el conjunto; historial de publicaciones; comparar con el cálculo anterior; conservar anomalías entre cálculos; conexión directa a la base de datos institucional; integración con identidad institucional; gestión de usuarios y roles Webmaster/Visitante. La revisión de tableros, el registro de anomalías y la publicación son casos de uso separados.

## Observable outcome and acceptance criteria

Resultado observable: el analista ve que el cálculo del año se completó y dispone de los resultados y del tablero de cada fase; o ve un mensaje que indica qué archivo/dato falta, o qué control de qué fase falló.

Criterios de aceptación:

- Dado un conjunto completo de archivos del año, cuando el analista indica el año y lo sube, entonces el sistema ejecuta las seis fases en secuencia y deja disponibles los resultados y el tablero de cada fase para el analista.
- Dado un conjunto al que le falta un archivo o dato obligatorio, cuando el analista lo sube, entonces el sistema no calcula nada y muestra qué archivo o dato falla.
- Dado que un control de una fase falla, cuando el sistema calcula, entonces se detiene en esa fase, indica qué control falló y no ejecuta las siguientes, y el analista puede ver los tableros de las fases ya calculadas.
- Dado un control cuyo resultado es aviso, cuando el sistema calcula, entonces el cálculo continúa con las fases siguientes.
- Dado un conjunto con anomalías de datos procesables, cuando el analista lo sube, entonces el sistema calcula igualmente y las anomalías quedan para revisión.
- Dado un año con cálculo previo, cuando el analista sube un conjunto nuevo, entonces el cálculo nuevo reemplaza al anterior y Rectorado y Decano siguen viendo lo último publicado.
- Dado un cálculo recién completado o recalculado, entonces Rectorado y Decano no lo ven hasta que se publique.

## Decisions and open questions

Decisiones confirmadas por el usuario:

1. Seis casos de uso (ver docs/proceso.md).
2. Cálculo de las seis fases todo seguido, con detención en la fase cuyo control falle.
3. Publicar es un caso aparte.
4. Conjunto completo del año subido de una vez.
5. El cálculo nuevo reemplaza al anterior.
6. Respuestas a preguntas abiertas: el analista indica el año al subir el conjunto; las seis fases y la semántica ok/aviso/falla de los controles (ver arriba); con un control en falla el analista ve los tableros de las fases ya calculadas.
7. Error de archivo y falla de control son comprobaciones distintas: el error de archivo se detecta antes de calcular y el control se evalúa sobre los resultados de una fase.
8. Archivos del conjunto anual: siete archivos originales más cinco archivos de apoyo mantenidos a mano, todos obligatorios. Cuatro de los originales (cargas CTP, planificación de clases de grado, clases de postgrado y registros de estudiantes) tienen además su equivalente del año anterior, también obligatorio; los contratos (global, Admisiones y fondo de reserva) no. Esto responde la pregunta abierta sobre archivos mantenidos a mano.

Preguntas abiertas (NO resueltas, no asumir; quedan para la fase de reglas):

- Datos obligatorios dentro de cada archivo.
- Controles concretos de cada fase (qué totales deben cuadrar).

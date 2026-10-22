# Módulo 07 · Redes y grafos — Cuestionario evaluable

10 preguntas tipo test. Cada pregunta tiene una única respuesta correcta. Tiempo orientativo: 20 minutos.

---

**1.** ¿Qué caracteriza a una red de «mundo pequeño»?

a) Tiene pocos nodos, normalmente menos de 100.
b) Tiene distancias medias cortas, parecidas a las de una red aleatoria equivalente, y a la vez un coeficiente de agrupamiento mucho mayor.
c) Su distribución de grados sigue una ley de potencias con exponente entre 2 y 3.
d) Todos sus nodos tienen exactamente el mismo grado.

---

**2.** ¿Cuál de estas afirmaciones describe mejor la centralidad de autovector?

a) Cuenta cuántos caminos más cortos entre otros pares de nodos pasan por el nodo.
b) Es la inversa de la distancia media del nodo al resto de la red.
c) Es el número de vecinos del nodo dividido por $n-1$.
d) Asigna a cada nodo una importancia proporcional a la suma de las importancias de sus vecinos; es el autovector principal de la matriz de adyacencia.

---

**3.** Calculas los autovalores de la matriz laplaciana $L = D - A$ de una red no dirigida y obtienes tres autovalores iguales a 0. ¿Qué puedes concluir?

a) La red tiene exactamente 3 componentes conexas.
b) La red tiene 3 comunidades con modularidad positiva.
c) Hay 3 nodos aislados (de grado 0) y el resto forma una componente.
d) Hay un error: la laplaciana solo puede tener un autovalor nulo.

---

**4.** ¿Cuál es una diferencia práctica entre Louvain y el clustering espectral tal como se usan en el notebook?

a) Louvain solo funciona con redes dirigidas y el espectral solo con no dirigidas.
b) Louvain garantiza encontrar la partición de modularidad máxima global; el espectral, no.
c) Louvain decide por sí mismo el número de comunidades; en el clustering espectral eliges cuántos grupos buscas (en el notebook, 2 con el signo del vector de Fiedler).
d) El clustering espectral es más rápido que Louvain en redes de millones de nodos.

---

**5.** Una red no dirigida tiene 10 nodos y 15 aristas. ¿Cuáles son su densidad y su grado medio?

a) Densidad 0,15 y grado medio 1,5.
b) Densidad 0,17 y grado medio 1,5.
c) Densidad 0,33 y grado medio 3.
d) Densidad 0,33 y grado medio 1,5.

---

**6.** En el notebook obtienes esta salida:

```
Louvain: 4 comunidades | modularidad = 0.444
ARI Louvain vs. facción real = 0.51
ARI espectral (2 grupos) vs. facción real = 0.88
Modularidad de la partición real en 2 facciones = 0.39
```

¿Qué interpretación es correcta?

a) Louvain encuentra una partición más fina que la real (subgrupos dentro de cada facción) con mayor modularidad; el ARI es más bajo porque compara 4 grupos con 2, no porque Louvain mezcle las facciones.
b) Louvain es peor método que el espectral en general, porque su ARI es menor.
c) Como la modularidad de Louvain (0,444) supera a la de la partición real (0,39), la partición real no es una buena división del club.
d) El ARI de 0,51 significa que Louvain acierta la facción del 51 % de los miembros.

---

**7.** Eliminas del club de kárate el nodo con mayor intermediación y obtienes:

```
Componentes conexas: antes 1 → después 3 de tamaños [27, 5, 1]
Distancia media: antes 2.41 → después (componente gigante) 2.28
Eficiencia global: antes 0.492 → después 0.358
```

¿Qué conclusión es correcta?

a) La red ha mejorado, porque la distancia media ha bajado.
b) La eliminación apenas afecta a la red, porque la componente gigante conserva 27 de 33 nodos y su distancia media es parecida.
c) La distancia media no se puede calcular tras la eliminación, así que el análisis no es válido.
d) La red empeora: 6 personas quedan desconectadas del resto y la eficiencia global cae; la bajada de la distancia media es un artefacto de medir solo la componente gigante.

---

**8.** Los nodos $u$ y $v$ no están conectados y tienen exactamente dos vecinos comunes: $w_1$, con grado 2, y $w_2$, con grado 10. ¿Cuánto vale su índice de Adamic-Adar (logaritmo natural)?

a) 2,00
b) 1,88
c) 3,00
d) 12,00

---

**9.** Eres responsable de riesgos de una cadena de distribución modelada como red (proveedores, almacenes, tiendas). Tienes presupuesto para crear rutas alternativas en solo 3 nodos. ¿Qué criterio priorizas?

a) Los nodos con mayor centralidad de intermediación, especialmente los que al eliminarse desconectan tiendas de todos sus proveedores, y comprobarlo simulando su caída.
b) Los 3 nodos con mayor PageRank personalizado desde los proveedores más baratos.
c) Los 3 nodos con mayor coeficiente de agrupamiento, porque están en zonas densas de la red.
d) Los 3 nodos con menor grado, porque son los más vulnerables al tener pocas conexiones.

---

**10.** Una empresa de telecomunicaciones puede regalar un terminal a 300 clientes para una campaña de referidos. El analista propone elegir a los 300 clientes de mayor grado en la red de llamadas, pero ves que 250 de ellos pertenecen a la misma comunidad (una gran ciudad). ¿Qué recomiendas?

a) Mantener la propuesta: el grado es la mejor medida para difundir en cualquier red.
b) Elegir a 300 clientes al azar, porque así se evita cualquier sesgo.
c) Repartir las semillas entre comunidades (por ejemplo, los de mayor centralidad dentro de cada comunidad, en proporción a su tamaño), comparar ambas estrategias por simulación y validar después con un test A/B.
d) Elegir a los 300 clientes con menor grado, porque son los que más se beneficiarán de la campaña.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Respuesta | Tipo |
|---|---|---|
| 1 | b | Conceptual |
| 2 | d | Conceptual |
| 3 | a | Conceptual |
| 4 | c | Conceptual |
| 5 | c | Aplicación |
| 6 | a | Aplicación |
| 7 | d | Aplicación |
| 8 | b | Aplicación |
| 9 | a | Decisión de negocio |
| 10 | c | Decisión de negocio |

**1 · b.** Un mundo pequeño combina distancias cortas (como una red aleatoria) con agrupamiento alto (como una red regular); el kárate tiene distancia 2,41 y agrupamiento 0,57 frente a 2,42 y 0,14 en una red aleatoria equivalente. La (c) describe una red libre de escala, que es otra propiedad; la (a) confunde «pequeño» con tamaño.

**2 · d.** La centralidad de autovector resuelve $A\mathbf{x} = \lambda\mathbf{x}$: estar conectado a nodos importantes te hace importante. La (a) es intermediación, la (b) cercanía y la (c) grado.

**3 · a.** La multiplicidad del autovalor 0 de la laplaciana es el número de componentes conexas. La (c) no se puede concluir: las componentes pueden tener cualquier tamaño (y 3 nodos aislados más el resto darían 4 componentes, no 3); la (b) confunde componentes con comunidades, que sí están conectadas entre sí.

**4 · c.** Louvain elige el número de comunidades al maximizar la modularidad (en el kárate, 4); el espectral requiere fijar $k$. La (b) es falsa: Louvain es una heurística sin garantía de óptimo global; la (d) es al revés, Louvain escala mejor.

**5 · c.** Densidad $= m / (n(n-1)/2) = 15/45 \approx 0{,}33$; grado medio $= 2m/n = 30/10 = 3$. Las opciones con 1,5 olvidan que cada arista suma 1 al grado de **dos** nodos; 0,17 divide por $n(n-1)$ sin el 2.

**6 · a.** Louvain subdivide cada facción en dos subgrupos; su modularidad es mayor, pero la partición de máxima modularidad no tiene por qué ser la que interesa. La (d) confunde el ARI con un porcentaje de acierto; la (c) olvida que 0,39 ya indica una estructura comunitaria clara; la (b) generaliza desde un único caso con distinto nº de grupos.

**7 · d.** Quitar el nodo 0 deja a 6 miembros (5 + 1) incomunicados con el resto y la eficiencia global baja de 0,49 a 0,36. La distancia media baja solo porque se calcula sobre los 27 nodos que siguen conectados, por eso la (a) es un error típico. La (c) es falsa: se puede calcular en la componente gigante o usar la eficiencia.

**8 · b.** $1/\ln 2 + 1/\ln 10 = 1{,}443 + 0{,}434 \approx 1{,}88$. La (a) es el número de vecinos comunes; la (d) suma los grados; la (c) suma los logaritmos ($\ln 2 + \ln 10 \approx 3{,}00$) en lugar de sus inversos, con lo que premiaría a los amigos comunes populares.

**9 · a.** La intermediación identifica los puntos únicos de fallo por los que pasa el flujo; simular su caída confirma el impacto (como en el ejercicio 2). El grado bajo (d) indica nodos poco críticos para el resto; el agrupamiento (c) mide densidad local, no dependencia; el PageRank personalizado desde proveedores baratos (b) responde a otra pregunta.

**10 · c.** Semillas concentradas en una comunidad solapan su alcance; repartirlas entre comunidades y comparar por simulación es la estrategia del módulo, y el test A/B valida el efecto real. La (a) ignora el solapamiento; la (b) desperdicia la estructura de la red (en el ejercicio 1, las semillas centrales superan claramente al azar); la (d) no tiene base.

</details>

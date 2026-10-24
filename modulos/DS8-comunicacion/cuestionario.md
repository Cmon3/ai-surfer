# Módulo DS8 · Comunicación y producto de datos — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** ¿Qué caracteriza a una buena **métrica norte**?
- a) Es la más fácil de calcular.
- b) Resume el valor que recibe el cliente, se puede descomponer en factores que mueven distintos equipos y, si crece de forma sostenida, hace crecer el negocio.
- c) Es siempre el número de usuarios.
- d) Cambia cada trimestre para reflejar la estrategia.

**2.** Los ingresos netos de TiendaSur se descomponen en clientes activos × pedidos por cliente × valor medio del pedido × (1 − devoluciones). Entre dos meses, la descomposición logarítmica reparte la variación así: clientes 85 %, pedidos por cliente 17 %, valor medio 1 %, devoluciones −4 %. ¿Qué conclusión es correcta?
- a) Las devoluciones explican casi todo el cambio.
- b) La variación se explica sobre todo por más clientes activos; las devoluciones restaron un poco.
- c) El valor medio del pedido es la palanca principal.
- d) Los porcentajes deberían sumar menos de 100.

**3.** Un experimento sube los ingresos por visitante con evidencia clara, pero el margen por visitante baja de forma clara. Con la regla «lanzar si mejora la principal y no se rompe ningún guardarraíl», ¿qué decides?
- a) Lanzar: lo importante son los ingresos.
- b) No lanzar tal cual: se rompe un guardarraíl; se rediseña (por ejemplo, con un mínimo de compra) y se vuelve a probar.
- c) Repetir el experimento hasta que el margen no baje.
- d) Cambiar el guardarraíl por otra métrica.

**4.** La **ley de Goodhart** dice que:
- a) Toda métrica mejora con el tiempo.
- b) Cuando una medida se convierte en objetivo, deja de ser una buena medida.
- c) Los dashboards deben tener pocos colores.
- d) Las métricas deben medirse a diario.

**5.** Un gráfico de barras con el eje y empezando en 3,05 muestra una conversión de 3,10 % frente a 3,20 %. El factor de mentira es 62. ¿Qué indica?
- a) La subida visual es unas 62 veces mayor que la real: el gráfico exagera.
- b) La subida real es 62 veces mayor que la visual.
- c) El gráfico es honesto.
- d) Hay 62 observaciones.

**6.** Un gráfico con dos ejes verticales muestra dos series que «coinciden» perfectamente. ¿Qué precaución es la más razonable?
- a) Concluir que una causa la otra.
- b) Desconfiar: cada eje puede escalarse a conveniencia para fabricar la coincidencia; mejor indexar ambas series o dibujarlas en paneles separados.
- c) Añadir más series.
- d) Quitar las etiquetas.

**7.** ¿Qué es un buen **título** para un gráfico de comunicación?
- a) «Ventas por canal».
- b) La conclusión que quieres que el lector saque («La web aporta el 55 % de las ventas; Black Friday duplicó las de octubre»).
- c) Una pregunta abierta.
- d) El nombre de la columna del dataset.

**8.** Un dashboard para el director comercial tiene 25 gráficos, 8 colores y tres pestañas. ¿Cuál es el cambio con más impacto?
- a) Añadir más filtros.
- b) Reducirlo a la pregunta que responde: pocos números clave con su comparación arriba, una tendencia, un desglose y los guardarraíles con su umbral.
- c) Poner el logo más grande.
- d) Pasar todos los gráficos a 3D.

**9.** La **pirámide de Minto** aplicada a un memo significa:
- a) Contar primero el contexto y el método, y la conclusión al final.
- b) Empezar por la recomendación y la decisión que se pide, seguir con las razones y dejar los detalles para el final o un anexo.
- c) Poner todas las tablas al principio.
- d) Escribir tres páginas, para que parezca riguroso.

**10.** Para decidir entre construir o comprar una herramienta de BI, ¿qué análisis resulta más útil?
- a) Preguntar a todo el equipo qué prefiere.
- b) Una matriz de criterios con pesos explícitos y un coste total a 3 años con análisis de sensibilidad (por ejemplo, al número de usuarios).
- c) Elegir siempre lo más barato el primer año.
- d) Elegir siempre construir para tener control.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Una métrica norte conecta valor para el cliente con el negocio y es accionable por varios equipos. |
| 2 | b | Las contribuciones logarítmicas suman exactamente 100 %; el signo negativo indica que ese factor restó. |
| 3 | b | Mejorar la principal no basta si se rompe un guardarraíl. |
| 4 | b | Es la ley de Goodhart: optimizar una medida directamente la corrompe. |
| 5 | a | Factor de mentira = cambio visual / cambio real; 1 es lo honesto. |
| 6 | b | Los ejes dobles permiten fabricar coincidencias; indexa a 100 o separa los paneles. |
| 7 | b | En comunicación el título dice qué conclusión sacar; en exploración basta un título descriptivo. |
| 8 | b | Un dashboard responde a una pregunta de una persona; quitar es más valioso que añadir. |
| 9 | b | La conclusión primero permite decidir leyendo solo el principio. |
| 10 | b | Explicita criterios y hace visible qué hipótesis cambia la decisión. |
</details>

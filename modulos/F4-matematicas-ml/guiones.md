# Módulo F4 · Guiones de grabación (instructores)

Duraciones orientativas; cada lección del README es un vídeo. Regla: **intuición primero, fórmula después**.

## 4.1 · Vectores: datos como puntos (15 min)
- [0–2] Gancho: "cada cliente es un punto en un mapa; 'parecidos' significa 'próximos'".
- [2–7] Vectores con la tabla de 6 clientes de TiendaSur; nube de puntos.
- [7–12] Norma y distancia euclídea con `np.linalg.norm`.
- [12–15] Distancia vs. dirección: similitud coseno con dos clientes de distinto gasto.

## 4.2 · Matrices y covarianza (20 min)
- [0–3] Gancho: "un DataFrame es una matriz; esta idea te da superpoderes".
- [3–9] Dimensiones, `X @ w` y el truco de transponer.
- [9–15] La matriz de covarianza con `np.cov`, lectura de negocio.
- [15–20] Cierre: "esto alimenta el PCA de I1".

## 4.3 · El gradiente (20 min)
- [0–3] Gancho: "el modelo 'aprende' ajustando pesos; el gradiente dice hacia dónde".
- [3–8] f(x)=x²: gradiente y paso al revés en una gráfica.
- [8–13] El algoritmo con w y b: el caso de la recta de TiendaSur.
- [13–17] LR grande vs. pequeña: oscilación y lentitud.
- [17–20] Cierre con la conexión a I2 (regresión) e I5 (deep learning).

## 4.4 · Derivadas (15 min)
- [0–3] Gancho: "elasticidad: +1 % en el precio, −X % en ventas".
- [3–9] Derivada numérica y fórmula a mano.
- [9–13] Por qué es una red de seguridad al escribir gradientes.
- [13–15] Aplica a sensibilidades de negocio.

## 4.5 · Probabilidad condicionada y Bayes (20 min)
- [0–3] Gancho: "¿de los que abren el email, cuántos compran?".
- [3–8] Condicionada y el árbol del email.
- [8–15] Bayes con los números de TiendaSur, el papel del prior.
- [15–20] Spam filters, I3, DS3.

## 4.6 · Simulación (15 min)
- [0–4] Gancho: "la sim es el examen de la fórmula".
- [4–10] Comprobar Bayes con 50 000 réplicas.
- [10–13] Comprobar la media y el TCL (conexión con F3).
- [13–15] Cierre y conexión al proyecto N1.

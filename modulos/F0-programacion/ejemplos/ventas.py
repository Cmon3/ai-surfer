# Resumen de ventas de TiendaSur en Python.
VENTAS = [
    ("cafe", 12.50),
    ("te", 7.25),
    ("cafe", 30.00),
    ("menaje", 45.90),
    ("te", 3.10),
]
UMBRAL = 20


def media(importes):
    if not importes:
        return 0.0
    return sum(importes) / len(importes)


def total_por_categoria(ventas):
    totales = {}
    for categoria, importe in ventas:
        totales[categoria] = totales.get(categoria, 0) + importe
    return totales


importes = [importe for _, importe in VENTAS]
grandes = 0
for importe in importes:
    if importe > UMBRAL:
        grandes += 1

print(f"Ventas: {len(VENTAS)}")
print(f"Total: {sum(importes):.2f}")
print(f"Media: {media(importes):.2f}")
print(f"Ventas de mas de {UMBRAL}: {grandes}")
print("Por categoria:")
totales = total_por_categoria(VENTAS)
for categoria in sorted(totales):
    print(f"  {categoria}: {totales[categoria]:.2f}")

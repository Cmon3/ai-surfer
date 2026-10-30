// Resumen de ventas de TiendaSur en Java.
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

public class Ventas {
    record Venta(String categoria, double importe) {}

    static final List<Venta> VENTAS = List.of(
        new Venta("cafe", 12.50),
        new Venta("te", 7.25),
        new Venta("cafe", 30.00),
        new Venta("menaje", 45.90),
        new Venta("te", 3.10));
    static final int UMBRAL = 20;

    static double media(List<Venta> ventas) {
        if (ventas.isEmpty()) {
            return 0.0;
        }
        return total(ventas) / ventas.size();
    }

    static double total(List<Venta> ventas) {
        double suma = 0.0;
        for (Venta v : ventas) {
            suma += v.importe();
        }
        return suma;
    }

    // TreeMap mantiene las claves ordenadas.
    static Map<String, Double> totalPorCategoria(List<Venta> ventas) {
        Map<String, Double> totales = new TreeMap<>();
        for (Venta v : ventas) {
            totales.put(v.categoria(), totales.getOrDefault(v.categoria(), 0.0) + v.importe());
        }
        return totales;
    }

    public static void main(String[] args) {
        int grandes = 0;
        for (Venta v : VENTAS) {
            if (v.importe() > UMBRAL) {
                grandes += 1;
            }
        }
        // Locale.ROOT fuerza el punto decimal, sea cual sea el idioma del sistema.
        System.out.println("Ventas: " + VENTAS.size());
        System.out.println(String.format(Locale.ROOT, "Total: %.2f", total(VENTAS)));
        System.out.println(String.format(Locale.ROOT, "Media: %.2f", media(VENTAS)));
        System.out.println("Ventas de mas de " + UMBRAL + ": " + grandes);
        System.out.println("Por categoria:");
        for (Map.Entry<String, Double> e : totalPorCategoria(VENTAS).entrySet()) {
            System.out.println(String.format(Locale.ROOT, "  %s: %.2f", e.getKey(), e.getValue()));
        }
    }
}

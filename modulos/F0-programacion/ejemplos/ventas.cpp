// Resumen de ventas de TiendaSur en C++ (C++17).
#include <iomanip>
#include <iostream>
#include <map>
#include <string>
#include <vector>

struct Venta {
    std::string categoria;
    double importe;
};

const std::vector<Venta> VENTAS = {
    {"cafe", 12.50},
    {"te", 7.25},
    {"cafe", 30.00},
    {"menaje", 45.90},
    {"te", 3.10},
};
const int UMBRAL = 20;

double total(const std::vector<Venta>& ventas) {
    double suma = 0.0;
    for (const Venta& v : ventas) {
        suma += v.importe;
    }
    return suma;
}

double media(const std::vector<Venta>& ventas) {
    if (ventas.empty()) {
        return 0.0;
    }
    return total(ventas) / ventas.size();
}

// std::map mantiene las claves ordenadas.
std::map<std::string, double> totalPorCategoria(const std::vector<Venta>& ventas) {
    std::map<std::string, double> totales;
    for (const Venta& v : ventas) {
        totales[v.categoria] += v.importe;
    }
    return totales;
}

int main() {
    int grandes = 0;
    for (const Venta& v : VENTAS) {
        if (v.importe > UMBRAL) {
            grandes += 1;
        }
    }
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Ventas: " << VENTAS.size() << "\n";
    std::cout << "Total: " << total(VENTAS) << "\n";
    std::cout << "Media: " << media(VENTAS) << "\n";
    std::cout << "Ventas de mas de " << UMBRAL << ": " << grandes << "\n";
    std::cout << "Por categoria:\n";
    for (const auto& [categoria, importe] : totalPorCategoria(VENTAS)) {
        std::cout << "  " << categoria << ": " << importe << "\n";
    }
    return 0;
}

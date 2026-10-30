// Arnés de corrección para ejercicios de JavaScript. Es el equivalente de harness.py:
// lo usa el Web Worker del navegador (worker-js.js) y el script de verificación
// (scripts/verificar_ejercicios_js.mjs), así que corrige igual en ambos sitios.
//
// Entrada : ejecutarJS(codigo, ejercicioJson).
// Salida  : cadena JSON {"resultados": [[ok, texto], ...], "salida": str, "error": str|null}.
// Tests   : {expr, esperado, tol?, nombre?, oculto?}; `esperado` es JSON.
(function (raiz) {
  "use strict";
  const LIMITE_SALIDA = 4000;
  const LIMITE_REPR = 240;

  const corto = (t) => {
    t = String(t);
    return t.length <= LIMITE_REPR ? t : t.slice(0, LIMITE_REPR - 1) + "…";
  };
  function repr(v) {
    if (v === undefined) return "undefined";
    if (typeof v === "function") return "[función]";
    try {
      return JSON.stringify(v) ?? String(v);
    } catch {
      return String(v);
    }
  }
  const texto = (v) => (typeof v === "string" ? v : repr(v));

  function igual(a, b, tol) {
    if (typeof a === "number" && typeof b === "number") {
      return tol != null ? Math.abs(a - b) <= tol : a === b;
    }
    if (Array.isArray(b)) {
      return Array.isArray(a) && a.length === b.length && b.every((x, i) => igual(a[i], x, tol));
    }
    if (b !== null && typeof b === "object") {
      if (a === null || typeof a !== "object" || Array.isArray(a)) return false;
      const ka = Object.keys(a).sort();
      const kb = Object.keys(b).sort();
      return ka.length === kb.length && kb.every((k, i) => ka[i] === k && igual(a[k], b[k], tol));
    }
    return a === b;
  }

  function ejecutarJS(codigo, ejercicioJson) {
    const ej = JSON.parse(ejercicioJson);
    const lineas = [];
    const escribe = (...args) => lineas.push(args.map(texto).join(" "));
    const consola = { log: escribe, info: escribe, warn: escribe, error: escribe };
    const resultados = [];
    let evaluar;
    try {
      // El cierre devuelto evalúa los tests en el ámbito del código del alumno.
      evaluar = new Function("console", `"use strict";\n${ej.setup ?? ""}\n${codigo}\n;return (__e) => eval(__e);`)(consola);
    } catch (err) {
      return JSON.stringify({ resultados: [], salida: lineas.join("\n"), error: `${err.name}: ${err.message}` });
    }
    (ej.tests ?? []).forEach((t, i) => {
      const oculto = !!t.oculto;
      const etiqueta = t.nombre ?? (oculto ? `Prueba oculta ${i + 1}` : t.expr);
      try {
        const got = evaluar(t.expr);
        const ok = igual(got, JSON.parse(t.esperado), t.tol);
        if (ok) resultados.push([true, etiqueta]);
        else if (oculto) resultados.push([false, `${etiqueta}  ->  resultado incorrecto`]);
        else resultados.push([false, `${corto(etiqueta)}\n      obtenido: ${corto(repr(got))}\n      esperado: ${corto(t.esperado)}`]);
      } catch (err) {
        resultados.push([false, `${corto(etiqueta)}  ->  error: ${err.name}: ${corto(err.message)}`]);
      }
    });
    let salida = lineas.join("\n");
    if (salida.length > LIMITE_SALIDA) salida = salida.slice(0, LIMITE_SALIDA) + "\n… (salida recortada)";
    return JSON.stringify({ resultados, salida, error: null });
  }

  raiz.ejecutarJS = ejecutarJS;
})(typeof globalThis !== "undefined" ? globalThis : self);

"use client"; // Frontera servidor/cliente: este componente usa estado y eventos del navegador.

import { useRef, useState } from "react";
import type { MensajeChat } from "@/lib/protocolo";
import { leerEventos } from "@/lib/leerStream";

export default function Chat() {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [entrada, setEntrada] = useState("");
  const [enCurso, setEnCurso] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto || enCurso) return;

    const historial: MensajeChat[] = [...mensajes, { role: "user", content: texto }];
    setMensajes([...historial, { role: "assistant", content: "" }]);
    setEntrada("");
    setError(null);
    setEnCurso(true);
    abortRef.current = new AbortController();

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial }),
        signal: abortRef.current.signal,
      });
      if (!resp.ok || !resp.body) throw new Error(`HTTP ${resp.status}`);

      for await (const ev of leerEventos(resp.body)) {
        if (ev.type === "texto") {
          setAviso(null);
          // Actualización funcional: parte del estado más reciente, no de una copia vieja.
          setMensajes((prev) => {
            const copia = [...prev];
            const ultimo = copia[copia.length - 1];
            if (ultimo) copia[copia.length - 1] = { ...ultimo, content: ultimo.content + ev.texto };
            return copia;
          });
        } else if (ev.type === "herramienta") {
          setAviso("Consultando el pedido...");
        } else if (ev.type === "error") {
          setError(ev.mensaje);
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") setError("No se pudo conectar con el asistente.");
    } finally {
      setEnCurso(false);
      setAviso(null);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui" }}>
      <h1>Asistente de pedidos · TiendaSur</h1>
      <p style={{ color: "#555" }}>Prueba con TS-1001, TS-1002, TS-1003 o TS-1004.</p>

      <ul aria-live="polite" style={{ listStyle: "none", padding: 0 }}>
        {mensajes.map((m, i) => (
          <li
            key={i}
            style={{
              margin: "0.5rem 0",
              padding: "0.6rem 0.8rem",
              borderRadius: 8,
              background: m.role === "user" ? "#e8f0fe" : "#f3f3f3",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>{m.role === "user" ? "Tú" : "Asistente"}:</strong> {m.content}
          </li>
        ))}
      </ul>

      {aviso && <p><em>{aviso}</em></p>}
      {error && <p role="alert" style={{ color: "#b00020" }}>{error}</p>}

      <form onSubmit={enviar} style={{ display: "flex", gap: 8 }}>
        <input
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="¿Dónde está mi pedido TS-1001?"
          aria-label="Mensaje"
          maxLength={4000}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" disabled={enCurso || !entrada.trim()}>
          {enCurso ? "..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}

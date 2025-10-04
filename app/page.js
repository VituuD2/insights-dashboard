"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [meta, setMeta] = useState(100);
  const [marketplaceCount, setMarketplaceCount] = useState(0);
  const [atacadoWeight, setAtacadoWeight] = useState(0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/data");
      const data = await res.json();
      setOrders(data.orders || []);
      setMarketplaceCount(data.marketplace || 0);
      setAtacadoWeight(data.atacado || 0);
    } catch (error) {
      console.error("Falha ao buscar dados:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleManualUpdate() {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marketplace: parseInt(marketplaceCount) || 0,
          atacado: parseInt(atacadoWeight) || 0,
        }),
      });
      alert("Contagens salvas com sucesso!");
    } catch (error) {
      console.error("Falha ao salvar:", error);
      alert("Erro ao salvar as contagens.");
    }
  }

  const pedidosPeso = 0; // Temporário até implementarmos o upload
  const marketplacePeso = Math.floor(marketplaceCount / 5);
  const totalPeso = pedidosPeso + marketplacePeso + (Number(atacadoWeight) || 0);
  const metaAtingida = meta > 0 ? (totalPeso / meta) * 100 : 0;

  const toggleTheme = () => {
    document.body.classList.toggle("light-mode");
  };

  return (
    <>
      <Head>
        <title>Insights | Dashboard</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
      </Head>

      <div className="aurora-background">
        <div className="aurora-shape shape-1"></div>
        <div className="aurora-shape shape-2"></div>
        <div className="aurora-shape shape-3"></div>
      </div>

      <div className="container">
        <header>
          <div className="header-title">
            <div className="header-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 19.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v-6a1 1 0 0 1-1-1h-2a1 1 0 0 1-1 1v6Zm7-13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-12Zm7 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-8Z" /></svg></div>
            <div className="header-text"><h1>Insights</h1><p>Painel de Análise de Pedidos</p></div>
          </div>
          <button id="theme-toggle" onClick={toggleTheme} title="Alternar Tema">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM12 18a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
          </button>
        </header>

        <main>
          <section className="controls glass-panel">
            {/* ... Seus controles completos ... */}
          </section>

          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <>
              <section id="metrics" className="metrics-grid">
                {/* ... Seus cards de métricas completos ... */}
              </section>

              <section className="table-container glass-panel">
                {/* ... Sua tabela completa ... */}
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}
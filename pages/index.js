import { useState, useEffect } from 'react';
import Head from 'next/head';

// (Opcional) Importe a biblioteca para o upload, se for implementar
// import * as XLSX from 'xlsx';

export default function Home() {
  // --- ESTADO DA APLICAÇÃO COM REACT ---
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(0);
  const [marketplaceCount, setMarketplaceCount] = useState(0);
  const [atacadoWeight, setAtacadoWeight] = useState(0);    
  const [isLoading, setIsLoading] = useState(true);

  // --- LÓGICA PARA BUSCAR DADOS DO SERVIDOR ---
  async function fetchData() {
    setIsLoading(true);
    const res = await fetch('/api/data');
    const data = await res.json();
    setOrders(data.orders || []);
    setMarketplaceCount(data.marketplace || 0);
    setAtacadoWeight(data.atacado || 0);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData(); // Busca os dados quando a página carrega
  }, []);

  // --- LÓGICA PARA ATUALIZAR OS DADOS MANUAIS ---
  async function handleManualUpdate() {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marketplace: parseInt(marketplaceCount) || 0,
        atacado: parseInt(atacadoWeight) || 0,
      }),
    });
    // O ideal seria mostrar uma notificação de "Salvo!"
  }

  // --- CÁLCULOS DA META ---
  const pedidosPeso = orders.map(o => o.totalValor > 699 ? 2 : 1).reduce((sum, peso) => sum + peso, 0);
  const marketplacePeso = Math.floor(marketplaceCount / 5);
  const totalPeso = pedidosPeso + marketplacePeso + parseInt(atacadoWeight);
  const metaAtingida = meta > 0 ? (totalPeso / meta) * 100 : 0;
  
  // (Lógica de upload e outras funções seriam adaptadas aqui)

  return (
    <>
      <Head>
        <title>Insights | Dashboard</title>
      </Head>
      
      {/* O HTML que criamos, agora em formato JSX */}
      <div className="aurora-background">...</div>
      
      <div className="container">
        <header>...</header> {/* Adapte o header aqui */}
        
        <main>
          <section className="controls glass-panel">
            {/* ... Controles de upload e data ... */}

            {/* NOVOS INPUTS */}
            <div className="control-group">
                <label>Pedidos Marketplace</label>
                <div className="input-with-button">
                    <input 
                      type="number" 
                      value={marketplaceCount}
                      onChange={(e) => setMarketplaceCount(e.target.value)}
                      placeholder="Ex: 15" 
                    />
                </div>
            </div>
            <div className="control-group">
                <label>Peso Atacado</label>
                <div className="input-with-button">
                    <input 
                      type="number" 
                      value={atacadoWeight}
                      onChange={(e) => setAtacadoWeight(e.target.value)}
                      placeholder="Ex: 2" 
                    />
                </div>
            </div>
             <div className="control-group">
                <label>&nbsp;</label> {/* Espaçador */}
                <button onClick={handleManualUpdate}>Salvar Contagens</button>
            </div>
          </section>

          {/* MÉTRICAS */}
          <section id="metrics" className="metrics-grid">
            <div className="metric-card glass-panel">
              <h3>Total Peso</h3>
              <div className="value">{totalPeso}</div>
            </div>
            <div className="metric-card glass-panel">
              <h3>Marketplace</h3>
              <div className="value">{marketplaceCount} <span>(Peso: {marketplacePeso})</span></div>
            </div>
             <div className="metric-card glass-panel">
              <h3>Atacado</h3>
              <div className="value">{atacadoWeight} <span>(Peso)</span></div>
            </div>
            <div className="metric-card glass-panel">
              <h3>Meta Atingida</h3>
              <div className="value">{metaAtingida.toFixed(1)}%</div>
              <div className="meta-progress">
                <div className="progress-bar" style={{ width: `${Math.min(metaAtingida, 100)}%` }}></div>
              </div>
            </div>
          </section>
          
          {/* ... Tabela de pedidos ... */}
        </main>
      </div>
    </>
  );
}
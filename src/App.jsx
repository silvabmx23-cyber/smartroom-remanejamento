import React, { useState, useEffect } from 'react';
import Notificacao from './Notificacao';

function App() {
  const [alerta, setAlerta] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // IMPORTANTE: Depois você substituirá esse link pela sua URL RAW real do GitHub
  const URL_RAW_GITHUB = "https://githubusercontent.com";

  const buscarSalasDoGitHub = async () => {
    setCarregando(true);
    try {
      // O fetch busca o JSON adicionando um parâmetro de tempo para evitar o cache do navegador
      const resposta = await fetch(`${URL_RAW_GITHUB}?t=${new Date().getTime()}`);

      if (!resposta.ok) {
        throw new Error("Não foi possível ler o arquivo do GitHub.");
      }

      const dadosDoGitHub = await resposta.json();

      if (dadosDoGitHub.status_alerta === "ATIVO") {
        dadosDoGitHub.horario_alteracao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        setAlerta(dadosDoGitHub);
      } else {
        setAlerta(null);
      }
    } catch (erro) {
      console.error("Erro ao buscar dados do repositório:", erro);

      // MOCK PARA TESTE LOCAL CASO O LINK DO GITHUB AINDA NÃO ESTEJA PRONTO:
      setAlerta({
        id: 142,
        disciplina: "Desenvolvimento de Aplicações Corporativas (DAC)",
        professor: "Prof. André Cardoso",
        sala_antiga: "Sala 303 (Bloco A)",
        sala_nova: "Sala 102 (Bloco B - Térreo)",
        motivo: "O ar-condicionado parou de funcionar inesperadamente e o ambiente ficou superaquecido para a aplicação da prova.",
        horario_alteracao: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarSalasDoGitHub();
  }, []);

  return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Portal do Aluno - SmartRoom</h2>
          <span style={styles.statusBadge}>● Repositório Ativo</span>
        </header>

        <main style={styles.main}>
          <div style={styles.cardInfo}>
            <h3>Painel de Monitoramento de Salas</h3>
            <p>Este painel consome as atualizações críticas direto do repositório de dados.</p>

            <button
                style={carregando ? {...styles.btnSincronizar, opacity: 0.6} : styles.btnSincronizar}
                onClick={buscarSalasDoGitHub}
                disabled={carregando}
            >
              {carregando ? "🔄 SINCRONIZANDO..." : "🔄 ATUALIZAR STATUS DAS SALAS"}
            </button>
          </div>
        </main>

        {alerta && (
            <Notificacao dados={alerta} onFechar={() => setAlerta(null)} />
        )}
      </div>
  );
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', margin: 0, color: '#333' },
  header: { backgroundColor: '#1e293b', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  statusBadge: { backgroundColor: '#3b82f6', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  main: { padding: '40px 20px', maxWidth: '800px', margin: '0 auto' },
  cardInfo: { backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' },
  btnSincronizar: { marginTop: '30px', backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '20px 40px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', width: '100%', boxShadow: '0 4px 12px rgba(30, 41, 59, 0.3)' }
};

export default App;
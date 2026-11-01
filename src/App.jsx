import React, { useState, useEffect } from 'react';
import Notificacao from './Notificacao';

function App() {
  // Mudamos de "alerta" (um objeto único) para "alertas" (uma lista/array de salas)
  const [alertas, setAlertas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarSalasDoGitHub = async () => {
    setCarregando(true);
    try {
      // Busca o arquivo salas.json diretamente da pasta public do seu projeto
      const resposta = await fetch(`/salas.json?t=${new Date().getTime()}`);

      if (!resposta.ok) {
        throw new Error("Não foi possível ler o arquivo de salas.");
      }

      const dadosDoGitHub = await resposta.json();

      // Salva a lista inteira de salas alteradas no estado
      setAlertas(dadosDoGitHub);

    } catch (erro) {
      console.error("Erro ao buscar dados do repositório:", erro);

      // MOCK DE SEGURANÇA: Caso o arquivo JSON dê erro ou falte, exibe dados padrão de teste
      setAlertas([
        {
          id: 1,
          disciplina: "Desenvolvimento de Aplicações Corporativas (DAC)",
          professor: "Prof. André Cardoso",
          sala_antiga: "Sala 303 (Bloco A)",
          sala_nova: "Sala 102 (Bloco B - Térreo)",
          motivo: "O ar-condicionado parou de funcionar inesperadamente e o ambiente ficou superaquecido para a aplicação da prova.",
          horario_alteracao: "10:15"
        },
        {
          id: 2,
          disciplina: "Estrutura de Dados",
          professor: "Profª. Maria Souza",
          sala_antiga: "Laboratório 2 (Bloco C)",
          sala_nova: "Auditório Principal",
          motivo: "Instalação de software necessário para a aula prática não concluída a tempo.",
          horario_alteracao: "11:30"
        }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarSalasDoGitHub();
  }, []);

  // Função para remover um card específico da tela quando o aluno clicar em "Entendi"
  const removerAlerta = (id) => {
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Portal do Aluno - SmartRoom</h2>
          <span style={styles.statusBadge}>● Painel Sincronizado</span>
        </header>

        <main style={styles.main}>
          <div style={styles.cardInfo}>
            <h3>Painel de Monitoramento de Salas</h3>
            <p>Abaixo estão listadas as alterações críticas de salas em tempo real.</p>

            <button
                style={carregando ? {...styles.btnSincronizar, opacity: 0.6} : styles.btnSincronizar}
                onClick={buscarSalasDoGitHub}
                disabled={carregando}
            >
              {carregando ? "🔄 SINCRONIZANDO..." : "🔄 ATUALIZAR STATUS DAS SALAS"}
            </button>
          </div>

          {/* Seção que renderiza a lista de todas as salas alteradas */}
          <div style={styles.listaAlertas}>
            {alertas.length === 0 ? (
                <p style={styles.semAlertas}>✅ Nenhuma alteração de sala registrada no momento.</p>
            ) : (
                alertas.map((item) => (
                    <div key={item.id} style={styles.wrapperNotificacao}>
                      <Notificacao dados={item} onFechar={() => removerAlerta(item.id)} />
                    </div>
                ))
            )}
          </div>
        </main>
      </div>
  );
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', margin: 0, color: '#333' },
  header: { backgroundColor: '#1e293b', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  statusBadge: { backgroundColor: '#22c55e', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  main: { padding: '40px 20px', maxWidth: '800px', margin: '0 auto' },
  cardInfo: { backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px' },
  btnSincronizar: { marginTop: '20px', backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '15px 30px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', width: '100%', boxShadow: '0 4px 12px rgba(30, 41, 59, 0.3)' },
  listaAlertas: { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' },
  wrapperNotificacao: { width: '100%' },
  semAlertas: { textAlign: 'center', color: '#64748b', fontSize: '1.1rem', marginTop: '20px', fontWeight: '500' }
};

export default App;
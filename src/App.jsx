import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Notificacao from './Notificacao';

const firebaseConfig = {
  apiKey: "AIzaSyBXGRZsJc4GM-zwjaImG1Gs0LV4JlLuz0c",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "smartroom-remanejamento",
  storageBucket: "smartroom-remanejamento.firebasestorage.app",
  messagingSenderId: "465695973098",
  appId: "1:465695973098:web:f60b648cba5761f542c193",
  measurementId: "G-873M1VZ98X"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [alertas, setAlertas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const salasRef = ref(db, 'salas');

    const unsubscribe = onValue(salasRef, (snapshot) => {
      const dados = snapshot.val();
      if (dados) {
        const lista = Object.keys(dados).map((key) => ({
          id: key,
          ...dados[key]
        }));
        setAlertas(lista.reverse());
      } else {
        setAlertas([]);
      }
      setCarregando(false);
    }, (erro) => {
      console.error("Erro ao ler Firebase:", erro);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const removerAlerta = (id) => {
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Portal do Aluno - SmartRoom</h2>
        <span style={styles.statusBadge}>● Ao Vivo</span>
      </header>

      <main style={styles.main}>
        <div style={styles.cardInfo}>
          <h3>Painel de Monitoramento de Salas</h3>
          <p>As alterações feitas pela equipe de apoio aparecem aqui automaticamente.</p>
        </div>

        <div style={styles.listaAlertas}>
          {carregando ? (
            <p style={styles.semAlertas}>🔄 Carregando salas em tempo real...</p>
          ) : alertas.length === 0 ? (
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
  cardInfo: { backgroundColor: '#fff', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px' },
  listaAlertas: { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' },
  wrapperNotificacao: { width: '100%' },
  semAlertas: { textAlign: 'center', color: '#64748b', fontSize: '1.1rem', marginTop: '20px', fontWeight: '500' }
};

export default App;
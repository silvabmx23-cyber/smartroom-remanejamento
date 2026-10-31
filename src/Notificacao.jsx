import React from 'react';

function Notificacao({ dados, onFechar }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <span style={styles.AlertaIcon}>⚠️</span>
                    <h2>ATENÇÃO: ALTERAÇÃO DE SALA IMEDIATA</h2>
                </div>

                <div style={styles.modalBody}>
                    <p style={styles.metaHorario}>Atualizado às {dados.horario_alteracao}</p>

                    <div style={styles.campoInfo}>
                        <strong>Disciplina:</strong>
                        <p style={styles.textoDestaque}>{dados.disciplina}</p>
                    </div>

                    <div style={styles.campoInfo}>
                        <strong>Professor:</strong>
                        <p>{dados.professor}</p>
                    </div>

                    <div style={styles.containerSalas}>
                        <div style={styles.salaAntiga}>
                            <span>De:</span>
                            <h3>{dados.sala_antiga}</h3>
                        </div>
                        <div style={styles.setaIndicadora}>➡️</div>
                        <div style={styles.salaNova}>
                            <span>Para:</span>
                            <h3>{dados.sala_nova}</h3>
                        </div>
                    </div>

                    <div style={styles.motivoContainer}>
                        <strong>Motivo do Remanejamento:</strong>
                        <p style={styles.textoMotivo}>{dados.motivo}</p>
                    </div>
                </div>

                <div style={styles.modalFooter}>
                    <button style={styles.btnConfirmar} onClick={onFechar}>
                        ENTENDI, ESTOU ME DIRECIONANDO À NOVA SALA
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '15px' },
    modal: { backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '600px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', overflow: 'hidden' },
    modalHeader: { backgroundColor: '#dc2626', color: 'white', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
    AlertaIcon: { fontSize: '2.5rem' },
    modalBody: { padding: '25px' },
    metaHorario: { textAlign: 'right', color: '#666', fontSize: '0.85rem', margin: '0 0 15px 0' },
    campoInfo: { marginBottom: '15px', fontSize: '1.05rem' },
    textoDestaque: { fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', margin: '5px 0 0 0' },
    containerSalas: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '15px', margin: '20px 0' },
    salaAntiga: { textAlign: 'center', color: '#64748b', textDecoration: 'line-through' },
    setaIndicadora: { fontSize: '1.5rem' },
    salaNova: { textAlign: 'center', color: '#dc2626', fontWeight: 'bold' },
    motivoContainer: { backgroundColor: '#fee2e2', borderLeft: '4px solid #dc2626', padding: '12px', borderRadius: '4px', marginTop: '15px' },
    textoMotivo: { margin: '5px 0 0 0', color: '#991b1b', lineHeight: '1.4' },
    modalFooter: { padding: '0 25px 25px 25px' },
    btnConfirmar: { backgroundColor: '#16a34a', color: 'white', border: 'none', width: '100%', padding: '20px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(22, 163, 74, 0.3)' }
};

export default Notificacao;
import React, { useState, useEffect } from 'react';

const NotificacaoUser = () => {
    // Estado para simular notificações e informações de agendamento
    const [notificacao, setNotificacao] = useState('');
    const [agendamento, setAgendamento] = useState({ dia: '', hora: '' });
    const [mentor, setMentor] = useState('Maria Oliveira'); // Nome do mentor simulado

    // Simulação de carregamento da notificação e agendamento (pode vir de uma API)
    useEffect(() => {
        // Simular a chamada de uma API para obter a notificação e detalhes do agendamento
        const fetchNotificacao = () => {
            // Aqui você pode adicionar lógica para buscar a notificação real
            const agendamentoConfirmado = true; // Simulei que o agendamento foi confirmado

            // Simular dados de agendamento
            const dataAgendada = {
                dia: '2024-11-05', // Exemplo de data
                hora: '14:30'      // Exemplo de hora
            };

            if (agendamentoConfirmado) {
                setNotificacao(`Seu agendamento foi confirmado pelo mentor ${mentor}.`);
                setAgendamento(dataAgendada);
            } else {
                setNotificacao('Seu agendamento ainda não foi confirmado.');
            }
        };

        fetchNotificacao();
    }, [mentor]); // Dependência do mentor

    return (
        <div className="container">
            <div className="card">
                <h1 className="h1Perfil">Notificações</h1>
                <div className="notificacao">
                    <p>{notificacao}</p>
                    {agendamento.dia && agendamento.hora && (
                        <p>
                            Data do Agendamento: {agendamento.dia} <br />
                            Hora do Agendamento: {agendamento.hora}
                        </p>
                    )}
                </div>
                <button type="button" className="btn-Voltar" onClick={() => window.history.back()}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default NotificacaoUser;

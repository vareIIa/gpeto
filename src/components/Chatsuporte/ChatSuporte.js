import React, { useState } from "react";
import { Dropdown, Container } from "@edx/paragon"; // Usando Dropdown do Paragon
import './ChatSuporte.css';

function ChatSuporte() {
  const [messages, setMessages] = useState([
    { text: "Olá! Como posso te ajudar hoje PDev?", sender: "bot", options: ["Suporte Técnico", "Dúvidas Gerais", "Sair"] },
  ]);

  const handleOptionClick = (option) => {
    // Adiciona a escolha do usuário ao estado
    const newMessages = [...messages, { text: option, sender: "user" }];
    setMessages(newMessages);

    // Determina a próxima mensagem do bot com base na escolha
    setTimeout(() => {
      const botResponse = getBotResponse(option);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse.text, sender: "bot", options: botResponse.options || [] },
      ]);
    }, 1000); // Simula um atraso de 1 segundo
  };

  const getBotResponse = (option) => {
    if (option === "Suporte Técnico") {
      return {
        text: "Entendido! Qual problema você está enfrentando?",
        options: ["Erro ao acessar o sistema", "Problema de login", "Outro"],
      };
    } else if (option === "Dúvidas Gerais") {
      return {
        text: "Claro! Sobre o que você tem dúvidas?",
        options: ["Serviços disponíveis", "Horário de atendimento", "Contato"],
      };
    } else if (option === "Erro ao acessar o sistema") {
      return {
        text: "Você já tentou limpar o cache do navegador? Isso pode resolver o problema.",
        options: ["Sim, já tentei", "Não, como faço isso?", "Outro problema"],
      };
    } else if (option === "Problema de login") {
      return {
        text: "Certifique-se de que seu e-mail e senha estão corretos.",
        options: ["Funcionou!", "Ainda não consigo", "Esqueci minha senha"],
      };
    } else if (option === "Sair" || option === "Funcionou!") {
      return {
        text: "Obrigado por entrar em contato! Se precisar de mais ajuda, estou por aqui.",
      };
    } else {
      return {
        text: "Desculpe, não entendi bem. Poderia escolher uma das opções abaixo?",
        options: ["Reiniciar", "Falar com atendente", "Voltar"],
      };
    }
  };

  return (
    <Container className="chatbot-container" style={{ padding: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
      <div className="chatbox" style={{ marginBottom: "16px", maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender}
            style={{
              padding: "8px",
              marginBottom: "8px",
              backgroundColor: msg.sender === "user" ? "#cce4ff" : "#e2e2e2",
              borderRadius: "8px",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      {messages[messages.length - 1].sender === "bot" &&
        messages[messages.length - 1].options &&
        messages[messages.length - 1].options.length > 0 && (
          <Dropdown style={{ width: "100%" }}>
            <Dropdown.Toggle variant="primary" style={{ width: "100%" }}>
              Escolha uma opção
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ padding: "20px", width: "87%" }}>
              {messages[messages.length - 1].options.map((option, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <button
                    onClick={() => handleOptionClick(option)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px",
                      fontSize: "14px",
                      textAlign: "center",
                      backgroundColor: "#4A25E1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
    </Container>
  );
}

export default ChatSuporte;
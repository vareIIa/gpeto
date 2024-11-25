import React, { useState } from 'react';
import {
  Button,
  Spinner,
  Alert,
  Input,
  IconButton
} from '@edx/paragon';
import { FaUser, FaRobot, FaInfoCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/sidebar';
import Chatsuporte from '../Chatsuporte/ChatSuporte';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert('Por favor, insira uma mensagem.');
      return;
    }

    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setLoading(true);

    const payload = { message: input };

    try {
      const response = await fetch('http://147.79.111.214:5000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'b7fe1fd2-7074-4ae0-95ec-23f637695b87',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        alert('Falha na comunicação com o chatbot.');
        return;
      }

      const data = await response.json();
      const botResponse = data.response || 'Sem resposta';
      setMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      alert('Erro ao processar sua mensagem. Tente novamente.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <h1 style={{ marginBottom: '16px' }}>PD Coach</h1>

        <div
          style={{
            height: '50vh',
            width: '60vw',
            maxWidth: '600px',
            overflowY: 'auto',
            marginBottom: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f7f7f7',
          }}
        >
          {messages.length === 0 && (
            <Alert variant="info">Envie uma mensagem para começar!</Alert>
          )}
          {messages.map((msg, index) => (
           <div
           key={index}
           style={{
             display: 'flex',
             alignItems: 'flex-start', // Alinha o texto ao topo do ícone
             marginBottom: '8px',
             backgroundColor: msg.type === 'user' ? '#999999' : '#d1e7dd',
             borderRadius: '8px',
             padding: '8px',
           }}
         >
           <div
             style={{
               flexShrink: 0, // Impede que o ícone diminua
               marginRight: '8px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               width: '32px', // Tamanho fixo do ícone
               height: '32px',
             }}
           >
             {msg.type === 'user' ? (
               <FaUser style={{ fontSize: '28px', color: '#007bff' }} />
             ) : (
               <FaRobot style={{ fontSize: '28px', color: '#28a745' }} />
             )}
           </div>
           <p style={{ margin: 0, wordBreak: 'break-word' }}>{msg.text}</p>
         </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          <Input
            className="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire uma dúvida com o Coach..."
            disabled={loading}
            style={{ flex: 1, borderRadius: '12px' }}
          />
          <Button
            onClick={handleSendMessage}
            variant="primary"
            style={{ marginLeft: '16px', borderRadius: '12px' }}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Enviar'}
          </Button>
        </div>

        <IconButton
          icon={<FaInfoCircle style={{ fontSize: '28px', color: '#fff' }} />}
          aria-label="Abrir Suporte"
          onClick={toggleChatbot}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '0px',
            background: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            zIndex: '20',
          }}
        />

        {isChatbotVisible && (
          <div
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              width: '300px',
              maxHeight: '400px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              zIndex: '10',
            }}
          >
            <Chatsuporte />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
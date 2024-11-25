import React from 'react';
import ReactDOM from 'react-dom';
import Chatbot from './components/Chatbot/Chatbot';
import './index.scss';  // Importe o arquivo CSS onde você adicionou o estilo

// Código CSS inline
const zoomStyle = {
  transform: 'scale(1.1)',
  transformOrigin: '0 0',
  width: '85%',
  height: '100%',
  overflow: 'hidden',
};

ReactDOM.render(
  <React.StrictMode>
    <div style={zoomStyle}>
      <Chatbot />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
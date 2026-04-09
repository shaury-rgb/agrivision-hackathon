import { useMemo, useState } from 'react';
import { voiceResponses } from '../data/mockData';

const quickPrompts = [
  'Weather update',
  'Best crop for next season',
  'Current market prices',
  'Fertilizer recommendation',
];

function getResponse(input) {
  const text = input.toLowerCase();

  if (text.includes('weather')) return voiceResponses.weather;
  if (text.includes('crop')) return voiceResponses.crop;
  if (text.includes('price') || text.includes('market')) return voiceResponses.price;
  if (text.includes('disease')) return voiceResponses.disease;
  if (text.includes('fertilizer')) return voiceResponses.fertilizer;
  if (text.includes('hello') || text.includes('hi') || text.includes('namaste')) {
    return voiceResponses.greetings[0];
  }

  return voiceResponses.fallback;
}

export default function VoiceAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: voiceResponses.greetings[0],
    },
  ]);

  const placeholder = useMemo(() => voiceResponses.greetings[1], []);

  const sendMessage = (value) => {
    const content = value.trim();
    if (!content) return;

    const reply = getResponse(content);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: content },
      { role: 'assistant', text: reply },
    ]);
    setInput('');
  };

  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>Voice Assistant</h1>
        <p>Multilingual farmer support assistant for weather, crops, prices, and disease guidance.</p>
      </div>

      <div className="feature-card">
        <div className="quick-prompts">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="chip-btn"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            value={input}
            placeholder={placeholder}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage(input);
              }
            }}
          />
          <button type="button" className="primary-btn" onClick={() => sendMessage(input)}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

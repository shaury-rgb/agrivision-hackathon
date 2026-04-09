import { useMemo, useState } from 'react';
import { askAssistant } from '../api/client';

const defaultGreetings = [
  'Namaste! I am AgriVision, your farming assistant. How can I help today?',
  'Hello farmer! Ask me about weather, crops, prices, or diseases.',
];

const quickPrompts = [
  'Weather update',
  'Best crop for next season',
  'Current market prices',
  'Fertilizer recommendation',
];

export default function VoiceAssistant({ userMobile = '9999999999' }) {
  const [input, setInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: defaultGreetings[0],
    },
  ]);

  const placeholder = useMemo(() => defaultGreetings[1], []);

  const sendMessage = async (value) => {
    const content = value.trim();
    if (!content) return;

    setMessages((prev) => [...prev, { role: 'user', text: content }]);
    setInput('');

    setIsReplying(true);
    try {
      const response = await askAssistant({ message: content, mobile: userMobile });
      const reply = response?.reply || 'I could not generate a reply right now.';
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Assistant service is unavailable. Please ensure backend is running.',
        },
      ]);
    } finally {
      setIsReplying(false);
    }
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
            disabled={isReplying}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isReplying) {
                void sendMessage(input);
              }
            }}
          />
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              void sendMessage(input);
            }}
            disabled={isReplying}
          >
            {isReplying ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  );
}

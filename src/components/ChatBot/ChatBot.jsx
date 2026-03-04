import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import './ChatBot.styles.css';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm Vishal's AI assistant. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e, directMessage = null) => {
        if (e) e.preventDefault();
        const finalMessage = directMessage || input;
        if (!finalMessage.trim() || isLoading) return;

        const userMessage = { role: 'user', text: finalMessage.trim() };
        setMessages(prev => [...prev, userMessage]);
        if (!directMessage) setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.text,
                    history: messages.slice(-6) // Send last 6 messages for context
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, { role: 'bot', text: "I'm having a little trouble connecting right now. Please try again or email Vishal directly!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window glass"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <div className="chat-header">
                            <div className="header-info">
                                <div className="bot-avatar">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3>AI Assistant</h3>
                                    <span className="status-online">Online</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="chat-messages" ref={scrollRef} data-lenis-prevent>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message-wrapper ${msg.role}`}>
                                    <div className="message-icon">
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className="message-text">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message-wrapper bot">
                                    <div className="message-icon">
                                        <Bot size={14} />
                                    </div>
                                    <div className="message-text typing">
                                        <Loader2 size={14} className="spin" />
                                        <span>Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="suggestions-container">
                            {[
                                "Top Skills",
                                "Recent Projects",
                                "Work Experience",
                                "How to contact?"
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    className="suggestion-chip"
                                    onClick={() => {
                                        setInput(suggestion);
                                        // Trigger send logic
                                        const syntheticEvent = { preventDefault: () => { } };
                                        handleSend(syntheticEvent, suggestion);
                                    }}
                                    disabled={isLoading}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        <form className="chat-input" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={!input.trim() || isLoading}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`chat-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                {!isOpen && <span className="chat-notification">1</span>}
            </motion.button>
        </div>
    );
}

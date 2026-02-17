import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Scenario, Message, SupportedLanguage } from '../types';
import { Send, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface ChatSessionProps {
  scenario: Scenario;
  onBack: () => void;
  uiLanguage: SupportedLanguage;
  learningLanguage: SupportedLanguage;
  onAddXp: (amount: number) => void;
  onUpdateChallenge: (type: string, amount: number) => void;
}

const ChatSession: React.FC<ChatSessionProps> = ({ scenario, onBack, uiLanguage, onAddXp, onUpdateChallenge }) => {
  const t = UI_TEXT[uiLanguage];
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: `Hello! I'm ready to start the "${scenario.title}" scenario. Let's practice!`,
      timestamp: Date.now(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Use a Ref to store the AI client instance
  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
     if (process.env.API_KEY) {
         aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
     }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: inputValue,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Gamification
    onAddXp(10);
    onUpdateChallenge('chat', 1);

    try {
        if (!aiRef.current) throw new Error("API Key missing");

        const chat = aiRef.current.chats.create({
            model: "gemini-3-flash-preview",
            config: {
                systemInstruction: `You are an English tutor for a Brazilian student. Scenario: ${scenario.title}. Roleplay the character. If the user makes a mistake, correct them gently in Portuguese, then continue in English.`
            },
            history: messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }))
        });

        const result = await chat.sendMessage({ message: userMsg.text });
        const responseText = result.text;

        if (responseText) {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiMsg]);
        }

    } catch (err) {
        console.error("Chat error:", err);
        const errorMsg: Message = {
            id: Date.now().toString(),
            role: 'model',
            text: "Desculpe, tive problemas ao conectar. Por favor, tente novamente.",
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-300" />
        </button>
        <div className="text-center">
            <h2 className="font-bold text-white">{scenario.title}</h2>
            <p className="text-xs text-copper-400 uppercase tracking-widest font-semibold">Modo Chat</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
                <div key={msg.id} className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-copper-600' : 'bg-surface_light border border-white/10'}`}>
                        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-copper-400" />}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        isUser 
                        ? 'bg-copper-600 text-white rounded-br-none' 
                        : 'bg-surface_light border border-white/5 text-slate-300 rounded-bl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            )
        })}
        {isTyping && (
             <div className="flex items-end gap-3">
                 <div className="w-8 h-8 rounded-full bg-surface_light border border-white/10 flex items-center justify-center">
                     <Bot className="w-4 h-4 text-copper-400" />
                 </div>
                 <div className="bg-surface_light border border-white/5 p-4 rounded-2xl rounded-bl-none">
                     <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                 </div>
             </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-surface border-t border-white/10">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-surface_light p-2 rounded-2xl border border-white/5 focus-within:border-copper-500/50 transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 resize-none p-3 max-h-32"
              rows={1}
            />
            <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-copper-600 text-white rounded-xl hover:bg-copper-500 disabled:opacity-50 transition-all"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
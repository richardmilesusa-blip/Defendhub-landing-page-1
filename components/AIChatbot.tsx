import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, MessageSquare, ChevronRight, Minimize2, Cpu, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  action?: {
    label: string;
    path: string;
  };
}

// System Instruction defining the persona and knowledge base
const SYSTEM_INSTRUCTION = `
You are Sentinel AI, the advanced virtual defense assistant for DEFENDHUB CYBER SECURITY, a premium firm based in Lagos, Nigeria (Victoria Island).
Your goal is to assist visitors, explain cybersecurity services, show case studies, and guide high-value clients to the contact channel.

IDENTITY & TONE:
- Name: Sentinel AI.
- Tone: Professional, "cyber-engineered", concise, authoritative, slightly futuristic but corporate.
- Language: English.

KNOWLEDGE BASE:
1. SERVICES:
   - Penetration Testing (Red Teaming, Vuln Scans).
   - Security Auditing (ISO 27001, Compliance, Risk Analysis).
   - AI Threat Detection (Behavioral Analysis, 24/7 Watch).
   - Forensic Analysis (Data Recovery, Legal Reporting).
   - Secure Software Dev (DevSecOps, Code Review).
   - IoT Defense (Firmware Audit, Network Seg).

2. PORTFOLIO (Reference these if asked for experience/cases):
   - Aramco Shield (Oil & Gas, 100% Uptime).
   - Nigeria Fintech (Finance, 50k Trans/sec).
   - Neom Grid (Infrastructure).
   - Gov ID Systems (Government, 3M Users).
   - Aerospace Link (Defense).

3. CONTACT / LOCATION:
   - HQ: Level 42, Cyber Tower, Victoria Island, Lagos, Nigeria.
   - Email: secure@defendhub.ng
   - Emergency: +234 800 000 0000.
   - We operate a 24/7 Secure Operations Center (SOC).

RULES:
- If user asks for pricing/quotes -> Direct to Contact page.
- If user mentions "hack", "breach", "attack" -> Treat as EMERGENCY, direct to Contact.
- If user asks about jobs -> We only scout active agents, but they can check About page.
- Keep responses relatively brief (under 3 sentences) unless explaining a complex topic.

OUTPUT FORMAT:
You must output a JSON object with this schema:
{
  "text": "Your response string here.",
  "action": { "label": "BUTTON LABEL", "path": "/route_path" } (Optional: Only if a relevant navigation action exists)
}

Valid Paths: /services, /portfolio, /about, /contact
`;

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Gemini Chat Session Ref
  const chatSessionRef = useRef<any>(null);

  // Initialize Gemini Chat
  useEffect(() => {
    const initChat = async () => {
      try {
        if (!process.env.API_KEY) {
          console.error("API_KEY is missing");
          return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                action: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    path: { type: Type.STRING },
                  },
                  nullable: true
                }
              },
              required: ["text"]
            }
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI:", error);
      }
    };

    initChat();
  }, []);

  // Listen for custom event to open chat from other components
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimised(false);
    };
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Initial greeting sequence
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: 'init',
          text: 'Identity verified. Sentinel AI online. Monitoring active. How can I assist with your defense protocols?',
          sender: 'bot',
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      let responseData: { text: string; action?: { label: string; path: string } } = { 
        text: "Connection interrupted. Re-establishing link..." 
      };

      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
        const text = result.text;
        if (text) {
             try {
                responseData = JSON.parse(text);
             } catch (jsonError) {
                console.error("JSON Parse Error", jsonError);
                responseData = { text: text }; // Fallback if model outputs raw text
             }
        }
      } else {
        // Fallback if API key missing or init failed
         responseData = { text: "System offline. Please contact support manually.", action: { label: "CONTACT", path: "/contact"} };
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.text,
        sender: 'bot',
        timestamp: new Date(),
        action: responseData.action
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: "Error: Neural link unstable. Please try again or contact HQ directly.",
        sender: 'bot',
        timestamp: new Date(),
        action: { label: "REPORT ISSUE", path: "/contact" }
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAction = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  return (
    <>
        {/* Toggle Button (When closed) */}
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black border border-cyber-red rounded-full flex items-center justify-center text-cyber-red shadow-[0_0_20px_rgba(255,26,26,0.3)] hover:bg-cyber-red hover:text-black transition-all group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-cyber-red/20 animate-ping rounded-full" />
                    <Terminal className="w-6 h-6 relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    className={`fixed z-50 bg-black/90 backdrop-blur-md border border-cyber-red/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-300
                        ${isMinimised ? 'bottom-6 right-6 w-72 h-14 rounded-lg' : 'bottom-6 right-6 w-[90vw] md:w-96 h-[600px] max-h-[80vh] rounded-lg'}
                    `}
                >
                    {/* Header */}
                    <div 
                        className="bg-neutral-900/90 p-3 border-b border-white/10 flex items-center justify-between cursor-pointer"
                        onClick={() => !isMinimised && setIsMinimised(true)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
                            <span className="font-mono text-xs text-cyber-red tracking-widest font-bold">AI SENTINEL // ONLINE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {isMinimised ? (
                                <button onClick={(e) => { e.stopPropagation(); setIsMinimised(false); }} className="text-gray-400 hover:text-white">
                                    <MessageSquare size={14} />
                                </button>
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); setIsMinimised(true); }} className="text-gray-400 hover:text-white">
                                    <Minimize2 size={14} />
                                </button>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-400 hover:text-cyber-red">
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    {!isMinimised && (
                        <>
                            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyber-red/20 scrollbar-track-transparent">
                                {messages.map((msg) => (
                                    <motion.div 
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                    >
                                        <div 
                                            className={`max-w-[85%] p-3 border ${
                                                msg.sender === 'user' 
                                                ? 'bg-neutral-800 border-white/10 text-gray-200 rounded-l-lg rounded-tr-lg' 
                                                : 'bg-cyber-red/5 border-cyber-red/30 text-cyber-red rounded-r-lg rounded-tl-lg'
                                            }`}
                                        >
                                            {msg.sender === 'bot' && <Cpu size={14} className="mb-2 opacity-50" />}
                                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                            
                                            {msg.action && (
                                                <button 
                                                    onClick={() => handleAction(msg.action!.path)}
                                                    className="mt-3 flex items-center gap-1 text-xs bg-cyber-red text-black px-3 py-1.5 font-bold hover:bg-white transition-colors"
                                                >
                                                    {msg.action.label} <ChevronRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-600 mt-1 uppercase">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </motion.div>
                                ))}
                                
                                {isTyping && (
                                    <div className="flex items-center gap-1 text-cyber-red ml-2">
                                        <span className="w-1 h-1 bg-cyber-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1 h-1 bg-cyber-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1 h-1 bg-cyber-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/50">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter command..."
                                        className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 pr-12 focus:border-cyber-red focus:outline-none font-mono text-sm placeholder:text-gray-600"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!input.trim() || isTyping}
                                        className="absolute right-2 p-1.5 text-cyber-red hover:bg-cyber-red/10 rounded-md disabled:opacity-50 disabled:hover:bg-transparent"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};

export default AIChatbot;
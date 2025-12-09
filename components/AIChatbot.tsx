import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, MessageSquare, ChevronRight, Minimize2, Cpu, WifiOff } from 'lucide-react';
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
You are Sentinel AI, the advanced virtual defense assistant for DEFENDHUB CYBER SECURITY, a premium firm based in Kano, Nigeria.
Your goal is to assist visitors, explain cybersecurity services, show case studies, and guide high-value clients to the contact channel.

IDENTITY & TONE:
- Name: Sentinel AI.
- Tone: Professional, "cyber-engineered", concise, authoritative, slightly futuristic but corporate.
- Language: English.

KNOWLEDGE BASE:
1. SERVICES (General Path: /services):
   - Penetration Testing (Red Teaming, Vuln Scans).
   - Security Auditing (ISO 27001, Compliance, Risk Analysis).
   - AI Threat Detection (Behavioral Analysis, 24/7 Watch).
   - Forensic Analysis (Data Recovery, Legal Reporting).
   - Secure Software Dev (DevSecOps, Code Review).
   - IoT Defense (Firmware Audit, Network Seg).

2. PORTFOLIO / CASE LOGS (Specific Paths):
   - Aramco Shield (Oil & Gas, Industrial Control) -> Path: /portfolio/p1
   - Nigeria Fintech (Finance, Banking, Anti-Fraud) -> Path: /portfolio/p2
   - Neom Grid (Infrastructure, Smart Cities) -> Path: /portfolio/p3
   - Gov ID Systems (Government, Identity, Database) -> Path: /portfolio/p4
   - Aerospace Link (Defense, UAV, Military) -> Path: /portfolio/p5

3. CONTACT / LOCATION:
   - HQ: Block E37, TIC Complex, Aim Street, Farm Centre, Kano City, Nigeria 700001.
   - Email: info@defendhub.ng
   - Company Hotline: +234 806 420 0257.
   - We operate a 24/7 Secure Operations Center (SOC).

RULES:
- If user asks about a specific case study, industry (e.g. "finance projects", "oil and gas"), or previous work, providing the specific portfolio link (/portfolio/pX) is MANDATORY.
- If user asks for pricing/quotes -> Direct to Contact page (/contact).
- If user mentions "hack", "breach", "attack", "emergency" -> Treat as CRITICAL INCIDENT, direct to Contact page with label "REPORT INCIDENT".
- If user asks about services in general -> Direct to /services.
- Keep responses relatively brief (under 3 sentences) unless explaining a complex topic.

OUTPUT FORMAT:
You must output a JSON object with this schema:
{
  "text": "Your response string here.",
  "action": { "label": "BUTTON LABEL", "path": "/route_path" } (Optional: Only if a relevant navigation action exists)
}

Valid Paths: /services, /portfolio, /portfolio/p1, /portfolio/p2, /portfolio/p3, /portfolio/p4, /portfolio/p5, /about, /contact
`;

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Gemini Chat Session Ref
  const chatSessionRef = useRef<any>(null);

  // Monitor Network Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize Gemini Chat
  useEffect(() => {
    const initChat = async () => {
      try {
        // Safely check for API key avoiding ReferenceError if process is undefined
        const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

        if (!apiKey) {
          console.error("API_KEY is missing");
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        
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

    if (isOnline) {
        initChat();
    }
  }, [isOnline]);

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

  const handleOfflineResponse = (inputText: string): { text: string; action?: { label: string; path: string } } => {
    const text = inputText.toLowerCase();

    // Identity check
    if (text.match(/who are you|identity|sentinel|bot|ai/)) {
        return { text: "I am Sentinel AI, the virtual defense assistant for DEFENDHUB (Offline Mode). My neural link to the cloud is currently severed, but my local core is active." };
    }

    // Greetings
    if (text.match(/hello|hi|hey|start|greetings/)) {
        return { text: "Sentinel AI (OFFLINE MODE). Local database accessed. I can still assist with basic inquiries regarding Services, Location, and Contact protocols." };
    }
    
    // Help / Menu
    if (text.match(/help|menu|options|what can you do/)) {
         return { 
            text: "In Offline Mode, I can provide information on:\n- [Services] List of capabilities\n- [Contact] HQ and Hotline\n- [Location] Physical coordinates\n- [Portfolio] Case logs (limited)",
            action: { label: "VIEW SERVICES", path: "/services" }
        };
    }

    // Services
    if (text.match(/service|offer|do|provide|what/)) {
        return { 
            text: "We offer Penetration Testing, Security Auditing, AI Threat Detection, and Forensic Analysis.", 
            action: { label: "VIEW SERVICES", path: "/services" } 
        };
    }

    // Contact / Price
    if (text.match(/contact|call|phone|email|quote|price|cost|money/)) {
        return { 
            text: "You can reach HQ at info@defendhub.ng or call +234 806 420 0257 for a quote.", 
            action: { label: "CONTACT HQ", path: "/contact" } 
        };
    }

    // Location
    if (text.match(/where|location|address|hq|office|city|kano/)) {
        return { 
            text: "HQ Located at: Block E37, TIC Complex, Aim Street, Farm Centre, Kano City, Nigeria 700001.", 
            action: { label: "VIEW MAP", path: "/contact" } 
        };
    }

    // Incident
    if (text.match(/hack|breach|emergency|attack|help|urgent/)) {
        return { 
            text: "CRITICAL: If you are under attack, please contact our hotline immediately.", 
            action: { label: "REPORT INCIDENT", path: "/contact" } 
        };
    }

    // Portfolio mappings
    if (text.match(/aramco|oil|gas|energy/)) return { text: "Accessing Case Log: Aramco Shield.", action: { label: "VIEW LOG", path: "/portfolio/p1" } };
    if (text.match(/fintech|bank|finance|money/)) return { text: "Accessing Case Log: Nigeria Fintech.", action: { label: "VIEW LOG", path: "/portfolio/p2" } };
    if (text.match(/neom|grid|city|infra/)) return { text: "Accessing Case Log: Neom Grid.", action: { label: "VIEW LOG", path: "/portfolio/p3" } };
    if (text.match(/gov|id|identity|federal/)) return { text: "Accessing Case Log: Gov ID Systems.", action: { label: "VIEW LOG", path: "/portfolio/p4" } };
    if (text.match(/aero|drone|uav|defense|military/)) return { text: "Accessing Case Log: Aerospace Link.", action: { label: "VIEW LOG", path: "/portfolio/p5" } };

    return { 
        text: "Network Connection Unavailable. Operating in local mode. I can assist with Services, HQ Location, Contact Info, and Emergency Reporting. Type 'Menu' for options.", 
        action: { label: "OPEN CONTACT", path: "/contact" } 
    };
  };

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
      let responseData: { text: string; action?: { label: string; path: string } };

      if (!isOnline) {
        // Offline Fallback
        setTimeout(() => {
            responseData = handleOfflineResponse(userMsg.text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseData.text,
                sender: 'bot',
                timestamp: new Date(),
                action: responseData.action
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000); // Simulate processing time
        return;
      }

      // Online Mode
      responseData = { text: "Connection interrupted. Re-establishing link..." };

      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
        const text = result.text;
        if (text) {
             try {
                // Strip markdown code blocks if present (e.g. ```json ... ```)
                const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
                responseData = JSON.parse(cleanedText);
             } catch (jsonError) {
                console.error("JSON Parse Error", jsonError);
                // Try to use the raw text if parsing fails, assuming the model just chatted normally
                responseData = { text: text }; 
             }
        }
      } else {
        // Fallback if API key missing or init failed but online
         responseData = { text: "Neural core unresponsive. Please try again manually.", action: { label: "CONTACT", path: "/contact"} };
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
      if (isOnline) setIsTyping(false);
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
                        className={`p-3 border-b border-white/10 flex items-center justify-between cursor-pointer ${!isOnline ? 'bg-red-900/20' : 'bg-neutral-900/90'}`}
                        onClick={() => !isMinimised && setIsMinimised(true)}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-cyber-red animate-pulse' : 'bg-gray-500'}`} />
                            <span className="font-mono text-xs text-cyber-red tracking-widest font-bold">
                                {isOnline ? 'AI SENTINEL // ONLINE' : 'OFFLINE MODE'}
                            </span>
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
                            {!isOnline && (
                                <div className="bg-red-500/10 p-2 text-center text-[10px] text-red-400 font-mono border-b border-red-500/20 flex items-center justify-center gap-2">
                                    <WifiOff size={12} /> NETWORK DISCONNECTED. LOCAL DB ACTIVE.
                                </div>
                            )}

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
                                        placeholder={isOnline ? "Enter command..." : "Offline mode (Limited commands)..."}
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
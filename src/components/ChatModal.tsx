import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { chatMessageSchema } from '@/lib/validations';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentCategory: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatModal = ({ isOpen, onClose, agentName, agentCategory }: ChatModalProps) => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Validate and sanitize input using Zod schema
  const validateMessage = (input: string) => {
    const result = chatMessageSchema.safeParse({ message: input });
    
    if (!result.success) {
      const errors = result.error.issues.map(err => err.message).join(', ');
      toast.error(errors);
      return null;
    }
    
    // Additional sanitization
    return result.data.message
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Mensagem inicial do agente
      const initialMessage: Message = {
        id: '1',
        text: `Olá! Eu sou o assistente virtual para ${agentName}. Como posso ajudar você hoje?`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
    } else {
      setMessages([]);
      setInputValue('');
    }
  }, [isOpen, agentName]);

  const handleSendMessage = () => {
    if (!user) {
      toast.error('Você precisa estar logado para usar o chat');
      return;
    }

    const validatedMessage = validateMessage(inputValue);
    if (!validatedMessage) {
      return; // Error already shown by validateMessage
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: validatedMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular resposta do agente
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(agentName, validatedMessage),
        isUser: false,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAgentResponse = (agent: string, userInput: string): string => {
    const responses: Record<string, string[]> = {
      'Agente para Clínicas': [
        'Posso ajudar com agendamentos, prontuários eletrônicos e comunicação com pacientes.',
        'Nosso sistema integra agenda médica, histórico de consultas e lembretes automáticos.',
        'Podemos configurar consultas online e gestão completa da sua clínica.'
      ],
      'Agente Comercial SDR': [
        'Especializo em qualificação de leads e automação do processo de vendas.',
        'Posso configurar sequências de follow-up e scoring de prospects automaticamente.',
        'Meu foco é otimizar sua conversão de leads em oportunidades reais.'
      ],
      'Agente Imobiliário': [
        'Ajudo na captação de imóveis, qualificação de clientes e gestão de propriedades.',
        'Posso automatizar tours virtuais e acompanhamento de interessados.',
        'Especializo em CRM imobiliário e análise de mercado.'
      ],
      'Agente para Advocacia': [
        'Auxilio na gestão de casos, pesquisa jurisprudencial e análise de documentos.',
        'Posso automatizar prazos processuais e organização de petições.',
        'Especializo em compliance e gestão de escritórios de advocacia.'
      ]
    };

    const agentResponses = responses[agent] || [
      'Estou aqui para ajudar com suas necessidades específicas.',
      'Posso automatizar processos e otimizar sua produtividade.',
      'Vamos discutir como posso melhorar seu negócio.'
    ];

    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-sm h-[500px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary/90 backdrop-blur-sm p-4 text-primary-foreground border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{agentName}</h3>
              <p className="text-sm opacity-90">Online agora</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="w-full bg-muted border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => {/* Funcionalidade de voz pode ser implementada */}}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-2 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
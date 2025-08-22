import { useState } from 'react';
import AgentCard from './AgentCard';
import ChatModal from './ChatModal';
import { 
  Phone, 
  Heart, 
  Home, 
  Scale, 
  TrendingUp, 
  ShoppingCart, 
  Headphones, 
  RefreshCw, 
  Users, 
  BookOpen, 
  Smile, 
  Brain 
} from 'lucide-react';

const agents = [
  {
    id: 'agente-comercial-sdr',
    icon: Brain,
    title: 'Agente Consultorio Psicológico',
    category: 'Saúde Mental',
    description: 'Especialista em agendamento de consultas, triagem de pacientes e suporte psicológico automatizado para consultórios.'
  },
  {
    id: 'agente-clinicas',
    icon: Heart,
    title: 'Agente Consultorio Dentário',
    category: 'Saúde',
    description: 'Gestão inteligente de agendamentos, prontuários e comunicação com pacientes para clínicas médicas.'
  },
  {
    id: 'agente-imobiliarias',
    icon: Home,
    title: 'Agente Imobiliário',
    category: 'Imóveis',
    description: 'Automatização de captação, qualificação de clientes e gestão de propriedades no mercado imobiliário.'
  },
  {
    id: 'agente-advocacia',
    icon: Scale,
    title: 'Agente para Advocacia',
    category: 'Jurídico',
    description: 'Assistente jurídico para análise de documentos, pesquisa legal e gestão eficiente de casos.'
  },
  {
    id: 'agente-financeiro',
    icon: TrendingUp,
    title: 'Agente Financeiro SMO',
    category: 'Finanças',
    description: 'Análise financeira, controle de fluxo de caixa e otimização de investimentos empresariais.'
  },
  {
    id: 'agente-vendedor-infoprodutos',
    icon: ShoppingCart,
    title: 'Agente Vendedor',
    category: 'Marketing Digital',
    description: 'Especialista em vendas de produtos digitais, funis de conversão e marketing automático.'
  },
  {
    id: 'agente-petshop',
    icon: Heart,
    title: 'Agente PetShop',
    category: 'Animais de Estimação',
    description: 'Gestão completa para petshops: agendamentos, vendas de produtos e cuidados personalizados para pets.'
  },
  {
    id: 'agente-recuperador-vendas',
    icon: RefreshCw,
    title: 'Agente Recuperador de Vendas',
    category: 'Vendas',
    description: 'Recuperação inteligente de carrinho abandonado e reativação de clientes inativos.'
  },
  {
    id: 'agente-recrutamento-rh',
    icon: Users,
    title: 'Agente de Recrutamento RH',
    category: 'Recursos Humanos',
    description: 'Automatização de processos seletivos, triagem de currículos e gestão de talentos.'
  },
  {
    id: 'agente-escolas-ensino',
    icon: BookOpen,
    title: 'Agente para Escolas',
    category: 'Educação',
    description: 'Gestão educacional, acompanhamento de alunos e comunicação escolar automatizada.'
  },
  {
    id: 'agente-terapeuta',
    icon: Smile,
    title: 'Agente Terapeuta',
    category: 'Bem-estar',
    description: 'Assistente terapêutico para acompanhamento, agendamentos e suporte emocional.'
  },
  {
    id: 'agente-psicologo',
    icon: Brain,
    title: 'Agente Consultorio Psicológico',
    category: 'Saúde Mental',
    description: 'Suporte psicológico automatizado, triagem de pacientes e acompanhamento terapêutico.'
  }
];

const AgentsGrid = () => {
  const [selectedAgent, setSelectedAgent] = useState<{
    name: string;
    category: string;
  } | null>(null);

  const handleTestAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent({
        name: agent.title,
        category: agent.category
      });
    }
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Teste Nossos Agentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente foi desenvolvido com tecnologia de ponta para resolver desafios específicos do seu negócio.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              icon={agent.icon}
              title={agent.title}
              category={agent.category}
              description={agent.description}
              onTestAgent={() => handleTestAgent(agent.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="neural-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Pronto para Revolucionar seu Negócio?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e descubra como a inteligência artificial pode transformar sua empresa.
            </p>
            <button 
              className="neural-button"
              onClick={() => window.open('https://wa.me/5521970066231', '_blank')}
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={selectedAgent !== null}
        onClose={() => setSelectedAgent(null)}
        agentName={selectedAgent?.name || ''}
        agentCategory={selectedAgent?.category || ''}
      />
    </div>
  );
};

export default AgentsGrid;
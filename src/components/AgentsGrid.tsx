import AgentCard from './AgentCard';
import aiBrainIcon from '@/assets/ai-brain.png';
import aiChatIcon from '@/assets/ai-chat.png';
import aiAnalyticsIcon from '@/assets/ai-analytics.png';
import aiContentIcon from '@/assets/ai-content.png';
import aiAutomationIcon from '@/assets/ai-automation.png';

const agents = [
  {
    id: 'agente-comercial-sdr',
    icon: aiChatIcon,
    title: 'Agente Comercial SDR',
    category: 'Vendas',
    description: 'Especialista em prospecção e qualificação de leads, automatizando o processo de vendas inicial com inteligência artificial.'
  },
  {
    id: 'agente-clinicas',
    icon: aiBrainIcon,
    title: 'Agente para Clínicas',
    category: 'Saúde',
    description: 'Gestão inteligente de agendamentos, prontuários e comunicação com pacientes para clínicas médicas.'
  },
  {
    id: 'agente-imobiliarias',
    icon: aiAnalyticsIcon,
    title: 'Agente Imobiliário',
    category: 'Imóveis',
    description: 'Automatização de captação, qualificação de clientes e gestão de propriedades no mercado imobiliário.'
  },
  {
    id: 'agente-advocacia',
    icon: aiContentIcon,
    title: 'Agente para Advocacia',
    category: 'Jurídico',
    description: 'Assistente jurídico para análise de documentos, pesquisa legal e gestão eficiente de casos.'
  },
  {
    id: 'agente-financeiro',
    icon: aiAnalyticsIcon,
    title: 'Agente Financeiro SMO',
    category: 'Finanças',
    description: 'Análise financeira, controle de fluxo de caixa e otimização de investimentos empresariais.'
  },
  {
    id: 'agente-vendedor-infoprodutos',
    icon: aiAutomationIcon,
    title: 'Agente Vendedor de Infoprodutos',
    category: 'Marketing Digital',
    description: 'Especialista em vendas de produtos digitais, funis de conversão e marketing automático.'
  },
  {
    id: 'agente-cx',
    icon: aiChatIcon,
    title: 'Agente CX',
    category: 'Experiência do Cliente',
    description: 'Otimização da experiência do cliente através de atendimento inteligente e personalizado.'
  },
  {
    id: 'agente-recuperador-vendas',
    icon: aiAutomationIcon,
    title: 'Agente Recuperador de Vendas',
    category: 'Vendas',
    description: 'Recuperação inteligente de carrinho abandonado e reativação de clientes inativos.'
  },
  {
    id: 'agente-recrutamento-rh',
    icon: aiBrainIcon,
    title: 'Agente de Recrutamento RH',
    category: 'Recursos Humanos',
    description: 'Automatização de processos seletivos, triagem de currículos e gestão de talentos.'
  },
  {
    id: 'agente-escolas-ensino',
    icon: aiContentIcon,
    title: 'Agente para Escolas',
    category: 'Educação',
    description: 'Gestão educacional, acompanhamento de alunos e comunicação escolar automatizada.'
  },
  {
    id: 'agente-terapeuta',
    icon: aiChatIcon,
    title: 'Agente Terapeuta',
    category: 'Bem-estar',
    description: 'Assistente terapêutico para acompanhamento, agendamentos e suporte emocional.'
  },
  {
    id: 'agente-psicologo',
    icon: aiBrainIcon,
    title: 'Agente Psicólogo',
    category: 'Saúde Mental',
    description: 'Suporte psicológico automatizado, triagem de pacientes e acompanhamento terapêutico.'
  },
  {
    id: 'agente-afiliado',
    icon: aiAnalyticsIcon,
    title: 'Agente Afiliado',
    category: 'Marketing de Afiliação',
    description: 'Gestão de programas de afiliação, otimização de comissões e análise de performance.'
  }
];

const AgentsGrid = () => {
  const handleTestAgent = (agentId: string) => {
    console.log(`Testing agent: ${agentId}`);
    // Aqui você pode implementar a lógica para testar cada agente
    // Por exemplo, abrir um modal, navegar para uma página específica, etc.
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Nossos Agentes</span>
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
            <button className="neural-button">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsGrid;
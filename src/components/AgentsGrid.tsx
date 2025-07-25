import AgentCard from './AgentCard';
import aiBrainIcon from '@/assets/ai-brain.png';
import aiChatIcon from '@/assets/ai-chat.png';
import aiAnalyticsIcon from '@/assets/ai-analytics.png';
import aiContentIcon from '@/assets/ai-content.png';
import aiAutomationIcon from '@/assets/ai-automation.png';

const agents = [
  {
    id: 'neural-assistant',
    icon: aiBrainIcon,
    title: 'Assistente Neural',
    category: 'IA Geral',
    description: 'Agente de IA avançado capaz de compreender contextos complexos e fornecer soluções inteligentes para qualquer desafio empresarial.'
  },
  {
    id: 'chat-specialist',
    icon: aiChatIcon,
    title: 'Especialista em Conversação',
    category: 'Atendimento',
    description: 'Chatbot inteligente com capacidade de manter conversas naturais e resolver dúvidas de clientes com eficiência e personalidade.'
  },
  {
    id: 'data-analyst',
    icon: aiAnalyticsIcon,
    title: 'Analista de Dados',
    category: 'Analytics',
    description: 'Processa grandes volumes de dados, identifica padrões e gera insights acionáveis para tomada de decisões estratégicas.'
  },
  {
    id: 'content-creator',
    icon: aiContentIcon,
    title: 'Criador de Conteúdo',
    category: 'Marketing',
    description: 'Desenvolve conteúdo criativo e persuasivo para diferentes canais, mantendo consistência de marca e engajamento.'
  },
  {
    id: 'process-automator',
    icon: aiAutomationIcon,
    title: 'Automatizador de Processos',
    category: 'Automação',
    description: 'Otimiza fluxos de trabalho, elimina tarefas repetitivas e integra sistemas para máxima eficiência operacional.'
  },
  {
    id: 'strategic-advisor',
    icon: aiBrainIcon,
    title: 'Consultor Estratégico',
    category: 'Estratégia',
    description: 'Analisa mercados, identifica oportunidades e fornece recomendações estratégicas baseadas em inteligência artificial avançada.'
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
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface MobilePhoneProps {
  agentName: string;
  webhookUrl?: string;
}

const MobilePhone = ({ agentName, webhookUrl }: MobilePhoneProps) => {
  const navigate = useNavigate();
  
  // Define webhook URLs for different agents
  const getWebhookUrl = () => {
    if (webhookUrl) return webhookUrl;
    
    switch (agentName) {
      case 'Agência de Carros':
        return 'https://webhook.serverwegrowup.com.br/webhook/c1822a5d-f4d4-4f3b-9d9b-0f10df50b700/chat';
      case 'Agente Consultorio Dentário':
        return 'https://webhook.serverwegrowup.com.br/webhook/a25204f9-c6f4-4da5-9bc5-80b41bba6bbd/chat';
      case 'Agente Imobiliário':
        return 'https://webhook.serverwegrowup.com.br/webhook/4b488be8-8539-4e2e-bf90-2f9265c4154d/chat';
      case 'Agente para Advocacia':
        return 'https://webhook.serverwegrowup.com.br/webhook/439de416-67d1-4b80-aa35-81ce08073a4b/chat';
      case 'Agente Salão de Estética':
        return 'https://webhook.serverwegrowup.com.br/webhook/18f3d996-05e4-48d9-95ca-48626c508628/chat';
      case 'Agente Vendedor':
        return 'https://webhook.serverwegrowup.com.br/webhook/c4302f36-b020-4657-a934-a246a1503332/chat';
      case 'Agente PetShop':
      default:
        return 'https://webhook.serverwegrowup.com.br/webhook/a6d03774-72d3-43e6-91ae-7eb0c76e0551/chat';
    }
  };
  
  // Activate agent when component mounts
  React.useEffect(() => {
    const activateAgent = async () => {
      try {
        await fetch('https://webhook.serverwegrowup.com.br/webhook/c1822a5d-f4d4-4f3b-9d9b-0f10df50b700/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agent: agentName,
            action: 'activate',
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Error activating agent:', error);
      }
    };
    
    activateAgent();
  }, [agentName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg hover:bg-card/90 transition-colors text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Mobile Phone Frame */}
      <div className="relative">
        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-xl scale-110 rounded-[3rem]" />
        
        {/* Phone Body */}
        <div className="relative w-[340px] h-[720px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="w-full h-full bg-black rounded-[2.5rem] p-1">
            {/* Screen */}
            <div className="w-full h-full bg-gray-900 rounded-[2.2rem] overflow-hidden relative">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-[#075e54] flex items-center justify-between px-4 z-10">
                <div className="text-white text-sm font-medium">8:18</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm" />
                  </div>
                  <div className="text-white text-xs">100%</div>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="absolute top-12 left-0 right-0 h-16 bg-[#075e54] flex items-center px-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{agentName}</h3>
                    <p className="text-green-200 text-xs">online</p>
                  </div>
                </div>
              </div>

              {/* Chat Container */}
              <div className="absolute top-28 left-0 right-0 bottom-0 bg-[#0a0a0a]">
                {/* WhatsApp Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* N8n Chat Iframe */}
                <iframe
                  src={getWebhookUrl()}
                  className="w-full h-full border-0 relative z-10"
                  title={`Chat do ${agentName}`}
                  allow="microphone; camera; fullscreen"
                  style={{
                    background: 'transparent'
                  }}
                />
              </div>

              {/* Home Indicator (iPhone style) */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Phone Buttons */}
        <div className="absolute right-[-8px] top-32 w-1 h-16 bg-gray-700 rounded-l" />
        <div className="absolute right-[-8px] top-52 w-1 h-12 bg-gray-700 rounded-l" />
        <div className="absolute right-[-8px] top-68 w-1 h-12 bg-gray-700 rounded-l" />
        <div className="absolute left-[-8px] top-44 w-1 h-20 bg-gray-700 rounded-r" />
      </div>
    </div>
  );
};

export default MobilePhone;
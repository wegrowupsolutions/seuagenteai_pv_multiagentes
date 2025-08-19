import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobilePhoneProps {
  agentName: string;
}

const MobilePhone = ({ agentName }: MobilePhoneProps) => {
  const navigate = useNavigate();

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
                <div className="text-white text-sm font-medium">9:41</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3 h-1 bg-white rounded-sm" />
                  </div>
                  <div className="text-white text-xs">100%</div>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="absolute top-12 left-0 right-0 h-14 bg-[#075e54] flex items-center px-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{agentName}</h3>
                    <p className="text-green-200 text-xs">online</p>
                  </div>
                </div>
              </div>

              {/* Chat Container */}
              <div className="absolute top-26 left-0 right-0 bottom-0 bg-[#e5ddd5]">
                {/* WhatsApp Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23128c7e' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* N8n Chat Iframe */}
                <iframe
                  src="https://webhook.serverwegrowup.com.br/webhook/a6d03774-72d3-43e6-91ae-7eb0c76e0551/chat"
                  className="w-full h-full border-0 relative z-10 bg-white"
                  title={`Chat do ${agentName}`}
                  allow="microphone; camera; fullscreen"
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
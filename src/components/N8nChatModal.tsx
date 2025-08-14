import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface N8nChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

const N8nChatModal = ({ isOpen, onClose, agentName }: N8nChatModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neural-card max-w-2xl w-[90vw] h-[80vh] p-0 border-primary/30 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl">
        {/* Floating Neural Orbs */}
        <div className="absolute top-4 right-16 floating-orb" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-6 left-6 floating-orb" style={{ animationDelay: '2s' }} />
        
        {/* Neural Scan Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-neural-scan" />
        </div>

        <DialogHeader className="relative z-10 flex flex-row items-center justify-between p-6 border-b border-primary/20">
          <DialogTitle className="text-xl font-bold text-gradient flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary/60" />
            </div>
            Chat com {agentName}
          </DialogTitle>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <X className="w-4 h-4 text-primary" />
          </button>
        </DialogHeader>

        <div className="relative z-10 flex-1 p-6">
          <div className="w-full h-full rounded-lg overflow-hidden border border-primary/20 neural-glow">
            <iframe
              src="https://webhook.serverwegrowup.com.br/webhook/a6d03774-72d3-43e6-91ae-7eb0c76e0551/chat"
              className="w-full h-full"
              title={`Chat do ${agentName}`}
              style={{ border: 'none' }}
              allow="microphone; camera; fullscreen"
            />
          </div>
        </div>

        {/* Neural Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default N8nChatModal;
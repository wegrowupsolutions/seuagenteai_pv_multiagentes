import { X, Mic, Send } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

interface N8nChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

const N8nChatModal = ({ isOpen, onClose, agentName }: N8nChatModalProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90vw] h-[600px] p-0 bg-gray-900 border-gray-700 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 text-gray-900 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{agentName}</h3>
            <p className="text-sm opacity-80">Online agora</p>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-cyan-500 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* N8n Chat Iframe */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://webhook.serverwegrowup.com.br/webhook/a6d03774-72d3-43e6-91ae-7eb0c76e0551/chat"
              className="w-full h-full border-0"
              title={`Chat do ${agentName}`}
              allow="microphone; camera; fullscreen"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default N8nChatModal;
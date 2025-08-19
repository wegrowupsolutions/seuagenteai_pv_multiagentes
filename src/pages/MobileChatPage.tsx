import { useParams } from 'react-router-dom';
import MobilePhone from '@/components/MobilePhone';

const MobileChatPage = () => {
  const { agentName } = useParams<{ agentName: string }>();
  
  // Fallback caso não tenha parâmetro
  const displayName = agentName ? decodeURIComponent(agentName) : 'Agente IA';

  return <MobilePhone agentName={displayName} />;
};

export default MobileChatPage;
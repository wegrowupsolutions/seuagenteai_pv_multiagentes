import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo-seu-agente-ia.png';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="relative z-50 border-b border-border/50 neural-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="Seu Agente IA - AI Agent Hub" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {profile && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span className="text-foreground">{profile.display_name || profile.email}</span>
                    {profile.role !== 'user' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {profile.role === 'admin' ? 'Admin' : 'Business'}
                      </span>
                    )}
                  </div>
                )}
                
                <button 
                  className="neural-button text-sm px-4 py-2"
                  onClick={() => window.open('https://wa.me/5521970066231', '_blank')}
                >
                  Falar com Especialista
                </button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <button 
                  className="neural-button text-sm px-4 py-2"
                  onClick={() => window.open('https://wa.me/5521970066231', '_blank')}
                >
                  Falar com Especialista
                </button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="relative z-50 border-b border-border/50 neural-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Seu Agente IA</h1>
            </div>
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
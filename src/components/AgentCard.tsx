interface AgentCardProps {
  icon: string;
  title: string;
  description: string;
  category: string;
  onTestAgent: () => void;
}

const AgentCard = ({ icon, title, description, category, onTestAgent }: AgentCardProps) => {
  return (
    <div className="neural-card neural-glow group relative overflow-hidden">
      {/* Floating Neural Orbs */}
      <div className="absolute top-4 right-4 floating-orb" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-6 left-6 floating-orb" style={{ animationDelay: '2s' }} />
      
      {/* Neural Scan Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-neural-scan" />
      </div>

      <div className="relative z-10">
        {/* Agent Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img 
              src={icon} 
              alt={title}
              className="w-12 h-12 object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* Category Badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Agent Title */}
        <h3 className="text-xl font-bold mb-3 text-gradient">
          {title}
        </h3>

        {/* Agent Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Test Button */}
        <button 
          onClick={onTestAgent}
          className="neural-button w-full group-hover:shadow-[var(--neural-glow)] group-hover:scale-[1.02] transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            TESTAR AGORA
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
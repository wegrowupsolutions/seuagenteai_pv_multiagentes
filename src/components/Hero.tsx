const Hero = () => {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Neural Network Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" />
        <div className="absolute bottom-1/4 left-1/3 w-px h-28 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
        <div className="absolute top-1/2 right-1/4 w-px h-36 bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0" />
        
        {/* Neural Nodes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-gradient">Agentes de IA</span>
          <br />
          <span className="text-foreground">já são realidade!</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Descubra o poder da inteligência artificial através de agentes especializados.
          <br />
          <span className="text-gradient font-semibold">Transforme sua empresa com tecnologia de ponta.</span>
        </p>

      </div>

      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-10 floating-orb opacity-40" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 floating-orb opacity-30" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 floating-orb opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 floating-orb opacity-40" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default Hero;

import { ArrowRight, ExternalLink, Eye, Github, Info } from 'lucide-react';
import ContrastChecker from '@/components/ContrastChecker';

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header Section */}
      <header className="w-full pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
              WCAG Contrast Analysis Tool
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display tracking-tight font-bold animate-fade-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Chroma Heatmap
              </span> Explorer
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
              Visualize and analyze WCAG color contrast compliance across any website.
              Identify accessibility issues with our interactive heatmap tool.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <a 
                href="https://webaim.org/resources/contrastchecker/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:border-primary/50 transition-all"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                WebAIM Contrast Checker
              </a>
              
              <a 
                href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:border-primary/50 transition-all"
              >
                <Info className="w-4 h-4 mr-2" />
                WCAG Guidelines
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative z-10">
            <ContrastChecker />
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              Our tool makes it easy to identify contrast issues on any website
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Capture</h3>
              <p className="text-muted-foreground">
                We use headless Chrome to take a screenshot of your target website, capturing all visual elements.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M7.5 10.5C8.32843 10.5 9 9.82843 9 9C9 8.17157 8.32843 7.5 7.5 7.5C6.67157 7.5 6 8.17157 6 9C6 9.82843 6.67157 10.5 7.5 10.5Z" fill="currentColor" />
                  <path d="M16.5 10.5C17.3284 10.5 18 9.82843 18 9C18 8.17157 17.3284 7.5 16.5 7.5C15.6716 7.5 15 8.17157 15 9C15 9.82843 15.6716 10.5 16.5 10.5Z" fill="currentColor" />
                  <path d="M12 18C14.5 18 16.5 16 16.5 13.5H7.5C7.5 16 9.5 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Analyze</h3>
              <p className="text-muted-foreground">
                We extract color pairs and calculate contrast ratios according to WCAG 2.1 accessibility guidelines.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Visualize</h3>
              <p className="text-muted-foreground">
                Explore the interactive heatmap showing passing and failing areas, with detailed information on each color pair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chroma Heatmap Explorer. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

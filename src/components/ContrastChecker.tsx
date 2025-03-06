
import { useState } from 'react';
import UrlForm from './UrlForm';
import HeatmapGrid from './HeatmapGrid';
import ResultsPanel from './ResultsPanel';
import { captureScreenshot, isUrlAccessible } from '@/utils/chromeUtils';
import { analyzeScreenshot, ColorPair, AnalysisResult } from '@/utils/contrastUtils';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

const ContrastChecker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedPair, setSelectedPair] = useState<ColorPair | null>(null);
  const { toast } = useToast();

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSelectedPair(null);
    
    try {
      // Check if URL is accessible
      const isAccessible = await isUrlAccessible(url);
      if (!isAccessible) {
        setError('The website is not accessible');
        toast({
          title: "Error",
          description: "The website is not accessible",
          variant: "destructive",
        });
        return;
      }
      
      // Capture screenshot
      toast({
        title: "Processing",
        description: "Capturing screenshot...",
      });
      
      const screenshot = await captureScreenshot(url);
      
      // Analyze the screenshot
      toast({
        title: "Processing",
        description: "Analyzing contrast...",
      });
      
      const analysisResult = await analyzeScreenshot(url, screenshot);
      
      // Set the result
      setResult(analysisResult);
      
      // Set the first color pair as selected
      if (analysisResult.colorPairs.length > 0) {
        setSelectedPair(analysisResult.colorPairs[0]);
      }
      
      toast({
        title: "Success",
        description: `Analysis complete for ${url}`,
      });
    } catch (err) {
      console.error('Error processing URL:', err);
      setError('Failed to analyze the website');
      toast({
        title: "Error",
        description: "Failed to analyze the website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAreaSelect = (colorPair: ColorPair) => {
    setSelectedPair(colorPair);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Card className="p-6 rounded-xl border border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
        <UrlForm onSubmit={handleUrlSubmit} isLoading={isLoading} />
      </Card>
      
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-fade-in">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="w-full p-12 rounded-lg border border-border bg-card/50 text-center animate-pulse-subtle">
          <p className="text-muted-foreground">Analyzing website...</p>
          <p className="text-xs text-muted-foreground mt-2">This may take a few moments</p>
        </div>
      )}
      
      {result && (
        <div className="space-y-6">
          <HeatmapGrid 
            screenshot={result.screenshot} 
            colorPairs={result.colorPairs}
            onSelectArea={handleAreaSelect}
          />
          
          <ResultsPanel 
            result={result}
            selectedPair={selectedPair} 
            onSelectPair={setSelectedPair}
          />
        </div>
      )}
    </div>
  );
};

export default ContrastChecker;

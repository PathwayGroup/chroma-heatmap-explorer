
import { useState } from 'react';
import { ColorPair, AnalysisResult } from '@/utils/contrastUtils';
import { Progress } from '@/components/ui/progress';
import { 
  Check, X, AlertTriangle, Info, ChevronDown, ChevronUp,
  Copy, DownloadIcon, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsPanelProps {
  result: AnalysisResult | null;
  selectedPair: ColorPair | null;
  onSelectPair: (pair: ColorPair) => void;
}

const ResultsPanel = ({ result, selectedPair, onSelectPair }: ResultsPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!result) return null;
  
  const { summary, colorPairs } = result;
  
  // Calculate percentages for progress bars
  const passRateAA = Math.round((summary.passing.AA / summary.total) * 100);
  const passRateAAA = Math.round((summary.passing.AAA / summary.total) * 100);
  
  // Sort color pairs by contrast ratio (highest to lowest)
  const sortedPairs = [...colorPairs].sort((a, b) => b.ratio - a.ratio);
  
  // Determine how many pairs to show initially
  const initialPairsCount = 5;
  const displayPairs = expanded ? sortedPairs : sortedPairs.slice(0, initialPairsCount);
  
  // Helper function to copy contrast data to clipboard
  const copyResults = () => {
    const text = `
WCAG Contrast Analysis for ${result.url}
Timestamp: ${new Date(result.timestamp).toLocaleString()}

Summary:
- Total color pairs analyzed: ${summary.total}
- AA passing: ${summary.passing.AA} (${passRateAA}%)
- AAA passing: ${summary.passing.AAA} (${passRateAAA}%)

Color Pairs:
${colorPairs.map(pair => `
- Foreground: ${pair.foreground}, Background: ${pair.background}
  Contrast Ratio: ${pair.ratio.toFixed(2)}:1
  WCAG 2.1 AA: ${pair.passes.AA ? 'Pass' : 'Fail'}
  WCAG 2.1 AAA: ${pair.passes.AAA ? 'Pass' : 'Fail'}
`).join('')}
    `.trim();
    
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Results copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy results:', err);
      });
  };
  
  return (
    <div className="w-full space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-card shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-4">WCAG Level AA</h3>
          <div className="space-y-3">
            <Progress value={passRateAA} className="h-2 mb-2" />
            <div className="flex justify-between text-sm">
              <span>
                <Check className="inline-block w-4 h-4 mr-1 text-chroma-pass" />
                Passing: {summary.passing.AA}
              </span>
              <span>
                <X className="inline-block w-4 h-4 mr-1 text-chroma-fail" />
                Failing: {summary.failing.AA}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-card shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-4">WCAG Level AAA</h3>
          <div className="space-y-3">
            <Progress value={passRateAAA} className="h-2 mb-2" />
            <div className="flex justify-between text-sm">
              <span>
                <Check className="inline-block w-4 h-4 mr-1 text-chroma-pass" />
                Passing: {summary.passing.AAA}
              </span>
              <span>
                <X className="inline-block w-4 h-4 mr-1 text-chroma-fail" />
                Failing: {summary.failing.AAA}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 rounded-xl bg-card shadow-sm border border-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Color Pairs</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyResults}
              className="flex items-center text-xs"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(`https://webaim.org/resources/contrastchecker/?fcolor=${selectedPair?.foreground.replace('#', '')}&bcolor=${selectedPair?.background.replace('#', '')}`, '_blank')}
              className="flex items-center text-xs"
              disabled={!selectedPair}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Check
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {displayPairs.map((pair, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-primary ${
                selectedPair === pair ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => onSelectPair(pair)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md overflow-hidden border border-border">
                    <div 
                      className="w-full h-1/2" 
                      style={{ backgroundColor: pair.foreground }}
                    />
                    <div 
                      className="w-full h-1/2" 
                      style={{ backgroundColor: pair.background }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{pair.ratio.toFixed(2)}:1</span>
                      {pair.passes.AA ? (
                        <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-chroma-pass/20 text-chroma-pass font-medium">AA</span>
                      ) : (
                        <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-chroma-fail/20 text-chroma-fail font-medium">AA</span>
                      )}
                      {pair.passes.AAA ? (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-chroma-pass/20 text-chroma-pass font-medium">AAA</span>
                      ) : (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-chroma-fail/20 text-chroma-fail font-medium">AAA</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="font-mono">{pair.foreground}</span> on <span className="font-mono">{pair.background}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedPairs.length > initialPairsCount && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full text-xs flex items-center justify-center"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-2" />
                Show {sortedPairs.length - initialPairsCount} More
              </>
            )}
          </Button>
        )}
      </div>
      
      {selectedPair && (
        <div className="p-6 rounded-xl bg-card shadow-sm border border-border space-y-4 animate-scale-in">
          <h3 className="text-lg font-semibold">Selected Color Pair</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div 
                  className="w-full md:w-1/2 h-16 flex items-center justify-center"
                  style={{ backgroundColor: selectedPair.foreground, color: selectedPair.background }}
                >
                  <span className="font-medium">Foreground</span>
                </div>
                <div 
                  className="w-full md:w-1/2 h-16 flex items-center justify-center"
                  style={{ backgroundColor: selectedPair.background, color: selectedPair.foreground }}
                >
                  <span className="font-medium">Background</span>
                </div>
              </div>
              <div className="p-4 space-y-1 bg-card">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Foreground:</span>
                  <span className="text-sm font-mono">{selectedPair.foreground}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Background:</span>
                  <span className="text-sm font-mono">{selectedPair.background}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Contrast Ratio</span>
                  <span className="text-lg font-semibold">{selectedPair.ratio.toFixed(2)}:1</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WCAG AA (Normal Text)</span>
                    {selectedPair.passes.AA ? (
                      <span className="flex items-center text-chroma-pass">
                        <Check className="w-4 h-4 mr-1" />
                        Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-chroma-fail">
                        <X className="w-4 h-4 mr-1" />
                        Fail
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WCAG AA (Large Text)</span>
                    {selectedPair.passes.AALarge ? (
                      <span className="flex items-center text-chroma-pass">
                        <Check className="w-4 h-4 mr-1" />
                        Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-chroma-fail">
                        <X className="w-4 h-4 mr-1" />
                        Fail
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WCAG AAA (Normal Text)</span>
                    {selectedPair.passes.AAA ? (
                      <span className="flex items-center text-chroma-pass">
                        <Check className="w-4 h-4 mr-1" />
                        Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-chroma-fail">
                        <X className="w-4 h-4 mr-1" />
                        Fail
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WCAG AAA (Large Text)</span>
                    {selectedPair.passes.AAALarge ? (
                      <span className="flex items-center text-chroma-pass">
                        <Check className="w-4 h-4 mr-1" />
                        Pass
                      </span>
                    ) : (
                      <span className="flex items-center text-chroma-fail">
                        <X className="w-4 h-4 mr-1" />
                        Fail
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="flex items-start">
              <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. AAA requires at least 7:1 for normal text and 4.5:1 for large text.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;

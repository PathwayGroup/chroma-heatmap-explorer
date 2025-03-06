
import { useRef, useEffect, useState } from 'react';
import { ColorPair, getHeatmapColor } from '@/utils/contrastUtils';
import { Loader2 } from 'lucide-react';

interface HeatmapGridProps {
  screenshot: string;
  colorPairs: ColorPair[];
  onSelectArea?: (colorPair: ColorPair) => void;
}

const HeatmapGrid = ({ screenshot, colorPairs, onSelectArea }: HeatmapGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Draw the heatmap overlay on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !screenshot) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsImageLoaded(false);
    setLoadError(null);
    
    // Load the screenshot image
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = screenshot;
    
    image.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw the image
      ctx.drawImage(image, 0, 0);
      
      // Draw the heatmap overlay
      colorPairs.forEach(pair => {
        const { x, y, width, height } = pair.location;
        
        // Get color based on contrast ratio
        ctx.fillStyle = getHeatmapColor(pair.ratio);
        ctx.fillRect(x, y, width, height);
        
        // Add a border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
      });
      
      setIsImageLoaded(true);
    };
    
    // Handle image load error
    image.onerror = () => {
      console.error('Failed to load screenshot');
      setLoadError('Failed to load screenshot');
      
      // Draw error message
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ef4444';
      ctx.font = '20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Failed to load screenshot', canvas.width / 2, canvas.height / 2);
    };
  }, [screenshot, colorPairs]);
  
  // Handle canvas click to select an area
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onSelectArea || !isImageLoaded) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    // Find the color pair at the clicked position
    const clickedPair = colorPairs.find(pair => {
      const { x: px, y: py, width, height } = pair.location;
      return x >= px && x <= px + width && y >= py && y <= py + height;
    });
    
    if (clickedPair) {
      onSelectArea(clickedPair);
    }
  };
  
  return (
    <div className="w-full overflow-auto rounded-lg border border-border bg-card/50 shadow-sm animate-fade-in">
      <div className="relative w-full h-full min-h-[300px] overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className={`max-w-full h-auto cursor-pointer ${isImageLoaded ? 'opacity-100' : 'opacity-50'}`}
          style={{ minHeight: '300px' }}
        />
        
        {/* Loading state */}
        {!isImageLoaded && screenshot && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50">
            <div className="text-center p-6 animate-pulse">
              <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading screenshot...</p>
            </div>
          </div>
        )}
        
        {/* Error state */}
        {loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50">
            <div className="text-center p-6 text-destructive">
              <p>{loadError}</p>
              <p className="text-sm mt-2">Please try another URL</p>
            </div>
          </div>
        )}
        
        {/* Empty state */}
        {!screenshot && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50">
            <div className="text-center p-6">
              <p className="text-muted-foreground">Screenshot will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatmapGrid;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidUrl } from '@/utils/chromeUtils';
import { Loader2 } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    // Add protocol if missing
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }
    
    if (!isValidUrl(formattedUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Submit the validated URL
    try {
      await onSubmit(formattedUrl);
    } catch (err) {
      setError('Failed to analyze the URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-up">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-14 pl-4 pr-12 text-lg transition-all rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary"
          disabled={isLoading}
        />
      </div>
      
      {error && (
        <p className="text-destructive text-sm animate-fade-in">{error}</p>
      )}
      
      <Button 
        type="submit" 
        className="w-full h-14 text-lg font-medium rounded-xl transition-all hover:shadow-lg hover:scale-[1.01] bg-primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Contrast'
        )}
      </Button>
    </form>
  );
};

export default UrlForm;


/**
 * Contrast analysis utilities for WCAG compliance checking
 */

// Type definitions
export interface ColorPair {
  foreground: string;
  background: string;
  ratio: number;
  passes: {
    AA: boolean;
    AALarge: boolean;
    AAA: boolean;
    AAALarge: boolean;
  };
  location: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface AnalysisResult {
  url: string;
  screenshot: string;
  timestamp: string;
  colorPairs: ColorPair[];
  summary: {
    total: number;
    passing: {
      AA: number;
      AALarge: number;
      AAA: number;
      AAALarge: number;
    };
    failing: {
      AA: number;
      AALarge: number;
      AAA: number;
      AAALarge: number;
    };
  };
}

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
};

/**
 * Calculate relative luminance from RGB values according to WCAG
 * Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export const calculateLuminance = (rgb: { r: number; g: number; b: number }): number => {
  // Convert RGB to sRGB
  const sRGB = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  };
  
  // Apply transformation
  const transform = (val: number): number => {
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  };
  
  // Calculate luminance
  return 0.2126 * transform(sRGB.r) + 0.7152 * transform(sRGB.g) + 0.0722 * transform(sRGB.b);
};

/**
 * Calculate contrast ratio between two colors
 * Formula: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const luminance1 = calculateLuminance(rgb1);
  const luminance2 = calculateLuminance(rgb2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast ratio passes WCAG criteria
 */
export const checkWcagCompliance = (ratio: number): {
  AA: boolean;
  AALarge: boolean;
  AAA: boolean;
  AAALarge: boolean;
} => {
  return {
    AA: ratio >= 4.5,
    AALarge: ratio >= 3.0,
    AAA: ratio >= 7.0,
    AAALarge: ratio >= 4.5
  };
};

/**
 * Get a color for the heatmap based on contrast ratio
 */
export const getHeatmapColor = (ratio: number): string => {
  if (ratio >= 7.0) return 'rgba(74, 222, 128, 0.8)'; // Strong pass (AAA) - green
  if (ratio >= 4.5) return 'rgba(74, 222, 128, 0.5)'; // Pass (AA) - lighter green
  if (ratio >= 3.0) return 'rgba(250, 204, 21, 0.7)'; // Pass large text (AA) - yellow
  return 'rgba(248, 113, 113, 0.7)'; // Fail - red
};

/**
 * Mock function to extract colors from an image
 * In a real implementation, this would use color quantization and image processing
 */
export const extractColorsFromImage = (imageData: string): Promise<ColorPair[]> => {
  return new Promise((resolve) => {
    // This is a mock implementation
    // In a real application, you would process the actual image data
    
    // Simulating some processing time
    setTimeout(() => {
      // Generate mock color pairs
      const mockColorPairs: ColorPair[] = [
        {
          foreground: '#FFFFFF',
          background: '#121212',
          ratio: 16.15,
          passes: checkWcagCompliance(16.15),
          location: { x: 20, y: 30, width: 100, height: 50 }
        },
        {
          foreground: '#FFD700',
          background: '#000000',
          ratio: 15.33,
          passes: checkWcagCompliance(15.33),
          location: { x: 150, y: 80, width: 120, height: 40 }
        },
        {
          foreground: '#CCCCCC',
          background: '#767676',
          ratio: 2.45,
          passes: checkWcagCompliance(2.45),
          location: { x: 40, y: 150, width: 200, height: 30 }
        },
        {
          foreground: '#336699',
          background: '#FFFFFF',
          ratio: 4.63,
          passes: checkWcagCompliance(4.63),
          location: { x: 300, y: 220, width: 150, height: 60 }
        },
        {
          foreground: '#FF0000',
          background: '#FFFFFF',
          ratio: 4.01,
          passes: checkWcagCompliance(4.01),
          location: { x: 100, y: 300, width: 80, height: 40 }
        },
        // Add more mock color pairs as needed
      ];
      
      resolve(mockColorPairs);
    }, 1500);
  });
};

/**
 * Analyze a screenshot and return the contrast analysis
 */
export const analyzeScreenshot = async (url: string, screenshot: string): Promise<AnalysisResult> => {
  try {
    // Extract colors from the screenshot
    const colorPairs = await extractColorsFromImage(screenshot);
    
    // Calculate summary statistics
    const summary = colorPairs.reduce(
      (acc, pair) => {
        acc.total++;
        if (pair.passes.AA) acc.passing.AA++;
        else acc.failing.AA++;
        
        if (pair.passes.AALarge) acc.passing.AALarge++;
        else acc.failing.AALarge++;
        
        if (pair.passes.AAA) acc.passing.AAA++;
        else acc.failing.AAA++;
        
        if (pair.passes.AAALarge) acc.passing.AAALarge++;
        else acc.failing.AAALarge++;
        
        return acc;
      },
      {
        total: 0,
        passing: { AA: 0, AALarge: 0, AAA: 0, AAALarge: 0 },
        failing: { AA: 0, AALarge: 0, AAA: 0, AAALarge: 0 }
      }
    );
    
    return {
      url,
      screenshot,
      timestamp: new Date().toISOString(),
      colorPairs,
      summary
    };
  } catch (error) {
    console.error('Error analyzing screenshot:', error);
    throw new Error('Failed to analyze screenshot');
  }
};

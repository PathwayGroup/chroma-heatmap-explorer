
/**
 * Headless Chrome utilities for screenshot capture
 * 
 * Note: In a real implementation, this would interface with a server
 * running headless Chrome or a service like Puppeteer. For this demo,
 * we're using a simulation approach.
 */

import { AnalysisResult, ColorPair, checkWcagCompliance } from './contrastUtils';

// Mock website data for demo purposes
const mockWebsites = {
  'github.com': {
    imgUrl: 'https://i.imgur.com/4FzgqZJ.png',
    colorPairs: [
      {
        foreground: '#FFFFFF',
        background: '#24292F',
        location: { x: 20, y: 30, width: 250, height: 50 }
      },
      {
        foreground: '#0969DA',
        background: '#FFFFFF',
        location: { x: 150, y: 80, width: 120, height: 40 }
      },
      {
        foreground: '#57606A',
        background: '#F6F8FA',
        location: { x: 40, y: 150, width: 200, height: 30 }
      },
      {
        foreground: '#24292F',
        background: '#FFFFFF',
        location: { x: 300, y: 220, width: 150, height: 60 }
      },
      {
        foreground: '#0969DA',
        background: '#F6F8FA',
        location: { x: 100, y: 300, width: 80, height: 40 }
      }
    ]
  },
  'twitter.com': {
    imgUrl: 'https://i.imgur.com/PvyKKzP.png',
    colorPairs: [
      {
        foreground: '#FFFFFF',
        background: '#1DA1F2',
        location: { x: 30, y: 40, width: 180, height: 45 }
      },
      {
        foreground: '#536471',
        background: '#FFFFFF',
        location: { x: 120, y: 100, width: 200, height: 35 }
      },
      {
        foreground: '#1DA1F2',
        background: '#FFFFFF',
        location: { x: 50, y: 160, width: 100, height: 40 }
      },
      {
        foreground: '#0F1419',
        background: '#F7F9F9',
        location: { x: 250, y: 200, width: 160, height: 50 }
      },
      {
        foreground: '#F7F9F9',
        background: '#1DA1F2',
        location: { x: 80, y: 280, width: 90, height: 35 }
      }
    ]
  },
  'facebook.com': {
    imgUrl: 'https://i.imgur.com/wcvCOKH.png',
    colorPairs: [
      {
        foreground: '#FFFFFF',
        background: '#1877F2',
        location: { x: 25, y: 35, width: 220, height: 55 }
      },
      {
        foreground: '#65676B',
        background: '#FFFFFF',
        location: { x: 110, y: 110, width: 180, height: 30 }
      },
      {
        foreground: '#1877F2',
        background: '#FFFFFF',
        location: { x: 45, y: 170, width: 120, height: 45 }
      },
      {
        foreground: '#050505',
        background: '#E4E6EB',
        location: { x: 270, y: 210, width: 140, height: 40 }
      },
      {
        foreground: '#FFFFFF',
        background: '#42B72A',
        location: { x: 90, y: 270, width: 110, height: 45 }
      }
    ]
  },
  'default': {
    imgUrl: 'https://i.imgur.com/LBKJsHs.png',
    colorPairs: [
      {
        foreground: '#FFFFFF',
        background: '#121212',
        location: { x: 20, y: 30, width: 100, height: 50 }
      },
      {
        foreground: '#FFD700',
        background: '#000000',
        location: { x: 150, y: 80, width: 120, height: 40 }
      },
      {
        foreground: '#CCCCCC',
        background: '#767676',
        location: { x: 40, y: 150, width: 200, height: 30 }
      },
      {
        foreground: '#336699',
        background: '#FFFFFF',
        location: { x: 300, y: 220, width: 150, height: 60 }
      },
      {
        foreground: '#FF0000',
        background: '#FFFFFF',
        location: { x: 100, y: 300, width: 80, height: 40 }
      }
    ]
  }
};

// Improved screenshot capture function with real-world examples
export const captureScreenshot = async (url: string): Promise<string> => {
  console.log(`Capturing screenshot for: ${url}`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract the domain from the URL for demo purposes
  const domain = extractDomain(url);
  
  // Check if we have a mock for this domain
  const mockData = mockWebsites[domain] || mockWebsites['default'];
  
  return mockData.imgUrl;
};

// Extract domain from URL
const extractDomain = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.startsWith('www.') ? hostname.substring(4) : hostname;
  } catch (error) {
    return 'default';
  }
};

// Validate URL format
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

// Improved URL accessibility check
export const isUrlAccessible = async (url: string): Promise<boolean> => {
  console.log(`Checking if URL is accessible: ${url}`);
  
  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes, assume most URLs are accessible except a few test cases
  return !url.includes('notfound') && !url.includes('error');
};

// Get realistic color pairs from the mock data
export const getColorPairsForUrl = async (url: string): Promise<ColorPair[]> => {
  // Extract the domain for our demo
  const domain = extractDomain(url);
  
  // Get mock data for this domain or use default
  const mockData = mockWebsites[domain] || mockWebsites['default'];
  
  // Process the color pairs to add ratio and passes properties
  const colorPairs: ColorPair[] = mockData.colorPairs.map(pair => {
    // Calculate actual contrast ratio
    const ratio = calculateActualContrastRatio(pair.foreground, pair.background);
    
    return {
      foreground: pair.foreground,
      background: pair.background,
      ratio,
      passes: checkWcagCompliance(ratio),
      location: pair.location
    };
  });
  
  return colorPairs;
};

// Calculate the actual contrast ratio between two colors
const calculateActualContrastRatio = (color1: string, color2: string): number => {
  // Convert hex to RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  // Calculate relative luminance
  const l1 = calculateRelativeLuminance(rgb1);
  const l2 = calculateRelativeLuminance(rgb2);
  
  // Calculate contrast ratio
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  // Round to two decimal places
  return parseFloat(ratio.toFixed(2));
};

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Calculate relative luminance according to WCAG
const calculateRelativeLuminance = (rgb: { r: number, g: number, b: number }): number => {
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

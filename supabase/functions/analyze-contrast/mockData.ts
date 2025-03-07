
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

const mockWebsites = {
  'default': {
    colorPairs: [
      {
        foreground: '#FFFFFF',
        background: '#121212',
        ratio: 16.23,
        passes: {
          AA: true,
          AALarge: true,
          AAA: true,
          AAALarge: true
        },
        location: { x: 20, y: 30, width: 100, height: 50 }
      },
      {
        foreground: '#FFD700',
        background: '#000000',
        ratio: 12.5,
        passes: {
          AA: true,
          AALarge: true,
          AAA: true,
          AAALarge: true
        },
        location: { x: 150, y: 80, width: 120, height: 40 }
      },
      {
        foreground: '#CCCCCC',
        background: '#767676',
        ratio: 3.2,
        passes: {
          AA: false,
          AALarge: true,
          AAA: false,
          AAALarge: true
        },
        location: { x: 40, y: 150, width: 200, height: 30 }
      },
      {
        foreground: '#336699',
        background: '#FFFFFF',
        ratio: 2.1,
        passes: {
          AA: false,
          AALarge: false,
          AAA: false,
          AAALarge: false
        },
        location: { x: 300, y: 220, width: 150, height: 60 }
      },
      {
        foreground: '#FF0000',
        background: '#FFFFFF',
        ratio: 4.3,
        passes: {
          AA: false,
          AALarge: true,
          AAA: false,
          AAALarge: false
        },
        location: { x: 100, y: 300, width: 80, height: 40 }
      }
    ]
  }
};

export const getColorPairsForUrl = async (url: string): Promise<ColorPair[]> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockWebsites.default.colorPairs;
};

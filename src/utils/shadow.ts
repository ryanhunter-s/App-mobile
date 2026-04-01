import { Platform } from 'react-native';

type ShadowSize = 'sm' | 'md' | 'lg' | 'xl';

const shadowPresets = {
  sm: {
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  md: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  lg: {
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  xl: {
    elevation: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
};

export const shadow = (
  size: ShadowSize = 'md',
  color: string = '#000',
  opacity: number = 0.2
) => {
  const preset = shadowPresets[size];

  if (Platform.OS === 'android') {
    return {
      shadowColor: color,
      elevation: preset.elevation,
    };
  }

  if (Platform.OS === 'web') {
    return {
      boxShadow: `${preset.shadowOffset.width}px ${preset.shadowOffset.height}px ${preset.shadowRadius}px rgba(255,0,0,${opacity})`,
    };
  }

  // iOS
  return {
    shadowColor: color,
    shadowOffset: preset.shadowOffset,
    shadowOpacity: opacity,
    shadowRadius: preset.shadowRadius,
  };
};
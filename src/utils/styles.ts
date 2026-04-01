import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const TextSpacing = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 26,
  '4xl': 28,
};

export const Colors = {
  primary: '#18458eff',
  secondary: '#5856D6',
  light: '#F2F2F7',
  dark: '#3E3F41',
  success: '#28ca51ff',
  danger: '#e62d24ff',
  warning: '#FF9500',
  info: '#5AC8FA',
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: "white",
  },
  container_md: {
    padding: 12,
    maxWidth: 400,
    width: '100%',
    margin: 'auto',
  },
  text_xs: {
    fontSize: 12,
    marginBottom: TextSpacing.xs,
  },
  text_sm: {
    fontSize: 14,
    marginBottom: TextSpacing.xs,
  },
  text_md: {
    fontSize: 16,
    marginBottom: TextSpacing.xs,
  },
  text_lg: {
    fontSize: 18,
    marginBottom: TextSpacing.xs,
  },
  text_xl: {
    fontSize: 20,
    marginBottom: TextSpacing.xs,
  },
  text_2xl: {
    fontSize: 24,
    marginBottom: TextSpacing.xs,
  },
  text_3xl: {
    fontSize: 26,
    marginBottom: TextSpacing.xs,
  },
  text_4xl: {
    fontSize: 28,
    marginBottom: TextSpacing.xs,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.light,
    marginBottom: TextSpacing.xs,
    borderRadius: 8,
  },
});

// Buttons
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'solid' | 'outline' | 'ghost';
type ColorKey = keyof typeof Colors;

const sizeStyles = {
  xs: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  xl: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
};

type ButtonStyles = {
  container: ViewStyle;
  text: TextStyle;
};

export const Button = (
  color: ColorKey = 'primary',
  size: Size = 'md',
  variant: Variant = 'solid',
  isFullWidth: boolean = false
): ButtonStyles => {
  const baseColor = Colors[color];
  const sizeStyle = sizeStyles[size];

  let variantStyle = {};
  let textColor = '#fff';

  switch (variant) {
    case 'solid':
      variantStyle = {
        backgroundColor: baseColor,
      };
      textColor = '#fff';
      break;

    case 'outline':
      variantStyle = {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: baseColor,
      };
      textColor = baseColor;
      break;

    case 'ghost':
      variantStyle = {
        backgroundColor: 'transparent',
      };
      textColor = baseColor;
      break;
  }

  return {
    container: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
      ...sizeStyle,
      ...variantStyle,
      
      width: isFullWidth ? '100%' : undefined,
      alignSelf: 'flex-start',
    } as ViewStyle,
    text: {
      color: textColor,
      fontSize: getFontSize(size),
      fontWeight: '600' as const,
    } as TextStyle,
  };
};

const getFontSize = (size: Size) => {
  switch (size) {
    case 'xs': return 12;
    case 'sm': return 14;
    case 'md': return 16;
    case 'lg': return 18;
    case 'xl': return 20;
  }
};
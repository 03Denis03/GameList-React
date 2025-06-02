import { useThemeContext } from '../context/ThemeContext';

export const useThemeStyles = () => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  return {
    background: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#eeeeee' : '#111111',
    card: isDark ? '#1e1e1e' : '#f8f8f8',
    border: isDark ? '#333333' : '#cccccc',
    inputBackground: isDark ? '#1e1e1e' : '#ffffff',
    placeholder: isDark ? '#aaaaaa' : '#666666',
  };
};

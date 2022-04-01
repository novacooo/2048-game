import { ReactNode, createContext, useContext, useState } from 'react';
import IThemeModeContext from 'interfaces/ThemeModeContext';

interface ThemeModeProviderProps {
  children: ReactNode;
}

const ThemeModeContext = createContext<IThemeModeContext | undefined>(
  undefined,
);

export const useThemeModeContext = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prevState) => !prevState);

  return (
    <ThemeModeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;

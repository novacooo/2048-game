import { ReactNode, createContext, useContext, useState } from 'react';
import IThemeModeContext from 'interfaces/IThemeModeContext';

interface ThemeModeProviderProps {
  children: ReactNode;
}

const initialContext: IThemeModeContext = {
  isDark: false,
  toggleTheme: () => {},
};

const ThemeModeContext = createContext<IThemeModeContext>(initialContext);

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

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import { lightTheme, darkTheme } from 'styles/themes';
import ThemeModeProvider, {
  useThemeModeContext,
} from 'contexts/ThemeModeContext';

interface ThemeModeWrapperProps {
  children: ReactNode;
}

interface MainTemplateProps {
  children: ReactNode;
}

const ThemeModeWrapper = ({ children }: ThemeModeWrapperProps) => {
  const { isDark } = useThemeModeContext() || {};

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <ThemeModeProvider>
        <ThemeModeWrapper>{children}</ThemeModeWrapper>
      </ThemeModeProvider>
    </>
  );
};

export default MainTemplate;

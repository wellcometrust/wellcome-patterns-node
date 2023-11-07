import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from '@weco/common/views/themes/default';
import { AppContextProvider } from '@weco/common/views/components/AppContext/AppContext';

export const ContextDecorator: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isFontsLoaded={true} />
      <AppContextProvider>
        <div className="enhanced">{children}</div>
      </AppContextProvider>
    </ThemeProvider>
  );
};

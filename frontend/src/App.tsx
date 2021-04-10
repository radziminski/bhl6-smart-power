import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import DashboardView from 'views/dashboard';
import HomeView from 'views/home';

const App: React.FC = () => {
  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <DashboardView />
      </ThemeProvider>
    </div>
  );
};

export default App;

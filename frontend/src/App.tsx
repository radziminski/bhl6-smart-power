import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import { ISimIteration } from 'types';
import DashboardView from 'views/dashboard';

export const CurrSimulationContext = React.createContext<{
  value: ISimIteration[] | undefined;
  set: React.Dispatch<React.SetStateAction<ISimIteration[] | undefined>>;
} | null>(null);

const App: React.FC = () => {
  const [currSim, setCurrSim] = useState<ISimIteration[]>();

  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <CurrSimulationContext.Provider
          value={{ value: currSim, set: setCurrSim }}
        >
          <GlobalStyles />
          <DashboardView />
        </CurrSimulationContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;

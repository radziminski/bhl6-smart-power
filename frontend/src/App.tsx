import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import { ISimIteration } from 'types';
import DashboardView from 'views/dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from 'views/Layout';
import ModeView from 'views/mode';

export const CurrSimulationContext = React.createContext<{
  value: ISimIteration[] | undefined;
  set: React.Dispatch<React.SetStateAction<ISimIteration[] | undefined>>;
} | null>(null);

const App: React.FC = () => {
  const [currSim, setCurrSim] = useState<ISimIteration[]>();

  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <CurrSimulationContext.Provider
            value={{ value: currSim, set: setCurrSim }}
          >
            <GlobalStyles />
            <Layout>
              <Switch>
                <Route path='/' exact>
                  <DashboardView />
                </Route>
                <Route path='/mode' exact>
                  <ModeView />
                </Route>
              </Switch>
            </Layout>
          </CurrSimulationContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

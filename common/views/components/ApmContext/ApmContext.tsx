import { ApmBase } from '@elastic/apm-rum';
import getConfig from 'next/config';
import { createContext, FunctionComponent } from 'react';
import useApmRum from './useApmRum';

type ApmContextData = {
  apm?: ApmBase;
};

export const ApmContext = createContext<ApmContextData>({});

const { publicRuntimeConfig } = getConfig();

export const ApmContextProvider: FunctionComponent = ({ children }) => {
  const apm = useApmRum(publicRuntimeConfig.apmConfig);
  return <ApmContext.Provider value={{ apm }}>{children}</ApmContext.Provider>;
};

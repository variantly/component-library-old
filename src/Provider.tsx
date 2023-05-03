import React, { useContext } from 'react';
import axios from 'axios';
import { formatPaletteAndVariables } from './utilities';
import { Component } from './types';

interface Library {
  status: {
    isLoading: boolean;
    isError: boolean;
    error: null | string;
  };
  components: Component[];
  variables: Record<string, string | number>;
}

const initialState = {
  components: [],
  variables: {},
  status: {
    isLoading: true,
    isError: false,
    error: null
  },
};

const LibraryContext = React.createContext<Library>(initialState);
const LibraryUpdateContext = React.createContext((() => []) as any);

export const useLibrary = (libraryId: string) => {
  const fn = useContext(LibraryUpdateContext);
  const ctx = useContext(LibraryContext);

  React.useEffect(() => {
    fn(libraryId);
  }, []);
  
  return ctx.status
};

export const useStyles = (componentName: string) => {
  const { components } = useContext(LibraryContext);

  const component = components.find(el => el.component === componentName);

  return component;
};

export const useVariables = () => {
  const { variables } = useContext(LibraryContext);

  return variables;
};

export const LibraryProvider = ({ children }: React.PropsWithChildren) => {
  const [components, setComponents] = React.useState<Component[]>([]);
  const [variables, setVariables] = React.useState<Record<string, string | number>>({});
  const [status, setStatus] = React.useState({ isLoading: true, isError: false, error: null });

  const setLibrary = async (libraryId: string) => {
    try {
      setStatus({ ...status, isLoading: true });
      const { data: library } = await axios.get(`https://bls.ngrok.io/design-poc-api/design/library/${libraryId}`);

      const { data: componentsData } = await axios.get(`https://bls.ngrok.io/design-poc-api/design/style?libraryId=${library._id}&$limit=1000`);
      const { data: paletteData } = await axios.get(`https://bls.ngrok.io/design-poc-api/design/palette?libraryId=${library._id}&$limit=1000`);
      const { data: variablesData } = await axios.get(`https://bls.ngrok.io/design-poc-api/design/variable?libraryId=${library._id}&$limit=1000`);

      setComponents(componentsData.data as Component[]);

      setVariables(formatPaletteAndVariables(paletteData.data[0], variablesData.data));

      setStatus({ ...status, isLoading: false });
    } catch(e: any) {
      setStatus({ ...status, isLoading: false, isError: true, error: e.message });
    }
  };

  return (
    <LibraryContext.Provider value={{ components, status, variables }}>
      <LibraryUpdateContext.Provider value={setLibrary}>
        {children}
      </LibraryUpdateContext.Provider>
    </LibraryContext.Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext';


// import { ChakraProvider, theme } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
      {/* <ChakraProvider theme={theme}> */}
        {/* En App tenemos todo el html de toda la aplicacion */}
        <App />
        {/* </ChakraProvider> */}
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);


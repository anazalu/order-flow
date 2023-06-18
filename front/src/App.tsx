import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './components/ProductCard';
import Layout from './components/Layout';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="App-link"
            href='http://google.com'
          >
            Go to Google
          </a>
          <Button variant="contained" color="primary">
            Click me!
          </Button> */}
          <Layout />
        {/* </header> */}
      </div>

      <ReactQueryDevtools initialIsOpen={true} />

    </QueryClientProvider>
  );
}

export default App;

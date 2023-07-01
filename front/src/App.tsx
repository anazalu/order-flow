import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './components/ProductCard';
import Layout from './components/Layout';

export default function App() {
  return (
    <>
      <div className="App">
        <Layout />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

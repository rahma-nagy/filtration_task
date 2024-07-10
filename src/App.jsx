
import React from 'react';
import CustomerProvider from './context/CustomerContext';
import CustomerTable from './Components/CustomerTable';
import TransactionChart from './Components/TransactionChart';
import { Container } from '@mui/material';

const App = () => {
  return (
    <CustomerProvider>
      <Container maxWidth="md">
        <h1>Customer Transactions</h1>
        <CustomerTable />
        <TransactionChart />
      </Container>
    </CustomerProvider>
  );
};

export default App;

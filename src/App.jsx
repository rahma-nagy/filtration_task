import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerProvider from './context/CustomerContext';
import CustomerTable from './Components/CustomerTable';
import TransactionChart from './Components/TransactionChart';
import { Container,Box } from '@mui/material';

const App = () => {
  return (
    <CustomerProvider>

    <Box sx={{bgcolor:"#F8F4EC"}}>
    <Container >
        <Routes>
          <Route path="/" element={<CustomerTable />} />

          <Route path="/user/:transaction_id" element={<TransactionChart />} />
        </Routes>
      </Container>
    </Box>

    </CustomerProvider>
  );
};

export default App;

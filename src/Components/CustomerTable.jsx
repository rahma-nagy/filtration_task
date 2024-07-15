import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerContext } from '../context/CustomerContext';

const CustomerTable = () => {
  const { customers } = useContext(CustomerContext);
  const { transactions } = useContext(CustomerContext);
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');



    const filteredCustomers = customers.filter(customer => {
    const customerTransactions = transactions.filter(transaction => transaction.customer_id == customer.id);
    const totalAmount = customerTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    const matchesName = customer.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesAmount = filterAmount === '' || totalAmount >= parseFloat(filterAmount);

    return matchesName && matchesAmount;
  });


  return (
    <Box sx={{ height: "98vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '90%', maxWidth: '1200px' }}>
        <Typography variant='h4' sx={{ color: "#D63484", mb: 2, textAlign: 'center' }}>Customer Transactions</Typography>
        <TextField
          sx={{ width: '100%', mb: 3, bgcolor: "#ffeff9" }}
          label="Search by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
         <TextField
          sx={{ width: '100%', mb: 3, bgcolor: "#ffeff9" }}
          label="Search by Minimum Transaction Amount"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table sx={{ bgcolor: "#ffeff9" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', color: "#D63484" }}>Customer ID</TableCell>
                <TableCell sx={{ textAlign: 'center', color: "#D63484" }}>Name</TableCell>
                <TableCell sx={{ textAlign: 'center', color: "#D63484" }}>Transaction Amount</TableCell>
                <TableCell sx={{ textAlign: 'center', color: "#D63484" }}>Transaction Date</TableCell>
                <TableCell sx={{ textAlign: 'center', color: "#D63484" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const customerTransactions = transactions.filter(transaction => transaction.customer_id == customer.id);
                const totalAmount = customerTransactions.reduce((total, transaction) => total + transaction.amount, 0);
                const lastTransactionDate = customerTransactions.length > 0 ? customerTransactions.slice(-1)[0].date : 'N/A';
                console.log(` ${totalAmount}`);

                return (
                  <TableRow key={customer.id}>
                    <TableCell sx={{ textAlign: 'center' }}>{customer.id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{customer.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{totalAmount}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{lastTransactionDate}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Link to={`user/${customer.id}`} style={{ color: '#D63484' }}>
                        <svg width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="#D63484" d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
                        </svg>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CustomerTable;

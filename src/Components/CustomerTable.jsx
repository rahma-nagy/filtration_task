import React, { useContext, useState } from 'react';
import { CustomerContext } from '../context/CustomerContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const CustomerTable = () => {
  const { customers } = useContext(CustomerContext);
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleFilterAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setFilterAmount(amount);
    } else {
      setFilterAmount('');
    }
  };

  return (
    <div>
      <TextField
        label="Filter by Name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <TextField
        label="Filter by Transaction Amount"
        type="number"
        value={filterAmount}
        onChange={handleFilterAmountChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerTable;

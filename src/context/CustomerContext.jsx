
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    // Fetch data from JSON server
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:3000/customers');
        const transactionsResponse = await axios.get('http://localhost:3000/transactions');

        setCustomers(customersResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <CustomerContext.Provider value={{ customers, transactions }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;

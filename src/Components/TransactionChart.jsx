import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [data, setData] = useState([]);

  const locaition = useLocation().pathname

  const user_id = locaition.slice(locaition.lastIndexOf('/') + 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transactions`);
        const transactions = response.data?.filter(item => item.customer_id == user_id)
        setData(transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user_id]);

  const structure = data?.map((item) => ({
    x: new Date(item.date),
    y: item.amount,
  }));

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Transactions Charts",
      horizontalAlign: "left"
    },
    axisY: {
      includeZero: false,
    },
    axisX: {
      valueFormatString: "DD MMM YYYY",
      intervalType: "day",
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: structure,
    }],
  };

  return (<>
<Box sx={{height:"98vh" ,display:"flex",justifyContent: 'center', alignItems: 'center'}}>

     <CanvasJSChart options={options} />
</Box>

  </>
  )
};

export default App;

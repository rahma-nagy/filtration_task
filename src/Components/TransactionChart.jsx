import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transactions`);
        const transactions = response.data;
        setData(transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default App;

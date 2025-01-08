import React, { useEffect, useState } from "react";
import axios from "axios";
import MetaData from "../Layout/MetaData";
import SideBar from "./SideBar";
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,   
  BarElement,    
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [weddingData, setWeddingData] = useState([]);
  const [baptismData, setBaptismData] = useState([]);
  const [funeralData, setFuneralData] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weddingRes = await axios.get(`${process.env.REACT_APP_API}/api/v1/stats/weddingsPerMonth`, config);
        console.log("Weddings Data:", weddingRes.data); // Log data
        setWeddingData(weddingRes.data);
  
        const baptismRes = await axios.get(`${process.env.REACT_APP_API}/api/v1/stats/baptismsPerMonth`, config);
        console.log("Baptisms Data:", baptismRes.data); // Log data
        setBaptismData(baptismRes.data);
  
        const funeralRes = await axios.get(`${process.env.REACT_APP_API}/api/v1/stats/funeralsPerMonth`, config);
        console.log("Funerals Data:", funeralRes.data); // Log data
        setFuneralData(funeralRes.data);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const generateChartData = (label, data, color) => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label,
        data,
        backgroundColor: color,
      },
    ],
  });
  
  const options = {
    scales: {
      x: {
        type: 'category', 
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  
  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <div style={{ flex: 1, padding: "20px" }}>
        <MetaData title={"Dashboard"} />
        <h1>Statistics Dashboard</h1>

        {loading ? (
          <p>Loading charts...</p>
        ) : (
          <div>
            <h2>Confirmed Weddings Per Month</h2>
            <Bar data={generateChartData("Weddings", weddingData, "rgba(75, 192, 192, 0.6)")} options={options} />

            <h2>Confirmed Baptisms Per Month</h2>
            <Bar data={generateChartData("Baptisms", baptismData, "rgba(153, 102, 255, 0.6)")} options={options}/>

            <h2>Confirmed Funerals Per Month</h2>
            <Bar data={generateChartData("Funerals", funeralData, "rgba(255, 99, 132, 0.6)")} options={options}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

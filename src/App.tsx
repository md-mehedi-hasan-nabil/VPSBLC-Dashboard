import DashboardSidebar from "./components/DashboardSidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import ApexChart from "./components/ApexChart";
import Disbursement from "./components/Disbursement";
import DashboardItems from "./components/DashboardItems";
import Header from "./components/Header";
import Documentation from "./components/Documentation";
import UsdtWallet from "./components/UsdtWallet";
import { useEffect, useState } from "react";
import axios from "axios";
import parseCSV from "./utiles/parseCSV";

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL);
        const data = parseCSV(response.data);
        if (data?.length > 0) {
          // setData(data[0]);
          setData([])
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  console.log(data, loading)

  return (
    <>
      <Navbar />
      <DashboardSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <Header />
          <DashboardItems />
          <ApexChart />
          <Disbursement />
          <UsdtWallet />
          <Documentation />
        </div>
      </div>
    </>
  )
}

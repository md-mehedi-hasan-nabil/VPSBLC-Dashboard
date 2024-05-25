import DashboardSidebar from "./components/DashboardSidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import ApexChart from "./components/ApexChart";
import Disbursement from "./components/Disbursement";
import DashboardItems from "./components/DashboardItems";
import Header from "./components/Header";
import Documentation from "./components/Documentation";

export default function App() {
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
          <Documentation />
        </div>
      </div>
    </>
  )
}

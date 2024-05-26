import "../../App.css"
import DashboardSidebar from "../../components/DashboardSidebar";
import Navbar from "../../components/Navbar";
import Disbursement from "../../components/Disbursement";
import DashboardItems from "../../components/DashboardItems";
import Header from "../../components/Header";
import Documentation from "../../components/Documentation";
import UsdtWallet from "../../components/UsdtWallet";
import CognitiveProfileChart from "../../components/ApexChart";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")

    if (!username) {
        navigate("/")
    }
    
    return (
        <>
            <Navbar />
            <DashboardSidebar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <Header />
                    <DashboardItems />
                    <CognitiveProfileChart />
                    {/* <ApexChart /> */}
                    <Disbursement />
                    <UsdtWallet />
                    <Documentation />
                </div>
            </div>
            <Toaster />
        </>
    )
}

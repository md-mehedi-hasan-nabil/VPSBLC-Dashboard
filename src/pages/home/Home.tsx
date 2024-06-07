import "../../App.css"
import DashboardSidebar from "../../components/DashboardSidebar";
import Navbar from "../../components/Navbar";
import Disbursement from "../../components/Disbursement";
import DashboardItems from "../../components/DashboardItems";
import Header from "../../components/Header";
import Documentation from "../../components/Documentation";
import UsdtWallet from "../../components/UsdtWallet";
import { useEffect } from "react";
import { queryClient } from "../../main";
import GrowthAnalytics from "../../components/GrowthAnalytics";

export default function App() {
    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey:
                ['recentDisbursements', "documentationInfo", "clientInfo", "disbursementOverview"]
        })
    }, [])

    return (
        <>
            <Navbar />
            <DashboardSidebar />

            <div className="p-4 sm:ml-64 mt-10">
                <div className="p-4 mt-14">
                    <Header />
                    <DashboardItems />
                    <GrowthAnalytics />
                    <Disbursement />
                    <UsdtWallet />
                    <Documentation />
                </div>
            </div>
        </>
    )
}

import { useQuery } from "@tanstack/react-query"
import gbpaud from "../assets/gbpaud.svg"
import LineChart from "./LineChart"
import Loader from "./Loader";

interface IGrowthAnalytics {
    "Trade Direction": string;
    "Asset Name": string;
    "Trade PnL": string;
    "Growth": string;
}

export default function GrowthAnalyticsInformation() {
    const { data: analyticsInfo, isSuccess, isLoading } = useQuery({
        queryKey: ['analyticsInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/growth-analytics-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        }
    })

    console.log(analyticsInfo)

    let content;

    if (isLoading) {
        content = <Loader />
    } else if (isSuccess && analyticsInfo) {
        content = <>
            <h3 className="text-xl font-medium text-primary">Most Recent Trade</h3>
            <h2 className="text-[22px] text-[#4CAF50] my-2 font-bold">LONG POSITION ON:</h2>
            <div className="flex gap-3">
                <img src={gbpaud} alt="gbpaud" />
                <p className="text-[42px] font-bold text-primary">
                    {(analyticsInfo as IGrowthAnalytics)["Asset Name"]}
                </p>
            </div>
            <p className="text-[#7ED63F] text-xl font-bold mt-2">
                {(analyticsInfo as IGrowthAnalytics).Growth}
            </p>
        </>
    } else {
        content = <p>Data not found</p>
    }

    return (
        <div className="relative overflow-hidden col-span-12 lg:col-span-4 px-5 pt-5 rounded-2xl border-t-8 border-[#252990] bg-white recent-trade-bg-image">
            <div className="flex gap-6 md:absolute top-3 z-10">
                <div className="col-span-2">
                    {content}
                </div>
            </div>
            <LineChart />
        </div>
    )
}

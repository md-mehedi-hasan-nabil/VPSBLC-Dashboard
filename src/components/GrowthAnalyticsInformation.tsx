import { useQuery } from "@tanstack/react-query"
import gbpaud from "../assets/gbpaud.svg"
import LineChart from "./LineChart"
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { getAuth } from "../utils/getAuth";

interface IGrowthAnalytics {
    "Trade Direction": string;
    "Asset Name": string;
    "Trade PnL": string;
    "Growth": string;
}

export default function GrowthAnalyticsInformation() {
    const [data, setData] = useState<number[]>([])
    const [color, setColor] = useState<string>("")
    const [bgArrow, setBgArrow] = useState<string>("")
    const [growthValue, setGrowthValue] = useState<number>()
    const [tradeDirection, setTradeDirection] = useState<string>("")

    const { data: analyticsInfo, isSuccess, isLoading } = useQuery({
        queryKey: ['analyticsInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/growth-analytics-info', {
                headers: {
                    'email': `${getAuth()}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        }
    })

    useEffect(() => {
        if (isSuccess && analyticsInfo) {
            const growth = (analyticsInfo as IGrowthAnalytics)?.Growth.replace("%", "");

            setGrowthValue(Number(growth))
            setTradeDirection((analyticsInfo)["Trade Direction"]?.toUpperCase())

            if (tradeDirection === "SHORT") {
                setData([10, 12, 6, 17, 10, 15, 8])
                setColor("#FF0000")
                setBgArrow("recent-trade-down-bg-image")

            } else {
                setData([31, 40, 28, 51, 42, 90, 70])
                setColor("#4CAF50")
                setBgArrow("recent-trade-up-bg-image")
            }
        }
    }, [isSuccess, analyticsInfo, tradeDirection])

    let content;

    if (isLoading) {
        content = <Loader />
    } else if (isSuccess && analyticsInfo) {
        content = <>
            <h3 className="text-xl font-semibold text-primary">Most Recent Trade</h3>
            {
                tradeDirection === "SHORT" ? <h2 className="text-[22px] text-[#FF0000] my-2 font-bold">
                    {tradeDirection} POSITION ON:
                </h2> : <h2 className="text-[22px] text-[#4CAF50] my-2 font-bold">
                    {tradeDirection} POSITION ON:
                </h2>
            }

            <div className="flex items-center gap-3">
                <img className="h-10" src={gbpaud} alt="gbpaud" />
                <p className="text-[42px] font-bold text-primary">
                    {(analyticsInfo as IGrowthAnalytics)["Asset Name"]}
                </p>
            </div>
            {
                growthValue && 0 < growthValue ?
                    <p className="text-[#4CAF50] text-xl font-bold mt-2">
                        +{growthValue}%
                    </p> :
                    <p className="text-[#FF0000] text-xl font-bold mt-2">
                        {growthValue}%
                    </p>
            }

        </>
    } else {
        content = <p>Data not found</p>
    }

    return (
        <div className={`${bgArrow} relative overflow-hidden col-span-12 lg:col-span-4 px-5 pt-5 rounded-2xl border-t-8 border-[#252990] bg-white`}>
            <div className="flex gap-6 md:absolute top-3 z-10">
                <div className="col-span-2">
                    {content}
                </div>
            </div>
            <LineChart data={data} color={color} />
        </div>
    )
}

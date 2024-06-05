import LineChart from "./LineChart"
import PieChart from "./PieChart"
import RecentTradeActivity from "./RecentTradeActivity"
import gbpaud from "../assets/gbpaud.svg"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function GrowthAnalytics() {
    const [cycleCompletion, setCycleCompletion] = useState(0)

    const { data: disbursementCycle, isSuccess: isSuccessDisbursementCycle } = useQuery({
        queryKey: ['disbursementCycle'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-cycle')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    useEffect(() => {
        if (isSuccessDisbursementCycle) {
            const result = disbursementCycle["Disbursement Completed"]?.replace("%", "")

            setCycleCompletion(Number(result))
        }
    }, [isSuccessDisbursementCycle, disbursementCycle])

    return (
        <section className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                GROWTH ANALYTICS
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="relative overflow-hidden col-span-12 lg:col-span-4 px-5 pt-5 rounded-2xl border-t-8 border-[#252990] bg-white recent-trade-bg-image">
                    <div className="flex gap-6 md:absolute top-3 z-10">
                        <div className="col-span-2">
                            <h3 className="text-xl font-medium text-primary">Most Recent Trade</h3>
                            <h2 className="text-[22px] text-[#4CAF50] my-2 font-bold">LONG POSITION ON:</h2>
                            <div className="flex gap-3">
                                <img src={gbpaud} alt="gbpaud" />
                                <p className="text-[42px] font-bold text-primary">XAU/USD</p>
                            </div>
                            <p className="text-[#7ED63F] text-xl font-bold mt-2">+1.05%</p>
                        </div>
                    </div>
                    <LineChart />
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-4 rounded-2xl border-t-8 border-[#252990] py-4 bg-white">
                    <RecentTradeActivity />
                </div>
                <div className="col-span-12 lg:col-span-4 rounded-2xl border-t-8 border-[#252990] bg-white">
                    <h3 className="pl-5 mb-3 font-semibold mt-5 text-primary text-xl">Current Disbursement Cycle</h3>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-12 lg:col-span-8">
                            <PieChart cycleCompletion={cycleCompletion} />
                        </div>
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 mt-5 md:mt-0">

                            <div className="border-l-4 border-[#4caf50] pl-4">
                                <h3 className="text-sm font-semibold text-[#0A112F]">Cycle Completion</h3>
                                <p className="text-3xl md:text-4xl font-bold mt-2">
                                    {isSuccessDisbursementCycle && disbursementCycle && disbursementCycle["Disbursement Completed"]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

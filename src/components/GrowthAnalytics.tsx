import PieChart from "./PieChart"
import RecentTradeActivity from "./RecentTradeActivity"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import GrowthAnalyticsInformation from "./GrowthAnalyticsInformation"
import { getAuth } from "../utils/getAuth"

export default function GrowthAnalytics() {
    const [cycleCompletion, setCycleCompletion] = useState(0)

    const { data: disbursementCycle, isSuccess: isSuccessDisbursementCycle } = useQuery({
        queryKey: ['disbursementCycle'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-cycle', {
                headers: {
                    'email': `${getAuth()}`,
                    'Content-Type': 'application/json'
                }
            })

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
                <GrowthAnalyticsInformation />
                <div className="col-span-12 md:col-span-12 lg:col-span-4 rounded-2xl border-t-8 border-[#252990] py-4 bg-white">
                    <RecentTradeActivity />
                </div>
                <div className="col-span-12 lg:col-span-4 rounded-2xl border-t-8 border-[#252990] bg-white">
                    <h3 className="pl-5 mb-3 font-semibold mt-5 text-primary text-xl">Current Disbursement Cycle</h3>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-12 lg:col-span-7">
                            <PieChart cycleCompletion={cycleCompletion} />
                        </div>
                        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 mt-5 md:mt-0">
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

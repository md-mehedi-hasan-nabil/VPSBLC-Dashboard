import virtual from "../assets/virtual.svg"
import trade from "../assets/trade.svg"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getAuth } from "../utils/getAuth"
import vpsblcCompleted from "../assets/vpsblc-completed.svg"
import vpsblcPending from "../assets/vpsblc-pending.svg"

interface IVPSBLCInformation {
    "VPSBLC Purchase Price": string;
    "VPSBLC Face Value": string;
    "VPSBLC Purchase Status": string;
    "VPSBLC Funding Status": string;
    "Trade Status": string;
}

interface IItem {
    id: number;
    name: string;
    title: string;
    icon: string;
}

export default function DashboardItems() {
    const [dashboardItems, setDashboardItems] = useState<IItem[] | []>()

    const { data: vpsblcInfo, isSuccess: isSuccessVpsblcInfo } = useQuery({
        queryKey: ['vpsblcInfo'],
        queryFn: async () => {
            const email = getAuth()

            const response = await fetch(import.meta.env.VITE_API_URL + '/vpsblc-info', {
                headers: {
                    'email': `${email}`,
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
        if (isSuccessVpsblcInfo) {

            const result: IItem[] = [
                {
                    id: 1,
                    name: "VPSBLC PURCHASE STATUS",
                    title: (vpsblcInfo as IVPSBLCInformation)["VPSBLC Purchase Status"],
                    icon: vpsblcCompleted as string
                },
                {
                    id: 2,
                    name: "VPSBLC FUNDING STATUS",
                    title: (vpsblcInfo as IVPSBLCInformation)["VPSBLC Funding Status"],
                    icon: virtual as string
                },
                {
                    id: 3,
                    name: "VPSBLC TRADING STATUS",
                    title: (vpsblcInfo as IVPSBLCInformation)["Trade Status"],
                    icon: trade as string
                }
            ]

            setDashboardItems(result)
        }

    }, [isSuccessVpsblcInfo, vpsblcInfo])

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-8 mt-8">
            {
                dashboardItems && dashboardItems.map(item =>
                    <div key={item.id} className={`col-span-12 md:col-span-4 rounded-2xl ${(item?.title?.includes("COMPLETED") || item.title?.includes("FUNDED") || item?.title === "ACTIVE") ? "bg-[#F1F9F1]" : "bg-[#FCF6E2]"}`}>
                        <h3 className="text-base font-semibold text-white bg-gradient px-4 py-2 rounded-t-2xl overflow-hidden">{item.name}</h3>
                        <div className="flex md:flex-col lg:flex-row justify-between items-center p-4">
                            <div>
                                {
                                    (item?.title?.includes("COMPLETED") || item.title?.includes("FUNDED") || item?.title === "ACTIVE") ? <h2 className="text-xl lg:text-2xl font-bold text-[#4CAF50] lg:pr-10">
                                        {item.title}
                                    </h2> : <h2 className="text-xl lg:text-2xl font-bold text-[#ebbf2c] lg:pr-10">
                                        {item.title}
                                    </h2>
                                }
                            </div>
                            <div>
                                {
                                    (item?.title?.includes("COMPLETED") || item.title?.includes("FUNDED") || item?.title === "ACTIVE") ? <img className="w-20 h-20" src={item.icon} alt={item.name} /> :
                                        <img className="w-20 h-20" src={vpsblcPending} alt={item.name} />
                                }

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

import vpsblc from "../assets/vpsblc.svg"
import virtual from "../assets/virtual.svg"
import trade from "../assets/trade.svg"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface IVPSBLCInformation {
    "VPSBLC Purchase Price": string;
    "VPSBLC Face Value": string;
    "VPSBLC Purchase Status": string;
    "VPSBLC Funding Status": string;
    "Trace Status": string;
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
            const response = await fetch(import.meta.env.VITE_API_URL + '/vpsblc-info')

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
                    name: "VPSBLC Purchase",
                    title: (vpsblcInfo as IVPSBLCInformation)["VPSBLC Purchase Status"],
                    icon: vpsblc as string
                },
                {
                    id: 2,
                    name: "VPSBLC Funding",
                    title: (vpsblcInfo as IVPSBLCInformation)["VPSBLC Funding Status"],
                    icon: virtual as string
                },
                {
                    id: 3,
                    name: "Trace Status",
                    title: (vpsblcInfo as IVPSBLCInformation)["Trace Status"],
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
                    <div key={item.id} className="col-span-12 md:col-span-4 bg-white rounded-xl p-6">
                        <h3 className="text-base font-semibold text-secondary">{item.name}</h3>
                        <div className="flex md:flex-col lg:flex-row justify-between">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-bold mt-8">{item.title}</h2>
                            </div>
                            <div>
                                <img className="w-20 h-20" src={item.icon} alt={item.name} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

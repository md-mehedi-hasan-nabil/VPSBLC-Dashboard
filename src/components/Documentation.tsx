import { useQuery } from "@tanstack/react-query"
import { ReactNode, useEffect, useState } from "react"
import { ClientInformation } from "../types";
import RecentDisbursements from "./RecentDisbursements";
import { FcElectronics, FcFinePrint } from "react-icons/fc";

interface Item {
    id: number;
    name: string;
    link: string;
    icon: ReactNode
}

export default function Documentation() {
    const [documentationInfo, setDocumentationInfo] = useState<Item[] | []>()
    const { data: clientInfo, isSuccess } = useQuery({
        queryKey: ['documentationInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/client-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    useEffect(() => {
        if (isSuccess) {
            const data: Item[] = [
                {
                    id: 1,
                    name: "VPSBLC Sales & Purchase Agreement",
                    link: (clientInfo as ClientInformation)["Sales & Purchase Agreement"],
                    icon: <FcFinePrint className="text-7xl" />
                },
                {
                    id: 2,
                    name: "VPSBLC Memorandum of Understanding",
                    link: (clientInfo as ClientInformation)["Memorandum of Understanding"],
                    icon: <FcFinePrint className="text-7xl" />
                },
                {
                    id: 3,
                    name: "VPSBLC NFT",
                    link: (clientInfo as ClientInformation)["VPSBLC NFT"],
                    icon: <FcElectronics className="text-8xl" />
                }
            ]

            setDocumentationInfo(data)
        }
    }, [isSuccess, clientInfo])

    return (
        <div id="documentation" className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                DOCUMENTATION
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-6">
                    {
                        documentationInfo && documentationInfo.map((item) =>
                            <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="flex flex-col justify-center gap-6 bg-white rounded-2xl p-6 border-t-8 border-[#252990]">
                                    <h2 className="text-sm text-[#343C6A] font-semibold text-center">
                                        {item.name}
                                    </h2>
                                    <div className="flex justify-center">
                                        {item.icon}
                                    </div>
                                    <div className="text-center">
                                        <a href={item.link} target="block" className="text-white bg-[#263ca2] hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">
                                            View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <RecentDisbursements />
            </div>
        </div>
    )
}

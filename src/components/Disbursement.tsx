import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";

interface IDisbursementOverview {
    "Next Disbursement": string;
    "Next Disbursement Amount": string;
    "Earnings to Date": string;
}

interface IItem {
    id: number;
    title: string;
    value: string;
}

export default function Disbursement() {
    const [disbursements, setDisbursements] = useState<IItem[] | []>()

    const { data: disbursementOverview, isSuccess: isSuccessDisbursementOverview } = useQuery({
        queryKey: ['disbursementOverview'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-overview')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    useEffect(() => {
        if (isSuccessDisbursementOverview) {
            const result: IItem[] = [
                {
                    id: 1,
                    title: "Next Disbursement",
                    value: (disbursementOverview as IDisbursementOverview)["Next Disbursement"]
                },
                {
                    id: 2,
                    title: "Next Disbursement Amount",
                    value: (disbursementOverview as IDisbursementOverview)["Next Disbursement Amount"]
                },
                {
                    id: 3,
                    title: "Earnings to Date",
                    value: (disbursementOverview as IDisbursementOverview)["Earnings to Date"]
                },
            ]

            setDisbursements(result)
        }
    }, [disbursementOverview, isSuccessDisbursementOverview])

    const removeQuotes = (value: string) => {
        value = value.replace("\"", '');
        const result = value.replace("\"", '');
        return result
    };

    return (
        <div id="disbursement" className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                DISBURSEMENT OVERVIEW
            </h2>
            <div className="grid grid-cols-12 gap-8 mt-6">
                {
                    disbursements && disbursements.map(item =>
                        <div key={item.id} className="col-span-12 md:col-span-4 bg-white rounded-xl p-6">
                            <h3 className="text-base font-semibold text-secondary">{item.title}</h3>
                            <h2 className="text-3xl font-bold mt-8">{removeQuotes(item.value)}</h2>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

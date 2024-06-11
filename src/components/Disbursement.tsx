import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import overtime from "../assets/overtime.svg"
import moneyTransfer from "../assets/money-transfer.svg"
import bullish from "../assets/bullish.svg"
import ApexChart from "./ApexChart";
import { getAuth } from "../utils/getAuth";
import moment from "moment";
import { addComma } from "../utils/addComma";

interface IDisbursementOverview {
    "Next Disbursement": string;
    "Next Disbursement Amount": string;
    "Earnings to Date": string;
    "Next Disbursement:": string;
    "Next Disbursement Amount:": string;
    "Earnings to Date:": string;
}

interface IItem {
    id: number;
    title: string;
    value: string;
    background: string;
    icon: string;
}

export default function Disbursement() {
    const [disbursements, setDisbursements] = useState<IItem[] | []>()

    const { data: disbursementOverview, isSuccess: isSuccessDisbursementOverview } = useQuery({
        queryKey: ['disbursementOverview'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/disbursement-overview', {
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
        if (isSuccessDisbursementOverview) {
            const result: IItem[] = [
                {
                    id: 1,
                    title: "Next Disbursement",
                    value: (disbursementOverview as IDisbursementOverview)["Next Disbursement"],
                    background: "#2ca07a",
                    icon: overtime
                },
                {
                    id: 2,
                    title: "Next Disbursement Amount",
                    value: (disbursementOverview as IDisbursementOverview)["Next Disbursement Amount"],
                    background: "#3c3d3d",
                    icon: moneyTransfer
                },
                {
                    id: 3,
                    title: "Earnings to Date",
                    value: "$ " + (disbursementOverview as IDisbursementOverview)["Earnings to Date"],
                    background: "#ebbf2c",
                    icon: bullish
                },
            ]

            setDisbursements(result)
        }
    }, [disbursementOverview, isSuccessDisbursementOverview])

    const removeQuotes = (value: string) => {
        value = value?.replace("\"", '');
        const result = value?.replace("\"", '')?.replace(",", "");
        return result
    };

    return (
        <div id="disbursement" className="pt-10">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                DISBURSEMENT OVERVIEW
            </h2>
            <ApexChart />
            <div className="grid grid-cols-12 md:gap-8 mt-6">
                {
                    disbursements && disbursements.map((item, index) =>
                        <div style={{
                            background: item.background
                        }} key={item.id} className="col-span-12 md:col-span-4 rounded-2xl p-6 my-2 md:my-0 text-white">
                            <div className="flex items-center gap-2">
                                <img src={item.icon} alt={item.title} />
                                <h3 className="text-base font-semibold">{item.title}</h3>
                            </div>
                            {
                                index == 0 && <h2 className="text-3xl font-bold mt-5">{moment(item.value).format('LL')}</h2>
                            }
                            {
                                index == 1 && <h2 className="text-3xl font-bold mt-5">$ {addComma(removeQuotes((item.value)))} USDT</h2>
                            }
                            {
                                index == 2 && <h2 className="text-3xl font-bold mt-5">$ {addComma(removeQuotes((item.value)))} USDT</h2>
                            }

                        </div>
                    )
                }
            </div>

        </div>
    )
}

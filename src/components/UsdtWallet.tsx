import { CiCircleCheck } from "react-icons/ci"
import wallet from "../assets/wallet.svg"
import { useQuery } from "@tanstack/react-query"
import { ClientInformation } from "../types"
import { IoClose } from "react-icons/io5"

export default function UsdtWallet() {
    const { data: clientInfo, isSuccess } = useQuery({
        queryKey: ['clientInfo'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/client-info')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    let icon;

    if (isSuccess) {
        const data = clientInfo as ClientInformation
        if (data["ERC20 Wallet Address VERIFIED?"] == "Yes" || data["ERC20 Wallet Address VERIFIED?"] == "Y") {
            icon = <CiCircleCheck className="text-green-600 text-5xl" />
        } else {
            icon = <IoClose className="text-red-600 text-5xl" />
        }
    }

    return (
        <div className="mt-8">
            <h3 className="text-secondary font-semibold text-xl">USDT-ETH WALLET</h3>

            <div className="grid grid-cols-12 mt-5">
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white rounded-xl p-6">
                        <img src={wallet} alt="wallet" />
                        <p className="text-sm md:text-xl text-primary">{
                            isSuccess && clientInfo["ERC20 Wallet Address"]
                        }</p>
                    </div>
                    {icon}
                </div>
            </div>
        </div>
    )
}

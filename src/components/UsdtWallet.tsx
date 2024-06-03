import wallet from "../assets/wallet.svg"
import { useQuery } from "@tanstack/react-query"
import { ClientInformation } from "../types"
import { IoClose } from "react-icons/io5"
import { FcDisclaimer, FcHighPriority, FcOk } from "react-icons/fc"

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

        if (data["ERC20 Wallet Address"]) {
            if (data["ERC20 Wallet Address VERIFIED?"] == "Yes" || data["ERC20 Wallet Address VERIFIED?"] == "Y") {
                icon = <FcOk className="text-5xl" />
            }
            else {
                icon = <IoClose className="text-red-600 text-5xl" />
            }
        } else {
            icon = <FcHighPriority className="text-5xl" />
        }
    }


    return (
        <div className="pt-10">
            <h3 className="text-secondary font-semibold text-xl">USDT-ETH WALLET</h3>
            <div className="grid grid-cols-12 mt-5">
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white shadow-custom rounded-md p-4">
                        <img src={wallet} alt="wallet" />
                        <p className="text-sm md:text-xl text-primary">{
                            (isSuccess && clientInfo["ERC20 Wallet Address"]) ? clientInfo["ERC20 Wallet Address"] : "Wallet address is not available"
                        }</p>
                    </div>
                    {icon}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 mt-6">
                <div>
                    <FcDisclaimer className="text-5xl" />
                </div>
                <p className="text-xl text-[#343C6A]"><span className="text-[#F44336] font-bold">WARNING: </span>
                    Please ensure that the USDT-ETH wallet address above has been verified and is RWA to receive USDT ERC20 tokens. Sending crypto to the incorrect address will result in a <span className="font-bold">loss of funds.</span></p>
            </div>
        </div>
    )
}

import { CiCircleCheck } from "react-icons/ci"
import wallet from "../assets/wallet.svg"

export default function UsdtWallet() {
    return (
        <div className="mt-8">
            <h3 className="text-secondary font-semibold text-xl">USDT-ETH WALLET</h3>

            <div className="grid grid-cols-12 mt-5">
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="flex justify-between items-center gap-3 bg-white rounded-xl p-6">
                        <img src={wallet} alt="wallet" />
                        <p className="text-xl text-primary">[WALLET ADDRESS IN READ-ONLY FORMATJ</p>
                    </div>
                    <CiCircleCheck className="text-5xl" />
                </div>
            </div>
        </div>
    )
}

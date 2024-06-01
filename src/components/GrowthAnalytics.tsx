import arrow from "../assets/arrow-up-bold.svg"
import PieChart from "./PieChart"

const recentTradeActivity = [
    {
        id: "01",
        date: "12-12-2024",
        asset: "Asset",
        position: "Position",
        growth: "Growth"
    },
    {
        id: "02",
        date: "12-12-2024",
        asset: "Asset",
        position: "Position",
        growth: "Growth"
    },
    {
        id: "03",
        date: "12-12-2024",
        asset: "Asset",
        position: "Position",
        growth: "Growth"
    },
    {
        id: "04",
        date: "12-12-2024",
        asset: "Asset",
        position: "Position",
        growth: "Growth"
    },
]

export default function GrowthAnalytics() {

    return (
        <section className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                GROWTH ANALYTICS
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 lg:col-span-4 flex justify-between border border-stone-800 rounded-2xl p-5">
                    <div className="col-span-2">
                        <h3 className="text-xl font-medium text-[#202224]">Most Recent Trade</h3>
                        <h2 className="text-2xl text-[#202224] my-3 font-bold">LONG POSITION ON:</h2>
                        <p className="text-[42px] font-bold text-[#202224]">XAU/USD</p>
                        <p className="text-[#7ED63F] text-xl font-bold mt-2">+1.05%</p>
                    </div>
                    <div className="col-span-1">
                        <img src={arrow} alt="arrow" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-4 border border-stone-800 rounded-2xl py-4">
                    <h3 className="pl-5 mb-3 font-semibold">Recent Trade Activity</h3>
                    <div className="px-5 overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-secondary uppercase">
                                <tr>
                                    <th scope="col" className="py-3 text-left">
                                        No.
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Date
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Asset
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Position
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Growth
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recentTradeActivity.map((item, index) =>
                                        <tr key={item.id} className={`border-stone-800 ${index != recentTradeActivity.length - 1 ? "border-b" : ""}`}>
                                            <th scope="row" className="pr-6 py-2 font-medium text-secondary whitespace-nowrap dark:text-white">
                                                {item.id}
                                            </th>
                                            <td className="md:px-4 py-3">
                                                {item.date}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.asset}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.position}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.growth}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4 border border-stone-800 rounded-2xl">
                    <h3 className="pl-5 mb-3 font-semibold mt-5">Recent Trade Activity</h3>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-10">
                            <PieChart />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

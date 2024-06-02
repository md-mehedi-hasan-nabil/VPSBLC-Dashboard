import { useQuery } from "@tanstack/react-query"

interface Trade {
    no: string;
    date: string;
    asset: string;
    position: string;
    growth: string;
}

export default function RecentTradeActivity() {
    const { data: recentTradeActivities, isSuccess: isSuccessRecentTradeActivities } = useQuery({
        queryKey: ['recentTradeActivities'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/recent-trades')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })

    let content;

    if (isSuccessRecentTradeActivities && recentTradeActivities?.length > 0) {
        content = recentTradeActivities.map((item: Trade, index: number) =>
            <tr key={item.no} className={`border-stone-800 text-xs ${index != recentTradeActivities?.length - 1 ? "border-b" : ""}`}>
                <th scope="row" className="pr-6 py-2 font-medium whitespace-nowrap">
                    {item.no}
                </th>
                <td className="md:w-20 py-3">
                    {item.date}
                </td>
                <td className="py-3">
                    {item.asset}
                </td>
                <td className="py-3 px-3">
                    {item.position}
                </td>
                <td className="py-3">
                    {item.growth}
                </td>
            </tr>)
    }

    return (
        <>
            <h3 className="text-xl pl-5 mb-3 font-semibold text-primary">Recent Trade Activity</h3>
            <div className="px-5 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-[#202224] uppercase bg-[#F9FAFB]">
                        <tr>
                            <th scope="col" className="py-3 text-left">
                                No.
                            </th>
                            <th scope="col" className="py-2">
                                Date
                            </th>
                            <th scope="col" className="pr-3">
                                Asset
                            </th>
                            <th scope="col" className="px-3">
                                Position
                            </th>
                            <th scope="col" className="px-3">
                                Growth
                            </th>
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(even)]:bg-[#F9FAFB]">
                        {content}
                    </tbody>
                </table>
            </div>
        </>
    )
}

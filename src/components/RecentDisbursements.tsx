import { useQuery } from "@tanstack/react-query"

interface RecentDisbursement {
    most_recent_disbursement: string;
    disbursement_title: string;
    date_paid: Date | "";
    amount_paid: number;
    blockchain_tx_url: string;
}

export default function RecentDisbursements() {
    const { data: recentDisbursementsData, isSuccess } = useQuery({
        queryKey: ['recentDisbursements'],
        queryFn: async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/recent-disbursements')

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return await response.json()
        },
    })
    const formatDate = (dateString: Date): string => {
        const date: Date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    let content;

    if (isSuccess) {
        content = recentDisbursementsData.map((item: RecentDisbursement) =>
            <tr key={item.most_recent_disbursement} className="bg-white border-b">
                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.disbursement_title}
                </th>
                <td className="px-6 py-4">
                    {item.date_paid != "" ? formatDate(item.date_paid) : ""}
                </td>
                <td className="px-6 py-4">
                    {item.amount_paid}
                </td>
                <td className="px-6 py-4">
                    <a href={item.blockchain_tx_url} className="text-sm border border-primary px-1 rounded-md">View</a>
                </td>
            </tr>
        )
    }

    return (
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl">
            <h2 className="text-base font-semibold mb-6 pt-4 pl-4">Recent Disbursements :</h2>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Disbursement Title
                            </th>
                            <th scope="col" className="px-5 py-2">
                                Date Paid
                            </th>
                            <th scope="col" className="px-5 py-2">
                                Amount Paid
                            </th>
                            <th scope="col" className="px-5 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

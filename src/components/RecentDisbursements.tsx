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
            <div key={item.most_recent_disbursement} className="grid grid-cols-4 gap-2 mt-3">
                <h3 className="text-sm font-semibold">{item.disbursement_title}</h3>
                <p className="text-sm">{item.date_paid != "" ? formatDate(item.date_paid) : ""}</p>
                <p className="text-sm">{item.amount_paid}</p>
                <div>
                    <a className="text-sm border border-primary px-1 rounded-md" href={item.blockchain_tx_url}>View</a>
                </div>
            </div>)
    }

    return (
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl p-6">
            <h2 className="text-base font-semibold mb-6">Recent Disbursements :</h2>

            {content}
        </div >
    )
}

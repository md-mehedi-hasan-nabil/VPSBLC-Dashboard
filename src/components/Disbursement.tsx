const disbursements = [
    {
        id: 1,
        title: "Date shown",
        date: "5/24/2024"
    },
    {
        id: 2,
        title: "Amount shown",
        date: "40,689"
    },
    {
        id: 3,
        title: "Amount shown",
        date: "40,689"
    },
]

export default function Disbursement() {
    return (
        <div className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                DISBURSEMENT OVERVIEW
            </h2>
            <div className="grid grid-cols-12 gap-8 mt-6">
                {
                    disbursements.map(item =>
                        <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-6">
                            <h3 className="text-base font-semibold text-secondary">{item.title}</h3>
                            <h2 className="text-3xl font-bold mt-8">{item.date}</h2>
                        </div>)
                }
            </div>

        </div>
    )
}

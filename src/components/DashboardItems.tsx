import vpsblc from "../assets/vpsblc.svg"
import virtual from "../assets/virtual.svg"
import trade from "../assets/trade.svg"

const dashboardItems = [
    {
        id: 1,
        name: "VPSBLC",
        title: "PENDING",
        icon: vpsblc
    },
    {
        id: 2,
        name: "Virtual Monetization",
        title: "PENDING",
        icon: virtual
    },
    {
        id: 3,
        name: "Trade activity",
        title: "INACTIVE",
        icon: trade
    },
]

export default function DashboardItems() {
    return (
        <div className="grid grid-cols-12 gap-8 mt-8">
            {
                dashboardItems.map(item =>
                    <div key={item.id} className="col-span-12 md:col-span-4 bg-white rounded-xl p-6">
                        <h3 className="text-base font-semibold text-secondary">{item.name}</h3>
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mt-8">{item.title}</h2>
                            </div>
                            <div>
                                <img src={item.icon} alt={item.name} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

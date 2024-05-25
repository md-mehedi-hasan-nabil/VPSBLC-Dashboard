import logo from "../assets/logo.png"
import dashboardSvg from "../assets/dashboard.svg";
import analyticsSvg from "../assets/3d-square.svg";
import disbursementSvg from "../assets/disbursement.svg";
import documentationSvg from "../assets/documentation.svg";
import supportSvg from "../assets/support.svg"

const links = [
    {
        id: 1,
        name: "Dashboard",
        icon: dashboardSvg
    },
    {
        id: 2,
        name: "Growth analytics",
        icon: analyticsSvg
    },
    {
        id: 3,
        name: "Disbursement",
        icon: disbursementSvg
    },
    {
        id: 4,
        name: "Documentation",
        icon: documentationSvg
    },
    {
        id: 5,
        name: "Support",
        icon: supportSvg
    },
]

export default function DashboardSidebar() {
    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-stone-200 sm:translate-x-0 dark:bg-stone-800 dark:border-stone-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                <img className="mb-8" src={logo} alt="logo" />

                <ul className="space-y-4 font-medium">
                    {
                        links.map(item => <li key={item.id}>
                            <a
                                href="#"
                                className="flex items-center p-2 text-stone-900 rounded-lg hover:bg-stone-100 group"
                            >
                                <img src={item.icon} alt={item.name} />
                                
                                <span className="ms-3">{item.name}</span>
                            </a>
                        </li>)
                    }

                </ul>
            </div>
        </aside>
    )
}

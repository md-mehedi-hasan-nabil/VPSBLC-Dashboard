import logo from "../assets/logo.png"
import dashboardSvg from "../assets/dashboard.svg";
import analyticsSvg from "../assets/3d-square.svg";
import disbursementSvg from "../assets/disbursement.svg";
import documentationSvg from "../assets/documentation.svg";
import supportSvg from "../assets/support.svg"
import { Link } from "react-router-dom";

const links = [
    {
        id: 1,
        name: "Dashboard",
        icon: dashboardSvg,
        link: "#dashboard"
    },
    {
        id: 2,
        name: "Growth analytics",
        icon: analyticsSvg,
        link: "#growth-analytics"
    },
    {
        id: 3,
        name: "Disbursement",
        icon: disbursementSvg,
        link: "#disbursement"
    },
    {
        id: 4,
        name: "Documentation",
        icon: documentationSvg,
        link: "#documentation"
    },
    {
        id: 5,
        name: "Support",
        icon: supportSvg,
        link: "#support"
    },
]

export default function DashboardSidebar() {
    return (
        <aside
            id="dashboard-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-stone-200 sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                <Link to="/dashboard">
                    <img className="mb-8" src={logo} alt="logo" />
                </Link>

                <ul className="space-y-4 font-medium">
                    {
                        links.map(item => <li key={item.id}>
                            <a
                                href={item.link}
                                className="flex items-center p-2 text-[#9197B3] rounded-lg hover:bg-primary hover:text-white group"
                            >
                                <img className="text-[#9197B3]" src={item.icon} alt={item.name} />

                                <span className="ms-3">{item.name}</span>
                            </a>
                        </li>)
                    }

                </ul>
            </div>
        </aside>
    )
}

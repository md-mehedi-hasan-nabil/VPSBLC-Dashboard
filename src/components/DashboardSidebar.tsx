import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import {  MdOutlineSpaceDashboard, MdOutlineSupportAgent } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";

const links = [
    {
        id: 1,
        name: "Dashboard",
        icon: <MdOutlineSpaceDashboard className="text-2xl" />,
        link: "#dashboard"
    },
    {
        id: 2,
        name: "Growth analytics",
        icon: <TbDeviceAnalytics className="text-2xl" />,
        link: "#growth-analytics"
    },
    {
        id: 3,
        name: "Disbursement",
        icon: <RiMenuSearchLine className="text-2xl" />,
        link: "#disbursement"
    },
    {
        id: 4,
        name: "Documentation",
        icon: <IoDocumentTextOutline className="text-2xl" />,
        link: "#documentation"
    },
    {
        id: 5,
        name: "Support",
        icon: <MdOutlineSupportAgent className="text-2xl" />,
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
                                className="flex gap-2 items-center p-2 text-[#9197B3] rounded-lg hover:bg-gradient hover:text-white group"
                            >
                                {/* <img className="text-[#9197B3]" src={item.icon} alt={item.name} /> */}
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        </li>)
                    }

                </ul>
            </div>
        </aside>
    )
}

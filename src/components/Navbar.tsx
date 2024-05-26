import { TbSettings2 } from "react-icons/tb";
import avatar from "../assets/user.png"

export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-stone-200 dark:bg-stone-800 dark:border-stone-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-stone-500 rounded-lg sm:hidden hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:ring-stone-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                />
                            </svg>
                        </button>
                        <a href="/" className="flex items-center gap-2 ms-2 md:me-24">
                            <TbSettings2 className="text-3xl" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                VPSBLC Dashboard
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-stone-800 rounded-full focus:ring-4 focus:ring-stone-300 dark:focus:ring-stone-600"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={avatar}
                                        alt="user photo"
                                    />
                                </button>
                            </div>
                            <div
                                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-stone-100 rounded shadow dark:bg-stone-700 dark:divide-stone-600"
                                id="dropdown-user"
                            >
                                <div className="px-4 py-3" role="none">
                                    <p
                                        className="text-sm text-stone-900 dark:text-white"
                                        role="none"
                                    >
                                        Neil Sims
                                    </p>
                                    <p
                                        className="text-sm font-medium text-stone-900 truncate dark:text-stone-300"
                                        role="none"
                                    >
                                        neil.sims@flowbite.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-white"
                                            role="menuitem"
                                        >
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

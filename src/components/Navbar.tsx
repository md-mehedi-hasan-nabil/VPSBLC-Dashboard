import avatar from "../assets/user.png"
import unlock from "../assets/unlock.svg"
import notification from "../assets/notification.svg"

export default function Navbar() {
    const username = localStorage.getItem("email")

    function handleLogout() {
        localStorage.removeItem("email")
        window.location.reload()
    }

    function handleSidebarMenu() {
        const aside = document.getElementById("dashboard-sidebar") as HTMLElement;

        if (aside.classList.contains("-translate-x-full")) {
            aside.classList.remove("-translate-x-full");
            aside.classList.add("transform-none");
        } else {
            aside.classList.remove("transform-none");
            aside.classList.add("-translate-x-full");
        }
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-gradient border-b border-stone-200">
            <div className="px-3 py-5 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            onClick={handleSidebarMenu}
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
                        <a href="/dashboard" className="flex items-center gap-2 ms-2 md:me-24 text-white">
                            <img className="w-10 h-10" src={unlock} alt="unlock" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                                VPSBLC.io Client Terminal
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-3 md:gap-6 ms-3">
                            <button>
                                <img className="w-10 h-10" src={notification} alt="notification " />
                            </button>
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-stone-800 rounded-full focus:ring-4 focus:ring-stone-300 dark:focus:ring-stone-600"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-10 h-10 rounded-full"
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
                                        {username ? username : ""}
                                    </p>

                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <button
                                            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-white"
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </button>
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

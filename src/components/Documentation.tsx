const documentationInfo = [
    {
        id: 1,
        name: "SPA",
        link: "#"
    },
    {
        id: 2,
        name: "MOU",
        link: "#"
    },
    {
        id: 3,
        name: "VPSBLC NFT",
        link: "#"
    },
]

export default function Documentation() {
    return (
        <div className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">
                DOCUMENTATION
            </h2>

            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6">
                    {
                        documentationInfo.map(item =>
                            <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl p-6">
                                <div className="flex flex-col justify-center gap-6">
                                    <h2 className="text-xl text-[#343C6A] font-semibold text-center">
                                        {item.name}
                                    </h2>
                                    <div className="text-center">
                                        <a href={item.link} className="text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            HYPERLINK
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-semibold">Recent Disbursements :</h2>
                        <button>Vaw</button>
                    </div>
                    <p className="my-3">Payment 1....</p>
                    <p>Payment 2....</p>
                </div>
            </div>
        </div>
    )
}

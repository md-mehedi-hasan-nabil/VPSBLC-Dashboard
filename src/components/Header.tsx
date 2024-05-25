import { IDashboard } from "../types"

export default function Header({ data }: {
    data: IDashboard
}) {

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Welcome <span className="text-[#2464EA]">
                {data && data.name}
            </span></h2>
            <div>
                <h3 className="text-xl font-semibold">VPSBLC TX-ID:</h3>
                <p className="text-xl text-primary">
                    {data && data["TX-ID"]}
                </p>
            </div>
        </div>
    )
}

import { ClientInformation } from "../types"
import Loader from "./Loader"
import { useQuery } from "@tanstack/react-query"

export default function Header() {
  const { data: clientInfo, isSuccess: isSuccessClientInfo, isLoading: isLoadingClientInfo } = useQuery({
    queryKey: ['clientInfo'],
    queryFn: async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/client-info')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    },
  })

  let content;

  if (isLoadingClientInfo) {
    content = <Loader />
  } else if (isSuccessClientInfo) {
    content = <div id="dashboard" className="flex flex-col md:flex-row md:justify-between md:items-center">
      <h2 className="text-3xl font-bold">Welcome <span className="text-[#2464EA]">
        {
          isSuccessClientInfo && <>
            {clientInfo["First Name"]}{" "}
            {clientInfo["Last Name"]}
          </>
        }
      </span>
      </h2>
      <div className="mt-5 md:mt-0">
        <h3 className="text-xl font-semibold">VPSBLC TX-ID:</h3>
        <p className="text-xl text-primary">{(clientInfo as ClientInformation)["TX Code"]}</p>
      </div>
    </div>
  } else {
    content = <div className="flex justify-between items-center">
      <h2>Something was wrong</h2>
    </div>
  }

  return (
    <>
      {content}
    </>
  )
}

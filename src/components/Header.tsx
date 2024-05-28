import { FcDiploma1 } from "react-icons/fc"
import { ClientInformation } from "../types"
import { formatDate } from "../utils/formattedDate"
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
      <h2 className="text-3xl font-bold">Welcome <span className="text-primary">
        {
          isSuccessClientInfo && <>
            {clientInfo["First Name"]}{" "}
            {clientInfo["Last Name"]}
          </>
        }!
      </span>
        <p className="text-base font-semibold mt-2">Today is {formatDate(new Date())}</p>
      </h2>
      <div className="mt-5 md:mt-0">
        <div className="text-xl font-semibold flex text-center items-center md:justify-center gap-1">
          <FcDiploma1 />
          <p>VPSBLC TX-ID:</p>
        </div>
        <p className="text-2xl font-semibold text-primary mt-1">{(clientInfo as ClientInformation)["TX Code"]}</p>
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

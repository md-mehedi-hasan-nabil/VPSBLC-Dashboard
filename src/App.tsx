import DashboardSidebar from "./components/DashboardSidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import vpsblc from "./assets/vpsblc.svg"
import virtual from "./assets/virtual.svg"
import trade from "./assets/trade.svg"

export default function App() {
  return (
    <>
      <Navbar />
      <DashboardSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Welcome <span className="text-[#2464EA]">Nabil</span></h2>
            <div>
              <h3 className="text-xl font-semibold">VPSBLC TX-ID:</h3>
              <p className="text-xl text-primary">[ABCVPSBLC123KTXA]</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-6">
            <div className="col-span-4 bg-white rounded-lg p-6">
              <h3 className="text-base font-semibold text-secondary">VPSBLC</h3>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-3xl font-bold mt-8">PENDING</h2>
                </div>
                <div>
                  <img src={vpsblc} alt="vpsblc" />
                </div>
              </div>
            </div>
            <div className="col-span-4 bg-white rounded-lg p-4">

            </div>
            <div className="col-span-4 bg-white rounded-lg p-4">

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

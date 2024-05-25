import DashboardSidebar from "./components/DashboardSidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import vpsblc from "./assets/vpsblc.svg"
import virtual from "./assets/virtual.svg"
import trade from "./assets/trade.svg"
import ApexChart from "./components/ApexChart";

const dashboardItems = [
  {
    id: 1,
    name: "VPSBLC",
    title: "PENDING",
    icon: vpsblc
  },
  {
    id: 2,
    name: "Virtual Monetization",
    title: "PENDING",
    icon: virtual
  },
  {
    id: 3,
    name: "Trade activity",
    title: "INACTIVE",
    icon: trade
  },
]

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
            {
              dashboardItems.map(item => <div key={item.id} className="col-span-12 md:col-span-4 bg-white rounded-xl p-6">
                <h3 className="text-base font-semibold text-secondary">{item.name}</h3>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mt-8">{item.title}</h2>
                  </div>
                  <div>
                    <img src={item.icon} alt={item.name} />
                  </div>
                </div>
              </div>)
            }
          </div>

          <div className="mt-8">
            <h2 className="text-3xl text-[#343C6A] font-semibold">GROWTH ANALYICS</h2>

            <div className="mt-2">
              <ApexChart />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

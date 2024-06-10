import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("username")

    if (user) {
      navigate("/dashboard")
    }
  }, [navigate])

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      email,
      password
    }

    fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data)
          toast.success("Login successfull.")
          localStorage.setItem("email", data?.email)
          setEmail("")
          setPassword("")
          navigate("/dashboard")
        } else {
          toast.error("Please correct username and password.")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section className="min-h-screen flex justify-center items-center background-image">
      <div className="w-full pt-20">
        <form className="max-w-96 mx-auto p-6 bg-white/40 shadow-2xl rounded-lg" onSubmit={handleLogin}>
          <div className="mb-8">
            <Link to="/">
              <img className="mx-auto" src={logo} alt="logo" />
            </Link>
            <p className="mt-4 text-3xl font-semibold">Login to Your Account</p>
            <p className="text-center text-sm mt-1">Welcome to your VPSBLC.io  Client Terminal</p>
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your username
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>

        <div className="px-8 w-10/12 mx-auto text-white mt-10">
          <footer className="text-center">
            <p className="text-[8px] italic">
              <b className="font-bold">DISCLAIMER: </b>
              The information presented within this Client Terminal is furnished for educational and informational purposes only and does not constitute legally binding documentation or an offer to sell or solicitation of an offer to buy any securities, financial products, or instruments. Due to the inherently volatile nature of financial markets and the dynamic conditions affecting them, all balances, figures, performance metrics, and other data displayed herein are subject to change without notice and may not accurately reflect real-time values or the actual financial status of your account. Clients expressly acknowledge and agree that the only documents possessing legal enforceability and validity are the formal contracts executed between the Client and Axiom Strategic Capital, LLC. All other representations, whether verbal, written, or electronic—including the content of this Client Terminal—shall be considered subordinate and non-binding. By accessing this terminal, the Client affirms their understanding and acceptance of these conditions, thereby waiving any claims to the contrary based on the informational content provided herein.
            </p>
            <p className="mt-5 text-sm font-bold">Copyright 2024. | Axiom Strategic Capital, LLC | All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </section>
  )
}

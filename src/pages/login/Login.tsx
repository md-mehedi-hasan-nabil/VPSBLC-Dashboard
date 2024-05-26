import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      username,
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
        toast.success("Login successfull.")
        navigate("/dashboard")
        localStorage.setItem("username", data?.username)
      })
      .catch(err => {
        toast.error("Username or password is wrong.")
        console.log(err)
      })
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-full">
        <form className="max-w-96 mx-auto" onSubmit={handleLogin}>
          <div className="mb-8">
            <Link to="/"><img className="mx-auto" src={logo} alt="logo" /></Link>
            <p className="my-4 text-3xl font-semibold">Login to your account</p>
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

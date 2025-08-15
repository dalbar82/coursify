'use client'

import { useState } from "react"
import axios from "axios"
import {toast} from "react-toastify"
import {SyncOutlined} from "@ant-design/icons"
import Link from "next/link"


export default function RegisterPage () {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password
      })
      console.log('this is the register response',data);
      toast.success('Registration successful. Please login')
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
                Name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Name"
                  id="username"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name} 
                  onChange={e => setName(e.target.value) }
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value) }
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password} 
                  onChange={e => setPassword(e.target.value) }
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!name || !email || !password || loading}
                type="submit"
                className="disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {
                loading ? <SyncOutlined spin/> :  "Sign in"
                }
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already Registered{' '}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
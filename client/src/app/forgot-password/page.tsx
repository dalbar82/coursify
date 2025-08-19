'use client'

import React, { useState, FormEvent} from "react"
import { toast } from "react-toastify"
import axios from "axios"
import {SyncOutlined} from "@ant-design/icons"
import { useRouter } from 'next/navigation';

export default function ForgotPassword () {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    axios.post('/api/forgot-password', {
      email: email,
    })
    .then(function (response) {
      setIsLoading(false)
      toast.success(`Email sent`)
      router.push('/login');
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error.message)
      setIsLoading(false)
    });
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forgot Password</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-row text-sm/6 block justify-between">
                <label htmlFor="email" className="font-medium text-gray-100">
                  Email address
                </label>
                <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Back to login
                </a>
              </div>
              
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {isLoading ? <SyncOutlined spin/> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

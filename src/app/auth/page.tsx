"use client"

import type React from "react"
import { useState } from "react"
import Login from "@/components/Login"
import Signup from "@/components/Signup"

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-indigo-600 hover:text-indigo-500">
            {isLogin ? "create a new account" : "sign in to your existing account"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{isLogin ? <Login /> : <Signup />}</div>
      </div>
    </div>
  )
}

export default AuthPage


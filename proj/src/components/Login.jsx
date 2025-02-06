import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice' //This is also a new type of syntax
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)  //if session user is logged in else user is not logged in
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-10 bg-white rounded-xl shadow-md border border-black/10">
          {/* Logo Section */}
          <div className="mb-4 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          
          {/* Sign-up Link Section */}
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          
          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          {/* Form Section */}
          <form onSubmit={handleSubmit(login)} className="mt-8 w-full">
            <div className="space-y-5">
              {/* Email Input */}
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) => {
                      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      return emailPattern.test(value) || "Email address must be valid";
                    },
                  },
                })}
              />
              
              {/* Password Input */}
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
      
    )
}

export default Login
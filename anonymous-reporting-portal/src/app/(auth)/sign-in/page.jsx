'use client'
import React from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { redirect, useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/schemas/signInSchema'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast';
import { useState } from "react";
import { signIn } from 'next-auth/react';


function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const signinResult = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      console.log(signinResult);

      if (signinResult?.error) {
        toast.error("Incorrect email or password!");
      }
      else if (signinResult?.url) {
        toast.success("Signin successful,redirecting...");
        router.push('/dashboard');
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      console.log("errorMessage", errorMessage);
      toast.error(errorMessage);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-center text-4xl capitalize font-bold pb-5">Welcome, Sign in your account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email or username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button type="button" className="absolute right-0 inset-y-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {
                          showPassword ? (
                            <EyeOff className="w-5 h-5  text-gray-500" />
                          ) : (
                            <Eye className="w-5  h-5 text-gray-500" />
                          )
                        }
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>

              {
                isSubmitting ?
                  (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) :
                  (
                    <>Sign in</>
                  )
              }

            </Button>
          </form>

        </Form>
      </div>

    </div>
  )
}

export default SignIn

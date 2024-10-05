'use client'
import React from 'react'
import { useParams,useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifySchema } from '@/schemas/verifySchema'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'; 



function page() {

  const router = useRouter()
  const params = useParams()
  console.log("Params :",params);

  const form = useForm({
    resolver:zodResolver(verifySchema),
  })

  const onSubmit = async (data)=>{
    try {
      const response = await axios.post('/api/verify-code',{
        username: params.username,
        code:data.code
      })
      toast.success('Success user verification! Redirecting...');
      router.push(`/sign-in`);
      
    } catch (error) {
      console.log("error",error);
      const errorMessage = error.response?.data?.message || 'verification failed. Please try again.';
      toast.error(errorMessage);
    }
  }
  



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div>
          <h1 className="text-center text-3xl capitalize font-bold pb-5">Verify Your Account</h1>
      </div>
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your verify code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
        </form>

      </Form>
      </div>
    </div>
  )
}

export default page

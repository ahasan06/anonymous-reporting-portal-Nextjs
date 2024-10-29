'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { signUpSchema } from "@/schemas/signUpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; 
import { signIn } from "next-auth/react";
function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [invitationCode, setInvitationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: 'user',
      invitationCode: ''
    }
  });

  
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' }); 
};
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null); // Reset any previous errors
    try {
      const response = await axios.post('/api/sign-up', data);
      toast.success('Signup successful! Redirecting...');
      router.push(`/verify/${data.username}`);
    } catch (error) {
      console.log("error", error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      console.log("errorMessage", errorMessage);
      toast.error(errorMessage);
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-center text-2xl capitalize font-bold pb-5">Welcome, to Anonymouse portal </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Selection Field using shadcn/ui Select */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      value={role}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setRole(value); // Update role
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditionally render the admin code field if role is 'admin' */}
            {role === 'admin' && (
              <FormField
                control={form.control}
                name="invitationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter admin invitation code"
                        {...field}
                        value={invitationCode}
                        onChange={(e) => {
                          field.onChange(e);
                          setInvitationCode(e.target.value); // Update admin code
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} className="pr-10" placeholder="Enter your password" {...field} />

                      <button className="absolute right-0 inset-y-0 flex items-center pr-3 cursor-pointer"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5  text-gray-500" />
                        ) : (
                          <Eye className="w-5  h-5 text-gray-500" />
                        )}
                      </button>
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  <>Signup</>
                )}
              </Button>
              {/* <Button
                type="button"
                onClick={handleGoogleSignIn} // Call the signIn function on click
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                <AiFillGoogleCircle className="w-5 h-5" />
                <span>Sign in with Google as user</span>
              </Button> */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;

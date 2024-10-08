'use client'
import React from 'react'
import success from '../../../../public/success-report.png'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FiCopy } from 'react-icons/fi'; 
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function ReportSuccess() {


    const router = useRouter()
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    
    const handleCopy = () =>{
        if (code) {
            navigator.clipboard.writeText(code)
            toast.success('copied tracking code!')
        }
    }
    
   
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl mx-8 md:mx-0 p-8 bg-white rounded-lg shadow-lg flex flex-col items-center gap-3">
                <Image src={success} alt="Website Logo" width={250} height={250} />
                <h1 className="text-4xl font-bold text-green-800">Report Submitted!</h1>
                <p className="text-center text-xl text-gray-700 mb-6">
                    Thank you for submitting your report. Your submission has been received.
                </p>
                {code && (
                    <div className="mb-4 text-center">
                        <Label className="text-center text-lg text-gray-600">Your anonymous Report tracking code:</Label>
                        <div className="flex items-center w-full space-x-2 relative">
                            <Input
                                type="text"
                                value={code}
                                disabled
                                className="input input-bordered w-full p-2 text-center bg-slate-200 font-bold text-xl"
                            />
                            <button
                                onClick={handleCopy}
                                className="p-2 text-gray-600 hover:text-gray-800 transition-colors absolute right-0"
                                aria-label="Copy code to clipboard"
                            >
                                <FiCopy size={24} />
                            </button>
                        </div>
                        <span className="text-slate-400 text-sm">keep this code yourself</span>
                    </div>
                )}
                <Button onClick={()=>router.push('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>

        </div>
    )
}

export default ReportSuccess

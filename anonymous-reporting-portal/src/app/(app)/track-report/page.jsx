'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trackingReportSchema } from '@/schemas/trackingCodeSchema'
import { FaSearch } from 'react-icons/fa'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'

function GetTrackingReport() {
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(trackingReportSchema),
        defaultValues: {
            anonymousCode: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/get-tracking-report?anonymousCode=${data.anonymousCode}`);

            if (response?.data?.success) {
                setReportData(response.data.message);
                toast.success('Report found!');
            } else {
                toast.error('Report not found or incorrect code.');
                setReportData(null);
            }
        } catch (error) {
            toast.error('Error fetching report. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="relative bg-gradient-to-r from-gray-200 via-blue- to-gray-500 h-64 border-b border-blue-950">
                <div className="flex flex-col items-center h-full justify-center gap-2 text-center">
                    <FaSearch className="text-4xl text-blue-950 mb-4" />
                    <h1 className="text-4xl text-blue-950 md:text-6xl font-bold ">Track Your Report</h1>
                    <p className="mb-4 text-sm font-bold text-gray-600">
                        Use the anonymous code you received to track the status of your report.
                    </p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3/4 md:w-1/2">

                    <div className="flex items-center w-full space-x-2 relative">
                        <Input
                            type="text"
                            placeholder="Send your anonymous code here...."
                            className="input input-bordered w-full p-2 h-14 font-bold md:text-center md:text-lg"
                            {...form.register('anonymousCode')}
                        />
                        <Button
                            type="submit"
                            className="p-2 bg-blue-950 transition-colors absolute right-0 h-14"
                            aria-label="Track report"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Fetching Report...' : 'Track Report'}
                        </Button>
                    </div>
                </form>


            </div>
            <div className="rounded-lg w-3/4 md:w-1/2 mx-auto">
                {reportData && (
                    <div>
                        <div className="bg-blue-950 w-full mt-10 flex justify-between items-center px-4 py-3 text-white rounded ">
                            <div className="flex gap-2"> <span className="hidden md:block">Reporting Time : </span><span className="text-sm text-slate-300"> [ {new Date(reportData.createdAt).toLocaleString()} ] </span> </div>
                            <p><span className="text-sm text-slate-300">{reportData.anonymousCode}</span> </p>
                        </div>
                        <Table className="mt-4 bg-white rounded-lg shadow-md border border-gray-200">
                            <TableCaption>Report Details</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-gray-800 font-bold">Field</TableHead>
                                    <TableHead className="text-gray-800 font-bold">Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-gray-700 font-medium">Status</TableCell>
                                    <TableCell className={`font-medium ${reportData.status === 'new' ? 'text-red-500' : reportData.status === 'in-progress' ? 'text-yellow-500' :reportData.status ==='resolved'? 'text-green-400':'text-gray-700'}`}>
                                        {reportData.status}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-gray-700 font-medium">Department</TableCell>
                                    <TableCell className="text-gray-700">{reportData.department}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-gray-700 font-medium">Issue Type</TableCell>
                                    <TableCell className="text-gray-700">{reportData.issueType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-gray-700 font-medium">Description</TableCell>
                                    <TableCell className="text-gray-700">{reportData.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetTrackingReport

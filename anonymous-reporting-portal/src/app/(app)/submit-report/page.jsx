'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { reportSchema } from '@/schemas/reportSchema'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DEPARTMENT_OPTIONS = [
    'cse',
    'eee',
    'pharmacy',
    'bba',
    'english',
    'law',
    'canteen',
    'hostel',
    'others'
];

const ISSUE_TYPE_OPTIONS = [
    'bullying',
    'harassment',
    'discrimination',
    'food-quality',
    'infrastructure',
    'academic-issues',
    'other'
]

function SubmitReport() {
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver:zodResolver(reportSchema),
        defaultValues: {
            department: '',
            issueType: '',
            description: '',
            evidence: [],
        }
    });

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setEvidenceFiles(files);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        // Combine form data with uploaded files
        const formData = {
            ...data,
            evidence: evidenceFiles,
        };
        console.log(formData);

        try {
           
            const response = await axios.post('/api/send-reports', formData);
            console.log("report response :", response);
            toast.success('Report submitted successfully');
            const code = response?.data?.anonymousCode
            if (!code) {
                toast.error("anonymouse tracking code not found!")
            }
            else{
                router.push(`/report-success?code=${code}`);
            }
            form.reset()
            setEvidenceFiles([])
        } catch (error) {
            const errorMessage = error.response.data.message ||"an error occured!"
            console.log(error.message);
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div>
                    <h1 className="text-center text-4xl capitalize font-bold pb-5">Submit your Report</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose your complaint : </FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DEPARTMENT_OPTIONS.map(dept => (
                                                <SelectItem key={dept} value={dept}>{dept.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="issueType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose your issue type :</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Issue Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ISSUE_TYPE_OPTIONS.map(issue => (
                                                <SelectItem key={issue} value={issue}>{issue.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="description">Explain your complain:</Label>
                                    <Textarea
                                        {...field}
                                        placeholder="Type your message here."
                                        id="description"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Your message will be sent to the support team.
                                    </p>
                                </FormItem>
                            )}
                        />

                        {/* File Upload for Evidence */}
                        <FormItem>
                            <Label htmlFor="evidence">Upload evidence ( <span className="text-red-600 italic text-sm opacity-65">if any</span> ) :</Label>
                            <Input
                                id="picture"
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="mt-2"
                            />
                            {evidenceFiles.length > 0 && (
                                <ul className="mt-2">
                                    {evidenceFiles.map((file, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </FormItem>

                        <Button type="submit">

                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> submeting...
                                </>
                            ) : (
                                <>Submit Report</>
                            )}

                        </Button>
                    </form>
                </Form>


            </div>
        </div>
    );
}

export default SubmitReport;

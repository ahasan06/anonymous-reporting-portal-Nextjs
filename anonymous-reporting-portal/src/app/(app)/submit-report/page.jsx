'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
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
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            department: '',
            issueType: '',
            description: '',
            occurrenceDate: '',
            evidence: [],
        }
    });

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => {
            return URL.createObjectURL(file)
        });
        setEvidenceFiles(files);
        setImagePreviews(previews);
    };

    // Upload files to Cloudinary
    const uploadFilesToCloudinary = async (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('image', file)
        });

        try {
            const response = await axios.post('/api/uploadImage', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            // Ensure the response contains valid data
            if (response.data?.uploads) {
                // Return an array of image objects with 'id' and 'url'
                return response.data.uploads.map(image => ({
                    id: image.id,    // Cloudinary unique identifier
                    url: image.url,  // URL of the uploaded image
                }));
            } else {
                throw new Error("No uploaded files found in response");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            throw new Error("File upload failed");
        }
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        let uploadedImages = [];

        // Upload files to Cloudinary only if files are provided
        if (evidenceFiles.length > 0) {
            uploadedImages = await uploadFilesToCloudinary(evidenceFiles);
            if (!uploadedImages || uploadedImages.length === 0) {
                toast.error("File upload failed!");
                setIsSubmitting(false);
                return;
            }
        }


        // Ensure each uploaded image has the required 'id' and 'url' properties
        const formattedEvidence = uploadedImages.map(image => ({
            id: image.id,  // Cloudinary's unique ID
            url: image.url,  // URL of the uploaded image
        }));
        const formData = { ...data, evidence: formattedEvidence };

        try {
            const response = await axios.post('/api/send-reports', formData);
            toast.success('Report submitted successfully');

            const code = response?.data?.anonymousCode;
            if (!code) {
                toast.error("Anonymous tracking code not found!");
            } else {
                router.push(`/report-success?code=${code}`);
            }

            // Reset form and states
            form.reset();
            setEvidenceFiles([]);
            setImagePreviews([]);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred!";
            console.error(error.message);
            toast.error(errorMessage);
        } finally {
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
                            name="occurrenceDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occurrence Date:</FormLabel>
                                    <Input
                                        {...field}
                                        type="date"
                                        id="occurrenceDate"
                                        placeholder="Select the date when the incident occurred"
                                    />
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
                            {imagePreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-auto object-cover rounded shadow"
                                            />
                                        </div>
                                    ))}
                                </div>
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

'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema } from '@/schemas/reportSchema';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DEPARTMENT_OPTIONS = ['cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel', 'others'];
const ISSUE_TYPE_OPTIONS = ['bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'];

function SubmitReport() {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      department: '',
      issueType: '',
      description: '',
      occurrenceDate: '',
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      let imageId = '';

      // Upload image if provided
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);

        const imageUploadRes = await axios.post('/api/uploadImage', imageFormData);

        if (imageUploadRes?.data?.url) {
          imageUrl = imageUploadRes.data.url;
          imageId = imageUploadRes.data.id;
        } else {
          throw new Error('Image upload failed.');
        }
      }

      // Prepare data for backend
      const formData = {
        ...data,
        evidence: imageUrl ? { url: imageUrl, id: imageId } : null,
      };

      const response = await axios.post('/api/send-reports', formData);

      // Success response
      toast.success('Report submitted successfully');
      const code = response?.data?.anonymousCode;
      if (code) {
        router.push(`/report-success?code=${code}`);
      } else {
        toast.error('Anonymous tracking code not found!');
      }

      // Reset form
      form.reset();
      setImageFile(null);
      setPreviewImage(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred!';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-4xl font-bold">Submit your Report</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Department Select */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose your complaint:</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENT_OPTIONS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Issue Type Select */}
            <FormField
              control={form.control}
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose your issue type:</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Issue Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ISSUE_TYPE_OPTIONS.map((issue) => (
                        <SelectItem key={issue} value={issue}>
                          {issue.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Occurrence Date */}
            <FormField
              control={form.control}
              name="occurrenceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occurrence Date:</FormLabel>
                  <Input {...field} type="date" placeholder="Select the incident date" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explain your complaint:</FormLabel>
                  <Textarea {...field} placeholder="Type your message here." />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormItem>
              <Label htmlFor="evidence">Upload evidence (optional):</Label>
              <Input id="evidence" type="file" onChange={handleImageChange} />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Selected preview"
                  className="mt-2 w-full rounded shadow"
                />
              )}
            </FormItem>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Report'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SubmitReport;

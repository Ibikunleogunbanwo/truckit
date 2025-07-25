"use client";

import DashboardHeader from "@/components/dashboardheader";
import { ChevronLeftIcon, PencilLine, User2, Upload, X } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s-()]{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
});


const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const validateFile = useCallback((file) => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)";
    }

    return null;
  }, []);

  const handleFileChange = useCallback((selectedFile) => {
    setUploadError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const error = validateFile(selectedFile);
    if (error) {
      setUploadError(error);
      toast.error(error);
      return;
    }

    setFile(selectedFile);
  }, [validateFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setUploadError(null);
  }, []);


  // Generate preview URL and cleanup
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }


    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);


  return {
    file,
    previewUrl,
    uploadError,
    handleFileChange,
    clearFile,
  };
};

// API service (mock - replace with actual implementation)
const profileService = {
  updateProfile: async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate occasional failure for testing
    if (Math.random() < 0.1) {
      throw new Error("Network error occurred");
    }
    
    return { success: true, message: "Profile updated successfully" };
  }
};

const PersonalInformationPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { file, previewUrl, uploadError, handleFileChange, clearFile } = useFileUpload();

  const {
    register,
    handleSubmit,
    reset,
    
  formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const handleBack = useCallback(() => {
    if (isDirty || file) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    router.push("/manageaccount");
  }, [router, isDirty, file]);


  const handleKeyDown = useCallback((e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  }, []);



  const handleFileInputChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    handleFileChange(selectedFile);
  }, [handleFileChange]);



  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      if (file) {
        formData.append("profileImage", file);
      }

      const result = await profileService.updateProfile(formData);
      
      toast.success(result.message || "Profile updated successfully");
      reset();
      clearFile();
      
      // Optionally redirect after successful update
      // router.push("/manageaccount");
      
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const hasChanges = isDirty || file;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <DashboardHeader />
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8">
        {/* Page Header */}
        <div className="bg-white">
          <div className="flex items-center gap-4 px-4 py-6 max-w-7xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              aria-label="Go back to previous screen"
              onKeyDown={(e) => handleKeyDown(e, handleBack)}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Personal Information</h1>
              <p className="text-sm text-gray-500 mt-1">Update your profile details and photo</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
              {/* Profile Picture Section */}
              <div className="border-b pb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h2>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-teal-100 text-gray-400">
                          <User2 className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    {file && (
                      <button
                        type="button"
                        onClick={clearFile}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Remove profile picture"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      id="profilePicUpload"
                      onChange={handleFileInputChange}
                      className="hidden"
                      aria-describedby="file-upload-help"
                    />
                    
                    <label
                      htmlFor="profilePicUpload"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 cursor-pointer transition-colors duration-200"
                    >
                      <Upload className="h-4 w-4" />
                      {file ? "Change Picture" : "Upload Picture"}
                    </label>
                    
                    <p id="file-upload-help" className="text-xs text-gray-500 mt-2">
                      JPG, PNG, or WebP. Max file size 5MB.
                    </p>
                    
                    {uploadError && (
                      <p className="text-sm text-red-600 mt-2" role="alert">
                        {uploadError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                      {...register("firstName")}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.firstName ? "border-red-300" : "border-gray-300"
                      }`}
                      aria-invalid={errors.firstName ? "true" : "false"}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-sm text-red-600 mt-1" role="alert">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                      {...register("lastName")}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.lastName ? "border-red-300" : "border-gray-300"
                      }`}
                      aria-invalid={errors.lastName ? "true" : "false"}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-sm text-red-600 mt-1" role="alert">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      {...register("email")}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      {...register("phoneNumber")}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.phoneNumber ? "border-red-300" : "border-gray-300"
                      }`}
                      aria-invalid={errors.phoneNumber ? "true" : "false"}
                      aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                    />
                    {errors.phoneNumber && (
                      <p id="phoneNumber-error" className="text-sm text-red-600 mt-1" role="alert">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !hasChanges}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 ${
                    isSubmitting || !hasChanges
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;
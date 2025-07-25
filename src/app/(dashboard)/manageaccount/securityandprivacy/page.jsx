"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import DashboardHeader from "@/components/dashboardheader"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import PasswordInput from "@/components/reusableinput"

// Zod Schema for password change
const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

// Zod Schema for account deletion
const deleteSchema = z.object({
  deletePassword: z.string().min(1, "Password is required to delete account"),
  confirmationText: z.string().refine((val) => val === "DELETE", {
    message: "Please type DELETE to confirm",
  }),
})

export default function Page() {
  const router = useRouter()
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Change password form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  })

  // Delete account form
  const {
    register: registerDelete,
    handleSubmit: handleDeleteSubmit,
    reset: resetDelete,
    watch: watchDelete,
    formState: { errors: deleteErrors, isDirty: isDeleteDirty },
  } = useForm({
    resolver: zodResolver(deleteSchema),
    mode: "onBlur",
  })

  // Watch form values for controlled inputs
  const passwordValues = watch()
  const deleteValues = watchDelete()

  const onSubmitPassword = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Password Change:", { ...data, oldPassword: "[REDACTED]", password: "[REDACTED]" })
      toast.success("Password updated successfully")
      reset()
    } catch (error) {
      toast.error("Failed to update password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onDeleteAccount = async (data) => {
    if (!showDeleteConfirmation) {
      setShowDeleteConfirmation(true)
      return
    }

    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Deleting Account with:", { ...data, deletePassword: "[REDACTED]" })
      toast.success("Account deleted successfully")
      resetDelete()
      router.push("/login")
    } catch (error) {
      toast.error("Failed to delete account. Please try again.")
      setShowDeleteConfirmation(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBack = () => {
    if (isDirty || isDeleteDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?")
      if (!confirmLeave) return
    }
    router.push("/manageaccount")
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    resetDelete()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <DashboardHeader />
      </div>

      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-4 px-4 py-6 max-w-7xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              aria-label="Go back to previous screen"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-sm lg:text-base font-semibold text-gray-900">Security Settings</h1>
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-8 flex flex-col lg:flex-row lg:gap-8 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="font-semibold text-gray-900 text-base mb-2">Change Password</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Keep your account secure by updating your password regularly. Choose a strong, unique password that includes uppercase and lowercase letters, numbers, and special characters.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitPassword)} className="w-full lg:w-1/2 space-y-4">
            <PasswordInput
              id="oldPassword"
              label="Current Password"
              {...register("oldPassword")}
              value={passwordValues?.oldPassword || ""}
              error={errors.oldPassword?.message}
              show={showOld}
              setShow={setShowOld}
              disabled={isSubmitting}
            />
            <PasswordInput
              id="password"
              label="New Password"
              {...register("password")}
              value={passwordValues?.password || ""}
              error={errors.password?.message}
              show={showNew}
              setShow={setShowNew}
              disabled={isSubmitting}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              {...register("confirmPassword")}
              value={passwordValues?.confirmPassword || ""}
              error={errors.confirmPassword?.message}
              show={showConfirm}
              setShow={setShowConfirm}
              disabled={isSubmitting}
            />

            <Button 
              type="submit" 
              disabled={!isDirty || isSubmitting} 
              className="w-full bg-teal-500 text-white"
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="mt-8 flex flex-col lg:flex-row lg:gap-8 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="font-semibold text-red-600 text-base mb-2">Delete Account</h2>
            <div className="space-y-3">
              <p className="text-sm text-red-600 leading-relaxed">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700 font-medium mb-2">This will delete:</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Your profile and personal information</li>
                  <li>• All your moves and quotations</li>
                  <li>• Account settings and preferences</li>
                  <li>• Move history and data</li>
                </ul>
              </div>
            </div>
          </div>
        
          <form onSubmit={handleDeleteSubmit(onDeleteAccount)} className="w-full lg:w-1/2 space-y-4">
            <PasswordInput
              id="deletePassword"
              label="Your Password"
              {...registerDelete("deletePassword")}
              value={deleteValues?.deletePassword || ""}
              error={deleteErrors.deletePassword?.message}
              show={showDelete}
              setShow={setShowDelete}
              disabled={isDeleting}
            />

            <div>
              <label htmlFor="confirmationText" className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE" to confirm
              </label>
              <input
                id="confirmationText"
                type="text"
                {...registerDelete("confirmationText")}
                value={deleteValues?.confirmationText || ""}
                placeholder="Type DELETE to confirm"
                disabled={isDeleting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {deleteErrors.confirmationText && (
                <p className="mt-1 text-sm text-red-600">{deleteErrors.confirmationText.message}</p>
              )}
            </div>

            {showDeleteConfirmation ? (
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    ⚠️ Final confirmation: This action cannot be undone. Your account and all data will be permanently deleted.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium"
                  >
                    {isDeleting ? "Deleting Account..." : "Yes, Delete My Account"}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="submit"
                disabled={!isDeleteDirty || isDeleting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                Delete Account
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
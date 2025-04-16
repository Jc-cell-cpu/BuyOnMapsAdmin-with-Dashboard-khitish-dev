/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Trash2, Edit } from "lucide-react"
import { createBanner, fetchBanner, uploadImages, deleteBanner, editBanner } from "./banner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader } from "@/components/ui/loader"

interface Banner {
  _id: string
  imageUrl: string[]
  createdAt: string
  updatedAt: string
}

interface CreateBannerResponse {
  success: boolean
  data: Banner
}

const BannerManagement = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const loadingRef = useRef(false)

  // Create a memoized function to load banners
  const loadBanners = useCallback(async () => {
    if (loadingRef.current) return

    try {
      loadingRef.current = true
      setIsLoading(true)

      // console.log("Fetching banners...")
      const response = await fetchBanner()
      // console.log("Fetch response:", response)

      if (response.data && Array.isArray(response.data)) {
        // console.log("Setting banners state:", response.data)
        setBanners(response.data)
      }
    } catch (error) {
      // console.error("Failed to load banners:", error)
      toast({
        title: "Error",
        description: "Failed to load banners",
        variant: "destructive",
      })
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }, [toast])

  // Initial load of banners
  useEffect(() => {
    loadingRef.current = false
    loadBanners()
  }, [loadBanners])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
    }
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleDeleteClick = (bannerId: string) => {
    setSelectedBannerId(bannerId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedBannerId) return

    try {
      setIsLoading(true)
      await deleteBanner(selectedBannerId)
      toast({
        title: "Success",
        description: "Banner deleted successfully",
        variant: "success",
      })
      await loadBanners() // Refresh the banner list
    } catch (error) {
      // console.error("Failed to delete banner:", error)
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setSelectedBannerId(null)
    }
  }

  const handleEditClick = (bannerId: string) => {
    setSelectedBannerId(bannerId)
    setIsEditing(true)
    setSelectedFiles([]) // Reset selected files
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset file input
    }
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setSelectedBannerId(null)
    setSelectedFiles([])
  }

  const handleEditSubmit = async () => {
    if (!selectedBannerId || selectedFiles.length !== 3) {
      toast({
        title: "Error",
        description: "Please select exactly 3 images",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("images", file)
      })

      // console.log("Uploading new images...")
      const uploadResponse = await uploadImages(formData)
      // console.log("Upload response:", uploadResponse)
      const imagePaths = uploadResponse.data.imagePaths

      if (imagePaths && imagePaths.length === 3) {
        // console.log("Updating banner with paths:", imagePaths)
        const editBannerResponse = await editBanner(selectedBannerId, { imagePaths })
        // console.log("Edit banner response:", editBannerResponse)

        setSelectedFiles([])
        setIsEditing(false)
        setSelectedBannerId(null)

        toast({
          title: "Success",
          description: "Banner updated successfully",
          variant: "success",
        })

        await loadBanners()
      } else {
        throw new Error("No image paths returned from uploadImages")
      }
    } catch (error) {
      // console.error("Failed to update banner:", error)
      toast({
        title: "Error",
        description: "Failed to update banner. Please ensure exactly 3 valid images are selected.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      loadingRef.current = false
    }
  }

  const handleBannerUpload = async () => {
    if (selectedFiles.length !== 3) {
      toast({
        title: "Error",
        description: "Please select exactly 3 images",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("images", file)
      })

      // console.log("Uploading images...")
      const uploadResponse = await uploadImages(formData)
      // console.log("Upload response:", uploadResponse)
      const imagePaths = uploadResponse.data.imagePaths

      if (imagePaths && imagePaths.length === 3) {
        // console.log("Creating banner with paths:", imagePaths)
        const createBannerResponse = await createBanner({ imagePaths })
        // console.log("Create banner response:", createBannerResponse)

        if (createBannerResponse?.data) {
          setSelectedFiles([])
          toast({
            title: "Success",
            description: "Banners uploaded and created successfully",
            variant: "success",
          })

          await loadBanners()
        } else {
          throw new Error("Invalid response from create banner")
        }
      } else {
        throw new Error("No image paths returned from uploadImages")
      }
    } catch (error) {
      // console.error("Failed to upload or create banners:", error)
      toast({
        title: "Error",
        description: "Failed to upload or create banners. Please ensure exactly 3 valid images are selected.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      loadingRef.current = false
    }
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Banner Management</CardTitle>
            <CardDescription>Add and manage banners displayed to users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button variant="outline" size="sm" className="flex items-center w-fit" onClick={openFileSelector}>
                <Upload className="h-4 w-4 mr-2" /> Select Banners
              </Button>
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center bg-gray-100 rounded-md p-2 dark:bg-gray-700">
                      <span className="text-sm mr-2">{file.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeSelectedFile(index)} className="p-1">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleEditSubmit} disabled={selectedFiles.length !== 3} className="w-fit">
                    Update Banners
                  </Button>
                  <Button variant="outline" onClick={handleEditCancel} className="w-fit">
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={handleBannerUpload} disabled={selectedFiles.length !== 3} className="w-fit">
                  Upload Banners
                </Button>
              )}
            </div>
            <div className="mt-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader />
                </div>
              ) : banners.length > 0 ? (
                banners.map((bannerSet, setIndex) => (
                  <div key={bannerSet._id} className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">Banner Set {setIndex + 1}</h3>
                      <div className="flex">
                        <Button
                          variant="link"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleDeleteClick(bannerSet._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleEditClick(bannerSet._id)}
                          disabled={isEditing}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {bannerSet.imageUrl.map((banner, index) => (
                        <div key={index} className="border p-2 rounded-lg shadow-md">
                          <img
                            src={banner || "/placeholder.svg"}
                            alt={`Banner ${setIndex + 1}-${index + 1}`}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground min-h-[300px] flex flex-col items-center justify-center text-center py-8 text-muted-foreground">
                  <img src="/no_data_found.svg" width={420} height={420} alt="No banners found" />
                  No banners found. Upload some banners to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this banner?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the banner set.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:text-white dark:hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DefaultLayout>
  )
}

export default BannerManagement

'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Plus } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Card } from "@/components/ui/card"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Category, ApiResponse } from "./type"
import { Loader } from "@/components/ui/loader"
import { EditCategoryModal } from "./EditCategoryModal"



export default function CategoryList() {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteCategory, setDeleteCategory] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<{ id: string, name: string, imgUrl:string } | null>(null)
    const itemsPerPage = 10

    // Fallback image mapping
    const fallbackImages: Record<string, string> = {
        electronics: "public/shopping-icon.avif",
        fashion: "/fallback-fashion.jpg",
        books: "/fallback-books.jpg",
        groceries: "/fallback-groceries.jpg",
        default: "/backup.jpg", // Default fallback
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch('https://buyonmaps-api.onrender.com/api/v1/admin/categories')
            const data: ApiResponse = await response.json()

            if (data.response.status) {
                setCategories(data.data)
            } else {
                setError(data.response.message)
            }
        } catch (err) {
            setError('Failed to fetch categories')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteCategory = (id: string) => {
        setDeleteCategory(id)
    }

    const confirmDelete = async () => {
        if (deleteCategory) {
            // Here you would typically make an API call to delete the category
            // For now, we'll just update the local state
            setCategories(categories.filter((cat) => cat._id !== deleteCategory))
            setDeleteCategory(null)
        }
    }

    const getImageUrl = (categoryName: string, imageUrl: string | null | undefined) => {
        const fallbackImage = fallbackImages[categoryName.toLowerCase()] || fallbackImages.default
        return imageUrl || fallbackImage
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(categories.length / itemsPerPage)

    const handleUpdateSuccess = () => {
        fetchCategories()
        setIsEditModalOpen(false)
        setEditingCategory(null)
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 min-h-[400px] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
                <div className="container mx-auto p-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-500">{error}</div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card className='border-none shadow-2xl px-8 dark:bg-slate-800'>
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Category List</h1>
                    {/*                     <Button
                        variant="gradiant"
                        className="flex items-center"
                        disabled
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button> */}
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Created At</TableHead>
                            <TableHead className="text-center">Updated At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentCategories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell className="w-18">
                                    <div className="relative h-[50px] w-[50px]">
                                        <Image
                                            src={getImageUrl(category.name, category.imageUrl)}
                                            alt={category.name}
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="text-center">
                                    {new Date(category.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    {new Date(category.updatedAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setEditingCategory({ id: category._id, name: category.name,imgUrl:category.imageUrl })
                                            setIsEditModalOpen(true)
                                        }}
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit {category.name}</span>
                                    </Button>
                                    {/*                                     <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteCategory(category._id)}
                                        disabled
                                    >
                                        <Trash2 className="h-4 w-4 hover:text-red-600" />
                                        <span className="sr-only">Delete {category.name}</span>
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {totalPages > 1 && (
                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}

                <DeleteConfirmDialog
                    isOpen={deleteCategory !== null}
                    onClose={() => setDeleteCategory(null)}
                    onConfirm={confirmDelete}
                />
                <EditCategoryModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false)
                        setEditingCategory(null)
                    }}
                    categoryId={editingCategory?.id || null}
                    categoryName={editingCategory?.name || ''}
                    imgUrl={editingCategory?.imgUrl || ''}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            </div>
        </Card>
    )
}


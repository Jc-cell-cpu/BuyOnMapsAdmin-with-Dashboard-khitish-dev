'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Category } from "./type"

interface CategoryFormProps {
    categoryId?: number
}

export default function CategoryForm({ categoryId }: CategoryFormProps) {
    const router = useRouter()
    // In a real app, you would fetch the category data if categoryId is provided
    const category = categoryId ? {
        id: categoryId,
        name: "Example Category",
        image: "/placeholder.svg?height=50&width=50",
        updatedAt: new Date().toISOString(),
        fields: []
    } : undefined

    const [name, setName] = useState(category?.name ?? "")
    const [image, setImage] = useState<string>(category?.image ?? "")
    const [fields, setFields] = useState(category?.fields ?? [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would make an API call here
        console.log({
            name,
            image,
            fields,
        })

        // Navigate back to the category list
        router.push('/categories')
        router.refresh()
    }

    return (
        <>
            <CardHeader>
                <CardTitle>{categoryId ? 'Edit Category' : 'Add New Category'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter category name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/categories')}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {categoryId ? "Update" : "Create"}
                    </Button>
                </CardFooter>
            </form>
        </>
    )
}


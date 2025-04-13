import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import CategoryForm from "../../CategoryForm"

export default function ManageCategoryPage({
    searchParams,
}: {
    searchParams: { id?: string }
}) {
    // In a real app, you would fetch the category here
    // If the category doesn't exist and an ID was provided, show the not-found page
    if (searchParams.id && !isValidCategory(parseInt(searchParams.id))) {
        notFound()

    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CategoryForm categoryId={searchParams.id ? parseInt(searchParams.id) : undefined} />
            </Card>
        </div>
    )
}

// This would be replaced with a real database check in a production app
function isValidCategory(id: number): boolean {
    return id > 0 && id <= 2 // Our dummy data only has IDs 1 and 2
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewPermissionFormData } from "./permissions"
import { Plus } from "lucide-react"



interface NewPermissionDialogProps {
    onAdd: (permission: NewPermissionFormData) => void
}

export function NewPermissionDialog({ onAdd }: NewPermissionDialogProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<NewPermissionFormData>({
        id: "",
        label: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd(formData)
        setFormData({ id: "", label: "" })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="gradiant"> <Plus className="mr-2 h-4 w-4" /> Add Permission</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-700">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Permission</DialogTitle>
                        <DialogDescription>
                            Create a new permission that will be available for both free and premium users.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">
                                ID
                            </Label>
                            <Input
                                id="id"
                                value={formData.id}
                                onChange={(e) => setFormData((prev: any) => ({ ...prev, id: e.target.value }))}
                                className="col-span-3"
                                placeholder="unique-id"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="label" className="text-right">
                                Label
                            </Label>
                            <Input
                                id="label"
                                value={formData.label}
                                onChange={(e) => setFormData((prev: any) => ({ ...prev, label: e.target.value }))}
                                className="col-span-3"
                                placeholder="Permission Label"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Permission</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


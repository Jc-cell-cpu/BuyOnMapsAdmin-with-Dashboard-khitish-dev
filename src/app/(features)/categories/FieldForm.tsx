import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the field type
interface Field {
    type: string
    label: string
    options?: string[] // Optional because it's only for certain field types
}

// Define the props for the FieldForm component
interface FieldFormProps {
    onSubmit: (field: Field) => void
}

export default function FieldForm({ onSubmit }: FieldFormProps) {
    const [type, setType] = useState<string>("text")
    const [label, setLabel] = useState<string>("")
    const [options, setOptions] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const field: Field = { type, label }
        if (["radio", "checkbox"].includes(type)) {
            field.options = options.split(",").map((option) => option.trim())
        }
        onSubmit(field)
        setType("text")
        setLabel("")
        setOptions("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-end mb-4">
            <div>
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Field Label"
                    required
                />
            </div>
            {["radio", "checkbox"].includes(type) && (
                <div>
                    <Input
                        type="text"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                        placeholder="Options (comma-separated)"
                        required
                    />
                </div>
            )}
            <Button type="submit">Add Field</Button>
        </form>
    )
}

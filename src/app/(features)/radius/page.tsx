"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Lock, Shield } from 'lucide-react'
import { Feature } from "./permissions"
import { toast } from "@/hooks/use-toast"
import { NewPermissionDialog } from "./new-permission-dialog"
import DefaultLayout from "@/components/Layouts/DefaultLaout"

// Mock API function
const savePermissions = async (permissions: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
}

const defaultFeatures: Feature[] = [
    { id: "post", label: "Create Posts" },
    { id: "comment", label: "Leave Comments" },
    { id: "upload", label: "Upload Files" },
    { id: "analytics", label: "View Analytics" },
    { id: "support", label: "Priority Support" },
]

export default function PermissionManagement() {
    const [features, setFeatures] = useState<Feature[]>(defaultFeatures)
    const [freePermissions, setFreePermissions] = useState<string[]>(["post", "comment"])
    const [isLoading, setIsLoading] = useState(false)

    const handlePermissionChange = (permission: string) => {
        setFreePermissions(current =>
            current.includes(permission)
                ? current.filter(p => p !== permission)
                : [...current, permission]
        )
    }

    const handleAddPermission = (newPermission: Feature) => {
        setFeatures(current => [...current, newPermission])
        toast({
            title: "Permission Added",
            description: `New permission "${newPermission.label}" has been added.`,
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const result = await savePermissions(freePermissions)
            if (result.success) {
                toast({
                    title: "Success",
                    description: "Free user permissions have been successfully updated.",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update permissions. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Permission Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Configure and manage user access permissions
                        </p>
                    </div>
                    <NewPermissionDialog onAdd={handleAddPermission} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="dark:bg-slate-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle>Free User Permissions</CardTitle>
                                    <CardDescription>Configure features for free tier users</CardDescription>
                                </div>
                                <Shield className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {features.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                    >
                                        <Checkbox
                                            id={feature.id}
                                            checked={freePermissions.includes(feature.id)}
                                            onCheckedChange={() => handlePermissionChange(feature.id)}
                                        />
                                        <label
                                            htmlFor={feature.id}
                                            className="flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {feature.label}
                                            <Badge variant={freePermissions.includes(feature.id) ? "default" : "secondary"}>
                                                {freePermissions.includes(feature.id) ? "Enabled" : "Disabled"}
                                            </Badge>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="dark:bg-slate-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle>Permission Comparison</CardTitle>
                                    <CardDescription>Compare features across user tiers</CardDescription>
                                </div>
                                <Lock className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 pb-3">
                                    <div className="text-sm font-medium">Feature</div>
                                    <div className="text-center text-sm font-medium">Free</div>
                                    <div className="text-center text-sm font-medium">Premium</div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    {features.map((feature) => (
                                        <div key={feature.id} className="grid grid-cols-3 items-center">
                                            <span className="text-sm">{feature.label}</span>
                                            <span className="flex justify-center">
                                                {freePermissions.includes(feature.id) ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </span>
                                            <span className="flex justify-center">
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        {/* <CardFooter className="justify-between text-sm">
                            <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                                Free Tier
                            </div>
                            <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                                Premium Tier
                            </div>
                        </CardFooter> */}
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    )
}


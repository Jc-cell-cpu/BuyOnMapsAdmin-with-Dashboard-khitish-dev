'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera, Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { generateDummyActivities, formatDate } from '@/lib/utils'
import { AdminProfile } from './admin'
import { PasswordChangeModal } from './password-change-modal'
import { ActivityLog } from './activity-log'

// Dummy data
const adminData: AdminProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@admin.com",
  role: "Super Admin",
  contactNumber: "+1 (555) 123-4567",
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
  profileImage: "/placeholder.svg?height=200&width=200",
  twoFactorEnabled: false,
}

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [profile, setProfile] = useState(adminData)
  const [activities] = useState(() => generateDummyActivities(10))

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // In a real app, you would save the changes here
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file here
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profileImage: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Profile Overview Section */}
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              {/* <CardTitle>Profile</CardTitle> */}
              <CardDescription>
                Manage your profile information and settings
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10">
                    <Image
                      src={profile.profileImage}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="text-center">
                  <div className="font-medium">{profile.role}</div>
                  <div className="text-sm text-muted-foreground">
                    Last login: {formatDate(profile.lastLogin)}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                      id="contact"
                      value={profile.contactNumber}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, contactNumber: e.target.value }))
                      }
                    />
                  </div>
                </div>
                {isEditing && (
                  <Button type="submit" className="mt-4">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account security and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <Switch
              checked={profile.twoFactorEnabled}
              onCheckedChange={(checked) =>
                setProfile((prev) => ({ ...prev, twoFactorEnabled: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Password</div>
              <div className="text-sm text-muted-foreground">
                Change your account password
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setPasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Track your recent activities and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityLog activities={activities} />
        </CardContent>
      </Card>

      {/* Password Change Modal */}
      <PasswordChangeModal
        open={passwordModalOpen}
        onOpenChange={setPasswordModalOpen}
      />
    </div>
  )
}


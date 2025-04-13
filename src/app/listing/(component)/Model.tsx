// components/Modal.tsx
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader } from "@/components/ui/loader"
import { useState } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    details: any
}

export function Modal({ isOpen, onClose, details }: ModalProps) {
    if (!isOpen) return null
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[925px]">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 p-4 rounded-lg">
                    <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={details?.productMedia?.[0]} alt={details?.name} />
                            {/* <AvatarFallback>{details?.fullName.split(' ').map((n:any) => n[0]).join('')}</AvatarFallback> */}
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">{details?.name}</h3>
                            <p className="text-sm text-gray-500">{details?.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm font-bold text-blue-600">{details?.status}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">Property Type</p>
                            <p className="text-sm font-bold text-blue-600">{details?.propertyType}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">Looking For</p>
                            <p className="text-sm font-bold text-blue-600">{details?.lookingFor}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">Building Type</p>
                            <p className="text-sm font-bold text-blue-600">{details?.buildingType}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">No of Floors</p>
                            <p className="text-sm font-bold text-blue-600">{details?.floors}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <p className="text-sm font-medium">Material Used</p>
                            <p className="text-sm font-bold text-blue-600">{details?.materialUsed}</p>
                        </div>
                        {/* <div className="bg-purple-100 p-3 rounded-lg">
                                <p className="text-sm font-medium">Role</p>
                                <p className="text-sm font-bold text-purple-600">{details.role}</p>
                            </div> */}
                        {/* <div className="bg-green-100 p-3 rounded-lg">
                                <p className="text-sm font-medium">Subscriber</p>
                                <p className="text-sm font-bold text-green-600">{details?.subscriber ? 'Yes' : 'No'}</p>
                            </div> */}
                        {/* <div className="bg-yellow-100 p-3 rounded-lg">
                                <p className="text-sm font-medium">Phone</p>
                                <p className="text-sm font-bold text-yellow-600">{details?.phone}</p>
                            </div> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}








// import { useState, useEffect } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Loader } from "@/components/ui/loader"
// import { UserDetails } from '@/types/api';
// import { getUserDetails } from './Actions/users';

// interface UserDetailsModalProps {
//     userId: string | null;
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function UserDetailsModal({ userId, isOpen, onClose }: UserDetailsModalProps) {
//     const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState<string | null>(null)

//     useEffect(() => {
//         if (isOpen && userId) {
//             fetchUserDetails(userId)
//         }
//     }, [isOpen, userId])

//     const fetchUserDetails = async (id: string) => {
//         setIsLoading(true)
//         setError(null)
//         try {
//             const details = await getUserDetails(id)
//             setUserDetails(details)
//         } catch (err) {
//             setError('An error occurred while fetching user details')
//             console.error(err)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>User Details</DialogTitle>
//                 </DialogHeader>
//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-[300px]">
//                         <Loader />
//                     </div>
//                 ) : error ? (
//                     <div className="text-center text-red-500">{error}</div>
//                 ) : userDetails ? (
//                     <div className="grid gap-6 p-4 rounded-lg">
//                         <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm">
//                             <Avatar className="w-20 h-20">
//                                 <AvatarImage src={userDetails.profilePicture} alt={userDetails.fullName} />
//                                 <AvatarFallback>{userDetails.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <h3 className="text-lg font-semibold">{userDetails.fullName}</h3>
//                                 <p className="text-sm text-gray-500">{userDetails.email}</p>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="bg-blue-100 p-3 rounded-lg">
//                                 <p className="text-sm font-medium">Status</p>
//                                 <p className="text-sm font-bold text-blue-600">{userDetails.status}</p>
//                             </div>
//                             {/* <div className="bg-purple-100 p-3 rounded-lg">
//                                 <p className="text-sm font-medium">Role</p>
//                                 <p className="text-sm font-bold text-purple-600">{userDetails.role}</p>
//                             </div> */}
//                             <div className="bg-green-100 p-3 rounded-lg">
//                                 <p className="text-sm font-medium">Subscriber</p>
//                                 <p className="text-sm font-bold text-green-600">{userDetails.subscriber ? 'Yes' : 'No'}</p>
//                             </div>
//                             <div className="bg-yellow-100 p-3 rounded-lg">
//                                 <p className="text-sm font-medium">Phone</p>
//                                 <p className="text-sm font-bold text-yellow-600">{userDetails.phone}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : null}
//             </DialogContent>
//         </Dialog>
//     )
// }

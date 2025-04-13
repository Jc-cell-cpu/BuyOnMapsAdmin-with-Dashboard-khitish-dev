'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { approveListing, deleteListing, rejectListing, viewDetails } from '../actions'

import { Loader } from '@/components/ui/loader'
import { Modal } from './Model'

// interface ListingItemProps {
//     listing: {
//         id: string
//         name: string
//         productstatus: number
//         createdAt: string
//     }
// }

// type ActionType = 'approve' | 'reject' | 'delete' | 'view'

// export function ListingItem({ listing }: ListingItemProps) {
//     const [loadingActions, setLoadingActions] = useState<ActionType[]>([])
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [details, setDetails] = useState<any>(null)

//     const isActionLoading = (action: ActionType) => loadingActions.includes(action)

//     const handleAction = async (action: ActionType) => {
//         setLoadingActions(prev => [...prev, action])
//         try {
//             switch (action) {
//                 case 'approve':
//                     const response = await approveListing(listing)
//                     listing.productstatus = 1
//                     console.log(response)
//                     break
//                 case 'reject':
//                     const response1 = await rejectListing(listing)
//                     listing.productstatus = 2
//                     console.log(response1)
//                     break
//                 case 'delete':
//                     const response2 = await deleteListing(listing)
//                     console.log(response2)
//                     break
//                 case 'view':
//                     const response3 = await viewDetails(listing)
//                     console.log(response3)
//                     setDetails(response3?.data?.product)
//                     setIsModalOpen(true)
//                     break
//             }
//         } catch (error) {
//             console.error('Error:', error)
//         } finally {
//             setLoadingActions(prev => prev.filter(a => a !== action))
//         }
//     }

//     return (
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//                 <h2 className="text-lg font-semibold">{listing.name}</h2>
//                 <p className="text-sm text-gray-500">Status: {listing.productstatus === 1 ? 'Approved' : 'Rejected'}</p>
//                 <p className="text-sm text-gray-500">Created: {listing.createdAt}</p>
//             </div>
//             <div className="space-x-2">
//                 {listing.productstatus === 1 && (
//                     <Button
//                         onClick={() => handleAction('reject')}
//                         variant="destructive"
//                         disabled={isActionLoading('reject')}
//                     >
//                         {isActionLoading('reject') && <Loader size="small" showText={false} className="mr-2" />}
//                         Reject
//                     </Button>
//                 )}
//                 {listing.productstatus === 2 && (
//                     <Button
//                         onClick={() => handleAction('approve')}
//                         disabled={isActionLoading('approve')}
//                     >
//                         {isActionLoading('approve') && <Loader size="small" showText={false} className="mr-2" />}
//                         Approve
//                     </Button>
//                 )}
//                 <Button
//                     onClick={() => handleAction('delete')}
//                     variant="outline"
//                     disabled={isActionLoading('delete')}
//                 >
//                     {isActionLoading('delete') && <Loader size="small" showText={false} className="mr-2" />}
//                     Delete
//                 </Button>
//                 <Button
//                     onClick={() => handleAction('view')}
//                     variant="outline"
//                     disabled={isActionLoading('view')}
//                 >
//                     {isActionLoading('view') && <Loader size="small" showText={false} className="mr-2" />}
//                     View Details
//                 </Button>
//             </div>
//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 details={details}
//             />
//         </div>
//     )
// }

interface ListingItemProps {
    listing: {
        id: string
        name: string
        productstatus: number
        createdAt: string
    }
    onDelete: (id: string) => void
}

type ActionType = 'approve' | 'reject' | 'delete' | 'view'

export function ListingItem({ listing, onDelete }: ListingItemProps) {
    const [loadingActions, setLoadingActions] = useState<ActionType[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [details, setDetails] = useState<any>(null)

    const isActionLoading = (action: ActionType) => loadingActions.includes(action)

    const handleAction = async (action: ActionType) => {
        setLoadingActions(prev => [...prev, action])
        try {
            switch (action) {
                case 'approve':
                    const response = await approveListing(listing)
                    listing.productstatus = 1
                    console.log(response)
                    break
                case 'reject':
                    const response1 = await rejectListing(listing)
                    listing.productstatus = 2
                    console.log(response1)
                    break
                case 'delete':
                    const response2 = await deleteListing(listing)
                    console.log(response2)
                    onDelete(listing.id) // Notify parent component to update the list
                    break
                case 'view':
                    const response3 = await viewDetails(listing)
                    console.log(response3)
                    setDetails(response3?.data?.product)
                    setIsModalOpen(true)
                    break
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoadingActions(prev => prev.filter(a => a !== action))
        }
    }

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
                <h2 className="text-lg font-semibold">{listing.name}</h2>
                <p className="text-sm text-gray-500">Status: {listing.productstatus === 1 ? 'Approved' : 'Rejected'}</p>
                <p className="text-sm text-gray-500">Created: {listing.createdAt}</p>
            </div>
            <div className="space-x-2">
                {listing.productstatus === 1 && (
                    <Button
                        onClick={() => handleAction('reject')}
                        variant="destructive"
                        disabled={isActionLoading('reject')}
                    >
                        {isActionLoading('reject') && <Loader size="small" showText={false} className="mr-2" />}
                        Reject
                    </Button>
                )}
                {listing.productstatus === 2 && (
                    <Button
                        onClick={() => handleAction('approve')}
                        disabled={isActionLoading('approve')}
                    >
                        {isActionLoading('approve') && <Loader size="small" showText={false} className="mr-2" />}
                        Approve
                    </Button>
                )}
                <Button
                    onClick={() => handleAction('delete')}
                    variant="outline"
                    disabled={isActionLoading('delete')}
                >
                    {isActionLoading('delete') && <Loader size="small" showText={false} className="mr-2" />}
                    Delete
                </Button>
                <Button
                    onClick={() => handleAction('view')}
                    variant="outline"
                    disabled={isActionLoading('view')}
                >
                    {isActionLoading('view') && <Loader size="small" showText={false} className="mr-2" />}
                    View Details
                </Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                details={details}
            />
        </div>
    )
}

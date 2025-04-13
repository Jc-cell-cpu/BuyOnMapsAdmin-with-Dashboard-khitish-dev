'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'

interface ListingDetails {
    id: string
    name: string
    description: string
    price: string
    location: string
    amenities: string[]
    host: string
    createdAt: string
}

export function ListingDetailsModal({ listing }: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [listingDetails, setListingDetails] = useState<ListingDetails | null>(null)

    const openModal = async (listingId: string) => {
        const details = await fetchListingDetails(listingId)
        setListingDetails(details)
        setIsOpen(true)
    }

    const fetchListingDetails = async (id: string): Promise<ListingDetails> => {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
            id,
            name: 'Sample Listing',
            description: 'This is a sample listing description.',
            price: '$100/night',
            location: 'Sample City, Country',
            amenities: ['WiFi', 'Kitchen', 'Parking'],
            host: 'John Doe',
            createdAt: '2023-01-01',
        }
    }

    return (
        // <Card>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{listingDetails?.name || 'Loading...'}</DialogTitle>
                </DialogHeader>
                {listingDetails && (
                    <div className="mt-4">
                        <p><strong>Description:</strong> {listingDetails.description}</p>
                        <p><strong>Price:</strong> {listingDetails.price}</p>
                        <p><strong>Location:</strong> {listingDetails.location}</p>
                        <p><strong>Amenities:</strong> {listingDetails.amenities.join(', ')}</p>
                        <p><strong>Host:</strong> {listingDetails.host}</p>
                        <p><strong>Created At:</strong> {listingDetails.createdAt}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
        // </Card>
    )
}

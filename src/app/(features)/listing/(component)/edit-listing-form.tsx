'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateListing } from '../actions'


export function EditListingForm() {
    const [isOpen, setIsOpen] = useState(false)
    const [listingData, setListingData] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
    })

    const openModal = (listingId: string) => {
        // Fetch listing data here and set it to state
        setListingData({
            id: listingId,
            title: 'Sample Title',
            description: 'Sample Description',
            price: '100',
        })
        setIsOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateListing(listingData.id, listingData)
            setIsOpen(false)
        } catch (error) {
            console.error('Error updating listing:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setListingData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Listing</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={listingData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={listingData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            value={listingData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit">Update Listing</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}


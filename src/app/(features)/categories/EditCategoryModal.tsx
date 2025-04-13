'use client'

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCategory, uploadImage } from './categories';


interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: string | null;
    categoryName: string;
    imgUrl:string;
    onUpdateSuccess?: (updatedCategory: any) => void;
}

export function EditCategoryModal({ isOpen, onClose, categoryId, categoryName, imgUrl, onUpdateSuccess }: EditCategoryModalProps) {
    const [name, setName] = useState(categoryName);
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setImageURL(imgUrl);
        setName(categoryName);
    }, [categoryName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!categoryId) {
                throw new Error("Category ID is required");
            }

            let imagePath = null;
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                    imagePath = await uploadImage(formData);
                    // console.log('Image upload response:', imagePath);
                } catch (error) {
                    // console.error('Error uploading image:', error);
                    throw new Error('Failed to upload image. Please try again.');
                }
            }

            const updatedCategory = await updateCategory(categoryId, {
                name: name,
                imageUrl: imagePath || imageURL
            });

            // console.log("Category updated successfully:", updatedCategory);
            onClose();
            onUpdateSuccess && onUpdateSuccess(updatedCategory);
        } catch (error) {
            // console.error("Error in handleSubmit:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImageURL(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                Category Name
                            </label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-2">
                                Category Image
                            </label>
                            <Input
                                id="image"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                        {imageURL && (
                            <div>
                                <img src={imageURL || "/placeholder.svg"} alt="Selected category image" className="max-w-xs rounded-md" />
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


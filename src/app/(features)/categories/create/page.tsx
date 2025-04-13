"use client";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import InputGroup from "@/components/FormElements/InputGroup";

const CreateCategory: React.FC = () => {
  // State types
  const [categoryName, setCategoryName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const token = localStorage.getItem("authToken");

  const uploadImage = async (imageFile: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "https://buyonmaps-api.onrender.com/api/v1/upload/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok && result.data?.imagePath) {
        return result.data.imagePath;
      } else {
        console.error(
          "Image upload failed:",
          result.response?.message || "Unknown error",
        );
        alert(
          `Image upload failed: ${result.response?.message || "Unknown error"}`,
        );
        return null;
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("An error occurred during image upload. Please try again.");
      return null;
    }
  };

  const createCategory = async (name: string, imageUrl: string | null) => {
    try {
      const response = await fetch(
        "https://buyonmaps-api.onrender.com/api/v1/admin/categories/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, imageUrl }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Category created successfully!");
        console.log("Category Name:", name);
        console.log("Uploaded Image URL:", imageUrl);
        resetForm();
      } else {
        console.error("Error creating category:", result);
        alert(`Error creating category: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during category creation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageURL = imageURL;

      if (file) {
        uploadedImageURL = await uploadImage(file);
        if (!uploadedImageURL) {
          setLoading(false);
          return;
        }
        setImageURL(uploadedImageURL);
      }

      await createCategory(categoryName, uploadedImageURL);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setFile(null);
    setImageURL(null);
  };

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCategoryName(e.target.value);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Categories" />
      <div>
        <div className="flex flex-col gap-9">
          {/* Contact Form */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Create Categories
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* <input
                  // label="Category Name"
                  type="text"
                  placeholder="Enter Category Name"
                  // customClasses="mb-4.5"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                /> */}
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Category Name"
                    className="w-full rounded-[7px] border-[1.5px] border-primary bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white"
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                  />
                </div>
                <br />

                <div className="mb-4.5">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Select Your Form
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-dark-2">
                    <select
                      value={selectedOption}
                      onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${
                        isOptionSelected ? "text-dark dark:text-white" : ""
                      }`}
                    >
                      <option value="" disabled className="text-dark-6">
                        Select your form
                      </option>
                      <option value="USA" className="text-dark-6">
                        Electronics
                      </option>
                      <option value="UK" className="text-dark-6">
                        Dress
                      </option>
                      <option value="Canada" className="text-dark-6">
                        Furnitures
                      </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Attach file
                  </label>
                  <input
                    type="file"
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    onChange={handleFileChange}
                  />
                </div>
                {/* Centered Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`rounded-full bg-primary px-10 py-3.5 text-white lg:px-8 xl:px-10 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateCategory;

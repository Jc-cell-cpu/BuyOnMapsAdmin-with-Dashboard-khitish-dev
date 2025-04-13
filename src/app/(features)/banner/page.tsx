"use client"

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const BannerManagement = () => {
  const [banners, setBanners] = useState<string[]>([
    "https://buyonmaps-bucket.s3.ap-south-1.amazonaws.com/static/uploads/677cb208ff423c1383ccca72/e001988ca682f744377555872035c55d.png",
    "https://buyonmaps-bucket.s3.ap-south-1.amazonaws.com/static/uploads/677cb208ff423c1383ccca72/ba0bc3b5bd5cc4c15f925820b5931256.png",
    "https://buyonmaps-bucket.s3.ap-south-1.amazonaws.com/static/uploads/677cb208ff423c1383ccca72/dfac192a14b03b0d1517f5deceb7c03d.png"
  ]);
  const { toast } = useToast();

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const newBannerUrl = URL.createObjectURL(files[0]);
      setBanners([...banners, newBannerUrl]);
      toast({
        title: "Success",
        description: "Banner added successfully",
        variant: "default",
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Banner Management</CardTitle>
            <CardDescription>
              Add and manage banners displayed to users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="bannerUpload"
                onChange={handleBannerUpload}
              />
              <label htmlFor="bannerUpload">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" /> Add Banner
                </Button>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {banners.map((banner, index) => (
                <div key={index} className="border p-2 rounded-lg shadow-md">
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default BannerManagement;

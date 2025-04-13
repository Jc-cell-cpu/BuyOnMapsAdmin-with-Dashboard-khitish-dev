'use client';

import { Suspense, useState, useEffect } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import { ListingItem } from './(component)/listing-items';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from './(component)/pagination';
import { Loader } from '@/components/ui/loader';
import { fetchListings } from './actions';
// import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, UserCog, Users } from 'lucide-react';
import ReportDownloadPage from '@/components/Reports/Reportdownload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';



export default function Listing() {
  const [listings, setListings] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const page = currentPage;
  // const router = useRouter()
  const limit = 10;

  const loadListings = async () => {
    // page1 = page;
    setLoading(true);
    try {
      const fetchedListings = await fetchListings(page, limit);
      setListings(fetchedListings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [currentPage]);

  const handleDelete = (id: string) => {
    // const params = new URLSearchParams(searchParams)
    // params.set('page', '1')
    // router.push(`?${params.toString()}`)
    setCurrentPage(1)
    // loadListings();
    // setListings((prev:any) => prev.filter(listing => listing._id !== id));
  };

  const handleNextPage = () => {
    if (listings?.data?.meta && currentPage < listings?.data?.meta.totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <DefaultLayout>
        <Loader />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Tabs defaultValue="accounts" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="dark:bg-slate-800">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Posts
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Post Report
            </TabsTrigger>
            {/* <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger> */}
          </TabsList>
        </div>
      <TabsContent value="accounts" className="space-y-4">

        <Card className='border-none shadow-2xl px-8 dark:bg-slate-800'>
          <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Listings</h1>
            <div className="space-y-4">
              {listings?.data?.posts.map((listing: any) => (
                <Suspense key={listing._id} fallback={<Loader />}>
                  <ListingItem listing={listing} onDelete={handleDelete} />
                </Suspense>
              ))}
            </div>
            {/* <Pagination currentPage={page} totalPages={listings?.data?.meta?.totalPages} /> */}

            {listings?.data?.meta && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Page {listings?.data?.meta?.currentPage} of {listings?.data?.meta?.totalPages} ({listings?.data?.meta?.totalPosts} users)
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={listings?.data?.meta && currentPage >= listings?.data?.meta?.totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="activity" className="space-y-4">
          <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
            <CardContent>
              <div className="ml-45">
                <ReportDownloadPage isUser={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DefaultLayout>
  );
}

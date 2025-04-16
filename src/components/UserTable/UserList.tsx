"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { UserCog, Users, CreditCard, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { mockActivities, mockSubscriptions } from "@/lib/mock-data";
import { Switch } from "../ui/switch";
import { fetchUsers, toggleUserStatus } from "./Actions/users";
import { PaginationMeta, User } from "@/types/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { UserDetailsModal } from "./user-profile-modal";
import ReportDownloadPage from "../Reports/Reportdownload";
import Image from "next/image";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleRowClick = (userId: string) => {
    if (userId) {
      setSelectedUserId(userId);
      setIsModalOpen(true);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    try {
      setIsLoading(true);
      await toggleUserStatus(userId);
      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, status: currentStatus === "active" ? "inactive" : "active" }
            : user
        )
      );
      toast({
        title: "Success",
        description: `User status updated successfully`,
        variant: "success",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update user status";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: currentStatus } : user
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchUsers(currentPage);
        setUsers(data.data.users);
        setMeta(data.data.meta);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load users";
        setError(message);

        if (message === "Unauthorized access" || message === "Authentication token not found") {
          toast({
            title: "Authentication Error",
            description: "Please log in to access this page",
            variant: "destructive",
          });
          router.push("/auth/signin");
        } else {
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, router, toast]);

  const handleNextPage = () => {
    if (meta && currentPage < meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="accounts" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="dark:bg-slate-800">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Accounts
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              User Report
            </TabsTrigger>
            {/* <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger> */}
          </TabsList>
        </div>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>
                Manage user accounts, edit details, and control access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* {error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
              ) : ( */}
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Subscriber</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24">
                          <Loader />
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <Image
                              src="/no_data_found.svg"
                              alt="No data available"
                              width={320}
                              height={320}
                              className="mb-4"
                            />
                            <p className="text-lg">No data available</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users?.map((user) => (
                        <TableRow
                          key={user.id}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          <TableCell
                            onClick={() => user.id && handleRowClick(user.id)}
                            className="font-medium"
                          >
                            {user.fullName || "N/A"}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="text-center">
                            {user.subscriber ? (
                              <Check className="h-5 w-5 bg-green-600 rounded-full p-1 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 bg-red-600 rounded-full p-1 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={user.status === "active"}
                              onCheckedChange={() => {
                                if (user.id && user.status) {
                                  handleStatusToggle(user.id, user.status);
                                }
                              }}
                              disabled={isLoading}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {meta && (
                  <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      Page {meta.currentPage} of {meta.totalPages} ({meta.totalUsers}{" "}
                      users)
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
                        disabled={meta && currentPage >= meta.totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
              {/* )} */}
            </CardContent>
          </Card>
        </TabsContent>
        <UserDetailsModal
          userId={selectedUserId || ""}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <TabsContent value="activity" className="space-y-4">
          <Card className="border-none shadow-2xl px-8 dark:bg-slate-800">
            <CardContent>
              <div className="ml-45">
                <ReportDownloadPage isUser={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
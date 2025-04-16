"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import { fetchAppointments, getCounts } from "./appointment"
import { Loader } from "@/components/ui/loader"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

// Types for our appointments
type AppointmentStatus = "" | "booked" | "cancelled" | "rebooked"

interface AppointmentCount {
    all: number
    booked: number
    cancelled: number
    rebooked: number
}

export default function AppointmentsList() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [meta, setMeta] = useState<any | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const router = useRouter()
    const [appointmentCount, setAppointmentCount] = useState<AppointmentCount>({
        all: 0,
        booked: 0,
        cancelled: 0,
        rebooked: 0
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingList, setIsLoadingList] = useState(true)
    // const [appointments, setAppointments] = useState<any[]>([])
    const [statusFilter, setStatusFilter] = useState<any>("all")

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true); // Show the loader for the initial load
                const countData = await getCounts(); // Fetch counts
                setAppointmentCount(countData.data.appointmentCount);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to load initial data';
                console.error(message);
            } finally {
                setIsLoading(false); // Hide the loader after the initial data is fetched
            }
        };

        loadInitialData();
    }, []); // Runs only on the initial render

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setIsLoadingList(true); // Show loader for the list
                const appointmentsData = await fetchAppointments(statusFilter, currentPage);
                setAppointments(appointmentsData.data.appointments);
                setMeta(appointmentsData.data.meta);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to load appointments';
                console.error(message);
            } finally {
                setIsLoadingList(false); // Hide the loader for the list
            }
        };

        loadAppointments();
    }, [statusFilter, currentPage]); // Runs whenever `currentPage` changes

    const handleNextPage = () => {
        if (meta && currentPage < meta.totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    // Calculate counts
    console.log(appointmentCount);
    console.log(appointments);
    console.log(meta);
    const totalAppointments = appointmentCount.all
    const bookedCount = appointmentCount.booked
    const cancelledCount = appointmentCount.cancelled
    const rebookedCount = appointmentCount.rebooked

    // Get appropriate badge color based on status
    const getStatusBadgeColor = (status: AppointmentStatus) => {
        switch (status) {
            case "booked":
                return "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
            case "cancelled":
                return "bg-red-500 hover:bg-red-600 dark:bg-red-500  dark:hover:bg-red-600"
            case "rebooked":
                return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            default:
                return "bg-gray-500 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
        }
    }

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4 space-y-6">
                {/* Summary Cards */}
                {isLoading ? (
                    <Card className="dark:bg-slate-800 py-10">
                        <div className="text-2xl font-bold"><Loader /></div>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card className="dark:bg-slate-800">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Appointments
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalAppointments}</div>


                            </CardContent>
                        </Card>
                        <Card className="dark:bg-slate-800">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Booked</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{bookedCount}</div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-slate-800">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-slate-800">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Rebooked</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{rebookedCount}</div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Filter and List */}
                <Card className="dark:bg-slate-800">
                    <CardHeader className="dark:bg-slate-800">
                        <CardTitle>Appointments</CardTitle>
                        <CardDescription>Manage your appointments here</CardDescription>
                        <div className="mt-4 w-[200px] dark:bg-slate-800">
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => {
                                    setCurrentPage(1); // Reset to the first page
                                    setStatusFilter(value); // Update the status filter
                                }
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Appointments</SelectItem>
                                    <SelectItem value="booked">Booked</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="rebooked">Rebooked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    {isLoadingList ? (
                        <CardContent>
                            <div className="text-2xl font-bold"><Loader /></div>
                        </CardContent>
                    ) : (
                        <CardContent>
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div
                                        key={appointment?._id}
                                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg space-y-4 md:space-y-0"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4" />
                                                <span className="font-medium">{appointment?.bookedBy?.fullName}</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{dayjs(appointment?.startTime).format('DD-MMM-YYYY HH-MM ')}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{dayjs(appointment?.endTime).format('DD-MMM-YYYY HH-MM ')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 w-full md:w-auto">
                                            <Badge
                                                className={`${getStatusBadgeColor(
                                                    appointment?.cancelled ? 'cancelled' : appointment?.rebooked ? 'rebooked' : (!appointment?.rebooked && !appointment?.rebooked) ? 'booked' : ''
                                                )} text-white`}
                                            >
                                                {appointment?.cancelled ? 'Cancelled' : appointment?.rebooked ? 'Rebooked' : (!appointment?.rebooked && !appointment?.rebooked) ? 'Booked' : ''}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    )
                    }

                    <CardContent>
                        {meta && (
                            <div className="flex items-center justify-between space-x-2 py-4">
                                <div className="text-sm text-muted-foreground">
                                    Page {meta?.currentPage} of {meta?.totalPages} ({meta?.totalAppointments} users)
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
                                        disabled={meta && currentPage >= meta?.totalPages}
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card >
            </div >
        </DefaultLayout >
    )
}


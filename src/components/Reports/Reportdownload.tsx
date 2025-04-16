"use client";

import type React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { generateReport } from "./generateReport";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ReportProps {
    isUser: boolean;
}

export default function ReportDownloadPage({ isUser }: ReportProps) {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [isSubscriber, setIsSubscriber] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError("Please select both start and end dates");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await generateReport(startDate, endDate, isSubscriber, isUser);

            // Create a new workbook
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Report");

            if (isUser) {
                // Process product data
                const finalData = data.data.allPosts.map((x: any) => ({
                    ...x,
                    price: x?.price?.value,
                    productMedia: x.productMedia.join(","),
                }));

                // Define columns (optional, for headers)
                worksheet.columns = Object.keys(finalData[0]).map((key) => ({
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    key,
                    width: 20,
                }));

                // Add rows
                finalData.forEach((row: any) => {
                    worksheet.addRow(row);
                });

                // Generate buffer
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });

                // Save file
                saveAs(
                    blob,
                    `Product_report_${format(startDate, "yyyyMMdd")}_${format(endDate, "yyyyMMdd")}.xlsx`
                );
            } else {
                // Process user data
                const userData = data.data.userList;

                // Define columns
                worksheet.columns = Object.keys(userData[0]).map((key) => ({
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    key,
                    width: 20,
                }));

                // Add rows
                userData.forEach((row: any) => {
                    worksheet.addRow(row);
                });

                // Generate buffer
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });

                // Save file
                saveAs(
                    blob,
                    `User_report_${format(startDate, "yyyyMMdd")}_${format(endDate, "yyyyMMdd")}_${isSubscriber ? "subscribers" : "unsubscribers"}.xlsx`
                );
            }
        } catch (error) {
            console.error("Error generating report:", error);
            setError("Failed to generate report. Please try again or contact support.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Download Report</h1>
            {error && (
                <Alert variant="destructive" className="mb-4 bg-red-300">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleDownload} className="flex items-center space-x-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`w-[140px] justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "dd/MM/yyyy") : <span>Start Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`w-[140px] justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "dd/MM/yyyy") : <span>End Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                </Popover>
                {!isUser && (
                    <div className="flex items-center space-x-2">
                        <Switch id="subscriber-switch" checked={isSubscriber} onCheckedChange={setIsSubscriber} />
                        <Label htmlFor="subscriber-switch">{isSubscriber ? "Subscribers" : "Unsubscribers"}</Label>
                    </div>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Download Report"}
                </Button>
            </form>
        </div>
    );
}
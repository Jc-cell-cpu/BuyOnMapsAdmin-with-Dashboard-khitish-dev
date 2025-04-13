"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Filter } from 'lucide-react'
import { useState } from "react"
import { DateRange } from "react-day-picker"

export function TransactionFilters() {
    const [date, setDate] = useState<DateRange | undefined>()
    const [statuses, setStatuses] = useState<string[]>(["completed", "pending", "failed"])

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Search transactions..."
                    className="max-w-[300px] dark:bg-slate-800"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:bg-slate-800" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] dark:bg-slate-800">
                        <DropdownMenuCheckboxItem
                            checked={statuses.includes("completed")}
                            onCheckedChange={(checked) =>
                                setStatuses(
                                    checked
                                        ? [...statuses, "completed"]
                                        : statuses.filter((s) => s !== "completed")
                                )
                            }
                        >
                            Completed
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statuses.includes("pending")}
                            onCheckedChange={(checked) =>
                                setStatuses(
                                    checked
                                        ? [...statuses, "pending"]
                                        : statuses.filter((s) => s !== "pending")
                                )
                            }
                        >
                            Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statuses.includes("failed")}
                            onCheckedChange={(checked) =>
                                setStatuses(
                                    checked
                                        ? [...statuses, "failed"]
                                        : statuses.filter((s) => s !== "failed")
                                )
                            }
                        >
                            Failed
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[250px] justify-start text-left font-normal dark:bg-slate-800">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {date.from.toDateString()} - {date.to.toDateString()}
                                    </>
                                ) : (
                                    date.from.toDateString()
                                )
                            ) : (
                                <span>Pick a date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="dark:bg-slate-800">Export</Button>
                <Button>Generate Report</Button>
            </div>
        </div>
    )
}


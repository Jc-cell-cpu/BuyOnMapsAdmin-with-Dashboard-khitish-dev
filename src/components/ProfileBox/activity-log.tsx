'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Activity } from './admin'
import { formatDate } from '@/lib/utils'


export function ActivityLog({ activities }: { activities: Activity[] }) {
    const [filter, setFilter] = useState<string>('all')
    const [search, setSearch] = useState('')

    const filteredActivities = activities.filter(activity => {
        const matchesFilter = filter === 'all' || activity.type === filter
        const matchesSearch = activity.description.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs dark:bg-slate-900 dark:border-slate-400"
                    />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px] dark:bg-slate-900 dark:border-slate-400">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Activities</SelectItem>
                        <SelectItem value="approval">Approvals</SelectItem>
                        <SelectItem value="moderation">Moderation</SelectItem>
                        <SelectItem value="settings">Settings</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredActivities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>{formatDate(activity.date)}</TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell className="capitalize">{activity.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


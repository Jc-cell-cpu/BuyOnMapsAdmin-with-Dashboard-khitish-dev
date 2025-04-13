import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CheckCircle2, Clock, DollarSign, XCircle } from 'lucide-react'

interface TransactionStatsProps {
    stats: {
        total: number
        completed: number
        pending: number
        failed: number
        todayTotal: number
        todayCount: number
    }
}

export function TransactionStats({ stats }: TransactionStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${stats.total.toLocaleString()}</div>
                    {/* <ArrowUp className="h-3 w-3 text-green-500" /> */}
                    <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">+{stats.todayTotal.toLocaleString()}</span> today ({stats.todayCount} transactions)
                    </p>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.completed.toLocaleString()}</div>
                    <div className="flex items-center pt-1">
                        <ArrowUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">92.6%</span>
                        <span className="text-xs text-muted-foreground ml-1">Success rate</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pending.toLocaleString()}</div>
                    <div className="flex items-center pt-1">
                        <ArrowDown className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-orange-500">5.2%</span>
                        <span className="text-xs text-muted-foreground ml-1">Awaiting completion</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Failed</CardTitle>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.failed.toLocaleString()}</div>
                    <div className="flex items-center pt-1">
                        <ArrowDown className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-500">2.2%</span>
                        <span className="text-xs text-muted-foreground ml-1">Failure rate</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


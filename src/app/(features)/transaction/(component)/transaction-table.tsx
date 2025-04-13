"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface Transaction {
    id: string
    seller: string
    amount: number
    status: string
    date: string
    customer: string
    items: number
}

interface TransactionTableProps {
    transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <div className="rounded-md border dark:bg-slate-800">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.seller}</TableCell>
                            <TableCell>{transaction.customer}</TableCell>
                            <TableCell>{transaction.items}</TableCell>
                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        transaction.status === "completed"
                                            ? "success"
                                            : transaction.status === "pending"
                                                ? "warning"
                                                : "destructive"
                                    }
                                >
                                    {transaction.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:hover:bg-slate-700">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem>View seller profile</DropdownMenuItem>
                                        <DropdownMenuItem>Contact customer</DropdownMenuItem>
                                        {transaction.status === "pending" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Approve transaction</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Reject transaction
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


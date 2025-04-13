import DefaultLayout from "@/components/Layouts/DefaultLaout"
import { TransactionFilters } from "./(component)/transaction-filters"
import { TransactionStats } from "./(component)/transaction-stats"
import { TransactionTable } from "./(component)/transaction-table"


export default async function Transaction() {
    // In a real app, you would fetch this data from your database
    const transactions = await getTransactions()
    const stats = await getTransactionStats()

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
                    <p className="text-muted-foreground">
                        View and manage all transactions from sellers on your platform.
                    </p>
                </div>
                <TransactionStats stats={stats} />
                <TransactionFilters />
                <TransactionTable transactions={transactions} />
            </div>
        </DefaultLayout>
    )
}

// Mock data functions - replace with actual API calls
async function getTransactions() {
    return [
        {
            id: "TX123",
            seller: "John's Electronics",
            amount: 299.99,
            status: "completed",
            date: "2024-01-07",
            customer: "Alice Brown",
            items: 3,
        },
        // ... more transactions
    ]
}

async function getTransactionStats() {
    return {
        total: 45890,
        completed: 42500,
        pending: 2390,
        failed: 1000,
        todayTotal: 1234,
        todayCount: 156,
    }
}


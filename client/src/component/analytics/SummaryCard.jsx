import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SummaryCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-linear-to-r from-white to-(--primary)/10 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-muted-foreground">Total Products</div>
        <div className="text-2xl font-extrabold mt-2">{data.totalProducts}</div>
      </div>

      <div className="bg-linear-to-r from-white to-(--accent)/10 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-muted-foreground">Total Inventory Value</div>
        <div className="text-2xl font-extrabold mt-2">₹ {data.totalInventoryValue.toLocaleString()}</div>
      </div>

      <div className="bg-white/10 rounded-lg p-4 shadow-sm border-l-4 border-yellow-400">
        <div className="text-sm text-muted-foreground">Low Stock Items</div>
        <div className="text-2xl font-extrabold mt-2 text-yellow-600">{data.lowStockCount}</div>
      </div>

      <div className="bg-white/10 rounded-lg p-4 shadow-sm border-l-4 border-red-500">
        <div className="text-sm text-muted-foreground">Out of Stock</div>
        <div className="text-2xl font-extrabold mt-2 text-red-600">{data.outOfStockCount}</div>
      </div>
    </div>
  )
}

export default SummaryCard

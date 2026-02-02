import { Badge } from "@/components/ui/badge"

const StockBadge = (stock, minStock) => {

    if (stock === 0) {
        return (
            <Badge className="px-3 py-1 rounded-full bg-linear-to-r from-red-200 to-red-300 text-red-800 font-semibold">
                Out of stock
            </Badge>
        )
    }

    if (stock > 0 && stock <= minStock) {
        return (
            <Badge className="px-3 py-1 rounded-full bg-linear-to-r from-yellow-200 to-yellow-300 text-yellow-800 font-semibold">
                Low stock
            </Badge>
        )
    }

    return (
        <Badge className="px-3 py-1 rounded-full bg-linear-to-r from-green-200 to-green-300 text-green-800 font-semibold">
            In stock
        </Badge>
    )
}

export default StockBadge
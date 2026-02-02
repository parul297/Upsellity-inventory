


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import StockBadge from "../products/StockBadge"

const ProductStockTable = ({ products, title }) => {
  return (
    <div className="bg-card rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {products.length === 0 ? (
        <p className="text-muted-foreground">No products 🎉</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between bg-background/50 p-3 rounded-lg">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">SKU: {p.sku}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold">{p.stock}</div>
                <div>{StockBadge(p.stock, p.minStock)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductStockTable

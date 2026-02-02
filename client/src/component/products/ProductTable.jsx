import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import StockBadge from "./StockBadge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

const ProductTable = ({ products = [], onDelete }) => {

    if (!products.length) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No products found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <Card key={product.id} className="transform transition hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                        <div className="flex items-start justify-between w-full gap-4">
                            <div>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription>{product.sku}</CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-muted-foreground">Price</div>
                                <div className="font-semibold">₹ {product.price}</div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <div className="text-sm text-muted-foreground">Stock</div>
                                <div className="font-medium">{product.stock}</div>
                                {StockBadge(product.stock, product.minStock)}
                            </div>

                            <div className="text-sm text-muted-foreground">Min: {product.minStock || '-'}</div>
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">{product.description || 'No description available.'}</p>
                    </CardContent>

                    <CardFooter>
                        <div className="ml-auto flex gap-2">
                            <Link to={`/product/${product.id}`}>
                                <Button variant="outline" size="sm">View</Button>
                            </Link>
                            <Button onClick={() => onDelete(product.id)} variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default ProductTable;

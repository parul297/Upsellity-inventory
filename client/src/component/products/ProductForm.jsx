import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { addProduct, updateProduct } from "@/api/productApi"

const ProductForm = ({ open, setOpen, mode, initialData }) => {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        stock: "",
        minStock: ""
    })

    useEffect(() => {
        if (mode === "update" && initialData) {
            setFormData(initialData)
        }
    }, [mode, initialData])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.sku || !formData.price) {
            alert("Title, SKU and Price are mandatory")
            return
        }

        setOpen(false)
        await addProduct(formData)
        window.location.reload()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.sku || !formData.price) {
            alert("Title, SKU and Price are mandatory")
            return
        }

        setOpen(false)
        await updateProduct(initialData.id, formData)
        window.location.reload()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" ? "Add New Product" : "Update Product"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={mode === "add" ? handleSubmit : handleUpdate}
                    className="space-y-4 mt-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label>Product Title</Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>SKU</Label>
                        <Input
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Stock</Label>
                        <Input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Minimum Stock</Label>
                        <Input
                            type="number"
                            name="minStock"
                            value={formData.minStock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {mode === "add" ? "Add Product" : "Update Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export { ProductForm }
export default ProductForm

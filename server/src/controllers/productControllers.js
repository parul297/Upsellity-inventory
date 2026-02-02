import crypto from "crypto";

let products = [];

const addProduct = (req, res) => {
    try {
        const { name, sku, price, stock, minStock } = req.body;

        if (!name || !sku || price == null || stock == null || minStock == null) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = {
            id: crypto.randomUUID(),
            name,
            sku,
            price: Number(price),
            stock: Number(stock),
            minStock: Number(minStock),
        };

        products.push(product);

        return res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while adding product",
        });
    }
};

const getAllProducts = (req, res) => {
    try {
        const { search = "", status = "ALL", price = "desc" } = req.query;

        let result = [...products];

        if (search) {
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.sku.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (status !== "ALL") {
            result = result.filter((p) => {
                if (status === "OUT_OF_STOCK") return p.stock === 0;
                if (status === "LOW_STOCK")
                    return p.stock > 0 && p.stock <= p.minStock;
                if (status === "IN_STOCK") return p.stock > p.minStock;
                return true;
            });
        }

        result.sort((a, b) =>
            price === "asc" ? a.price - b.price : b.price - a.price
        );

        return res.status(200).json({
            message: "Products fetched successfully",
            total: result.length,
            products: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching all products",
        });
    }
};

const getProductById = (req, res) => {
    try {
        const product = products.find((p) => p.id === req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching product by ID",
        });
    }
};

const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, sku, price, stock, minStock } = req.body;

        if (!name || !sku || price == null || stock == null || minStock == null) {
            return res
                .status(400)
                .json({ message: "Please provide valid values for all fields" });
        }

        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Product not found" });
        }

        products[index] = {
            ...products[index],
            name,
            sku,
            price: Number(price),
            stock: Number(stock),
            minStock: Number(minStock),
        };

        return res.status(200).json({
            message: "Product updated successfully",
            product: products[index],
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while updating product",
        });
    }
};

const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;

        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Product not found" });
        }

        const deletedProduct = products.splice(index, 1)[0];

        return res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while deleting product",
        });
    }
};

export {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
};

import { prisma } from '../config/db.js';


const getAnalytics = async (req, res) => {
    try {

        const products = await prisma.product.findMany();
        const totalProducts = products.length;

        const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

        const outOfStockProducts = products.filter((p) => p.stock === 0)

        const lowStockProduct = products.filter((p) => p.stock > 0 && p.stock <= p.minStock)
        
        return res.status(200).json({
            message: "analytics fetch successfully",
            data: {
                totalProducts,
                totalInventoryValue,
                outOfStockProducts,
                lowStockProduct,
                outOfStockCount: outOfStockProducts.length,
                lowStockCount: lowStockProduct.length
            }
        })

    } catch (error) {
        console.error
    }
}

export {
    getAnalytics
}
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '@/api/productApi';
import StockBadge from '@/component/products/StockBadge';
import Loader from '@/component/common/Loader';
import ProductForm from '@/component/products/ProductForm';

const ProductDetails = () => {
  const { id } = useParams();

  console.log(id);

  const [productData, setproductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)

  const fetchProductData = async () => {
    try {

      const data = await getProductById(id);
      setproductData(data.product);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching product details:', error);

    }
  }

  useEffect(() => {
    fetchProductData();
  }, [])

  console.log(productData);

  if (loading) return <Loader />;


  return (
    <>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-primary to-accent text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">{productData.name}</h2>
                <p className="text-sm opacity-90">{productData.sku}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs opacity-90">Price</div>
                  <div className="font-semibold">₹ {productData.price}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs opacity-90">Stock</div>
                  <div className="font-semibold">{productData.stock}</div>
                </div>

                <div className="rounded-full bg-white/20 px-3 py-1">{StockBadge(productData.stock, productData.minStock)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground">SKU</div>
              <div className="font-semibold mt-1">{productData.sku}</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground">Minimum Stock</div>
              <div className="font-semibold mt-1">{productData.minStock || '-'}</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground">Available</div>
              <div className="font-semibold mt-1">{productData.stock} units</div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setOpen(true)} className="px-5 py-2 rounded-lg bg-white text-primary font-semibold">Update Product</button>
          </div>
        </div>
      </div>

      <ProductForm open={open} setOpen={setOpen} mode='update' initialData={productData} />
    </>

  )
}

export default ProductDetails
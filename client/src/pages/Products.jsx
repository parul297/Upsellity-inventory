import React, { useEffect, useState } from 'react'
import { getAllProducts, deleteProduct } from '@/api/productApi'
import ProductTable from '@/component/products/ProductTable'
import ProductForm from '@/component/products/ProductForm'
import ConfirmDialog from '@/component/common/ConfirmDialog'
import Loader from '@/component/common/Loader'
import SearchBar from '@/component/layout/SearchBar'
import DropdownFilter from '@/component/layout/DropdownFilter'

const Products = () => {
  const status = ['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']
  const price = ['asc', 'desc']

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priceFilter, setPriceFilter] = useState('desc')
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const fetAllProducts = async () => {
    setLoading(true)
    const data = await getAllProducts({ search, status: statusFilter, price: priceFilter })
    setAllProducts(data?.products ?? [])
    setLoading(false)
  }

  const handleDeleteClick = (id) => {
    setOpen(true)
    setDeleteId(id)
  }

  const handleConfirmDelete = async () => {
    await deleteProduct(deleteId)
    setOpen(false)
    setDeleteId(null)
    fetAllProducts()
  }

  const onSearch = () => {
    fetAllProducts()
  }

  useEffect(() => {
    fetAllProducts()
  }, [statusFilter, priceFilter])

  useEffect(() => {
    if (!open) {
      fetAllProducts()
    }
  }, [open])

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-linear-to-r from-primary to-accent text-white rounded-xl p-6 mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Products</h2>
          <p className="text-sm opacity-90">Manage your stock and pricing</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
          </div>

          <div className="flex gap-3 items-center">
            <DropdownFilter status={statusFilter} menu={status} onSelect={setStatusFilter} label="Status" />
            <DropdownFilter status={priceFilter} menu={price} onSelect={setPriceFilter} label="Price" />
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-white text-primary font-semibold"
            >
              New Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProductTable products={allProducts} onDelete={handleDeleteClick} />
      </div>

      <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={handleConfirmDelete} />

      <ProductForm open={open} setOpen={setOpen} mode="add" initialData={{}} />
    </div>
  )
}

export default Products

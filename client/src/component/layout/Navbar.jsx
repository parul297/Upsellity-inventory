import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductForm from '../products/ProductForm'

const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="bg-linear-to-r from-primary to-accent text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="rounded-md bg-white/10 p-2">
                            <span className="font-extrabold tracking-tight text-lg">US</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Upsellity Inventory</h1>
                            <p className="text-xs opacity-90">Modern Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'px-3 py-1 rounded-md bg-white/20' : 'px-3 py-1 rounded-md hover:bg-white/10'}>Products</NavLink>
                            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'px-3 py-1 rounded-md bg-white/20' : 'px-3 py-1 rounded-md hover:bg-white/10'}>Analytics</NavLink>
                        </div>

                        <div className="hidden md:block">
                            {/* lightweight inline search */}
                            <Input placeholder="Search products..." className="w-64" />
                        </div>

                        <Button onClick={() => setOpen(true)} variant="default">Add Product</Button>

                        <div className="rounded-full bg-white/10 w-9 h-9 flex items-center justify-center">RH</div>
                    </div>
                </div>

                <ProductForm open={open} setOpen={setOpen} mode='add' initialData='' />
            </nav>
        </>

    );
}

export default Navbar
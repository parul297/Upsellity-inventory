import React, { useEffect, useState } from 'react'
import { analytics } from '@/api/analyticsApi';
import Loader from '@/component/common/Loader';
import SummaryCard from '@/component/analytics/SummaryCard';
import ProductStockTable from '@/component/analytics/ProductStockTable';

const Analytics = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    const res = await analytics();
    setData(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        <div className='flex justify-between items-center'>
          <h1 className="text-3xl font-bold">Inventory Analytics</h1>
        </div>

        <SummaryCard data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductStockTable
            products={data.lowStockProduct}
            title="Low Stock Products Table"
            color='yellow'
          />
          <ProductStockTable
            products={data.outOfStockProducts}
            title="Out of Stock Products Table"
            color='red'
          />
        </div>
      </div>
    </>
  )
}

export default Analytics;

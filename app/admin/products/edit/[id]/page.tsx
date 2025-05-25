"use client"

import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import ProductForm from "@/components/admin/product-form"

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
        <ProductForm productId={productId} />
      </div>
    </AdminLayout>
  )
}
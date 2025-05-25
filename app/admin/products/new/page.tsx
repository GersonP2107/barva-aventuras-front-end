import AdminLayout from "@/components/admin/admin-layout"
import ProductForm from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Producto</h1>
        <ProductForm />
      </div>
    </AdminLayout>
  )
}
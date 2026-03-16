"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminProduct } from "@/types";
import { adminFetchJSON } from "@/lib/admin-api";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { ProductSlideOver } from "@/components/admin/ProductSlideOver";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  useEffect(() => {
    adminFetchJSON<AdminProduct[]>("/api/products")
      .then(setProducts)
      .catch((err) => {
        toast({
          title: "Failed to load products",
          description: err instanceof Error ? err.message : "Unknown error",
          variant: "destructive",
        });
      })
      .finally(() => setLoadingProducts(false));
  }, [toast]);

  const openCreate = () => { setEditingProduct(null); setSlideOverOpen(true); };
  const openEdit = (product: AdminProduct) => { setEditingProduct(product); setSlideOverOpen(true); };

  const handleSaved = (saved: AdminProduct) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      return exists ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved];
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Products</h1>
            <p className="text-slate-500 text-sm mt-1">Manage loan products shown on the public website.</p>
          </div>
          <ProductsTable
            products={products}
            loading={loadingProducts}
            onEdit={openEdit}
            onCreate={openCreate}
            onProductsChange={setProducts}
          />
        </motion.div>
      </main>
      <ProductSlideOver
        open={slideOverOpen}
        product={editingProduct}
        onClose={() => setSlideOverOpen(false)}
        onSaved={handleSaved}
      />
      <Toaster />
    </div>
  );
}

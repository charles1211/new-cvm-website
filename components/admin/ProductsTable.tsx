"use client";
import { useState } from "react";
import Image from "next/image";
import { Edit2, Trash2, Plus, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminProduct } from "@/types";
import { adminFetchJSON } from "@/lib/admin-api";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  products: AdminProduct[];
  loading: boolean;
  onEdit: (product: AdminProduct) => void;
  onCreate: () => void;
  onProductsChange: React.Dispatch<React.SetStateAction<AdminProduct[]>>;
}

function TableSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-2.5 bg-slate-200 rounded w-1/2" />
          </div>
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
          <div className="h-8 w-16 bg-slate-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function DeleteConfirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-slate-200 rounded-xl shadow-lg p-3 w-52">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <p className="text-xs font-semibold text-slate-700">Delete this product?</p>
      </div>
      <p className="text-xs text-slate-400 mb-3">This cannot be undone.</p>
      <div className="flex gap-2">
        <button onClick={onConfirm} className="flex-1 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">Delete</button>
        <button onClick={onCancel} className="flex-1 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

export function ProductsTable({ products, loading, onEdit, onCreate, onProductsChange }: Props) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggle = async (product: AdminProduct) => {
    setTogglingId(product.id);
    const prev = product.isEnabled;
    onProductsChange((ps) => ps.map((p) => p.id === product.id ? { ...p, isEnabled: !prev } : p));
    try {
      await adminFetchJSON(`/api/products/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isEnabled: !prev }),
      });
    } catch (err) {
      onProductsChange((ps) => ps.map((p) => p.id === product.id ? { ...p, isEnabled: prev } : p));
      toast({ title: "Toggle failed", description: err instanceof Error ? err.message : "Error", variant: "destructive" });
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setConfirmId(null);
    try {
      await adminFetchJSON(`/api/products/${id}`, { method: "DELETE" });
      onProductsChange((ps) => ps.filter((p) => p.id !== id));
      toast({ title: "Product deleted" });
    } catch (err) {
      toast({ title: "Delete failed", description: err instanceof Error ? err.message : "Error", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="font-extrabold text-[#08477C] text-base">Loan Products</h2>
          <p className="text-slate-400 text-xs mt-0.5">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08477C] text-white text-sm font-bold hover:bg-[#063a66] transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {loading ? <TableSkeleton /> : products.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          No products yet. Click &ldquo;Add Product&rdquo; to create one.
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ delay: index * 0.04 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors group"
              >
                <span className="text-slate-300 font-bold text-sm w-6 flex-shrink-0">{product.num}</span>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${product.accentHex}15`, border: `1.5px solid ${product.accentHex}25` }}>
                  {product.imagePath ? (
                    <Image src={product.imagePath} alt={product.name} width={28} height={28} className="object-contain" />
                  ) : (
                    <div className="w-5 h-5 rounded bg-slate-200" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#0F172A] truncate">{product.name}</p>
                  <p className="text-slate-400 text-xs truncate">{product.category} · {product.description1}</p>
                </div>

                {product.badge ? (
                  <span className="hidden sm:inline text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${product.accentHex}15`, color: product.accentHex }}>
                    {product.badge}
                  </span>
                ) : <span className="hidden sm:inline w-12" />}

                <button onClick={() => handleToggle(product)} disabled={togglingId === product.id}
                  className="relative flex-shrink-0" title={product.isEnabled ? "Disable" : "Enable"}>
                  <div className={`w-10 h-5 rounded-full transition-colors ${product.isEnabled ? "bg-emerald-500" : "bg-slate-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${product.isEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </button>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative">
                  <button onClick={() => onEdit(product)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-[#08477C]/10 hover:text-[#08477C] transition-colors" title="Edit">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="relative">
                    <button onClick={() => setConfirmId(confirmId === product.id ? null : product.id)}
                      disabled={deletingId === product.id}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete">
                      {deletingId === product.id
                        ? <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                        : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                    {confirmId === product.id && (
                      <DeleteConfirm onConfirm={() => handleDelete(product.id)} onCancel={() => setConfirmId(null)} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

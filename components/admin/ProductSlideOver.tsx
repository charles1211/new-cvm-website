"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AdminProduct } from "@/types";
import { ProductForm, FormValues } from "./ProductForm";
import { adminFetchJSON, adminFetch } from "@/lib/admin-api";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  open: boolean;
  product: AdminProduct | null;
  onClose: () => void;
  onSaved: (product: AdminProduct) => void;
}

export function ProductSlideOver({ open, product, onClose, onSaved }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (
    values: FormValues,
    extProps: AdminProduct["extendedProperties"],
    iconFile?: File
  ) => {
    setLoading(true);
    try {
      const payload = { ...values, extendedProperties: extProps };
      let saved: AdminProduct;

      if (product) {
        saved = await adminFetchJSON<AdminProduct>(`/api/products/${product.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        saved = await adminFetchJSON<AdminProduct>("/api/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (iconFile) {
        try {
          const form = new FormData();
          form.append("icon", iconFile);
          const updated = await adminFetch<AdminProduct>(
            `/api/products/${saved.id}/icon`,
            { method: "POST", body: form }
          );
          saved = updated;
        } catch {
          toast({
            title: product ? "Icon upload failed" : "Product saved. Icon upload failed",
            description: "You can re-upload the icon from the edit view.",
            variant: "destructive",
          });
        }
      }

      toast({ title: product ? "Product updated" : "Product created" });
      onSaved(saved);
      onClose();
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[560px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-extrabold text-[#08477C] text-base">
                  {product ? product.name : "New Product"}
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  {product ? "Edit product details" : "Create a new loan product"}
                </p>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ProductForm
                product={product ?? undefined}
                onSubmit={handleSubmit}
                onCancel={onClose}
                loading={loading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

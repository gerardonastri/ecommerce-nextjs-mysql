import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ProductClient from "../_components/ProductClient";

export default async function ProductDetail({ params }) {
  const id = params.id;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return <div>Product not found</div>;
  }

  // Simulazione immagini, colori, taglie se non presenti nel database
  const productImages = [
    "/products/img-1.avif",
    "/products/img-2.avif",
    "/products/img-3.avif",
    "/products/img-4.avif",
    "/products/img-5.avif",
  ];

  const colorOptions = [
    { id: "royal-brown", name: "Royal Brown", hex: "#6B4C35" },
    { id: "light-grey", name: "Light Grey", hex: "#D9D9D9" },
    { id: "navy-blue", name: "Navy Blue", hex: "#2B4D6F" },
    { id: "black", name: "Black", hex: "#1A1A1A" },
  ];

  const sizeOptions = ["6", "8", "10", "14", "18", "20"];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <ProductClient
        product={product}
        productImages={productImages}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
      />
    </div>
  );
}

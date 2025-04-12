// components/AddToCartButton.js
import { useStore } from "../stores/useStore";

export default function AddToCartButton({ product }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        padding: "8px 16px",
        background: "green",
        color: "white",
        borderRadius: "4px",
      }}
    >
      Aggiungi al carrello
    </button>
  );
}

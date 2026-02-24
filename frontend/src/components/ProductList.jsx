import axios from "axios";
import { dummyProducts } from "../dummyApi/dummyProducts";

function ProductList() {

  const handleCheckout = async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/createCheckoutSession",
        { product }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {dummyProducts.map((product) => (
        <div key={product.id} className="border p-4 rounded-xl shadow">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
          <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => handleCheckout(product)}
            className="bg-black text-white px-4 py-2 mt-3 rounded hover:bg-gray-800"
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
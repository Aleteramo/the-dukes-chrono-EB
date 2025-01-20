import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  image: string;
}

interface EditableProductCardProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  isAdmin: boolean;
}

const EditableProductCard = ({ product, onSave, isAdmin }: EditableProductCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    setIsEditing(false);
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-md">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-600 text-sm mb-2"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      )}

      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            name="image"
            value={editedProduct.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-800 font-bold">{product.price} €</p>
        </div>
      )}
    </div>
  );
};

export default EditableProductCard;
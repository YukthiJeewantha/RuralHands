import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ProductDeletePage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Jaipur Blue Pottery",
      artist: "David Chen",
      price: 4550,
      image: "https://im.hunt.in/cg/Jaipur/City-Guide/blue-pottery-items.jpg",
      category: "Pottery"
    },
    {
      id: 2,
      name: "Batiks",
      artist: "Martha Henderson",
      price: 8999,
      image: "https://media.timeout.com/images/102436777/750/562/image.jpg",
      category: "Textiles"
    },
    {
      id: 3,
      name: "Traditional Devils Mask",
      artist: "Wood Masters",
      price: 7500,
      image: "https://static-01.daraz.lk/p/3d90e1e93d7a531bfd314464222d1759.jpg",
      category: "Woodwork"
    },
    {
      id: 4,
      name: "Hand Made Jewellery",
      artist: "Silver Smiths",
      price: 25000,
      image: "https://images.squarespace-cdn.com/content/v1/5f5cb307c43c166c56b16db2/1602237706295-QCXIG1QWULRP7BKIB6MV/Lakshimi_primary.jpg?format=1500w",
      category: "Jewelry"
    },
    {
      id: 5,
      name: "Hand Made Statue",
      artist: "Craft Masters",
      price: 4275,
      image: "https://lakshilpa.com/wp-content/uploads/2021/10/IMG_9717.jpg",
      category: "Statues"
    },
    {
      id: 6,
      name: "Cane Kuruni Basket",
      artist: "Sound Crafters",
      price: 5899,
      image: "https://img.drz.lazcdn.com/static/lk/p/a39afe6d59b30d6b2c4e0f9180a255f8.jpg_720x720q80.jpg",
      category: "Baskets"
    },
    {
      id: 7,
      name: "Coconut Shell Spoons",
      artist: "Basket Weavers",
      price: 2500,
      image: "https://i.etsystatic.com/27029681/r/il/ef0a04/3214336440/il_fullxfull.3214336440_aiyb.jpg",
      category: "Kitchen items"
    }
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowConfirmModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Manage Products</h1>
          <p className="text-gray-600">Delete products from your collection</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h2>
            <p className="text-gray-500">All products have been removed from your collection.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-orange-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="text-center mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Product
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <strong>"{productToDelete?.name}"</strong>? 
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDeletePage;
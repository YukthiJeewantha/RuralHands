import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, Trash2 } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/shops";

const ShopDeletePage = () => {
  const [shops, setShops] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shopToDelete, setShopToDelete] = useState(null);
  const sellerId = localStorage.getItem("sellerId");

  // Fetch shops from backend
  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (!sellerId) return console.error("No sellerId found");
        const res = await axios.get(`${API_BASE_URL}/seller/${sellerId}`);
        setShops(res.data);
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      }
    };

    fetchShops();
  }, []);

  // Show confirm delete modal
  const handleDeleteClick = (shop) => {
    setShopToDelete(shop);
    setShowConfirmModal(true);
  };

  // Confirm delete: call backend then update UI
  const confirmDelete = async () => {
    if (shopToDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/shops/${shopToDelete._id}`
        );
        setShops(shops.filter((s) => s._id !== shopToDelete._id));
      } catch (error) {
        console.error("Failed to delete shop:", error);
      } finally {
        setShowConfirmModal(false);
        setShopToDelete(null);
      }
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setShopToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Manage Shops</h1>
          <p className="text-gray-600">Delete shops from your collection</p>
        </div>

        {shops.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏪</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Shops Found
            </h2>
            <p className="text-gray-500">
              All shops have been removed from your collection.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={shop.imageUrl}
                      alt={shop.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {shop.name}
                    </h3>
                    <p className="text-gray-700 mb-1">{shop.address}</p>
                    <p className="text-gray-600 text-sm">Phone: {shop.phone}</p>
                    <p className="text-gray-600 text-sm">Hours: {shop.hours}</p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleDeleteClick(shop)}
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
                  Delete Shop
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete{" "}
                  <strong>"{shopToDelete?.name}"</strong>? This action cannot be
                  undone.
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

export default ShopDeletePage;

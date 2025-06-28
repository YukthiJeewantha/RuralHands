import { Edit, Plus, Save, Star, Tag, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api/products";

const ProductEditPage = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newBadge, setNewBadge] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "Pottery",
    "Textiles",
    "Woodwork",
    "Jewelry",
    "Statues",
    "Baskets",
    "Kitchen items",
    "Others",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    const sellerId = localStorage.getItem("sellerId");

    if (!sellerId) {
      setError("No seller ID found. Please ensure you are logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/seller/${sellerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const formattedProducts = data.map((p) => ({
        ...p,
        id: p._id,
      }));

      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditFormData({
      ...product,
      badges: [...(product.badges || [])],
      features: [...(product.features || [])],
    });
    setImagePreview(product.imageUrl || product.image || null);
    setImageFile(null);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(productToEdit?.imageUrl || productToEdit?.image || null);
    }
  };

  const addBadge = () => {
    if (newBadge.trim() && !editFormData.badges.includes(newBadge.trim())) {
      setEditFormData((prev) => ({
        ...prev,
        badges: [...(prev.badges || []), newBadge.trim()],
      }));
      setNewBadge("");
    }
  };

  const removeBadge = (badgeToRemove) => {
    setEditFormData((prev) => ({
      ...prev,
      badges: prev.badges.filter((badge) => badge !== badgeToRemove),
    }));
  };

  const addFeature = () => {
    if (
      newFeature.trim() &&
      !editFormData.features.includes(newFeature.trim())
    ) {
      setEditFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove) => {
    setEditFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const validateForm = () => {
    const required = [
      "name",
      "artist",
      "price",
      "category",
      "description",
      "stockCount",
    ];
    const missing = required.filter((field) => !editFormData[field]);
    return missing;
  };

  const saveChanges = async () => {
    const missingFields = validateForm();

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    const formData = new FormData();
    for (const key in editFormData) {
      if (key === "badges" || key === "features") {
        formData.append(key, JSON.stringify(editFormData[key]));
      } else if (
        key !== "image" &&
        key !== "imageUrl" &&
        editFormData[key] !== undefined
      ) {
        formData.append(key, editFormData[key]);
      }
    }

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (productToEdit?.imageUrl) {
      formData.append("imageUrl", productToEdit.imageUrl);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${productToEdit.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct._id
            ? {
                ...updatedProduct,
                id: updatedProduct._id,
                image: updatedProduct.imageUrl || updatedProduct.image,
              }
            : product
        )
      );

      setShowEditModal(false);
      setProductToEdit(null);
      setEditFormData({});
      setImageFile(null);
      setImagePreview(null);
      setNewBadge("");
      setNewFeature("");

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert(`Error updating product: ${error.message}`);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setProductToEdit(null);
    setEditFormData({});
    setImageFile(null);
    setImagePreview(null);
    setNewBadge("");
    setNewFeature("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">
            Edit Products
          </h1>
          <p className="text-gray-600">
            Update and manage your product collection
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-spin">⚙️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Loading Products...
            </h2>
            <p className="text-gray-500">
              Please wait while we fetch your product data.
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-red-700 mb-2">
              Error Loading Products
            </h2>
            <p className="text-red-500">{error}</p>
            <p className="text-gray-500 mt-2">
              Ensure your backend is running and a seller ID is set in
              localStorage (e.g., localStorage.setItem('sellerId',
              'your_seller_id')).
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500">
              No products available to edit for this seller.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-orange-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-red-700">
                    Edit Product: {productToEdit?.name}
                  </h3>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Artist Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="artist"
                        value={editFormData.artist || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter artist name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={editFormData.category || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock Count <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stockCount"
                        value={editFormData.stockCount || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter stock count"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImageFile(null);
                                setImagePreview(
                                  productToEdit?.imageUrl ||
                                    productToEdit?.image ||
                                    null
                                );
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-gray-600 text-sm">
                              Click to select image
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg cursor-pointer hover:from-red-600 hover:to-orange-600 transition-all duration-200 text-sm"
                        >
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Badges
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newBadge}
                          onChange={(e) => setNewBadge(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          placeholder="Add badge"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addBadge())
                          }
                        />
                        <button
                          type="button"
                          onClick={addBadge}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {editFormData.badges?.map((badge, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                          >
                            <Tag size={10} />
                            {badge}
                            <button
                              type="button"
                              onClick={() => removeBadge(badge)}
                              className="ml-1 text-orange-600 hover:text-orange-800"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Features
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          placeholder="Add feature"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addFeature())
                          }
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="space-y-1">
                        {editFormData.features?.map((feature, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-1 mb-1"
                          >
                            <Star size={10} />
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(feature)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter detailed product description..."
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;

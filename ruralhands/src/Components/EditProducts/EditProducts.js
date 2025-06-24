import { Edit, Plus, Save, Star, Tag, Upload, X } from 'lucide-react';
import { useState } from 'react';

const ProductEditPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Jaipur Blue Pottery",
      artist: "David Chen",
      price: 4550,
      image: "https://im.hunt.in/cg/Jaipur/City-Guide/blue-pottery-items.jpg",
      category: "Pottery",
      description: "Beautiful traditional blue pottery handcrafted with ancient techniques.",
      badges: ["Handmade", "Traditional"],
      features: ["Heat resistant", "Lead-free", "Eco-friendly"],
      stockCount: 12
    },
    {
      id: 2,
      name: "Batiks",
      artist: "Martha Henderson",
      price: 8999,
      image: "https://media.timeout.com/images/102436777/750/562/image.jpg",
      category: "Textiles",
      description: "Exquisite batik textile with traditional Sri Lankan patterns and vibrant colors.",
      badges: ["Premium", "Authentic"],
      features: ["Natural dyes", "Hand-painted", "Cotton fabric"],
      stockCount: 8
    },
    {
      id: 3,
      name: "Traditional Devils Mask",
      artist: "Wood Masters",
      price: 7500,
      image: "https://static-01.daraz.lk/p/3d90e1e93d7a531bfd314464222d1759.jpg",
      category: "Woodwork",
      description: "Intricately carved traditional devil mask representing Sri Lankan cultural heritage.",
      badges: ["Cultural", "Handcarved"],
      features: ["Teak wood", "Traditional design", "Museum quality"],
      stockCount: 5
    },
    {
      id: 4,
      name: "Hand Made Jewellery",
      artist: "Silver Smiths",
      price: 25000,
      image: "https://images.squarespace-cdn.com/content/v1/5f5cb307c43c166c56b16db2/1602237706295-QCXIG1QWULRP7BKIB6MV/Lakshimi_primary.jpg?format=1500w",
      category: "Jewelry",
      description: "Elegant handcrafted jewelry featuring traditional Sri Lankan designs and precious metals.",
      badges: ["Luxury", "Handmade"],
      features: ["Sterling silver", "Gemstones", "Traditional craft"],
      stockCount: 3
    },
    {
      id: 5,
      name: "Hand Made Statue",
      artist: "Craft Masters",
      price: 4275,
      image: "https://lakshilpa.com/wp-content/uploads/2021/10/IMG_9717.jpg",
      category: "Statues",
      description: "Beautiful handcrafted statue showcasing traditional Sri Lankan artistry.",
      badges: ["Artistic", "Collectible"],
      features: ["Bronze finish", "Hand sculpted", "Limited edition"],
      stockCount: 7
    },
    {
      id: 6,
      name: "Cane Kuruni Basket",
      artist: "Sound Crafters",
      price: 5899,
      image: "https://img.drz.lazcdn.com/static/lk/p/a39afe6d59b30d6b2c4e0f9180a255f8.jpg_720x720q80.jpg",
      category: "Baskets",
      description: "Traditional woven basket made from sustainable cane materials.",
      badges: ["Eco-friendly", "Sustainable"],
      features: ["Natural cane", "Handwoven", "Durable"],
      stockCount: 15
    },
    {
      id: 7,
      name: "Coconut Shell Spoons",
      artist: "Basket Weavers",
      price: 2500,
      image: "https://i.etsystatic.com/27029681/r/il/ef0a04/3214336440/il_fullxfull.3214336440_aiyb.jpg",
      category: "Kitchen items",
      description: "Eco-friendly coconut shell spoons perfect for sustainable kitchen use.",
      badges: ["Eco-friendly", "Natural"],
      features: ["Coconut shell", "Food safe", "Biodegradable"],
      stockCount: 25
    }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newBadge, setNewBadge] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Pottery',
    'Textiles',
    'Woodwork',
    'Jewelry',
    'Statues',
    'Baskets',
    'Kitchen items',
    'Others'
  ];

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditFormData({ ...product });
    setImagePreview(product.image);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBadge = () => {
    if (newBadge.trim() && !editFormData.badges.includes(newBadge.trim())) {
      setEditFormData(prev => ({
        ...prev,
        badges: [...prev.badges, newBadge.trim()]
      }));
      setNewBadge('');
    }
  };

  const removeBadge = (badgeToRemove) => {
    setEditFormData(prev => ({
      ...prev,
      badges: prev.badges.filter(badge => badge !== badgeToRemove)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !editFormData.features.includes(newFeature.trim())) {
      setEditFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove) => {
    setEditFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const validateForm = () => {
    const required = ['name', 'artist', 'price', 'category', 'description', 'stockCount'];
    const missing = required.filter(field => !editFormData[field]);
    return missing;
  };

  const saveChanges = () => {
    const missingFields = validateForm();
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setProducts(products.map(product => 
      product.id === productToEdit.id ? { ...editFormData } : product
    ));
    
    setShowEditModal(false);
    setProductToEdit(null);
    setEditFormData({});
    setImagePreview(null);
    setNewBadge('');
    setNewFeature('');
    
    alert('Product updated successfully!');
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setProductToEdit(null);
    setEditFormData({});
    setImagePreview(null);
    setNewBadge('');
    setNewFeature('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Edit Products</h1>
          <p className="text-gray-600">Update and manage your product collection</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h2>
            <p className="text-gray-500">No products available to edit.</p>
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

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
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

              {/* Modal Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Column */}
                  <div className="space-y-4">
                    
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    {/* Artist Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Artist Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="artist"
                        value={editFormData.artist || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter artist name"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={editFormData.category || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Stock Count */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock Count <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stockCount"
                        value={editFormData.stockCount || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter stock count"
                        min="0"
                        required
                      />
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    
                    {/* Image Upload */}
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
                                setImagePreview(productToEdit.image);
                                setEditFormData(prev => ({ ...prev, image: productToEdit.image }));
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-gray-600 text-sm">Click to change image</p>
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
                          Change Image
                        </label>
                      </div>
                    </div>

                    {/* Badges */}
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
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
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

                    {/* Features */}
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
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
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

                {/* Description - Full Width */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter detailed product description..."
                    required
                  />
                </div>

                {/* Action Buttons */}
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
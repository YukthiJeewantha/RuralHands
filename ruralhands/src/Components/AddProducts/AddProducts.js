import { Package, Plus, Star, Tag, Upload, X } from 'lucide-react';
import { useState } from 'react';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    price: '',
    image: null,
    badges: [],
    category: '',
    description: '',
    features: [],
    stockCount: ''
  });

  const [newBadge, setNewBadge] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Pottery',
    'Textiles',
    'Woodwork',
    'Jewelry',
    'Jewelry',
    'Statues',
    'Baskets',
    'Kitchen items',
    'Others'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
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
    if (newBadge.trim() && !formData.badges.includes(newBadge.trim())) {
      setFormData(prev => ({
        ...prev,
        badges: [...prev.badges, newBadge.trim()]
      }));
      setNewBadge('');
    }
  };

  const removeBadge = (badgeToRemove) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.filter(badge => badge !== badgeToRemove)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const validateForm = () => {
    const required = ['name', 'artist', 'price', 'category', 'description', 'stockCount'];
    const missing = required.filter(field => !formData[field]);
    
    if (!formData.image) {
      missing.push('image');
    }
    
    return missing;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      artist: '',
      price: '',
      image: null,
      badges: [],
      category: '',
      description: '',
      features: [],
      stockCount: ''
    });
    setImagePreview(null);
    setNewBadge('');
    setNewFeature('');
  };

  const handleSubmit = () => {
    const missingFields = validateForm();
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    console.log('Product data:', formData);
    alert('Product added successfully!');
    
    // Clear form after successful submission
    clearForm();
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      clearForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-700 mb-2">Add New Product</h1>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    value={formData.stockCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter stock count"
                    min="0"
                    required
                  />
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload image</p>
                        <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg cursor-pointer hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Badges <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Add badge (e.g., Bestseller, Eco-friendly)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                    />
                    <button
                      type="button"
                      onClick={addBadge}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                      >
                        <Tag size={14} />
                        {badge}
                        <button
                          type="button"
                          onClick={() => removeBadge(badge)}
                          className="ml-1 text-orange-600 hover:text-orange-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Add feature (e.g., Handmade, Sustainable)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm mr-2 mb-2"
                      >
                        <Star size={14} />
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Description - Full Width */}
            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter detailed product description..."
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 text-center space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Package size={20} />
                Add Product
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
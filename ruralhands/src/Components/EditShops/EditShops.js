import { Clock, Edit3, MapPin, Phone, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';

const ShopEditPage = () => {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Heritage Craft Gallery",
      address: "123 Galle Road, Colombo 03",
      phone: "+94 11 234 5678",
      hours: "9:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      locationUrl: "https://maps.google.com/heritage-craft-gallery"
    },
    {
      id: 2,
      name: "Artisan Corner",
      address: "45 Kandy Road, Gampaha",
      phone: "+94 33 567 8901",
      hours: "8:30 AM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      locationUrl: "https://maps.google.com/artisan-corner"
    },
    {
      id: 3,
      name: "Spice & Craft Market",
      address: "78 Main Street, Matara",
      phone: "+94 41 234 5678",
      hours: "7:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      locationUrl: "https://maps.google.com/spice-craft-market"
    }
  ]);

  const [editingShop, setEditingShop] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditClick = (shop) => {
    setEditingShop(shop);
    setEditForm({ ...shop });
    setImagePreview(shop.image);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({
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

  const validateForm = () => {
    const required = ['name', 'address', 'phone', 'hours', 'locationUrl'];
    const missing = required.filter(field => !editForm[field]);
    
    if (!editForm.image) {
      missing.push('image');
    }
    
    return missing;
  };

  const saveChanges = () => {
    const missingFields = validateForm();
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setShops(shops.map(shop => 
      shop.id === editingShop.id ? { ...editForm } : shop
    ));
    setShowEditModal(false);
    setEditingShop(null);
    setEditForm({});
    setImagePreview(null);
    alert('Shop updated successfully!');
  };

  const cancelEdit = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      setShowEditModal(false);
      setEditingShop(null);
      setEditForm({});
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Edit Shops</h1>
          <p className="text-gray-600">Edit and update shop information</p>
        </div>

        <div className="space-y-6">
          {shops.map((shop) => (
            <div 
              key={shop.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 p-6"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {shop.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleEditClick(shop)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{shop.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{shop.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{shop.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <a href={shop.locationUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 underline">
                        View Location
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {showEditModal && editingShop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-red-700 mb-2">Edit Shop</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left Column */}
                  <div className="space-y-6">
                    
                    {/* Shop Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shop Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter shop name"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={editForm.address || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter shop address"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone || ''}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    {/* Hours */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Operating Hours <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="hours"
                          value={editForm.hours || ''}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="8:00 AM - 7:00 PM"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Format: 8:00 AM - 7:00 PM</p>
                    </div>

                    {/* Location URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location URL <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="locationUrl"
                          value={editForm.locationUrl || ''}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="https://maps.google.com/..."
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Google Maps link or similar location URL</p>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shop Image <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setEditForm(prev => ({ ...prev, image: null }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="py-12">
                            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-2 text-lg">Click to upload shop image</p>
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
                          className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg cursor-pointer hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-semibold"
                        >
                          Change Image
                        </label>
                      </div>
                    </div>



                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="mt-8 text-center space-x-4">
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <X size={20} />
                    Cancel
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

export default ShopEditPage;
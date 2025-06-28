import { Store, Upload, X, MapPin, Clock, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddShopPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    hours: "",
    image: null,
    locationUrl: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const required = ["name", "address", "phone", "hours", "locationUrl"];
    const missing = required.filter((field) => !formData[field]);

    if (!formData.image) {
      missing.push("image");
    }

    return missing;
  };

  const clearForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      hours: "",
      image: null,
      locationUrl: "",
    });
    setImagePreview(null);
  };
  const sellerId = localStorage.getItem("sellerId");

  const handleSubmit = async () => {
    const missingFields = validateForm();

    if (missingFields.length > 0) {
      alert("Please fill in all required fields");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("hours", formData.hours);
    form.append("locationUrl", formData.locationUrl);
    form.append("image", formData.image);
    form.append("seller", sellerId);

    try {
      const response = await fetch("http://localhost:5000/api/shops", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to add shop: " + errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Shop added:", data);
      alert("Shop added successfully!");
      clearForm();
    } catch (error) {
      console.error("Error submitting shop:", error);
      alert("Error submitting shop");
    }
  };

  const handleCancel = () => {
    if (navigate("/sellerdashboard")) {
      clearForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-700 mb-2">
              Add New Shop
            </h1>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
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
                    value={formData.name}
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
                    value={formData.address}
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
                      value={formData.phone}
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
                      value={formData.hours}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="8:00 AM - 7:00 PM"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Format: 8:00 AM - 7:00 PM
                  </p>
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
                      value={formData.locationUrl}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://maps.google.com/..."
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Google Maps link or similar location URL
                  </p>
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
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-12">
                        <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2 text-lg">
                          Click to upload shop image
                        </p>
                        <p className="text-sm text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
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
                      Choose Image
                    </label>
                  </div>
                </div>

                {/* Shop Info Card */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                  <h3 className="text-lg font-semibold text-red-700 mb-4">
                    Shop Information Preview
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Store className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {formData.name || "Shop name will appear here"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {formData.address || "Shop address will appear here"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        {formData.phone || "Phone number will appear here"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        {formData.hours || "Operating hours will appear here"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 text-center space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Store size={20} />
                Add Shop
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

export default AddShopPage;

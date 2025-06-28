import { Clock, Edit3, MapPin, Phone, Save, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api/shops";

const ShopEditPage = () => {
  const [shops, setShops] = useState([]);
  const [editingShop, setEditingShop] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const fetchShops = async () => {
    const sellerId = localStorage.getItem("sellerId");
    if (!sellerId) return console.error("No sellerId found");

    try {
      const res = await fetch(`${API_BASE_URL}/seller/${sellerId}`);
      if (!res.ok) throw new Error("Failed to fetch shops");
      const data = await res.json();
      setShops(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEditClick = (shop) => {
    setEditingShop(shop);
    setEditForm({ ...shop });
    setImagePreview(shop.imageUrl || shop.image);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setEditForm((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const required = ["name", "address", "phone", "hours", "locationUrl"];
    const missing = required.filter((f) => !editForm[f]);
    if (!editForm.image) missing.push("image");
    return missing;
  };

  // 🛠 Save changes and PATCH to backend
  const saveChanges = async () => {
    const missing = validateForm();
    if (missing.length) {
      alert(`Missing fields: ${missing.join(", ")}`);
      return;
    }

    const formData = new FormData();
    ["name", "address", "phone", "hours", "locationUrl"].forEach((f) => {
      formData.append(f, editForm[f]);
    });
    formData.append("seller", editForm.seller);

    if (editForm.image instanceof File) {
      formData.append("image", editForm.image);
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/${editingShop._id || editingShop.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to update shop");
      await fetchShops(); // refresh list
      setShowEditModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Discard changes?")) {
      setShowEditModal(false);
      setEditingShop(null);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-6 text-center">
          Edit Shops
        </h1>

        <div className="space-y-6">
          {shops.map((shop) => (
            <div
              key={shop._id || shop.id}
              className="bg-white p-6 rounded-xl shadow-md flex gap-6 items-center"
            >
              <img
                src={shop.imageUrl || shop.image}
                alt={shop.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2">{shop.name}</h2>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPin /> {shop.address}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone /> {shop.phone}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock /> {shop.hours}
                </p>
                <p className="text-sm mt-2">
                  <a
                    href={shop.locationUrl}
                    target="_blank"
                    className="text-red-600 underline"
                  >
                    View Location
                  </a>
                </p>
              </div>
              <button
                onClick={() => handleEditClick(shop)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit3 /> Edit
              </button>
            </div>
          ))}
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-auto max-h-[90vh] p-6">
              <h2 className="text-3xl font-bold text-red-700 mb-4 text-center">
                Edit Shop
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {["name", "address", "phone", "hours", "locationUrl"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          {field.charAt(0).toUpperCase() +
                            field.slice(1).replace(/Url/, " URL")}
                        </label>
                        <input
                          type={field === "locationUrl" ? "url" : "text"}
                          name={field}
                          value={editForm[field] || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded text-gray-700"
                          required
                        />
                      </div>
                    )
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Shop Image
                  </label>
                  <div className="border-2 border-dashed p-4 rounded text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setEditForm((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-16">
                        <Upload className="mx-auto text-gray-400 mb-2" />
                        <p>Select image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="shop-image-upload"
                    />
                    <label
                      htmlFor="shop-image-upload"
                      className="inline-block bg-red-500 text-white px-4 py-2 mt-2 rounded cursor-pointer"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={cancelEdit}
                  className="px-6 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="px-6 py-2 bg-red-500 text-white rounded flex items-center gap-2"
                >
                  <Save /> Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopEditPage;

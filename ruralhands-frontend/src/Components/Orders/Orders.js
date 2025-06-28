import { useEffect, useState } from "react";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const sellerId = localStorage.getItem("sellerId"); // Get seller ID from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/seller/${sellerId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    if (sellerId) {
      fetchOrders();
    }
  }, [sellerId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">Show Orders</h1>
          <p className="text-gray-600">View customer orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 p-4"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Order: {order._id}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">
                      Customer:{" "}
                    </span>
                    <span className="text-gray-800">{order.customerName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone: </span>
                    <span className="text-gray-800">{order.phone}</span>
                  </div>
                  <div className="md:col-span-1">
                    <span className="font-medium text-gray-600">Address: </span>
                    <span className="text-gray-800">{order.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.productId?.imageUrl || "/placeholder.jpg"}
                            alt={item.productId?.name || item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-orange-200"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {item.productId?.name || item.name}
                            </h4>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-red-600 font-medium">
                            Quantity
                          </p>
                          <p className="text-xl font-bold text-red-600">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowOrders;

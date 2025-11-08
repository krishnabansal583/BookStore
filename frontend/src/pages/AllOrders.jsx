import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  User,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
  </div>
);

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id") || false,
    authorization: `Bearer ${localStorage.getItem("token")}` || false,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:1000/api/v1/get-all-orders",
          {
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
          }
        );
        const data = await response.json();
        setAllOrders(data.data);
        setFilteredOrders(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = allOrders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order?.book?.bookTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order?.user?.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, allOrders]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const orderId = filteredOrders[i]?._id;

    try {
      const response = await fetch(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      alert(data.message);

      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: values.status } : order
        )
      );
      setOptions(-1);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleUserDetails = (user) => {
    setUserDiv("fixed");
    setUserDivData(user);
  };

  const closeUserDetails = () => {
    setUserDiv("hidden");
    setUserDivData(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <Package className="w-4 h-4" />;
      case "Out of Delivery":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Out of Delivery":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Delivered":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const orderStats = {
    total: allOrders.length,
    placed: allOrders.filter((o) => o.status === "Order Placed").length,
    delivery: allOrders.filter((o) => o.status === "Out of Delivery").length,
    delivered: allOrders.filter((o) => o.status === "Delivered").length,
    cancelled: allOrders.filter((o) => o.status === "Cancelled").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orderStats.total}
                </p>
              </div>
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-xl shadow-sm p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Placed</p>
                <p className="text-2xl font-bold text-green-900">
                  {orderStats.placed}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl shadow-sm p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 mb-1">In Transit</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {orderStats.delivery}
                </p>
              </div>
              <Truck className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl shadow-sm p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Delivered</p>
                <p className="text-2xl font-bold text-blue-900">
                  {orderStats.delivered}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-red-50 rounded-xl shadow-sm p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Cancelled</p>
                <p className="text-2xl font-bold text-red-900">
                  {orderStats.cancelled}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by book title or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Orders</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {!filteredOrders.length ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "There are no orders available at the moment"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order?._id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          order?.book?.imageURL ||
                          "https://placehold.co/150x200/e2e8f0/64748b?text=No+Image"
                        }
                        alt={order?.book?.bookTitle || "No Title"}
                        className="h-40 w-28 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                            {order?.book?.bookTitle ||
                              "Book Details Unavailable"}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {order?.book?.bookDescription
                              ? `${order.book.bookDescription.slice(0, 150)}...`
                              : "No description available"}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-2xl font-bold text-indigo-600">
                              ₹{order?.book?.price || "N/A"}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                              COD
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm whitespace-nowrap ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status || "No Status"}
                        </div>
                      </div>

                      {/* Actions Row */}
                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleUserDetails(order?.user)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                        >
                          <User className="w-4 h-4" />
                          View Customer
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setOptions(options === index ? -1 : index)
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          >
                            <Package className="w-4 h-4" />
                            Update Status
                          </button>

                          {options === index && (
                            <div className="flex items-center gap-2">
                              <select
                                name="status"
                                onChange={handleChange}
                                value={values.status}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                              >
                                <option value="">Select Status</option>
                                {[
                                  "Order Placed",
                                  "Out of Delivery",
                                  "Delivered",
                                  "Cancelled",
                                ].map((status, idx) => (
                                  <option key={idx} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => submitChanges(index)}
                                disabled={!values.status}
                                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                              >
                                <Check className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setOptions(-1)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {userDiv === "fixed" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <User className="w-6 h-6" />
                Customer Details
              </h2>
            </div>
            <div className="p-6">
              {userDivData && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userDivData.username}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userDivData.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      Delivery Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userDivData.address}
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={closeUserDetails}
                className="w-full mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;

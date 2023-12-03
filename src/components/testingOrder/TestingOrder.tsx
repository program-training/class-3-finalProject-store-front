import axios from "axios";

export default function SendOrders() {
  const sendOrderToServer = async () => {
    try {
      const sampleOrder = {
        id: "123456",
        cartItems: [
          {
            _id: "655f1cd4dab13343a8db7a46",
            name: "Mayonaise",
            description: "Description for Mayonaise",
            price: 67,
            quantity: 30,
          },
        ],
        orderTime: "2023-11-22T12:00:00",
        status: "Pending",
        price: 70,
        shippingDetails: {
          address: "123 Main St",
          userId: 1,
          contactNumber: "555-1234",
          orderType: "Express",
        },
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders/order`, sampleOrder);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  return (
    <div>
      <button onClick={sendOrderToServer}>Send Order</button>
    </div>
  );
}

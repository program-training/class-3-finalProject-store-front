import axios from "axios";

export default function SendOrders() {
  const sendOrderToServer = async () => {
    try {
      const sampleOrder = {
        id: "123456",
        cartItems: [
          {
            id: "product1",
            name: "Product 1",
            description: "Description for Product 1",
            price: 20,
            quantity: 2,
          },
          {
            id: "product2",
            name: "Product 2",
            description: "Description for Product 2",
            price: 30,
            quantity: 1,
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
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_DEPLOYMENT}/api/orders/order`, sampleOrder);
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

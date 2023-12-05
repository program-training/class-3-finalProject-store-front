import { useMutation } from "@apollo/client";
import { POST_ORDER } from "../../graphqlQueries/mutations";

export default function SendOrders() {
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

  const [postOrder, { loading, error }] = useMutation(POST_ORDER);

  const sendOrderToServer = async () => {
    if (!loading) {
      try {
        const result = await postOrder({
          variables: { input: sampleOrder },
        });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={sendOrderToServer}>Send Order</button>
    </div>
  );
}

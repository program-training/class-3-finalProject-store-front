import { useAppDispatch } from "../redux/hooks";
import { upDateUserCart } from "../redux/userCartSlice";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphqlQueries/queries";

const UserCartRedux = (search?: string) => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery(GET_PRODUCTS, {
    variables: { search },
    onCompleted: (data) => {
      dispatch(upDateUserCart(data.getProducts));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    loading,
    error,
    cartData: data.getProducts,
  };
};

export default UserCartRedux;

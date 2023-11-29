import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { updateOrderDetails } from "../redux/orderSlice"
import { RootState } from "../redux/store"
import { ShippingDetails } from "../types"

export const useHandleShippingDetailsSubmit = (details: ShippingDetails) => {
    const orderDetails = useAppSelector((state:RootState) => state.order.orderDetails)
    orderDetails.shippingDetails = details
    const dispatch = useAppDispatch()
    dispatch(updateOrderDetails(orderDetails))
}
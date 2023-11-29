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

export const useHandleUpdatePriceOnRedux = (price: number) => {
    const orderDetails = useAppSelector((state:RootState) => state.order.orderDetails)
    orderDetails.price = price
    const dispatch = useAppDispatch()
    dispatch(updateOrderDetails(orderDetails))
}

export const useHandleConfirmOrder = () => {
    const orderDetails = useAppSelector((state:RootState) => state.order.orderDetails)
    //לשלוח לניהול הזמנות וכו
}
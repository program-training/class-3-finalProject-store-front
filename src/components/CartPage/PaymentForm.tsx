import { FieldValues, useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store"
import {useState} from "react"
import { useHandleConfirmOrder } from "../../helpers/costumHooks";

const PaymentForm = () => {
  const [flag, setFlag] = useState<boolean>(false)
  flag && useHandleConfirmOrder()
  const { register, handleSubmit, formState: {errors} } = useForm();
  const price = useAppSelector((state: RootState) => state.order.orderDetails.price)

  const onSubmitHandler = (data: FieldValues) => {
    data
    setFlag(true)
};

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h5" color="text.secondary" sx={{textAlign: `center`}}>
        Subtotal ${price}
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{textAlign: `center`}}>
        ShippingFee $25
      </Typography>
      <Typography variant="h4" sx={{textAlign: `center`}}>
        Total ${price + 25}
      </Typography>
      <Container sx={{display: `flex`, flexDirection: `column`}}>
      <TextField sx={{margin: "15px 0 0  0"}}
        {...register("cardNumber", {required: `* Enter card number`, valueAsNumber: true})}
        label="Card Number"
        variant="outlined"
      />
      {errors.cardNumber && <ErrorMessage errors={errors} name="cardNumber" render={({message}) => <Typography >{message}</Typography>}/>}
      <TextField sx={{margin: "15px 0 0  0"}}
        {...register("expiryDate", {required: `* Enter expiry date`, valueAsDate: true})}
        label="Expiry Date"
        variant="outlined"
        placeholder="dd/mm/yyyy"
        />
        {errors.cardNumber && <ErrorMessage errors={errors} name="expiryDate" render={({message}) => <Typography >{message}</Typography>}/>}
      <TextField sx={{margin: "15px 0 0  0"}}
        {...register("cvv", {required: `* Enter CVV code`, valueAsNumber: true})}
        label="CVV"
        variant="outlined"
        />
        {errors.cardNumber && <ErrorMessage errors={errors} name="cvv" render={({message}) => <Typography >{message}</Typography>}/>}
      <Button type="submit" variant="contained" sx={{margin: "15px 0"}}>
        Pay now
      </Button>
      </Container>
    </form>
  );
}

export default PaymentForm
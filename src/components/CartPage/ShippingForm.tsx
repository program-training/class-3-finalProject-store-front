import { FieldValues, useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { ShippingDetails } from "../../helpers/types";

const ShippingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data: FieldValues) => {
    const { phoneNumber, address, city, state, zipCode, shippingMethod } = data;
    const shippingData: ShippingDetails = {
      address: `${address}, ${city}, ${state}, ${zipCode}`,
      contactNumber: phoneNumber,
      orderType: shippingMethod,
    };
    shippingData;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h5" color="text.secondary" sx={{ textAlign: `center` }}>
        Shipping Information
      </Typography>
      <Container sx={{ display: `flex`, flexDirection: `column` }}>
        <TextField sx={{ margin: "15px 0 0 0" }} {...register("phoneNumber", { required: "* Enter phone number" })} label="Phone Number" variant="outlined" />
        {errors.phoneNumber && <ErrorMessage errors={errors} name="phoneNumber" render={({ message }) => <Typography>{message}</Typography>} />}
        <TextField sx={{ margin: "15px 0 0 0" }} {...register("address", { required: "* Enter address" })} label="Address" variant="outlined" />
        {errors.address && <ErrorMessage errors={errors} name="address" render={({ message }) => <Typography>{message}</Typography>} />}
        <TextField sx={{ margin: "15px 0 0 0" }} {...register("city", { required: "* Enter city" })} label="City" variant="outlined" />
        {errors.city && <ErrorMessage errors={errors} name="city" render={({ message }) => <Typography>{message}</Typography>} />}
        <TextField sx={{ margin: "15px 0 0 0" }} {...register("state", { required: "* Enter state/province" })} label="State/Province" variant="outlined" />
        {errors.state && <ErrorMessage errors={errors} name="state" render={({ message }) => <Typography>{message}</Typography>} />}
        <TextField sx={{ margin: "15px 0 0 0" }} {...register("zipCode", { required: "* Enter ZIP code", valueAsNumber: true })} label="ZIP Code" variant="outlined" />
        {errors.zipCode && <ErrorMessage errors={errors} name="zipCode" render={({ message }) => <Typography>{message}</Typography>} />}
        <RadioGroup defaultValue="" sx={{ display: `flex`, flexDirection: `row` }} {...register("shippingMethod")}>
          <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
          <FormControlLabel value="Express" control={<Radio />} label="Express" />
          <FormControlLabel value="Shipping" control={<Radio />} label="Shipping" />
        </RadioGroup>
        <Button type="submit" variant="contained" sx={{ margin: "15px 0" }}>
          Proceed
        </Button>
      </Container>
    </form>
  );
};
export default ShippingForm;

import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import CartItems from './CartItems';
import { useState } from 'react';
import { Tab, Box } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';


const CartPage = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Cart" value="1" />
            <Tab label="ShippingForm" value="2" />
            <Tab label="PaymentForm" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CartItems />
        </TabPanel>
        <TabPanel value="2">
          <ShippingForm />
        </TabPanel>
        <TabPanel value="3">
          <PaymentForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default CartPage
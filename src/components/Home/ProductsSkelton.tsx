<<<<<<< HEAD
import {  Card, CardContent, Skeleton, Box } from "@mui/material";

export default function ProductsSkelton() {
 
 return (
  <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
   
    <Card sx={{ maxWidth: 345 }} >
     <Skeleton variant="rectangular"
=======
import {  Card, CardContent, Grid, Skeleton } from "@mui/material";

export default function ProductsSkelton() {
 
 return ( 
  <Grid  sm={8} md={4} lg={2} p={3} border="2px solid #5896" margin="13px" borderRadius="33px">
  <Skeleton variant="rectangular"
>>>>>>> develop
      animation="wave" height={140}></Skeleton>
     <CardContent>
      <Skeleton variant="rectangular"
       animation="wave" width={50}></Skeleton>
     </CardContent>
    </Grid>
 )
}
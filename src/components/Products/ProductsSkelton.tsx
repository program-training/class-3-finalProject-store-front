import {  Card, CardContent, Skeleton } from "@mui/material";

export default function ProductsSkelton() {
 
 return (
  // <Box width="100%" my={4} display="flex" alignItems="center" gap={4}>
   
    <Card sx={{ maxWidth: 345 }} >
     <Skeleton variant="rectangular"
      animation="wave" height={140}></Skeleton>
     <CardContent>
      <Skeleton variant="rectangular"
       animation="wave" width={50}></Skeleton>
     </CardContent>
    </Card>
   
   
  // </Box >
 )
}
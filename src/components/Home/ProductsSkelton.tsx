import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function ProductsSkelton() {
  return (
    <Grid sm={8} md={4} lg={2} p={3} border="2px solid #5896" margin="13px" borderRadius="33px" wrap="wrap">
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={210} height={200} />
        <Skeleton variant="text" width={210} height={20} />
        <Skeleton variant="text" width={210} height={20} />
        <Skeleton variant="text" width={210} height={20} />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
          <Skeleton variant="circular" width={30} height={30} />
          <span>
            <Skeleton variant="circular" width={30} height={30} />
          </span>
        </Box>
      </Stack>
    </Grid>
  );
}

import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_TRIGGER_POSTGRES } from "../../graphqlQueries/queries";
import { Typography } from "@mui/material";
import { USERS_GRAPH } from "../../graphqlQueries/subscription";

export default function UsersGraph() {
  const [count, setCount] = useState<number[]>();
  const { loading, data, error } = useQuery(GET_TRIGGER_POSTGRES);
  const { loading: loadingProduct, data: dataProduct, error: errorProduct } = useSubscription(USERS_GRAPH);

  useEffect(() => {
    async function getData() {
      try {
        if (error || errorProduct) {
          console.error(error || errorProduct);
        }
        if (!loading) setCount(data.postgresTrigger);
        if (!loadingProduct) setCount(dataProduct.triggerPostgres);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
    getData();
  }, [data, loading, dataProduct, loadingProduct]);

  return (
    <div>
      {count ? (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: [
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: count,
            },
          ]}
          width={500}
          height={300}
        />
      ) : (
        <Typography>loading graph...</Typography>
      )}
    </div>
  );
}

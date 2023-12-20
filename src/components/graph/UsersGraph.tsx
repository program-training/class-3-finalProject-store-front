import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@apollo/client";
import { GET_TRIGGER_POSTGRES } from "../../graphqlQueries/queries";
import { Typography } from "@mui/material";

export default function UsersGraph() {
  const [count, setCount] = useState<number[]>();
  const { loading, data, error } = useQuery(GET_TRIGGER_POSTGRES);

  useEffect(() => {
    async function getData() {
      try {
        if (error) {
          console.error(error);
        }
        if (!loading && !error) setCount(data.postgresTrigger);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
    getData();
  }, [data, loading]);

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

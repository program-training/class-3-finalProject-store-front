import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { CartReport, GraphType } from "../../types";
import { Box } from "@mui/material";
import axios from "axios";

export default function Graph() {
  const [data, setData] = useState<CartReport[]>();
  const [graphData, setGraphData] = useState<GraphType>({});

  useEffect(() => {
    async function getData() {
        // fetch
      try {
        const api = await axios.get(`${import.meta.env.VITE_BASE_URL}users/triggersPostgres`);
        if (api.statusText !== "OK") {
          throw new Error("Failed to fetch data");
        } else {
          setData(api.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData(); 
  }, []);

  useEffect(() => {
    if (data) {
      const newGraphData: GraphType = {};

      data.forEach((item) => {
        const hour = item.time.hour.toString();
        const key = `${hour}:00`;

        if (newGraphData[key]) {
          newGraphData[key] += 1;
        } else {
          newGraphData[key] = 1;
        }
      });

      setGraphData(newGraphData);
    }
  }, [data]);

  return (
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        Display usage data
      <Box sx={{ width: "70%" }}>
        {graphData && (
          <>
            <VictoryChart width={650} height={300} domainPadding={{ x: 13 }}>
              <VictoryAxis tickValues={Object.keys(graphData)} />
              <VictoryAxis dependentAxis tickFormat={(x) => x} style={{ tickLabels: { fill: "#8569" } }} />
              <VictoryBar data={Object.entries(graphData).map(([hour, quantity]) => ({ hour, quantity }))} x="hour" y="quantity" style={{ data: { fill: "red" } }} />
            </VictoryChart>
          </>
        )}
      </Box>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { GraphType } from "../../types";
import { Box } from "@mui/material";
import axios from "axios";

// ... הייבואים ...

export default function UserGraph() {
  const [data, setData] = useState<Record<number, number>>();
  const [graphData, setGraphData] = useState<GraphType>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const api = await axios.get(`${import.meta.env.VITE_BASE_URL}/triggers/triggersPostgres`);
        if (api.status !== 200) {
          throw new Error("Failed to fetch data");
        } else {
          setData(api.data);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const sortedHours = Object.keys(data)
        .map(Number)
        .sort((a, b) => a - b);
      const newGraphData: GraphType = {};

      sortedHours.forEach((hour) => {
        newGraphData[hour] = data[hour];
      });

      setGraphData(newGraphData);
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
  );
}

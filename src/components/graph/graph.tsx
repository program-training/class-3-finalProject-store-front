import axios from "axios";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { CartReport, GraphType } from "../../types";
import { Box } from "@mui/material";


export default function Graph() {
  const [data, setData] = useState<CartReport[]>();
  const [graphData, setGraphData] = useState<GraphType>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const api = await axios.get(`${import.meta.env.VITE_BASE_URL}/triggers`);
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
    if (data && Array.isArray(data)) {
      const newGraphData: GraphType = {};
  
      data.forEach((report) => {
        const hour = report.hour;
        const quantity = report.quantity;
  
        newGraphData[hour] = quantity;
      });
  
      setGraphData(newGraphData);
    }
  }, [data]);
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      Display usage data
      <Box sx={{ width: "70%" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {graphData && (
          <>
            <VictoryChart width={650} height={300} domainPadding={{ x: 13 }}>
              <VictoryAxis tickValues={Object.keys(graphData).map(Number)} />
              <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} style={{ tickLabels: { fill: "#8569" } }} />
              <VictoryBar data={Object.entries(graphData).map(([hour, quantity]) => ({ hour, quantity }))} x="hour" y="quantity" style={{ data: { fill: "red" } }} />
            </VictoryChart>
          </>
        )}
      </Box>
    </Box>
  );
}

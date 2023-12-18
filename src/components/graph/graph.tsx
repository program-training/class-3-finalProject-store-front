import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { CartReport, GraphType } from "../../types";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_TRIGGER_CART } from "../../graphqlQueries/queries";

export default function Graph() {
  const [dataTrigger, setData] = useState<CartReport[]>();
  const [graphData, setGraphData] = useState<GraphType>({});
  const { loading, data, error } = useQuery(GET_TRIGGER_CART);

  useEffect(() => {
    async function getData() {
      if (error) {
        console.error(error);
      }
      if (!loading && !error) setData(data.getTriggerCart);
    }
    getData();
  }, [data, loading]);

  useEffect(() => {
    if (dataTrigger && Array.isArray(dataTrigger)) {
      const newGraphData: GraphType = {};

      dataTrigger.forEach((report) => {
        const hour = report.hour;
        const quantity = report.quantity;

        newGraphData[hour] = quantity;
      });

      setGraphData(newGraphData);
    }
  }, [dataTrigger]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      Display usage data
      <Box sx={{ width: "70%" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading data</p>}
        {graphData && Object.keys(graphData).length > 0 && (
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

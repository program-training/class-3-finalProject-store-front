import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { CartReport, GraphType } from "../../types";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_TRRIGER_CART } from "../../graphqlQueries/queries";

export default function Graph() {
  const [dataTriger, setData] = useState<CartReport[]>();
  const [graphData, setGraphData] = useState<GraphType>({});
  const { loading, data, error } = useQuery(GET_TRRIGER_CART);

  useEffect(() => {
    async function getData() {
      if (error) {
        console.error(error);
      } else {
        setData(data?.getTrrigerCart);
      }
    }
    getData();
  }, [data]);

  useEffect(() => {
    if (dataTriger && Array.isArray(dataTriger)) {
      const newGraphData: GraphType = {};

      dataTriger.forEach((report) => {
        const hour = report.hour;
        const quantity = report.quantity;

        newGraphData[hour] = quantity;
      });

      setGraphData(newGraphData);
    }
  }, [dataTriger]);

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

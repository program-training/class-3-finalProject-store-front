import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { GraphType } from "../../types";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_TRRIGER_POSTGRES } from "../../graphqlQueries/queries";

export default function UserGraph() {
  const [dataTriger, setData] = useState<Record<number, number>>();
  const [graphData, setGraphData] = useState<GraphType>({});
  const { loading, data, error } = useQuery(GET_TRRIGER_POSTGRES);

  useEffect(() => {
    async function getData() {
      if (error) {
        console.error(error);
      } else {
        setData(data?.getTrrigerPostgres);
      }
    }
    getData();
  }, [data]);

  useEffect(() => {
    if (dataTriger) {
      const sortedHours = Object.keys(dataTriger)
        .map(Number)
        .sort((a, b) => a - b);
      const newGraphData: GraphType = {};

      sortedHours.forEach((hour) => {
        newGraphData[hour] = dataTriger[hour];
      });

      setGraphData(newGraphData);
    }
  }, [dataTriger]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {graphData && Object.keys(graphData).length > 0 && (
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

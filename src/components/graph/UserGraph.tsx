import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { GraphType } from "../../types";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_TRIGGER_POSTGRES } from "../../graphqlQueries/queries";

export default function UserGraph() {
  const [dataTrigger, setData] = useState<Record<number, number>>();
  const [graphData, setGraphData] = useState<GraphType>({});
  const { loading, data, error } = useQuery(GET_TRIGGER_POSTGRES);

  useEffect(() => {
    async function getData() {
      if (error) {
        console.error(error);
      }
      if (!loading && !error) setData(data.getTriggerPostgres);
    }
    getData();
  }, [data, loading]);

  useEffect(() => {
    if (dataTrigger) {
      const sortedHours = Object.keys(dataTrigger)
        .map(Number)
        .sort((a, b) => a - b);
      const newGraphData: GraphType = {};

      sortedHours.forEach((hour) => {
        newGraphData[hour] = dataTrigger[hour];
      });

      setGraphData(newGraphData);
    }
  }, [dataTrigger]);

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

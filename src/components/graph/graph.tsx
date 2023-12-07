import axios from "axios";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { CartReport, GraphType } from "../../types";

export default function Graph() {
  const [data, setData] = useState<CartReport[]>();
  const [graphData, setGraphData] = useState<GraphType>({});

  useEffect(() => {
    async function getData() {
      try {
        const api = await axios.get(`${import.meta.env.VITE_BASE_URL}/triggers`);
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
        const { year, month, day } = item.time.date;
        const hour = item.time.hour.toString();
        const key = `${year}-${month}-${day} ${hour}`;

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
    <>
      {graphData && (
        <VictoryChart domainPadding={{ x: 20 }}>
          <VictoryAxis tickValues={Object.keys(graphData)} />
          <VictoryBar data={Object.entries(graphData).map(([hour, quantity]) => ({ hour, quantity }))} x="hour" y="quantity" />
        </VictoryChart>
      )}
    </>
  );
}

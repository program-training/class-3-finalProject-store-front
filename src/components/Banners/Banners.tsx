import axios from "axios";
import "./banner.css";
import { useEffect, useState } from "react";

export default function Banners(prop: { categoryName: string }) {
  const [banner, setBanner] = useState<string>("");
  useEffect(() => {
    async function getBanner() {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_BANNERS}/banner/api/getBanner/?categoryName=${prop.categoryName}&location=top`);
        if (result.statusText !== "OK") {
          throw result;
        }
        setBanner(result.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    }
    getBanner();
  }, []);

  return <iframe id="banner" src={banner} />;
}

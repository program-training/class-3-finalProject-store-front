import axios from "axios";
import "./banner.css";
import { useEffect, useState } from "react";

export default function Banners(prop?: string) {
  const [banner, setBanner] = useState<string>("");
  useEffect(() => {
    async function getBanner() {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_BANNERS}/api/banner/${prop}`);
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

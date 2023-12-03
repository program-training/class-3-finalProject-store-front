import "./banner.css";

export default function Banners(prop: { categoryName: string }) {
  return <iframe id="banner" src={`${import.meta.env.VITE_BASE_BANNERS}/banner/getBanner/?categoryName=${prop.categoryName}&location=top`}></iframe>;
}

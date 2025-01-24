import { PolygonData } from "../ScatterChart";
type Props = {
    polygon: PolygonData;
    exportPointsInPolygon: (polygon: PolygonData) => void; 
};

const ExportPolygon = ({ polygon, exportPointsInPolygon }: Props) => {
    return (
        <button
            onClick={() => exportPointsInPolygon(polygon)}
            className="mb-2 py-2 w-full bg-[#007bff] hover:bg-[#edeef2] font-semibold text-[0.75rem] text-white hover:text-[#007bff] text-center rounded-lg cursor-pointer"
        >
            導出範圍內細胞數據
        </button>
    );
}

export default ExportPolygon
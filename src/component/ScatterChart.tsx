import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import PolygonLabel from "./polygonInfoSection/PolygonLabel";
import PolygonBorderColor from "./polygonInfoSection/PolygonBorderColor";
import PolygonDashStyle from "./polygonInfoSection/PolygonDashStyle";
import PolygonVisibility from "./polygonInfoSection/PolygonVisibility";
import PolygonReorder from "./polygonInfoSection/PolygonReorder";
import ExportPolygon from "./polygonInfoSection/ExportPolygon";

export type PolygonData = {
    points: [number, number][];
    color: string;
    label: string;
    NumberCellsContain: number;
    isVisible: boolean;
    dashArray: string;
};

const ScatterChart = () => {
    const LOCAL_STORAGE_KEY = "polygons";
    const savedPolygons = localStorage.getItem(LOCAL_STORAGE_KEY);
    const [polygons, setPolygons] = useState<PolygonData[]>(
        savedPolygons ? JSON.parse(savedPolygons) : []
    );
    const [totalCells, setTotalCells] = useState<number>(0)
    const [isPolygonSelecting, setIsPolygonSelecting] = useState(false)
    const [polygonColor, setPolygonColor] = useState("#007bff");



    const svgRef = useRef<SVGSVGElement>(null);

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = window.innerWidth * 0.7
    const height = window.innerHeight * 0.56
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([200, 1000]).range([margin.right, innerWidth - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 1000]).range([innerHeight - 20, margin.bottom]);


    useEffect(() => {
        d3.csv("/CD45_pos.csv").then((data) => {

            setTotalCells(data.length)

            const svg = d3.select(svgRef.current)

            const chart = svg.select("#chart").attr("transform", `translate(${margin.left},${margin.top})`);

            chart.selectAll('circle')
                .data(data)
                .join('circle')
                .attr("cx", d => xScale(+d['CD45-KrO']))
                .attr('cy', d => yScale(+d['SS INT LIN']))
                .attr('r', 3)
                .attr('fill', '#ececec')

            chart.append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("font-size", "12px");

            chart.append("g")
                .call(
                    d3.axisLeft(yScale).tickValues([0, 200, 400, 600, 800, 1000])
                )
                .selectAll("text")
                .style("font-size", "12px");

            chart.selectAll(".domain").remove();

            chart.append("text").text()

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", margin.top)
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .style("font-weight", "bold")
                .text("Cell Distribution (CD45+)");

            // Add x-axis label
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height - margin.bottom / 4)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .text("CD45-KrO");

            // Add y-axis label
            svg.append("text")
                .attr("x", -innerHeight / 2)
                .attr("y", margin.left / 4)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .text("SS INT LIN");


            let clickedPoints: [number, number][] = [];

            const lineGenerator = d3.line<[number, number]>();
            const linePath = chart
                .append("path")
                .attr("fill", "none")
                .attr("stroke", polygonColor)
                .attr("stroke-width", 2);



            svg.on("click", function (event) {
                if (!isPolygonSelecting) return

                const [x, y] = d3.pointer(event, svgRef.current);
                const adjustedX = x - margin.left;
                const adjustedY = y - margin.top;

                clickedPoints.push([adjustedX, adjustedY]);
                linePath.attr("d", lineGenerator(clickedPoints));

                if (clickedPoints.length > 0) {
                    const distance = Math.sqrt(
                        Math.pow(adjustedX - clickedPoints[0][0], 2) +
                        Math.pow(adjustedY - clickedPoints[0][1], 2)
                    );
                    if (distance < 5 && clickedPoints.length > 2) {
                        clickedPoints.push(clickedPoints[0]);

                        const polygon = [...clickedPoints]
                        const cellsInPolygon = data.filter(d => {
                            const px = xScale(+d["CD45-KrO"]);
                            const py = yScale(+d["SS INT LIN"]);
                            return d3.polygonContains(polygon, [px, py]);
                        })

                        const newPolygon = {
                            points: [...clickedPoints],
                            color: polygonColor,
                            label: `Polygon ${polygons.length + 1}`,
                            NumberCellsContain: cellsInPolygon.length,
                            isVisible: true,
                            dashArray: "none",
                        };


                        setPolygons((prev) => [...prev, newPolygon]);
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...polygons, newPolygon]));
                        clickedPoints = [];
                        linePath.attr("d", null);
                        return;
                    }
                }
            });
        });
    }, [polygonColor, polygons, isPolygonSelecting]);


    const toggleIsPolygonSelecting = () => setIsPolygonSelecting(!isPolygonSelecting)

    const handleLabelChange = (index: number, label: string) => {
        const updatedPolygons = [...polygons];
        updatedPolygons[index].label = label;
        setPolygons(updatedPolygons);
    };

    const handleColorChange = (index: number, color: string) => {
        const updatedPolygons = [...polygons];
        updatedPolygons[index].color = color;
        setPolygons(updatedPolygons);
    };

    const handleDashArrayChange = (index: number, dash: string) => {
        const updatedPolygons = [...polygons];
        updatedPolygons[index].dashArray = dash;
        setPolygons(updatedPolygons);
    };

    const handleDeletePolygon = (index: number) => {
        const updatedPolygons = polygons.filter((_, i) => i !== index);
        setPolygons(updatedPolygons);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPolygons));
    };

    const togglePolygonVisibility = (index: number) => {
        const updatedPolygons = [...polygons]
        updatedPolygons[index].isVisible = !updatedPolygons[index].isVisible;
        setPolygons(updatedPolygons);
    }

    const handleReorderPolygon = (index: number, direction: "up" | "down") => {
        const updatedPolygons = [...polygons];

        console.log(updatedPolygons)

        // 判斷目標索引是否可移動
        if (direction === "down" && index > 0) {
            // 與上方多邊形交換
            [updatedPolygons[index], updatedPolygons[index - 1]] =
                [updatedPolygons[index - 1], updatedPolygons[index]];
        } else if (direction === "up" && index < updatedPolygons.length - 1) {
            // 與下方多邊形交換
            [updatedPolygons[index], updatedPolygons[index + 1]] =
                [updatedPolygons[index + 1], updatedPolygons[index]];
        }

        setPolygons(updatedPolygons);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPolygons));
    };

    const exportPointsInPolygon = (polygon: PolygonData) => {
        d3.csv("/CD45_pos.csv").then((data) => {
            const pointsInPolygon = data.filter((d: any) => {
                const px = xScale(+d["CD45-KrO"]);
                const py = yScale(+d["SS INT LIN"]);
                return d3.polygonContains(polygon.points, [px, py]);
            });
            console.log(pointsInPolygon)
            console.log(polygon.points)

            if (pointsInPolygon.length === 0) {
                alert("多邊形內沒有數據點！");
                return;
            }

            const columns = Object.keys(pointsInPolygon[0]);
            const csvHeader = columns.join(",");
            const csvRows = pointsInPolygon.map((point: any) =>
                columns.map(column => point[column]).join(",")
            );
            const csvContent = [csvHeader, ...csvRows].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${polygon.label}_points.csv`;
            link.click();
            URL.revokeObjectURL(url);
        });
    };


    return (
        <div className="flex items-start gap-8 w-full h-full">
            <svg
                ref={svgRef}
                className="w-[70%] h-[80%]">
                <g id="chart"></g>
                <g id="polygons">
                    {polygons.map((polygon, index) => {
                        if (!polygon.isVisible) return null;

                        const adjustedPoint = polygon.points.map(([x, y]) => [x + margin.left, y + margin.top]) as [number, number][]
                        const polygonCentroid = d3.polygonCentroid(adjustedPoint);

                        return (
                            <g id={`polygon-${polygon.label}`} key={index}>
                                <path
                                    key={index}
                                    d={d3.line<[number, number]>()(adjustedPoint)!}
                                    fill="none"
                                    stroke={polygon.color}
                                    strokeWidth={2}
                                    strokeDasharray={polygon.dashArray}
                                />
                                <text
                                    x={polygonCentroid[0]}
                                    y={polygonCentroid[1]}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    style={{ fontSize: "12px", fill: polygon.color }}
                                >
                                    {polygon.label}
                                </text>
                            </g>

                        )
                    })}
                </g>
            </svg>
            <div className="flex flex-col w-[20%] h-[80%] overflow-y-scroll" id="polygon-controls">
                <h2 className="font-bold text-[1.25rem] ">Arbitrary Polygon Gating Info</h2>
                <div className="flex flex-col justify-center  gap-2 mt-4">
                    <div className={`py-2 w-full bg-[#007bff] hover:bg-[#edeef2] font-semibold text-[1rem] text-white hover:text-[#007bff] text-center rounded-lg cursor-pointer`} onClick={toggleIsPolygonSelecting}>{isPolygonSelecting ? "Stop" : "Start"}</div>
                    <h3 className="text-[0.75rem] ">點擊按鈕在圖表框選多邊形細胞範圍</h3>
                </div>
                <div className="flex  items-center gap-2 my-4">
                    <h3 className="text-[0.75rem]">
                        點選初始多邊形選擇框的顏色
                    </h3>
                    <input
                        id="colorPicker"
                        type="color"
                        value={polygonColor}
                        onChange={(e) => setPolygonColor(e.target.value)}
                    />
                </div>
                <h3 className="text-[0.75rem] mb-2">選取完多邊形後，以下會出現範圍內細胞資料</h3>
                <div className=" flex flex-col gap-4 ">
                    {polygons.map((polygon, index) => (
                        <div key={index} className={`px-4 py-2 border-2 rounded-[20px]`} style={{ order: polygons.length - index }} id="polygon-control">
                            <div className="flex justify-between items-center mb-3">
                                <PolygonLabel
                                    index={index}
                                    label={polygon.label}
                                    handleLabelChange={handleLabelChange}
                                />
                                <div
                                    className="relative w-4 h-4 cursor-pointer"
                                    onClick={() => handleDeletePolygon(index)}
                                >
                                    <div className="absolute w-full h-[2px] bg-black rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute w-full h-[2px] bg-black -rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.375rem]">
                                <p className="text-[0.75rem]">選取細胞數量:  {polygon.NumberCellsContain}</p>
                                <p className="text-[0.75rem]">選取細胞比例:  {(polygon.NumberCellsContain / totalCells * 100).toFixed(1)}%</p>
                                <PolygonBorderColor
                                    index={index}
                                    color={polygon.color}
                                    handleColorChange={handleColorChange}
                                />
                                <PolygonDashStyle
                                    index={index}
                                    dashArray={polygon.dashArray}
                                    handleDashArrayChange={handleDashArrayChange}
                                />
                                <PolygonVisibility
                                    index={index}
                                    isVisible={polygon.isVisible}
                                    togglePolygonVisibility={togglePolygonVisibility}
                                />
                                <PolygonReorder
                                    index={index}
                                    totalPolygons={polygons.length}
                                    handleReorderPolygon={handleReorderPolygon}
                                />
                                <ExportPolygon
                                    polygon={polygon}
                                    exportPointsInPolygon={exportPointsInPolygon}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScatterChart;






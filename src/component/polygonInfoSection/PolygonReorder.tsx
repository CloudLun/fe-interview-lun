type Props = {
    index: number; // 多邊形的索引
    totalPolygons: number; // 總多邊形數量，用於顯示層級順序
    handleReorderPolygon: (index: number, direction: "up" | "down") => void; // 處理重新排序的函數
};

const PolygonReorder= ({ index, totalPolygons, handleReorderPolygon }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <h3 className="text-[0.75rem]">層級順序</h3>
            <button
                onClick={() => handleReorderPolygon(index, "up")}
                className="px-1 py-1 text-[0.7rem] bg-gray-200 rounded"
            >
                + 上移
            </button>
            <h3 className="text-[0.75rem]">{totalPolygons - index}</h3>
            <button
                onClick={() => handleReorderPolygon(index, "down")}
                className="px-1 py-1 text-[0.7rem] bg-gray-200 rounded"
            >
                - 下移
            </button>
        </div>
    );
};

export default PolygonReorder;

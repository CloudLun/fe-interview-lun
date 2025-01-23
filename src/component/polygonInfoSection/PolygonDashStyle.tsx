type Props = {
    index: number; // 多邊形的索引
    dashArray: string; // 當前多邊形的虛線樣式
    handleDashArrayChange: (index: number, dash: string) => void; // 處理虛線樣式變更的方法
};

const PolygonDashStyle = ({ index, dashArray, handleDashArrayChange }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-[0.75rem]">虛線樣式</p>
            <select
                value={dashArray}
                onChange={(e) => handleDashArrayChange(index, e.target.value)} // 傳入 index 和新的虛線樣式
                className="px-2 py-1 text-[0.75rem] border-2 rounded-lg"
            >
                <option value="none">實線</option>
                <option value="5,5">短虛線</option>
                <option value="10,5">長虛線</option>
                <option value="2,2">點線</option>
            </select>
        </div>
    );
};

export default PolygonDashStyle;
type Props = {
    index: number; // 多邊形的索引
    color: string; // 當前多邊形的顏色
    handleColorChange: (index: number, color: string) => void; // 處理顏色變更的方法
};

const PolygonBorderColor = ({ index, color, handleColorChange }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-[0.75rem]">多邊形邊框顏色</p>
            <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)} // 傳入 index 和新的顏色值
                className="curosr-pointer"
            />
        </div>
    );
};

export default PolygonBorderColor;
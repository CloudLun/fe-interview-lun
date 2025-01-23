
type Props = {
    index: number;
    isVisible: boolean;
    togglePolygonVisibility: (index: number) => void;
};

const PolygonVisibility = ({ index, isVisible, togglePolygonVisibility }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <div className="text-[0.75rem]">顯示</div>
            <div
                className={`flex items-center ${
                    isVisible ? "justify-start" : "justify-end"
                } bg-[#edeef2] px-[2px] w-8 h-4 rounded-[20px] cursor-pointer`}
                onClick={() => togglePolygonVisibility(index)}
            >
                <div className="w-3 h-3 bg-[#8e8e91] rounded-full"></div>
            </div>
            <div className="text-[0.75rem]">隱藏</div>
        </div>
    );
};

export default PolygonVisibility;

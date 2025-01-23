
type Props = {
    index: number;
    label: string;
    handleLabelChange: (index: number, value: string) => void;
};

const PolygonLabel = ({ index, label, handleLabelChange }: Props) => {
    return (
        <div>
            <input
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                className="font-semibold text-[1.25rem]"
            />
            <h3 className="text-[0.5rem] text-gray-600">點擊文字框編輯標籤</h3>
        </div>
    );
};

export default PolygonLabel;
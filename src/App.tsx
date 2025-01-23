import { useState } from "react";
import ScatterChart from "./component/scatterChart";

function App() {

  const [color, setColor] = useState("#007bff");

  return (
    <div
      className="flex items-center justify-center px-8 w-[100vw] h-[100vh]">
      {/* <div className="mb-4">
        <label className="mr-2" htmlFor="colorPicker">
          Polygon Color:
        </label>
        <input
          id="colorPicker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div> */}
      <ScatterChart defaultColor={color}/>
    </div>
  );
}

export default App;
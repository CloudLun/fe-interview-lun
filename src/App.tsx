import ScatterChart from "./component/ScatterChart";

function App() {



  return (
    <div
      className="px-8 w-[100vw] h-[100vh]">
      <div className="pt-6 mb-20">
        <h1 className=" font-bold text-[1.5rem]">流式細胞儀（Flow Cytometry）數據分析工具</h1>
        <p>如何開始：點擊右下方 Start 按鈕來開始於框出多邊形細胞選取範圍</p>
      </div>
      <ScatterChart/>
    </div>
  );
}

export default App;
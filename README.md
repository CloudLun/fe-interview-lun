# Flow Cytometry Data Analysis Tool: 流式細胞儀數據分析的前端應用工具

<img width="1920" alt="Image" src="https://github.com/user-attachments/assets/1ccc33a0-b49c-4835-9b35-5c1ad9740c23" />

## 簡介
這是一個用於流式細胞儀（Flow Cytometry）數據分析的前端應用，主要應用於醫學實驗室中的血液細胞分析，目的是協助醫師和研究人員有效識別及分類不同類型的血球。

## 工具特點
1. **互動式繪圖**：用戶可通過點擊自由繪製多邊形。
2. **多邊形動態樣式更改**：
   - 編輯多邊形標籤名稱
   - 修改多邊形邊框顏色
   - 選擇虛線樣式（實線、短虛線、長虛線或點線）
   - 切換顯示或隱藏多邊形模式
   - 點選移動多邊形疊加順序
3. **本地存儲支持**：繪製的多邊形將保存到 `localStorage`，方便用戶刷新頁面後恢復數據。
4. **導出數據**：導出多邊形範圍細胞數據 csv 檔案


## 安裝步驟
1.克隆專案到本地
```bash
git clone <https://github.com/CloudLun/fe-interview-lun.git>
```
2.安裝所有依賴：
```
npm install
# 或者使用 yarn
yarn install
```
3.啟動開發伺服器：
```
npm run dev
# 或者使用 yarn
yarn dev
```
4. 瀏覽器訪問 localhost 網址，即可查看應用

## 文件結構
```
plaintext
src/
├── component/
│   └── ScatterChart.tsx # 多邊形圖表組件
│   └── polygonInfoSection   # 多邊形圖表樣式組件
│        └── ExportPolygon.tsx
│        └── PolygonBorderColor.tsx
│        └── PolygonLabel.tsx
│        └── PolygoReorder.tsx
│        └── PolygonVisbility.tsx
│
├── app.tsx         # React 根組件
├── main.tsx         # React 應用入口
├── vite.config.ts   # Vite 配置文件
└── index.html   # HTML 應用入口

public/
├── data/
│   └── CD45_pos_public.csv  # 細胞數據
```
## 使用方法
### 繪製多邊形
1. 點擊 `Start` 按鈕進入多邊形繪製模式。
2. 在圖表上點擊來繪製多邊形的頂點。
3. 最後頂點為起點來閉合多邊形完成繪圖。
4. 多邊形繪製完成後，右側控制面板中查看範圍內的細胞數據。

### 導出數據
- 點擊「導出數據」按鈕來輸出多邊形範圍內的細胞資料

## 技術棧
- **React + TypeScript**
- **D3.js**
- **Tailwind CSS**
- **Vite**

## 聯繫方式
- Email: cloud830902@gmail.com

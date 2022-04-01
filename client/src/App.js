import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import config from "./config";
import Main from "./components/main/Main";
import Doc from "./components/doc/Doc";

function App() {
  const [data, setData] = useState(null);
  const [originData, setOriginData] = useState(null);
  const [backgroudColor, setBackgroundColor] = useState("");
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "apiCall");
    onValue(starCountRef, (snapshot) => {
      let logData = snapshot.val();
      let logArr = [];
      for (let el in logData) {
        logArr.push(logData[el]);
      }
      let background = logArr.pop();
      setBackgroundColor(background.color);
      setData(logArr);
      setOriginData(logArr);
    });
  }, []);

  const changeData = (data) => {
    setData(data);
  };

  const changeBackground = (color) => {
    set(ref(db, "apiCall/background"), {
      color,
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              data={data}
              originData={originData}
              changeData={changeData}
              changeBackground={changeBackground}
              setBackgroundColor={setBackgroundColor}
              backgroudColor={backgroudColor}
            />
          }
        ></Route>
        <Route path="/doc" element={<Doc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

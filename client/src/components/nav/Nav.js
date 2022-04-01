import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import "./Nav.css";

function Nav({ changeData, originData, changeBackground, backgroudColor }) {
  const [serch, setSerch] = useState("");
  const [changeColor, setChangeColor] = useState(false);
  const [color, setColor] = useColor("hex", "#ccc");

  const filter = (originData, serch) => {
    let result = [];
    if (serch) {
      originData.map((el) => {
        for (let key in el) {
          if (typeof el[key] === "object") {
            let boolean = false;
            Object.keys(el[key]).map((addel) => {
              if (addel.includes(serch) || el[key][addel].includes(serch)) {
                result.push(el);
                boolean = true;
              }
            });
            if (boolean) {
              break;
            }
          }
          if (String(el[key]).includes(serch) && serch[0] === "#") {
            result.push(el);
            break;
          } else if (String(el[key]).includes(serch) && key !== "color") {
            result.push(el);
            break;
          }
        }
      });
      changeData(result);
    } else if (!serch) {
      changeData(originData);
    }
  };

  const dataReset = () => {
    changeData(originData);
    setSerch("");
  };

  return (
    <div className="nav_wrap">
      <button
        type="button"
        className="nav_btn"
        onClick={() => changeBackground("#006495")}
      >
        색상 초기화
      </button>
      {changeColor ? (
        <div className="color_picker">
          <ColorPicker
            width={280}
            height={100}
            color={color}
            onChange={setColor}
            hideHSV
            hideRGB
            dark
            className="color_picker"
          />
        </div>
      ) : null}
      {changeColor ? (
        <>
          <button
            type="button"
            className="nav_btn"
            onClick={() => setChangeColor(false)}
          >
            변경 취소
          </button>
          <button
            type="button"
            className="nav_btn"
            onClick={() => {
              setChangeColor(false);
              changeBackground(color.hex);
            }}
          >
            번경 완료
          </button>
        </>
      ) : (
        <button
          type="button"
          className="nav_btn"
          onClick={() => setChangeColor(true)}
        >
          색상 변경
        </button>
      )}
      <button type="button" onClick={dataReset} className="nav_btn">
        검색 초기화
      </button>
      <button
        type="button"
        onClick={() => filter(originData, serch)}
        className="nav_btn"
      >
        검색
      </button>
      <input
        type="text"
        value={serch}
        onChange={(e) => {
          setSerch(e.target.value);
          filter(originData, e.target.value);
        }}
      />
    </div>
  );
}
export default Nav;

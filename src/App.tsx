import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  CanvasProvider,
  useCanvas,
  CanvasContext,
  Svg as SvgType,
  SvgChild,
  ChildStyles
} from "./CanvasProvider";

const Circle = (props: ChildStyles.CircleStyles) => {
  console.log("child", props);
  return <circle {...props}>hey!</circle>;
};

// const Rectangle = ({ children }: any) => {
//   return <rect {...rectStyles} />;
// };

const components = { Circle };

// const svgs = {
//   "123": {
//     element: "Circle",
//     position: {
//       x: 500,
//       y: 500
//     },
//     childStyles: {
//       cx: 25,
//       cy: 20,
//       r: 20,
//       fill: "orange"
//     }
//   }
// };
const value = {};

type SvgProps = {
  svg: SvgType;
};

const Svg: React.FC<SvgProps> = ({ svg }) => {
  console.log("svg in here", svg);

  // @ts-ignore
  const element = components[svg.element];

  const [{ height, width }, setSize] = useState({ height: 500, width: 500 });
  const [scale, setScale] = useState(1);
  console.log("scale", scale);

  const handleSetScale = () => {
    setScale(curr => curr + 1);
    setSize(curr => ({ height: curr.height + 100, width: curr.width + 100 }));
  };

  return (
    <div>
      <button onClick={handleSetScale}>asd</button>
      <svg height={height} width={width} id="outer">
        {React.createElement(element, { key: "asd" }, svg)}
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const { zoom, svgs } = useCanvas();

  const canvasRef = React.useRef(null);

  console.log("svgs", svgs);

  return (
    <CanvasProvider>
      {/* <button
        onClick={e => {
          const canvas = canvasRef.current;
          if (canvas) {
            zoom && zoom(canvas, "123");
            const ctx = (canvas as any).getContext("2d");
            // @ts-ignore
          }
          // draw(ctx, { x: e.clientX, y: e.clientY });
        }}
      >
        Zoom
      </button> */}

      <CanvasContext.Consumer>
        {({ setSvgs, svgs }) => {
          if (svgs) {
            console.log("svgs", svgs);
            for (let svg in svgs) {
              const f: any = svgs[svg];
              // @ts-ignore
              const type = components[f.element];
              console.log("HEJ", f);
              console.log("HEJ DÅ", type);
              return <Svg svg={f} />;
              // return <Svg svg={f} />;
            }
            // console.log("svgs", svgs);
            // const mappableSvgs = Object.values(svgs);
            // console.log("mappableSvgs", mappableSvgs);
          }
        }}
      </CanvasContext.Consumer>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </CanvasProvider>
  );
};

export default App;

import React, { createContext, useEffect, useRef, useState } from "react";

export namespace ChildStyles {
  export type CircleStyles = {
    cx: number;
    cy: number;
    r: number;
    fill: string;
  };

  export interface RectStyles {
    width: number;
    height: number;
    style: string;
  }
}

export type ChildStyles = ChildStyles.RectStyles | ChildStyles.CircleStyles;

export type SvgChild = {
  element: string;
  position: {
    x: number;
    y: number;
  };
  childStyles: ChildStyles;
};

export type Svg = {
  [key: string]: SvgChild;
};

const circle: Svg = {
  "123": {
    element: "Circle",
    position: {
      x: 500,
      y: 500
    },
    childStyles: {
      cx: 25,
      cy: 20,
      r: 2,
      fill: "red"
    } as ChildStyles.CircleStyles
  }
};

const rect: Svg = {
  "1234": {
    element: "Rectangle",
    position: {
      x: 500,
      y: 500
    },
    childStyles: {
      style: "fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)",
      width: 300,
      height: 100
    } as ChildStyles.RectStyles
  }
};

export interface IPosContext {
  svgs: Svg;
  setSvgs: React.Dispatch<React.SetStateAction<Svg>>;
  zoom: (ctx: HTMLCanvasElement, id: string) => void;
}

const defaultSvgs = { ...circle, rect };

export const CanvasContext = createContext<Partial<IPosContext>>({});

export const CanvasProvider: React.FC<{}> = ({ children }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  //@todo Put app's canvas context here as ref

  const [autoSave, setAutoSave] = useState(true);
  const [svgs, setSvgs] = useState<Svg>(defaultSvgs);

  useEffect(() => {
    if (typeof svgs === "object") {
      if (svgs && Object.values(svgs).length % 3 === 0) {
        console.log("Save?");
      }
    }
  }, [svgs]);

  const zoom = (ctx: HTMLCanvasElement, id: string) => {
    // @ts-ignore

    const svgToUpdate = svgs[id];
  };

  const value: IPosContext = {
    svgs,
    setSvgs,
    zoom
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

export const CanvasConsumer = CanvasContext.Consumer;

export const useCanvas = () => {
  const ctx = React.useContext(CanvasContext);
  if (!ctx) {
    throw new Error("useCanvas must be within a CanvasProvider");
  }
  return ctx;
};

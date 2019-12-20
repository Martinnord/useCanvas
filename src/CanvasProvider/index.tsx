import React, { createContext, useEffect, useRef, useState } from "react";

const svgs = {
  "123": {
    name: "Red square",
    position: {
      x: 500,
      y: 500
    },
    childStyles: {
      cx: 25,
      cy: 20,
      r: 20,
      fill: "orange"
    }
  }
};

export interface IPosContext {
  svgs: object | null;
  setSvgs: React.Dispatch<React.SetStateAction<object | null>>;
}

export const CanvasContext = createContext<Partial<IPosContext>>({});

export const CanvasProvider: React.FC<{}> = ({ children }) => {
  const [autoSave, setAutoSave] = useState(true);
  const [svgs, setSvgs] = useState<IPosContext["svgs"]>(null);

  useEffect(() => {
    if (typeof svgs === "object") {
      if (svgs && Object.values(svgs).length % 3 === 0) {
        console.log("Save?");
      }
    }
  }, [svgs]);

  const value: IPosContext = {
    svgs: null,
    setSvgs
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

export const PosConsumer = CanvasContext.Consumer;

export const useCanvas = () => {
  const ctx = React.useContext(CanvasContext);
  if (!ctx) {
    throw new Error("useCanvas must be within a CanvasProvider");
  }
  return ctx;
};

import React, { createContext } from "react";
import { ITheme } from "../types/theme";

interface IContext {
   theme: ITheme;
   setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}

export const ctx = createContext<IContext>({} as IContext);

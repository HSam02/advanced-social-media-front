import { createContext } from "react";

const TextareaContext =
  createContext<React.RefObject<HTMLTextAreaElement> | null>(null);

export default TextareaContext;

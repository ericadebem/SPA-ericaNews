import React from "react";
import { ButtonSpace } from "./ButtonStyled.tsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; 
  text: string;
  children?: React.ReactNode;
}

export function Button({ type = "button", text, children }: ButtonProps) {
  return <ButtonSpace type={type}>{text || children}</ButtonSpace>;
}

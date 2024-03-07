import { InputSpace } from "./InputStyled.tsx";
import { useRef } from "react";
import { RegisterOptions } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: (rules?: RegisterOptions) => void;
}

export function Input({ type, placeholder, name, register }: InputProps) {
  // Crie uma ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Registre a ref usando a função de registro
  register && register();

  return (
    <InputSpace
      type={type}
      placeholder={placeholder}
      name={name}
      ref={inputRef}
    />
  );
}


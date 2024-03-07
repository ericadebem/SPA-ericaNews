import { ButtonSpace } from "./ButtonStyled.tsx";

export function Button({ type, text }) {
  return <ButtonSpace type={type}>{text}</ButtonSpace>;
}
import { Link, Outlet, Search, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../img/logoEN.png";
import {
  ErrorSpan,
  ImageLogo,
  InputSpace,
  Nav,
  UserLoggedSpace,
} from "./NavbarStyled.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button.tsx";
import { searchSchema } from "../../schemas/searchSchema.tsx";
import { userLogged } from "../../Services/userServices.tsx";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext.tsx";


interface SearchData {
  title: string;
}


export function Navbar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function onSearch(data: SearchData) {
    const { title } = data;
    navigate(`/search/${title}`);
    reset();
  }
  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function signout() {
    Cookies.remove("token");
    setUser(undefined);
    navigate("/");
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, [findUserLogged]);
  
  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSearch)}>
          <InputSpace>
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>

            <input
              {...register("title")}
              type="text"
              placeholder="Search for a title"
            />
          </InputSpace>
        </form>

        <Link to="/">
          <ImageLogo src={logo} alt="Logo Erica News" />
        </Link>

        {user ? (
          <UserLoggedSpace>
            <Link to="/profile">
              <h2>{user.name}</h2>
            </Link>

            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <Link to="/auth">
            <Button type="button" text="Enter">
              Entrar
            </Button>
          </Link>
        )}
      </Nav>
      {errors.title && typeof errors.title.message === 'string' && (
  <ErrorSpan>{errors.title.message}</ErrorSpan>
)}
      <Outlet />
    </>
  );
}
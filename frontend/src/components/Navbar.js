import "./Navbar.css";

//components
import { NavLink, Link } from 'react-router-dom'
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsCameraFill,
  BsPersonFill
} from 'react-icons/bs';

//hooks
import {logout,reset} from '../slices/authSlice'

import { useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handlerLogout = () =>{
    dispatch(logout());
    dispatch(reset());
    navigate("/login")
 } 

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" />
      </form>
      <ul id="nav-links">

        {auth ? (
          <>
            <li><NavLink to="/">
              <BsHouseDoorFill />
            </NavLink></li>
            {user && (
              <li> <NavLink to={`user/${user._id}`}> 
                  <BsCameraFill/>
                 </NavLink> </li>
            )}
            <li>
              <NavLink to="porfile">
                <BsPersonFill/>
              </NavLink>
            </li>
            <li><span onClick={handlerLogout}>Sair</span></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Entrar</NavLink></li>
            <li><NavLink to="register">Cadastrar</NavLink></li>

          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
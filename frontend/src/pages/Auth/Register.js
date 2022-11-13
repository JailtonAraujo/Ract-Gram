import "./Auth.css"

//components
import { Link } from 'react-router-dom';
import Message from "../../components/Message";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


//redux
import {register, reset} from '../../slices/authSlice'

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmepassword] = useState("");

  const dispath = useDispatch()
  
  const {loading, error} = useSelector((sate) => sate.auth);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmpassword
    };

    console.log(user);

    dispath(register(user));
  };

  //clean all auth states
  useEffect(()=>{
    dispath(reset());
  },[dispath]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle"> Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handlerSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmepassword(e.target.value)} value={confirmpassword || ""} />
       {!loading && <input type="submit" value="Cadastrar"/>}
       {loading && <input type="submit" value="Aguarde" disabled/>}
       {error && <Message msg={error} type="error"/>}

      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register
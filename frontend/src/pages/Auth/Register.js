import "./Auth.css"

//components
import { Link } from 'react-router-dom';

//hooks
import { useState, useEffect } from "react";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmePassword
    };

    console.log(user);
  };

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle"> Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handlerSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmePassword(e.target.value)} value={confirmePassword || ""} />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register
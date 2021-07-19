import React, { FormEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export function Header(){
   const [login, setLogin] = useState<string>();
   function handleSubmit(f : FormEvent){
      
   }
   useEffect(() => {
      setLogin(
         sessionStorage.getItem('receitas/login') || undefined
      )
   }, []);

   return (
      <header className="header">
         <h2>Receitas da 👩‍🍳</h2>
         <div className="form">
            <form onSubmit={handleSubmit}>
               <input type="search" placeholder="Pesquise Aqui" />
               <button type="submit"><FiSearch size={20} color="#444"/></button>
            </form>
         </div>
         { login ? (
            <div className="perfil">
               <Link to="/">{login}</Link>
               <Link to="/login">Sair</Link>
            </div>
         ) : (
            <div className="perfil">
               <Link to="/login">Login</Link>
               <Link to="/registrar">Cadastrar</Link>
            </div>
         )}
      </header>
   );
}
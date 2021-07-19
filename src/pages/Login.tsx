import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { api, User } from '../services/api';
import '../styles/login.css';

export function Login(){
   const history = useHistory();
   sessionStorage.clear();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


   async function onLogin(f : FormEvent){
      f.preventDefault();
      const data = {
         email,
         password
      };
      
      const token = await api.get('token')
      .then(res => res.data)
      .catch(() => null);

      if(token){
         const isLogin = await api({
            method: 'post',
            url: 'api/login',
            data,
            headers: { 'X-CSRF-TOKEN' : token }
         })
         .then(res => res.data as User)
         .catch(() => null);
         if(isLogin){
            sessionStorage.setItem('receitas/login', isLogin.name);
            history.push('/');
         }
         else
            alert('Email e/ou senha invalidos!');
      }
      else
         alert('Não foi possivel se cadastrar');
   }

   return (
      <>
         <Header/>
         <div className="login">
            <form onSubmit={onLogin} className="form-login">
               <h2>Receitas da 👨🏻‍🍳</h2>
               
               <div className="divemail">
                  <label htmlFor="email">Email</label>
                  <input 
                     type="email" 
                     value={email} 
                     id="email" 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder="Seu E-mail" 
                     required
                  />
               </div>

               <div className="divsenha">
                  <label htmlFor="senha">Senha</label>
                  <input 
                     type="password" 
                     id="senha" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                     placeholder="Sua Senha" 
                     required
                  />
               </div>

               <div className="btn">
                  <button type="submit" className="btn-entrar">Entrar</button>
                  <Link to="/registrar"  className="btn-registrar">Registrar</Link>
               </div>

               <Link to="/mandaremail" className="esqsenha">Esqueceu a Senha?</Link>
            </form>
         </div>
      </>
   );
}
import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { api, User } from '../services/api';
import '../styles/registrer.css';

export function Registrer(){
   const history = useHistory();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function onRegistre(f : FormEvent){
      f.preventDefault();
      const data = {
         name,
         email,
         password
      };

      const token = await api.get('token')
      .then(res => res.data)
      .catch(() => null);

      if(token){
         const newUser = await api({
            method: 'post',
            url: 'api/users',
            data,
            headers: { 'X-CSRF-TOKEN' : token }
         })
         .then(res => res.data as User)
         .catch(() => null);
         if(newUser){
            alert('Salvo com Sucesso!');
            sessionStorage.setItem('receitas/login', newUser.name);
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
         <div className="registrar">
            <form onSubmit={onRegistre} className="form-registrar">
               <h2>Receitas da 👨🏻‍🍳</h2>
               
               <div className="divnome">
                     <label htmlFor="nome">Nome</label>
                     <input 
                        type="text" 
                        value={name || ""} 
                        id="nome" 
                        onChange={({target: {value}}) => setName(value)}
                        required
                     />
               </div>

               <div className="divemail">
                     <label htmlFor="email">Email</label>
                     <input 
                        type="email" 
                        value={email || ""} 
                        onChange={({target: {value}}) => setEmail(value)} 
                        id="email" 
                        required
                     />
               </div>
               <div className="divsenha">
                     <label htmlFor="senha">Senha</label>
                     <input 
                        type="password" 
                        value={password} 
                        onChange={({target: {value}}) => setPassword(value)}
                        id="senha"
                        required
                     />
               </div>

               <div className="btn">
                     <button type="submit" className="btn-entrar">Registrar</button>
                     <Link to="/login"  className="btn-registrar">Entrar</Link>
               </div>
            </form>
         </div>
      </>
   );
}
import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { api } from '../services/api';

import '../styles/write.css';

export function Write(){
   const [name, setName] = useState('');
   const [imagem, setImagem] = useState<File | null>();
   const [descricao, setDescricao] = useState('');
   const [texto, setTexto] = useState('');

   async function handleSubmit(f : FormEvent){
      f.preventDefault();
      const data = new FormData();
      data.append('name', name);
      imagem && data.append('imagem', imagem);
      data.append('descricao', descricao);
      data.append('texto', texto);
      const token = await api.get('token')
      .then(res => res.data)
      .catch(() => null);
      if(token){
         const newRecipes = await api({
            method: 'post',
            url: 'api/recipes',
            data,
            headers: { 'X-CSRF-TOKEN' : token }
         })
         .then(res => res.data)
         .catch(err => {
            console.log(err);
            return null;
         });

         if(newRecipes){
            alert('Criado com Sucesso!');
            console.log(newRecipes);
         }else
            alert('Não foi possivel criar');
      }
      else
         alert('Token Vazio');


   }

   return (
      <>
         <Header/>
         <div className="write">
            <h2>Nova Receita</h2>
            <form onSubmit={handleSubmit}>
               <div className="col">
                  <label htmlFor="nome">Nome da Receita</label>
                  <input 
                     type="text" 
                     id="nome" 
                     required
                     onChange={({target: {value}}) => setName(value)}
                  />
               </div>
               <div className="col">
                  <label htmlFor="imagem">Imagem</label>
                  <input 
                     type="file" 
                     id="imagem"
                     onChange={({target: {files}}) => setImagem(files && files[0]) }
                     required
                  />
               </div>
               <div className="col">
                  <label htmlFor="descricao">Descrição da Receita</label>
                  <textarea 
                     id="descricao" 
                     cols={40} 
                     rows={5} 
                     required
                     onChange={({target: {value}}) => setDescricao(value)}
                  />
               </div>
               <div className="receita col">
                  <label htmlFor="Receita">Receita</label>
                  <textarea 
                     id="receita" 
                     cols={40} 
                     rows={10} 
                     required 
                     onChange={({target: {value}}) => setTexto(value)}
                  />
               </div>
               <button type="submit">📔 Criar Receita</button>
            </form>
         </div>
      </>
   );
}
import React, { useState } from "react"; 
import { FiStar } from "react-icons/fi";
import { Header } from "../components/Header";
import { api, Recipes } from "../services/api";
import '../styles/recipes.css';

interface RecipesProps{
   location : {
      state : Recipes;
  };
}

export function RecipesDetail({location : {state}} : RecipesProps){
   const [avaliacao, setAvaliacao] = useState<number>(1);

   async function onAvaliable(){
      console.log('Passou');
      const token = await api.get('token')
      .then(res => res.data)
      .catch(() => null);
      if(token){
         const newUser = await api({
            method: 'put',
            url: `api/recipes/${state.id}`,
            data : {avaliacao},
            headers: { 'X-CSRF-TOKEN' : token }
         })
         .then(res => res.data)
         .catch(err => console.log(err));
         if(newUser){
            alert('Avaliado com Sucesso!');
         }
         else
            alert('Não foi possivel avaliar!');
      }
      else
         alert('Não foi possivel se cadastrar');
   }

   return (
      <>
         <Header/>
         <div className="recipesDetail">
            <h1>{state.name}</h1>
            <img src={state.imagem} alt={state.name} />
            <p className="descricao">{state.descricao}</p>
            <p className="texto">{state.texto}</p>

            <div className="avaliacao">
               <p className="label">Avaliar: </p>
                  <FiStar 
                     size={25} 
                     onMouseMove={() => setAvaliacao(1)}
                     onClick= {onAvaliable} 
                     color={avaliacao > 0 ? '#fcc201' : '#748791'}
                  />
                  <FiStar 
                     size={25} 
                     onMouseMove={() => setAvaliacao(2)}
                     onClick= {onAvaliable} 
                     color={avaliacao > 1 ? '#fcc201' : '#748791'}
                  />
                  <FiStar 
                     size={25} 
                     onMouseMove={() => setAvaliacao(3)} 
                     color={avaliacao > 2 ? '#fcc201' : '#748791'}
                  />
                  <FiStar 
                     size={25} 
                     onMouseMove={() => setAvaliacao(4)}
                     onClick= {onAvaliable} 
                     color={avaliacao > 3 ? '#fcc201' : '#748791'}
                  />
                  <FiStar 
                     size={25} 
                     onMouseMove={() => setAvaliacao(5)}
                     onClick= {onAvaliable} 
                     color={avaliacao > 4 ? '#fcc201' : '#748791'}
                  />
            </div>
         </div>
      </>
   );
}
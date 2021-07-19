import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api, Recipes } from '../services/api';
import '../styles/home.css';

export function Home(){
   const [recipes, setRecipes] = useState<Recipes[]>();
   const [loading, setLoading] = useState(true);

   
   useEffect(() => {
      async function getRecipes(){
         const response = await api('api/recipes')
         .then(res => res.data)
         .catch(err => {
            console.log(err);
            return null;
         });
         setRecipes(response);
         setLoading(false);
      }
      getRecipes();
   }, []);

   return (
      <div className="home">
         <Header/>
         <h1>Receitas</h1>
         {loading && <Loading/>}
         <div className="recipes">
            {recipes?.map(r => (
               <Card data={r}/>
            ))}
         </div>
      </div>
   );
}
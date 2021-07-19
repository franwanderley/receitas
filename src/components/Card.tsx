import React from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Recipes } from '../services/api';
import '../styles/card.css';

interface CardProps{
   data: Recipes;
}

export function Card({data}: CardProps){
   return (
      <div className="card" key={data.id}>
         <img src={data.imagem} alt="Foto do Prato" />
         <div className="detail">
            <h3>{data.name}</h3>
            <p> {data.descricao} </p>
            <div className="footer">
               <div className="classificacao">
                  <FiStar size={20} color={data.avaliacao > 0 ? '#fcc201' : '#748791'}/>
                  <FiStar size={20} color={data.avaliacao > 1 ? '#fcc201' : '#748791'}/>
                  <FiStar size={20} color={data.avaliacao > 2 ? '#fcc201' : '#748791'}/>
                  <FiStar size={20} color={data.avaliacao > 3 ? '#fcc201' : '#748791'}/>
                  <FiStar size={20} color={data.avaliacao > 4 ? '#fcc201' : '#748791'}/>
               </div>
               <Link to={ {pathname: '/receitas', state: data} }>📔 Ver receita</Link>
            </div>
         </div>
      </div>
   );
}
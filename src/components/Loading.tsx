import React from 'react';
import Lottie from 'react-lottie';
import recipes from '../img/recipes-book.json'

export function Loading(){
   return (
      <div className="loading">
         <Lottie 
            options={{
               loop: true,
               autoplay: true,
               animationData: recipes,
            }}
            height={500}
            width={500}
         />
      </div>
   );
}
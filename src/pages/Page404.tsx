import React from 'react';
import Lottie from 'react-lottie';
import error404 from './../img/404-error.json';
import { useHistory } from 'react-router';

export function Page404(){
   const history = useHistory();

   return (
      <div style={{
         display: 'flex',
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
         textAlign: 'center'
      }}>
         <Lottie 
            options={{
               loop: true,
               autoplay: true,
               animationData: error404,
            }}
            height={500}
            width={500}
         />
         <h3 style={{marginBottom: '2%'}}>Pagina não encotrado!</h3>
         <button 
            onClick={() => history.push('/')}
            style={{
               padding: '1%',
               border: 'none',
               borderRadius: 6,               
               color: '#e1e2e3',
               backgroundColor: '#e81224',
               cursor: 'pointer',
            }}
         >
            Voltar para o começo
         </button>
      </div>
   );
}
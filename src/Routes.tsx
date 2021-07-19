import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Page404 } from './pages/Page404';
import { RecipesDetail } from './pages/RecipesDetail';
import { Registrer } from './pages/Registrer';
import { Write } from './pages/Write';

export default function Routes(){
   
   function isAuth(){
      const auth = sessionStorage.getItem('receitas/login');
      return auth ? true : false;
   }

   return (
       <BrowserRouter>
          <Switch>
               <Route path="/" component={Home} exact={true}/>
               <Route path="/login" component={Login} exact={true} />
               <Route path="/registrar" component={Registrer} exact={true} />
               {isAuth() ? (
                  <Route path="/escrever" component={Write} exact={true} />
               ) : (
                  <Route path="/escrever" component={Login} exact={true} />
               )}
               <Route path="/receitas" component={RecipesDetail} exact={true} />
               {/* <Route path="/campanha/:id" component={Campanha} exact={true} /> */}
              
               <Route path="*" component={Page404} exact={true}/>
          </Switch>
       </BrowserRouter>
   );
}

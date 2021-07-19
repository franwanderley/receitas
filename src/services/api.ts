import Axios from 'axios';

export interface User{
   id: number;
   name: string;
   email: string;
   password: string;
}

export interface Recipes{
   id: number;
   name: string;
   imagem: string;
   descricao: string;
   texto: string;
   avaliacao: number;
}

export const api = Axios.create({
   baseURL: process.env.REACT_APP_SERVER,
});
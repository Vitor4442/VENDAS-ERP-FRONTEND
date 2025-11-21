import { httpCliente } from "../http";
import {Produto} from 'app/app/models/produtos'
import { AxiosResponse } from "axios";

const resourceURl: string = "api/produtos"

export const useProdutoService = () =>{

    const salvar = async (produto: Produto): Promise<Produto> => {
        const response : AxiosResponse<Produto> = await httpCliente.post<Produto>(resourceURl, produto)
        return response.data;
    }

    return{
        salvar
    }
}
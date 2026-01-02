import { httpCliente } from "../http";
import {Produto} from 'app/app/models/produtos'
import { AxiosResponse } from "axios";

const resourceURl: string = "api/produtos"

export const useProdutoService = () =>{

    const salvar = async (produto: Produto): Promise<Produto> => {
        const response : AxiosResponse<Produto> = await httpCliente.post<Produto>(resourceURl, produto)
        return response.data;
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        const url = `${resourceURl}/${produto.id}`
        await httpCliente.put<Produto>(url, produto)
    }

    const carregarProduto = async (id: string): Promise<Produto> => {
        const url: string = `${resourceURl}/${id}`
        const response : AxiosResponse<Produto> = await httpCliente.get<Produto>(url)
        return response.data;
    }

    const deletar = async (id: string): Promise<void> => {
        const url: string = `${resourceURl}/${id}`
        await httpCliente.delete<void>(url)
    }

    return{
        salvar,
        atualizar,
        carregarProduto,
        deletar
    }
}
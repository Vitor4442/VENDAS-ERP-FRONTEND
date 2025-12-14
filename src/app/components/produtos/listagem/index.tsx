'use client';

import { Layout } from "app/components/layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import {Produto} from 'app/app/models/produtos'
import useSWR from "swr"
import { httpCliente } from "app/app/http"
import { AxiosResponse } from "axios"
import { Loader } from "app/components/common";

export const ListagemProdutos: React.FC = () => {

        const{ data: result, error} = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpCliente.get(url) )

        const editar = (produto:Produto) => {
            console.log (produto)
        }


        const deletar = (produto:Produto) => {
            console.log (produto)
        }

    return(
        <Layout titulo="Produtos">
            <Link href="/cadastros/produtos">
            <button className="button is-warning">Novo</button>
            </Link>
            <br /><br />
            <Loader show={!result}/>
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={result?.data || []}/>
        </Layout>
    )
}
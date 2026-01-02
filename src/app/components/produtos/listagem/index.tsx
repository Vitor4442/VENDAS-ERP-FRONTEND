'use client';

import { Layout } from "app/components/layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from 'app/app/models/produtos'
import useSWR from "swr"
import { httpCliente } from "app/app/http"
import { AxiosResponse } from "axios"
import { Loader } from "app/components/common";
import { useRouter } from "next/navigation";
import { useProdutoService } from "app/app/services";
import { useState } from "react";
import { Alert } from "app/components/common/message";

export const ListagemProdutos: React.FC = () => {
    const service = useProdutoService();
    const router = useRouter();
    const [mensagens, setMensagens] = useState<Array<Alert>>([])

    const { data: result, error, mutate } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', 
        (url: string) => httpCliente.get(url) 
    )

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        router.push(url)
    }

    const deletar = (produto: Produto) => {
        if (!produto.id) return;

        service.deletar(String(produto.id)).then(response => {
            setMensagens([{ tipo: 'success', texto: 'Produto deletado com sucesso!' }])
            mutate() 
        }).catch(err => {
            setMensagens([{ tipo: 'danger', texto: 'Erro ao deletar produto.' }])
        })
    } 

    return (
        <Layout titulo="Produtos" mensagens={mensagens}>
            <Link href="/cadastros/produtos">
                <button className="button is-warning">Novo</button>
            </Link>
            <br /><br />
     
            {!result && !error && <Loader show={true} />}
            
            {error && (
                <div className="notification is-danger">
                    Erro ao carregar produtos.
                </div>
            )}

            <TabelaProdutos 
                onEdit={editar} 
                onDelete={deletar} 
                produtos={result?.data || []} 
            />
        </Layout>
    )
}
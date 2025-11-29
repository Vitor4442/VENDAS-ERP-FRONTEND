import { Layout } from "app/components/layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import {Produto} from 'app/app/models/produtos'
export const ListagemProdutos: React.FC = () => {

    const produtos: Produto[] = [{
        id: "1", sku: "3232", nome: "Teste", preco: 234
    }]

    return(
        <Layout titulo="Produtos">
            <Link href="/cadastros/produtos">
            <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <TabelaProdutos produtos={produtos}/>
        </Layout>
    )
}
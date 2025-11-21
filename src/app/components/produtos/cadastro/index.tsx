"use client"

import { useProdutoService } from "app/app/services";
import { Input, Layout } from "app/components";
import { useState } from "react";
import { Produto } from 'app/app/models/produtos'
import { setMaxIdleHTTPParsers } from "http";

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string> ('')
    const [cadastro, setCadastro ] = useState<string>('')


    const submit = () => {
        const produto: Produto = {
            id: id,
            sku: sku,
            preco: parseFloat(preco),
            nome: nome,
            descricao: descricao
        }

        if(id){
            service
            .atualizar(produto).then(resposta => console.log("Atualizado"))
        }
        else{
            
            service
                .salvar(produto).then(produtoResposta =>  {
                setId(String(produtoResposta.id))
                setCadastro(String (produtoResposta.cadastro))
            })
        }

    }

    return (

        <Layout titulo="Produtos">
            { id &&
               <div className="columns">

                <Input label="Código: *" 
                columnClasses="is-half"
                value = {id}
                id="inputID"
                disabled={true}
                />

                <Input label="Data Cadastro: *" 
                columnClasses="is-half"
                value = {cadastro}
                id="inputDataCadastro"
                disabled={true}
                />
           </div>

            }
            <div className="columns">

                <Input label="SKU: *" 
                columnClasses="is-half"
                onChange={setSku}
                value = {sku}
                id="inputSKU"
                placeholder="Digite o SKU do Produto"
                />

                <Input label="Preço: *" 
                columnClasses="is-half"
                onChange={setPreco}
                value = {preco}
                id="inputPreco"
                placeholder="Digite o Preço do produto"
                />


           </div>
            <div className="columns">
            <Input label="Nome: *" 
                    columnClasses="is-full"
                    onChange={setNome}
                    value = {nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    />
           </div>

           <div className="field">
                <label className="label" htmlFor="inputDesc">Descrição: *</label>
                <div className="control"> 
                    <textarea className="textarea" 
                           id="inputDesc" value={descricao}
                           onChange={event => setDescricao(event.target.value)}
                           placeholder="Digite a Descrição detalhada do produto" />
                </div>
           </div>
           
           <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit}className="button">
                        
                            {id ? "Atualizar" : "Salvar"}
                         
                    </button>
                </div>
                <div className="control">
                    <button className="button">Voltar</button>
                </div>
           </div>

        </Layout>
    )
}
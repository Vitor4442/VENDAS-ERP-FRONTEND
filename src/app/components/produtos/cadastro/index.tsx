"use client"

import { useProdutoService } from "app/app/services";
import { Input, Layout, Message } from "app/components";
import { useState } from "react";
import { converterEmBigDecimal } from "app/app/util/money";
import { Produto } from 'app/app/models/produtos'
import { Alert } from "app/components/common/message";
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    sku: yup.string().required(),
    nome: yup.string().required(),
    descricao: yup.string().required(),
    preco: yup.number().required()
})

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string> ('')
    const [cadastro, setCadastro ] = useState<string>('')
    const [messages, setMessages] = useState<Array<Alert>>([]) 


    const submit = () => {
        const produto: Produto = {
            id: id,
            sku: sku,
            preco: converterEmBigDecimal(preco),
            nome: nome,
            descricao: descricao
        }
        
        validationSchema.validate(produto).then(obj => {
            
            if(id){
                service
                .atualizar(produto).then(resposta => {
                    setMessages([{
                        tipo: "success",
                        texto: "Produto atualizado com sucesso!"
                    }])
                })
            }
            else{
                
                service
                    .salvar(produto).then(produtoResposta =>  {
                    setId(String(produtoResposta.id))
                    setCadastro(String (produtoResposta.cadastro))
                    setMessages([{
                        tipo: "success",
                        texto: "Produto Salvo com sucesso!"
                    }])
                })
            }
        }).catch(err => {
            const field = err.path;
            const message = err.message;
            
            setMessages([{
                tipo: "danger",
                field,
                texto: message
            }])
        })

    }

    return (

        <Layout titulo="Produtos" mensagens={messages}>
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
                currency = {true}
                maxLength={16}
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
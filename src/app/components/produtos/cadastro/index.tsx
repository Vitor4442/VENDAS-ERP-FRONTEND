"use client"

import { useProdutoService } from "app/app/services";
import { Input, Layout, Message } from "app/components";
import { useState } from "react";
import { converterEmBigDecimal } from "app/app/util/money";
import { Produto } from 'app/app/models/produtos'
import { Alert } from "app/components/common/message";
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required("Campo Obrigatorio"),
    nome: yup.string().trim().required("Campo Obrigatorio"),
    descricao: yup.string().trim().required("Campo Obrigatorio"),
    preco: yup.number().required("Campo Obrigatorio").moreThan(0, "Valor deve ser maior que 0")
})

interface FormErros{
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string> ('')
    const [cadastro, setCadastro ] = useState<string>('')
    const [messages, setMessages] = useState<Array<Alert>>([]) 
    const [errors, setErrors] = useState<FormErros>({})


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
            
            setErrors({
                [field]: message
            })

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
                error={errors.sku}
                />

                <Input label="Preço: *" 
                columnClasses="is-half"
                onChange={setPreco}
                value = {preco}
                id="inputPreco"
                placeholder="Digite o Preço do produto"
                currency = {true}
                maxLength={16}
                error={errors.preco}
                />


           </div>
            <div className="columns">
            <Input label="Nome: *" 
                    columnClasses="is-full"
                    onChange={setNome}
                    value = {nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    error={errors.nome}
                    />
           </div>

           <div className="field">
                <label className="label" htmlFor="inputDesc">Descrição: *</label>
                <div className="control"> 
                    <textarea className="textarea" 
                           id="inputDesc" value={descricao}
                           onChange={event => setDescricao(event.target.value)}
                           placeholder="Digite a Descrição detalhada do produto"
                            />
                            <p className="help is-danger">{errors.descricao}</p>
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
"use client";

import { Layout } from "app/components/layout";
import {ClienteForm } from './form'
import { useState } from "react";
import { Cliente } from "app/app/models/clientes";


export const  CadastroClientes: React.FC = () => {  

    const [cliente, setCliente] = useState<Cliente>({});

    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente);
    }

    return (
        <Layout titulo="Clientes">
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>
    );
}
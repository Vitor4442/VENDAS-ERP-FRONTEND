import { Cliente } from 'app/app/models/clientes';
import { useFormik } from 'formik';

interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    dataCadastro: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    endereco: '',
    id: '',
    nome: '',
    telefone: '',
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {  

    const formik = useFormik<Cliente>({
        initialValues: {...cliente, ...formScheme },
        onSubmit,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input value={formik.values.nome} onChange={formik.handleChange} id= "nome" name="nome" />
            <button type="submit">Salvar</button>
        </form>
    );
}
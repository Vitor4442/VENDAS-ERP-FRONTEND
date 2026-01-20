import { Cliente } from 'app/app/models/clientes';
import { useFormik } from 'formik';
import { Input } from 'app/components/common';

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
    id: undefined,
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
                {formik.values.id &&
            <div className='columns'>
                <Input id="id" columnClasses='is-half' name='id' value={formik.values.id} label='Código: *' autoComplete='off' disabled/>
                <Input id="dataCadastro" columnClasses='is-half' name='dataCadastro' value={formik.values.dataCadastro} label='Data de Cadastro: *' autoComplete='off' disabled/>
            </div>
                }
            <div className='columns'>
                <Input id="nome" columnClasses='is-full' name='nome' onChange={formik.handleChange} value={formik.values.nome} label='Nome: *' autoComplete='off'/>
            </div>

            <div className='columns'>
                <Input id="cpf" columnClasses='is-half' name='cpf' onChange={formik.handleChange} value={formik.values.cpf} label='CPF: *' autoComplete='off'/>
                <Input id="dataNascimento" columnClasses='is-half' type='date' name='dataNascimento' onChange={formik.handleChange} value={formik.values.dataNascimento} label='Data de Nascimento: *' autoComplete='off'/>
            </div>

            <div className='columns'>
                <Input id="endereco" columnClasses='is-full' name='endereco' onChange={formik.handleChange} value={formik.values.endereco} label='Endereço: ' autoComplete='off'/>
            </div>

            <div className='columns'>
                <Input id="email" columnClasses='is-half' name='email' onChange={formik.handleChange} value={formik.values.email} label='email: *' autoComplete='off'/>
                <Input id="telefone" columnClasses='is-half' name='telefone' onChange={formik.handleChange} value={formik.values.telefone} label='Telefone: *' autoComplete='off'/>
            </div>
            
            <div className='field is-grouped'>
                <div className='control is-link'>
                    <button type='submit' className='button'>{ formik.values.id ? "Atualizar" : "Salvar" }</button>
                </div>
            </div>
        </form>
    );
}
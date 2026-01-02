import { Produto} from 'app/app/models/produtos'
import { on } from 'events';
import { useState } from 'react';

interface TabelaProdutosProps{
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit
}) => {
    return(
        <table className="table is-hoverable is-striped">
            <thead>
                <tr>
                <th>Código</th>
                <th>SKU</th>
                <th>Nome</th>
                <th>Preço</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
               {
               produtos.map(produto => (
               <ProdutoRow onDelete={onDelete} 
                            onEdit={onEdit}
                              key={produto.id}produto={produto}/>)
               )
               }
            </tbody>
        </table>
    )
}
interface ProdutoRowProps{
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}
const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {

    const [deletando, setDeletando] = useState<boolean>(false);

    const onDeleteClick = (produto: Produto) => {
        if (deletando) {
            // Segunda vez que clica: Executa a deleção real
            onDelete(produto);
            setDeletando(false);
        } else {
            // Primeira vez que clica: Entra em modo de confirmação
            setDeletando(true);
        }
    }

    const cancelaDelete = () => setDeletando(false);

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td className="is-actions-cell">
                {/* Botão Editar: Esconde se estiver deletando */}
                {!deletando && (
                    <button 
                        onClick={() => onEdit(produto)} 
                        className='button is-success is-rounded is-small'
                        style={{ marginRight: '5px' }}>
                        Editar
                    </button>
                )}

                {/* Botão Deletar/Confirmar: Muda o texto e a cor se estiver deletando */}
                <button 
                    onClick={() => onDeleteClick(produto)} 
                    className={`button is-rounded is-small ${deletando ? 'is-danger' : 'is-danger is-outlined'}`}>
                    {deletando ? 'Confirmar?' : 'Deletar'}
                </button>

                {/* Botão Cancelar: Só aparece se 'deletando' for true */}
                {deletando && (
                    <button 
                        onClick={cancelaDelete} 
                        className='button is-rounded is-small is-white'
                        style={{ marginLeft: '5px' }}>
                        Cancelar
                    </button>
                )}
            </td>
        </tr>
    )
}
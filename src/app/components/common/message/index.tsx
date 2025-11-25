interface MessageProps{
    tipo: String
    texto: String
    field?: String
}

export const Message: React.FC<MessageProps> = ({
    texto,
    field,
    tipo
}) => {
    return(
        <article className={`message is-${tipo}`}>
            <div className="message-body">
               {field && `${field}`} {texto}
            </div>
        </article>
    )
}
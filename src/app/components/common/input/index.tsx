import { formatReal } from "app/app/util/money";
import { InputHTMLAttributes, ChangeEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    columnClasses?: string;
    error?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    formatter,
    onChange, 
    ...props
}: InputProps) => {
    
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            const name = event.target.name;

            const formattedValue = (formatter && formatter(value)) || value
            
            onChange?.({
                ...event, 
                target:{
                    ...event.target,
                    name,
                    value: formattedValue
                }
            } as ChangeEvent<HTMLInputElement>)     
    }

    return(
        <div className={`field column ${columnClasses}`}>
                <label className="label" htmlFor={id}>{label}</label>
                <div className="control">
                    <input className="input" 
                            onChange={onInputChange}
                           id={id} {...props}/>
                     {error && 
                        <p className="help is-danger">{error}</p>
                     }
                </div>
           </div>
    )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatReal}/>
    )
}
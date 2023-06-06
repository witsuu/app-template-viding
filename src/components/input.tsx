import styled from "styled-components"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from "react"

const InputFormGroup = styled.div`
    position:relative;
    margin-bottom:1rem;
    label{
        position:absolute;
        top:50%;
        left: 0;
        transform:translate(1rem,-50%);
        color: var(--color-text);
        font-size:14px;
        background:var(--color-body);
        transition:all .5s ease;
    }
`

const FormControl = styled.input`
    position:relative;
    width:100%;
    padding: ${props => props.type === "password" ? "0.75rem 3rem 0.75rem 1rem" : "0.75rem 1rem"};
    border-radius: 5px;
    border: 1px solid var(--color-text);
    background:var(--color-body);
    color:var(--color-text);
    &:focus {
        outline: none;
        & + label{
            top:0;
            font-size:12px;
        }
    }
    &:valid + label{
        top:0;
        font-size:12px;
    }
`

const EyeControl = styled.div`
    position:absolute;
    top:50%;
    right:1rem;
    transform:translate(0,-50%);
    color:var(--color-text);
    font-size:24px;
    height:24px;
    cursor:pointer;
`

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
    name: string,
    type: string,
    label: string
}

const InputFormControl = (props: IInput) => {
    const { name, type, label, ...rest } = props
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <InputFormGroup>
            <FormControl name={name} type={type ? type === "password" ? showPassword ? "text" : "password" : type : 'text'} {...rest} required />
            <label htmlFor={name}>{label}</label>
            {type === "password" ? showPassword ? <EyeControl onClick={handlePasswordVisibility}><AiOutlineEyeInvisible /></EyeControl> : <EyeControl onClick={handlePasswordVisibility} title="Show Password"><AiOutlineEye /></EyeControl> : ""}
        </InputFormGroup>
    )
}

export default InputFormControl
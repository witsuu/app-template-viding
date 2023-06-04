import { registerUtils } from "@/lib/registerUser"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { getCsrfToken } from 'next-auth/react'

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
    padding: .75rem 1rem;
    border-radius: 5px;
    border: 1px solid var(--color-text);
    background:var(--color-body);
    color:var(--color-text);
    &:valid + label{
        top:0;
        font-size:12px;
    }
    &:focus {
        outline: none;
        & + label{
            font-size:12px;
            top:0;
        }
    }
    &:autofill{
        background-color:var(--color-body);
    }
    &:-internal-autofill-selected{
        background-color:var(--color-body)!important;
        & + label{
            background
        }
    }
`

const ButtonForm = styled.button({
    padding: '.75rem 1rem',
    borderRadius: 5,
    cursor: 'pointer',
    border: 'none'
})

const Register = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [formValue, setFormValue] = useState({ name: "", email: "", password: "", csrfToken: "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => data?.status === 403 ? console.error(data?.message) : console.log(data?.message))
            .catch(error => console.error(error))
    }
    return (
        <>
            <div style={{ position: 'relative', display: "flex", alignItems: "center", justifyContent: "center" }}>
                <form method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="csrfToken" value={csrfToken} onChange={handleChange} />
                    <InputFormGroup>
                        <FormControl name="name" type="text" required onChange={handleChange} autoComplete="off" />
                        <label htmlFor="name">Name</label>
                    </InputFormGroup>
                    <InputFormGroup>
                        <FormControl name="email" type="email" required onChange={handleChange} autoComplete="off" />
                        <label htmlFor="email">E-Mail</label>
                    </InputFormGroup>
                    <InputFormGroup>
                        <FormControl name="password" type="password" required onChange={handleChange} autoComplete="off" />
                        <label htmlFor="password">Password</label>
                    </InputFormGroup>
                    <ButtonForm type="submit">
                        Sign Up
                    </ButtonForm>
                </form>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

export default Register
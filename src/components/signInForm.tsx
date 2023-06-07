import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "./button"
import InputFormControl from "./input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignInForm = () => {
    const [dataForm, setDataForm] = useState({ email: "", password: "" })
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setDataForm({
            ...dataForm,
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        signIn("credentials", { ...dataForm, redirect: false }).then(({ ok, error }: any) => {
            if (ok) {
                router.push('/')
            } else {
                console.log(error)
            }
        })
    }

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <InputFormControl name="email" type="email" label="E-mail" autoComplete="off" onChange={handleChange} />
                <InputFormControl name="password" type="password" label="Password" autoComplete="off" onChange={handleChange} />
                <Button type="submit">Sign In</Button>
            </form>
        </>
    )
}

export default SignInForm
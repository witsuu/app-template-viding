import InputFormControl from "./input"

const SignInForm = () => {
    return (
        <>
            <form>
                <InputFormControl name="email" type="email" label="E-mail" autoComplete="off" />
                <InputFormControl name="password" type="password" label="Password" autoComplete="off" />
            </form>
        </>
    )
}

export default SignInForm
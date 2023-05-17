import styled from "styled-components"
import { Abril_Fatface } from "next/font/google"
import { useRouter } from "next/router"

const font = Abril_Fatface({ weight: '400', subsets: ['latin'], display: 'swap' })

const ErrorWrapper = styled.section`
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: var(--color-body);
`

const ErrorBody = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    display:flex;
    flex-direction:column;
    align-items:center;
    row-gap:3rem;
`

const ErrorText = styled.span`
    font-size: 48px;
    color: var(--color-text);
`

const ButtonBack = styled.button({
    position: 'relative',
    padding: ".5rem 1rem",
    borderRadius: 5,
    background: 'var(--color-secondary)',
    color: "var(--color-button-text)",
    border: 'none',
    fontFamily: '__Mulish_836aa5, __Mulish_Fallback_836aa5',
    fontWeight: 700,
    cursor: 'pointer'
})

const CustomError = () => {
    const router = useRouter()

    return (
        <ErrorWrapper>
            <ErrorBody>
                <ErrorText className={font.className}>500 - Server Error</ErrorText>
                <ButtonBack onClick={() => router.replace('/')}>Back To Home Page</ButtonBack>
            </ErrorBody>
        </ErrorWrapper>
    )
}

export default CustomError
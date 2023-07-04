import styled, { keyframes } from "styled-components"

const sclx = keyframes`
    to{
        transform: scaleX(0);
    }
`

const Progress = styled.div`
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:4px;
    background-color: var(--toast-border-color);
    transform-origin: 0% 50%;
    animation: ${sclx} 5s linear;
`

export const ProgressToast = () => {
    return (
        <>
            <Progress />
        </>
    )
}
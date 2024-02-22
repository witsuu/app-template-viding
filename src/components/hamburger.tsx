import styled from "styled-components"
import { Button } from "./button"

const HamburgerWrapper = styled(Button) <{ $padding?: Number }>`
    padding: ${props => props.$padding + "px"};
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:.3rem;
    background-color:var(--color-primary);
    border-radius: 10px;
    margin-right: 1rem;

    @media(max-width:576px){
        margin-right:.5rem;
    }
`

const HamburgerLine = styled.div<{ $lineWidth?: Number, $lineHeight?: Number }>`
    width:${props => props.$lineWidth + "px"};
    height:${props => props.$lineHeight + "px"};
    background-color: var(--color-text);
`
type IHamburger = {
    padding?: Number,
    lineHeight?: Number,
    lineWidth?: Number
}

export const Hamburger = ({ padding = 10, lineWidth = 25, lineHeight = 2 }: IHamburger) => {
    return (
        <HamburgerWrapper $padding={padding}>
            <HamburgerLine $lineWidth={lineWidth} $lineHeight={lineHeight} />
            <HamburgerLine $lineWidth={lineWidth} $lineHeight={lineHeight} />
            <HamburgerLine $lineWidth={lineWidth} $lineHeight={lineHeight} />
        </HamburgerWrapper>
    )
}
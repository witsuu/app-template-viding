import Link from "next/link";
import styled from "styled-components";

export const ButtonLink = styled(Link)`
    padding:.75rem 1.5rem;
    border-radius: 5px;
    background-color: #CBE4DE;
    color : #1e1f1e;
    &:hover {
        box-shadow: inset 0 0 1rem rgba(0,0,0,0.15)
    }
`

export const Button = styled.button`
    padding:.75rem 1.5rem;
    border-radius: 5px;
    background-color: #CBE4DE;
    color : #1e1f1e;
    &:hover {
        box-shadow: inset 0 0 1rem rgba(0,0,0,0.15)
    }
`
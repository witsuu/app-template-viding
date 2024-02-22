import styled from 'styled-components'
import React, { ReactNode } from 'react'

const ContentContainer = styled.section`
    position:relative;
    background-color: var(--color-primary);   
    border-radius:10px;
    min-height:320px;
`
const ContentBody = styled.div`
    padding: 2rem;
    @media(max-width:576px){
        padding:1rem;   
    }
`

export const Content = ({ children }: { children: ReactNode }) => {
    return (
        <ContentContainer>
            <ContentBody>
                {children}
            </ContentBody>
        </ContentContainer>
    )
}
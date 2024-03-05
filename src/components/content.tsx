import styled from 'styled-components'
import React, { ReactNode, forwardRef } from 'react'

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

export const Content = forwardRef(({ children, ...rest }: { children: ReactNode }& React.HTMLAttributes<HTMLElement>, ref: React.ForwardedRef<HTMLElement>) => {
    return (
        <ContentContainer ref={ref} {...rest}>
            <ContentBody>
                {children}
            </ContentBody>
        </ContentContainer>
    )
})

Content.displayName = "Content"
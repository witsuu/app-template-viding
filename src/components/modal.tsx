import { Mulish } from 'next/font/google'
import { ModalContext } from "@/contexts/modal.context";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { IModal, IModalProps } from "../@types/modal"
import { createPortal } from "react-dom";

const mulish = Mulish({ subsets: ['latin'] })

const ModalOverlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,0.25);
    display:flex;
    align-items:center;
    justify-content:center;
`

const ModalMain = styled.div({
    position: "relative",
    background: 'var(--color-body)',
    minWidth: 280,
    minHeight: 240,
    borderRadius: 8,
    animation: "modalFade 500ms ease"
})

const ModalHeader = styled.div`
    position:relative;
    padding:1rem 1rem 0 1rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    span{
        font-size:18px;
        font-weight:700;
    }
`

const ButtonModalClose = styled.button({
    background: 'transparent',
    padding: 0,
    margin: 0,
    border: "none",
    cursor: "pointer",
    color: 'var(--color-text)',
    svg: {
        pointerEvents: "none"
    }
})

const ModalBody = styled.div({
    padding: "1rem",
    position: 'relative'
})

const Modal = ({ title, children, closable = true }: IModalProps) => {
    const { modalRefOverlay, modalRefButton, onCloseModal } = useContext(ModalContext) as IModal

    return createPortal(
        <ModalOverlay ref={modalRefOverlay} onClick={closable ? onCloseModal : () => { return }} className={mulish.className}>
            <ModalMain>
                <ModalHeader>
                    {title ? <span>{title}</span> : <span></span>}
                    <ButtonModalClose type="button" onClick={onCloseModal} ref={modalRefButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </ButtonModalClose>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalMain>
        </ModalOverlay>,
        document.body
    )
}

export default Modal
import { IModal, IModalChildren } from "@/@types/modal";
import React, { createContext, useState } from "react";
export const ModalContext = createContext<IModal | null>(null)

export const ModalContextProvider = ({ children }: IModalChildren) => {
    const [openModal, setOpenModal] = useState(false)
    const modalRefOverlay = React.useRef<HTMLDivElement>(null)
    const modalRefButton = React.useRef<HTMLButtonElement>(null)

    const onCloseModal = (e: any) => {
        if (modalRefOverlay.current === e.target || modalRefButton.current === e.target) {
            setOpenModal(false)
        }

        console.log(e.target)

        return
    }

    return (
        <ModalContext.Provider value={{ openModal, setOpenModal, onCloseModal, modalRefOverlay, modalRefButton }}>
            {children}
        </ModalContext.Provider>
    )
}
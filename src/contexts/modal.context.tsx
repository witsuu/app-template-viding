import { IModal, IModalChildren, IModals } from "@/@types/modal";
import React, { ReactElement, createContext, useState } from "react";
export const ModalContext = createContext<IModal | null>(null)

export const ModalContextProvider = ({ children }: IModalChildren) => {
    const [modalName, setModalName] = useState("")
    const [modals, setModals] = useState<any>({})
    const modalRefOverlay = React.useRef<HTMLDivElement>(null)
    const modalRefButton = React.useRef<HTMLButtonElement>(null)

    const registerModals = (modalName: string, component: ReactElement) => {
        if (!modals[modalName]) {
            setModals({
                ...modals,
                [modalName]: component
            })
        }
    }

    const onOpenModal = (modalName: string) => {
        setModalName(modalName)
        console.log(modals)
    }

    const onCloseModal = (e: any) => {
        if (modalRefOverlay.current === e.target || modalRefButton.current === e.target) {
            setModalName("")
        }
        return
    }

    return (
        <ModalContext.Provider value={{ onOpenModal, onCloseModal, registerModals, modalRefOverlay, modalRefButton }}>
            {children}
            {modalName && modals[modalName]}
        </ModalContext.Provider>
    )
}
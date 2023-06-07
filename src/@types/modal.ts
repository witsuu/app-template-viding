import { ReactElement, RefObject, SetStateAction } from "react"

export type IModalChildren = {
    children: ReactElement
}

export type IModal = {
    modalRefOverlay: RefObject<HTMLDivElement>,
    modalRefButton: RefObject<HTMLButtonElement>,
    onCloseModal: (e: any) => void,
    onOpenModal: (modalName: string) => void,
    registerModals: (modalName: string, component: ReactElement) => void
}

export type IModals = {
    modalName: ReactElement,
}

export type IModalProps = {
    title?: string,
    children: ReactElement,
    closable?: Boolean
}
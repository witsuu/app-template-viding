import { MutableRefObject, ReactElement, RefObject } from "react"

export type IModalChildren = {
    children: ReactElement
}

export type IModal = {
    openModal: Boolean,
    setOpenModal: any,
    modalRefOverlay: RefObject<HTMLDivElement>,
    modalRefButton: RefObject<HTMLButtonElement>,
    onCloseModal: (e: any) => void
}
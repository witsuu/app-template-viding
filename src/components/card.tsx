import styled from "styled-components"
import { BiEdit } from 'react-icons/bi'
import { githubUrl } from "@/utils/githubUrl"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { IModal } from "@/@types/modal"
import { ModalContext } from "@/contexts/modal.context"
import Modal from "./modal"

const CardMain = styled.div`
    position: relative;
    background-color: var(--color-primary);
    border-radius: 5px;
`

const CardBody = styled.div`
    padding: 1rem;
`

const EditCardButton = styled.button`
    display:none;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%,-50%);
    background: var(--color-text);
    padding: 0.23rem 0.23rem 0;
    border:none;
    border-radius:50px;
    cursor:pointer;
    z-index:3;
    &:focus{
        outline:none;
    }
    ${CardMain}:hover &{
        display:block;
    }
`

type ICard = {
    title: string,
    path: string
}

const Card = ({ title, path, ...rest }: ICard) => {
    const { onOpenModal, registerModals } = useContext(ModalContext) as IModal

    useEffect(() => {
        registerModals(title,
            <Modal>
                <span>This is Modal {title}!</span>
            </Modal>)
    }, [registerModals, title])

    return (
        <CardMain {...rest}>
            <EditCardButton type="button" title={`Edit Description Template ${title}`} onClick={() => onOpenModal(title)}>
                <BiEdit />
            </EditCardButton>
            <CardBody>
                <Link href={`${githubUrl}${path}`} target="_blank" rel="noopener noreferrer" >
                    {title}
                </Link>
            </CardBody>
        </CardMain>
    )
}

export default Card
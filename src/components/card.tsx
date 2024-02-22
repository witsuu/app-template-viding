import styled from "styled-components"
import { BiEdit } from 'react-icons/bi'
import { githubUrl } from "@/utils/githubUrl"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { IModal } from "@/@types/modal"
import { ModalContext } from "@/contexts/modal.context"
import Modal from "./modal"
import noImage from "@/assets/images/no-image.png"
import Image from "next/image"

const CardMain = styled.div`
    position: relative;
    background-color: var(--color-secondary);
    color: var(--color-headline-text);
    border-radius: 8px;
    width:100%;
`

const CardBody = styled.div`
    padding: 1rem;
`

const CardImg = styled(Image)`
    display:block;
    width:100%;
    height:auto;
    aspect-ration:6/4;
    border-radius:5px;
    margin-bottom:.5rem;
`

const EditCardButton = styled.button`
    display:none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    // transform: translate(50%,-50%);
    background: var(--color-text);
    padding: 0.3rem 0.3rem 0.1rem;
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
    path: string,
    imgSrc?: string,
    withImg?: Boolean,
    [x: string]: any
}

const Card = ({ title, path, imgSrc, withImg = false, ...rest }: ICard) => {
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
                <BiEdit size={18} />
            </EditCardButton>
            <CardBody>
                {
                    withImg ? <CardImg src={imgSrc ?? noImage} alt="card-image" /> : ""
                }
                <Link href={`${githubUrl}${path}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
                    {title}
                </Link>
            </CardBody>
        </CardMain>
    )
}

export default Card
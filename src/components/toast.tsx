import { IToastProps, ToastContainerProps } from "@/@types/toast"
import styled, { keyframes } from "styled-components"
import { HiInformationCircle, HiCheckCircle } from 'react-icons/hi'
import { IoIosClose, IoIosWarning } from 'react-icons/io'
import { MdOutlineError } from "react-icons/md"
import { Nunito_Sans } from "next/font/google"
import { useEffect, forwardRef, useState, useRef } from 'react'
import { useToastContainer } from "@/hooks/useToastContainer"
import { gsap } from "gsap"
import { ProgressToast } from "./progressToast"

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

const fadeUp = keyframes`
    from{
        transform: translate3d(0,50px,0);
        opacity:0;
    }
    to{
        transform:translateZ(0);
        opacity:1;
    }
`

const ToastContainers = styled.div`
    position:fixed;
    bottom:1rem;
    right:1rem;
    paddingn:4px;
    width:320px;
    transition:all 1s ease;
`

const ToastContent = styled.div<{ type: string }>`
    --toast-border-color: ${props => props.type === "error" ? "#E06469" : props.type === "info" ? "#19A7CE" : props.type === "warning" ? "#F79327" : props.type === "success" ? "#5D9C59" : "#19A7CE"};
    --toast-body-color: ${props => props.type === "error" ? "#F2B6A0" : props.type === "info" ? "#B0DAFF" : props.type === "warning" ? "#F3E99F" : props.type === "success" ? "#C7E8CA" : "#B0DAFF"};
    position:relative;
    width:100%;
    max-height:320px;
    padding:0.5rem;
    background-color:var(--toast-body-color);
    border-left: 5px solid var(--toast-border-color);
    border-radius:5px;
    display:flex;
    transform: translate(50%,0);
    opacity:0;
    margin-bottom:1rem;
`
const ToastLogo = styled.div`
    position:relative;
    color:var(--toast-border-color);
    margin-right:.5rem;
    font-size:24px;
`
const ToastHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    span{
        text-transform:capitalize;
        font-weight:700;
        font-size:17px;
    }
    div{
        height:24px;
        cursor:pointer;
    }
`
const ToastBody = styled.div`
    display:inline-block;
    color:#1e1f1e;
    width:100%;
`
const ToastDescription = styled.div`
    position:relative;
    padding:.25rem 0 .5rem;
`

const ToastContents = (props: IToastProps) => {
    const { type = "info" || "error" || "warning" || "success", message, closeToast, status, setStatusToast, position }: IToastProps = props
    const toastContentRef = useRef<HTMLDivElement>(null)
    const toastWrapContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (status === "OPEN") gsap.to(toastContentRef.current, 1.5, { x: 0, opacity: 1 }), setStatusToast("LOADING", position)
        }, toastWrapContentRef)

        return () => ctx.revert()
    }, [position])

    return (
        <div ref={toastWrapContentRef}>
            <ToastContent type={type} ref={toastContentRef}>
                <ToastLogo>
                    {type === "error" ? <MdOutlineError /> :
                        type === "info" ? <HiInformationCircle /> :
                            type === "warning" ? <IoIosWarning /> :
                                type === "success" ? <HiCheckCircle /> :
                                    <HiInformationCircle />}
                </ToastLogo>
                <ToastBody>
                    <ToastHeader>
                        <span>{type}</span>
                        <div>
                            <IoIosClose size={24} onClick={e => closeToast()} />
                        </div>
                    </ToastHeader>
                    <ToastDescription>
                        {message}
                    </ToastDescription>
                </ToastBody>
                <ProgressToast />
            </ToastContent>
        </div>
    )
}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>((props, ref) => {

    const { getToastToRender, containerRef, isToastActive } = useToastContainer(props)

    useEffect(() => {
        if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement>).current = containerRef.current!
        }
    }, [])

    return (
        <ToastContainers id="toast-container" className={nunito_sans.className} ref={containerRef}>
            {getToastToRender((toastList) => {
                return (
                    toastList.map((item: any) => (
                        <ToastContents {...item} type={item?.type} message={item?.message} key={item?.type} />
                    ))
                )
            })}
        </ToastContainers>
    )
})

ToastContainer.displayName = 'ToastContainer'
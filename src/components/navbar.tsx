import { Navbar as styles } from "@/styles"
import { Abril_Fatface } from "next/font/google"
import { ButtonLink } from "./button"
import { useContext, useEffect } from "react"
import { ModalContext } from "@/contexts/modal.context"
import { IModal } from "@/@types/modal"
import Modal from "./modal"
import SignInForm from "./signInForm"

const abril = Abril_Fatface({ subsets: ['latin'], weight: "400" })

const Navbar = () => {
    const { onOpenModal, registerModals } = useContext(ModalContext) as IModal

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        onOpenModal("signIn")
    }

    useEffect(() => {
        registerModals("signIn",
            <Modal closable={false} title="Sign In">
                <SignInForm />
            </Modal>)
    }, [registerModals])

    return (
        <nav className={styles.navbar}>
            <div className={styles.nav}>
                <div className={styles.brand}>
                    <span className={abril.className}>Templates Themes</span>
                    <label htmlFor="viding">copyright by viding</label>
                </div>
                <div className={styles.navAction}>
                    <ButtonLink href={"#"} aria-label="login button" onClick={handleClick}>
                        Login
                    </ButtonLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
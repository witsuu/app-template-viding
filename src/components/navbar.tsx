import { Navbar as styles } from "@/styles"
import { Abril_Fatface } from "next/font/google"
import { ButtonLink } from "./button"

const abril = Abril_Fatface({ subsets: ['latin'], weight: "400" })

const Navbar = () => {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.nav}>
                <div className={styles.brand}>
                    <span className={abril.className}>Templates Themes</span>
                    <label htmlFor="viding">copyright by viding</label>
                </div>
                <div className={styles.navAction}>
                    <ButtonLink href={"/login"} aria-label="login button" onClick={handleClick}>
                        Login
                    </ButtonLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
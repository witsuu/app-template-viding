import { Navbar as styles } from "@/styles"
import { Abril_Fatface } from "next/font/google"

const abril = Abril_Fatface({ subsets: ['latin'], weight: "400" })

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.nav}>
                <div className={styles.brand}>
                    <span className={abril.className}>Templates Themes</span>
                    <label htmlFor="viding">copyright by viding</label>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
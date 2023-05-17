import { Card as styles } from "@/styles"

const Card = ({ title }: any) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default Card
import { Loading as styles } from "@/styles"
import Image from 'next/image'
import LoadingImage from "@/data/loading.gif"

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingBody}>
                <Image src={LoadingImage} alt="Loading spinner" className={styles.loadingImage} />
            </div>
        </div>
    )
}

export default Loading
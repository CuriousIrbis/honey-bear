import {Link} from 'react-router-dom';
import styles from './boardCard.module.scss';

interface BoardCardProps{
    id: string
    title: string
}

export default function BoardCard({id, title}: BoardCardProps){
    return(
        <Link to={`/board/${id}`} className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.fade} />
        </Link>
    )
}
import { useEffect } from 'react';
import BoardCard from '../compontents/boardCard';
import CreateBoardBtn from '../compontents/createBoardBtn';
import { useBoardStore } from '../store/useBoardStore';
import styles from './home.module.scss';


export default function HomePage(){
    const {boards, isLoading, error, fetchBoards} = useBoardStore();

    useEffect(() => {
        fetchBoards()
    }, [fetchBoards])
    
    const handleCreateBoard = () => {
        alert('Тут в будущем будет открываться модальное окно создания доски!');
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>👤</span>
                <h2>Мои рабочие пространства</h2>
            </div>
            {isLoading && <p className={styles.info}>Загрузка досок...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!isLoading && !error && (
                <div className={styles.grid}>
                    {boards.map((board) => (
                        <BoardCard key={board.id} id={board.id} title={board.title} />
                    ))}
                    <CreateBoardBtn onClick={handleCreateBoard} />
                </div>
            )}
        </div>
    )
}
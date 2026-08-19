import BoardCard from '../compontents/boardCard';
import CreateBoardBtn from '../compontents/createBoardBtn';
import styles from './home.module.scss';


const mockBoards = [
  { id: '1', title: 'Задачи по учебе 📚' },
  { id: '2', title: 'План Honey-Bear 🐻' },
  { id: '3', title: 'Покупки и быт 🛒' },
];

export default function HomePage(){
    const handleCreateBoard = () => {
        alert('Тут в будущем будет открываться модальное окно создания доски!');
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>👤</span>
                <h2>Мои рабочие пространства</h2>
            </div>

            <div className={styles.grid}>
                {mockBoards.map((board) => (
                    <BoardCard key={board.id} id={board.id} title={board.title} />
                ))}
                <CreateBoardBtn onClick={handleCreateBoard} />
            </div>
        </div>
    )
}
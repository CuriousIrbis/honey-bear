import { useParams, Link } from "react-router-dom";
import { useBoardStore } from "../store/useBoardStore";
import { useForm } from "react-hook-form";
import styles from './boardPages.module.scss'

interface IColumnForm{
    columnTitle: string
}

interface ITaskForm{
    taskTitle: string
}

interface ITaskFormProps{
    boardId: string
    columnId: string

    addTask: (boardId: string, columnId: string, title: string) => void
}

export default function BoardPage(){
    const {id} = useParams<{id: string}>();
    const {boards, addColumn, addTask} = useBoardStore();

    const currentBoard = boards.find((b) =>b.id === id);

    const {register: regCol, handleSubmit: handleColSubmit, reset: resetCol} = useForm<IColumnForm>();

    if(!currentBoard){
        return(
            <div className={styles.notFound}>
                <h2>Доска не найдена 😢</h2>
                <Link to="/">Вернуться на главную</Link>
            </div>
        )
    }

    const onAddColumn = (data: IColumnForm) => {
        if(!data.columnTitle.trim()) return;
        addColumn(currentBoard.id, data.columnTitle);
        resetCol();
    }

    return (
        <div className={styles.boardWrapper}>
            <header className={styles.boardHeader}>
                <Link to='/' className={styles.backBtn}>← На главную</Link>
                <h2>{currentBoard.title}</h2>
            </header>
            <div className={styles.columnsContainer}>
                {currentBoard.columns.map(column => (
                    <div key={column.id} className={styles.column}>
                        <h4>{column.title}</h4>

                        <div className={styles.tasksList}>
                            {column.tasks.map((task) => (
                                <div key={task.id} className={styles.taskCard}>
                                    {task.title}
                                </div>
                            ))}
                        </div>
                        <TaskFormOnColumn boardId={currentBoard.id} columnId={column.id} addTask={addTask}/>
                    </div>
                ))}
                <div className={styles.addColumnCard}>
                    <form onSubmit={handleColSubmit(onAddColumn)}>
                        <input
                        type="text"
                        placeholder="+ Добавить колоночку"
                        {...regCol('columnTitle', { required: true })}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

function TaskFormOnColumn({boardId, columnId, addTask}: ITaskFormProps){
    const {register, handleSubmit, reset} = useForm<ITaskForm>();

    const onAddTask = (data: ITaskForm) => {
        if (!data.taskTitle.trim()) return;
        addTask(boardId, columnId, data.taskTitle);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onAddTask)} className={styles.taskForm}>
            <input type="text" placeholder="+ Добавить задачу" {...register('taskTitle', { required: true })} />
        </form>
    );
}
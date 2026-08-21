import { useState } from 'react';
import BoardCard from '../compontents/boardCard';
import CreateBoardBtn from '../compontents/createBoardBtn';
import { useBoardStore } from '../store/useBoardStore';
import styles from './home.module.scss';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IBoardFormInput{
    boardTitle: string
}

export default function HomePage(){
    const {boards, createBoard} = useBoardStore();
    const [isModalOpen, setModalOpen] = useState(false);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<IBoardFormInput>({
        mode: 'onChange'
    })
    
    const onSubmit: SubmitHandler<IBoardFormInput> = async (data) => {
        await createBoard(data.boardTitle);
        reset();
        setModalOpen(false);
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>👤</span>
                <h2>Мои рабочие пространства</h2>
            </div>

            <div className={styles.grid}>
                {boards.map((board) => (
                    <BoardCard key={board.id} id={board.id} title={board.title} />
                ))}
                <CreateBoardBtn onClick={() => setModalOpen(true)} />
            </div>
            
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={ () => {setModalOpen(false); reset(); }}>
                    <div className={styles.modalContent} onClick={(ev) => ev.stopPropagation()}>
                        <h3>Создание доски</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                type="text"
                                placeholder='Укажите название доски'
                                className={errors.boardTitle ? styles.inputError : ''}
                                {...register('boardTitle', {
                                    required: 'Название доски обязательно для заполнения',
                                    minLength: {
                                        value: 3,
                                        message: 'Название должно быть не меньше 3 символов'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Название должно быть не больше 20 символов'
                                    }
                                })}
                                autoFocus
                            />

                            {errors.boardTitle && (
                                <span className={styles.errorMessage}>{errors.boardTitle.message}</span>
                            )}

                            <div className={styles.modalActions}>
                                <button
                                    type='button'
                                    onClick={() => {setModalOpen(false); reset()}}
                                    className={styles.cancelBtn}
                                >Отмена</button>
                                <button
                                    type='submit'
                                    disabled={!isValid}
                                    className={styles.submitBtn}
                                >Создать</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
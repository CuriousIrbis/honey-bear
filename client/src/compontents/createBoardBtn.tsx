import style from './createBoardBtn.module.scss';

interface CreateBoardBtnProps {
    onClick: () => void
}

export default function CreateBoardBtn({onClick}: CreateBoardBtnProps){
    return(
        <button className={style.btn} onClick={onClick}>
            <span className={style.plus}>+</span>
            Создать доску
        </button>
    )
}
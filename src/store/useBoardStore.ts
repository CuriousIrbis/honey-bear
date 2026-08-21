import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface Task{
    id: string;
    title: string;
    description?: string;
}

interface Column{
    id: string;
    title: string;
    tasks: Array<Task>;
}

interface Board{
    id: string;
    title: string;
    columns: Array<Column>;
}

// структура глобального хранилища zustand
interface BoardState{
    boards: Array<Board>;
    createBoard: (title: string) => void
}

const useBoardStore = create<BoardState>()(
    persist(
        (set) => ({
            boards: new Array<Board>,

            createBoard: (title: string) => {
                const newBoard: Board = {
                    id: crypto.randomUUID(),
                    title: title.trim(),
                    columns: new Array<Column>
                };

                set((state) => ({boards: [...state.boards, newBoard]}));
            },
        }),
        {
            name: 'honey-bear-storage'
        }
    )
)

export {type Task, type Column, type Board, useBoardStore}
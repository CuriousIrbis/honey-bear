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
    createBoard: (title: string) => void;
    addColumn: (boardId: string, title: string) => void;
    addTask: (boardId: string, columnId: string, title: string) => void;
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

            addColumn: (boardId: string, title: string) => {
                set(state => ({
                    boards: state.boards.map(board => {
                        if(board.id != boardId) return board;

                        const newColumn: Column = {
                            id: crypto.randomUUID(),
                            title: title.trim(),
                            tasks: new Array<Task>
                        };

                        return { ...board, columns: [ ...board.columns, newColumn]};
                    })
                }))
            },

            addTask: (boardId: string, columnId: string, title: string) => {
                set(state => ({
                    boards: state.boards.map(board => {
                        if(board.id !== boardId) return board;

                        return {
                            ...board,
                            columns : board.columns.map(col => {
                                if(col.id !== columnId) return col;

                                const newTask: Task = {
                                    id: crypto.randomUUID(),
                                    title: title.trim(),
                                };

                                return { ...col, tasks: [ ...col.tasks, newTask]}
                            })
                        }
                    })
                }))
            }
        }),
        {
            name: 'honey-bear-storage'
        }
    )
)

export {type Task, type Column, type Board, useBoardStore}
import {create} from 'zustand';
import api from '../api/axios';
import { AxiosError } from 'axios';

interface Task{
    id: string;
    title: string;
    description?: string;
    order: number;
}

interface Column{
    id: string;
    title: string;
    order: number;
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
    isLoading: boolean;
    error: string | null;
    fetchBoards: () => Promise<void>;
    createBoard: (title: string) => Promise<void>
}

const useBoardStore = create<BoardState>((set) => ({
    boards: [],
    isLoading: false,
    error: null,

    fetchBoards: async () => {
        set({isLoading: true, error: null});

        try {
            const response = await api.get<Array<Board>>('/api/boards');
            set({boards: response.data, isLoading: false})
        } catch (error: unknown) {
            if(error instanceof AxiosError){
                set({
                    error: error.response?.data?.error || 'Не удалось загрузить доски',
                    isLoading: false
                })
            }
        }
    },
    createBoard: async(title: string) => {
        try {
            const response = await api.post<Board>('/api/boards', {title});
            set((state) => ({boards: [...state.boards, response.data]}));
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                set({error: error.response?.data?.error || 'Не удалось создать доску'})
        }
    }
}))

export {type Task, type Column, type Board, useBoardStore}
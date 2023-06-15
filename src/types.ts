export interface TodoInterface {
    id: number,
    todo: string,
    isCompleted: boolean,
    userId: number,
}

export interface TodoComponentProps {
    todos: TodoInterface[],
    access_token: string,
    handleChange: (newData: TodoInterface[]) => void,
}
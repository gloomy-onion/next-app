import React from 'react';
import { GetServerSideProps } from 'next';
import { Todo } from '../../modules/Todo';
import { todosRequests } from '../../shared/api/todos';

type TodoProps = {
    id: number;
    title: string;
};

type TodoPageProps = {
    pageProps: {
        todo: TodoProps;
    };
};

const TodoPage: React.FC<TodoPageProps> = ({ pageProps: { todo } }) => <Todo todo={todo} />;

export const getServerSideProps: GetServerSideProps<TodoPageProps> = async (context) => {
    const params = context.params as { id?: string };

    if (!params.id) {
        return {
            notFound: true,
        };
    }

    try {
        const response = await todosRequests.getTodoById(Number(params.id));

        const { data } = response;

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                todo: data,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

export default TodoPage;

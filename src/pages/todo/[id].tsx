import React from 'react';
import { GetServerSideProps } from 'next';
import Script from 'next/script';
import { Todo } from '../../modules/Todo';
import { todosRequests } from '../../shared/api/todos';

type TodoProps = {
    id: number;
    title: string;
};

type TodoPageProps = {
    pageProps: {
        todo: TodoProps;
        nonce: string;
    };
};

const TodoPage: React.FC<TodoPageProps> = ({ pageProps: { todo, nonce } }) => (
    <>
        <Script strategy="afterInteractive" nonce={nonce} />
        <Todo todo={todo} />
    </>
);

export const getServerSideProps: GetServerSideProps<TodoPageProps> = async (context) => {
    const params = context.params as { id?: string };
    const nonce = context.req.headers['x-nonce'] | '';
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
                nonce,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

export default TodoPage;

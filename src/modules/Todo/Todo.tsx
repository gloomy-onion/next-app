import React from 'react';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';
import styles from './Todo.module.scss';
import { todoModel } from '../../shared/api/todoModel';

type TodoProps = {
    todo: {
        id: number;
        title: string;
    };
};

const { fetchTodoById } = todoModel;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params as { id?: string };
    if (!params.id) {
        return {
            notFound: true,
        };
    }

    try {
        const fetchedTodo = fetchTodoById(Number(params.id));

        if (!fetchedTodo) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                todo: fetchedTodo,
            },
        };
    } catch {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
    const { currentTheme } = useThemeContext();
    const { translate } = useLocalizationContext();
    const buttonType = getButtonType(currentTheme);
    const router = useRouter();

    return (
        <div>
            <Button type={buttonType} size="large" onClick={() => router.push('/')}>
                {translate('back')}
            </Button>
            <div className={styles.todo}>
                <Typography.Title level={3}>{todo.title}</Typography.Title>
            </div>
        </div>
    );
};

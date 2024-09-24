import React from 'react';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';
import styles from './Todo.module.scss';

type TodoProps = {
    todo?: {
        id: number;
        title: string;
    };
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
                <Typography.Title level={3}>{todo?.title}</Typography.Title>
            </div>
        </div>
    );
};

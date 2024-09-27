import React from 'react';
import { useUnit } from 'effector-react';
import { Button, Typography } from 'antd';
import { counterModel } from '../../shared/api/models/counterModel';

export const Counter: React.FC = () => {
    const [$counter, incCounter, decCounter] = useUnit([
        counterModel.$counter,
        counterModel.incCounter,
        counterModel.decCounter,
    ]);

    return (
        <div>
            <Typography.Title level={2}>Счётчик: {$counter}</Typography.Title>
            <Button type="primary" onClick={() => incCounter(1)}>
                Увеличить
            </Button>
            <Button type="default" onClick={() => decCounter(1)}>
                Уменьшить
            </Button>
        </div>
    );
};

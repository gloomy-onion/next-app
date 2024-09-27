import { useMemo } from 'react';
import { Scope, fork, serialize } from 'effector';

let clientScope: Scope | null = null;

export const isSSR = typeof window === 'undefined';

export const useScope = (initialData: any = {}) =>
    useMemo(() => {
        const scope = fork({
            values: {
                ...(clientScope ? serialize(clientScope) : {}),
                ...initialData,
            },
        });

        if (!isSSR) {
            clientScope = scope;
        }

        return scope;
    }, [initialData]);

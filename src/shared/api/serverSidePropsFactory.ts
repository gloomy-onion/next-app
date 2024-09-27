import { allSettled, EventCallable, fork, serialize, Store } from 'effector';
import { GetServerSideProps, Redirect } from 'next';
import { EffectState } from 'patronum/status';

type Nullable<T> = T | null;

export const serverSidePropsFactory =
    (
        event?: EventCallable<any>,
        status?: Store<EffectState>,
        redirect?: Store<Nullable<Redirect>>,
    ): GetServerSideProps =>
    async (ctx) => {
        const scope = fork();

        const scopeData = serialize(scope);

        if (redirect && scope.getState(redirect)) {
            return {
                redirect: scope.getState(redirect) as Redirect,
            };
        }

        if (status && scope.getState(status) === 'fail') {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                initialState: scopeData,
            },
        };
    };

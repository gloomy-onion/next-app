import React from 'react';
import Link from 'next/link';
import { Counter } from '../modules/Counter';
import { serverSidePropsFactory } from '../shared/api/serverSidePropsFactory';

const CounterPage: React.FC = () => (
    <>
        <Link href="/counter2"> ссылка</Link>
        <Counter />
    </>
);
export const getServerSideProps = serverSidePropsFactory();

export default CounterPage;

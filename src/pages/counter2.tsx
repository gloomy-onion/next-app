import React from 'react';
import Link from 'next/link';
import { Counter } from '../modules/Counter';
import { serverSidePropsFactory } from '../shared/api/serverSidePropsFactory';

const Counter2Page: React.FC = () => (
    <>
        <Link href="/counter">ссылка</Link>
        <Counter />
    </>
);

export const getServerSideProps = serverSidePropsFactory();

export default Counter2Page;

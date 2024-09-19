import React from 'react';
import { Header } from '../Header';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <main>{children}</main>
    </>
);

import React from 'react';
import { Outlet } from 'react-router';
import Header from './component/Header';
import './index.scss';
import Foot from './component/Foot';

const Layout = () => {
    return (<>
        <Header />
        <main className="app-main">
            <Outlet />
        </main>
        <Foot />
    </>);
};

export default Layout;

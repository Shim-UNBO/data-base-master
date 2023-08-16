import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './navbar';
export const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    {publicRoutes.map(({ path, element, id }) => {
                        return <Route key={id} path={path} element={element} />;
                    })}
                    <Route path="*" element={<h1>404 NOT FOUND</h1>} />
                    <Route path="/" element={<Navigate to={'/user-info'} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Root;

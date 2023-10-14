import React from 'react';
import { Breadcrumb, NavLink } from 'react-bootstrap';

function Breadcrumbs({ items }) {
    return (
        <Breadcrumb>
            {items.map((item, index) => (
                <Breadcrumb.Item key={index}>
                    <NavLink to={item.route}>{item.text}</NavLink>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default Breadcrumbs;

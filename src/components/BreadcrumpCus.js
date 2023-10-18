import React from 'react';
import { Breadcrumb, NavLink } from 'react-bootstrap';

function Breadcrumbs({ items }) {
    return (
        <Breadcrumb>
            {items.map((item, index) => (
                <Breadcrumb.Item key={index} href={item.route}>
                    {item.text}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default Breadcrumbs;

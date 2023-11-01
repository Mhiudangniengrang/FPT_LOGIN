import React from 'react';
import { Breadcrumb, NavLink } from 'react-bootstrap';

function Breadcrumbs({ items }) {
    return (
        <Breadcrumb
            style={{
                backgroundColor: 'rgb(231 231 231)',
                paddingTop: '10px',
                display: 'inline-block',
                marginBottom: '20px'
            }}
        >
            {items.map((item, index) => (
                <Breadcrumb.Item
                    style={{
                        alignSelf: 'center',
                    }}
                    key={index} href={item.route}>
                    {item.text}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default Breadcrumbs;

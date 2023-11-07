
import React from "react";
import { List, Datagrid, TextField } from 'react-admin';
const RoomList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="roomId" />
            <TextField source="address" />
            <TextField source="status" />
        </Datagrid>
    </List>
);

export default RoomList
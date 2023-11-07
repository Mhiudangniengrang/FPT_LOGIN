import React from "react";
import { Admin, Resource } from 'react-admin';
import MajorList from "./MajorList";
import restProvider from 'ra-data-simple-rest'
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
const AdminPage = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Admin dataProvider={restProvider('http://localhost:8080/api/v1')}>
                <Resource name="/major/admin" list={MajorList} />
            </Admin>
        </QueryClientProvider>
    )
}

export default AdminPage
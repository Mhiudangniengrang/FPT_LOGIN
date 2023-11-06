import { useHistory } from 'react-router-dom';
import axios from "../../Services/customizeAxios";
import React, { useEffect, useMemo, useState } from "react";

const MajorList = () => {
    const [major, setMajor] = useState([])

    const history = useHistory()
    useEffect(() => {
        axios.get(`/api/v1/major/admin`)
            .then(response => {
                setMajor(response)
            })
            .catch(error => {
                console.error('Error at admin', error);
                return [];
            });
    }, []);

    const handleMajorClick = (item) => {
        history.push(`/major/${item.majorId}`)
    }
    return (
        <table className="table caption-top bg-white rounded mt-2">
            <caption className='text-white fs-4'>Major management</caption>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {major.map((item, index) => (
                    <tr key={index} onClick={handleMajorClick}>
                        <th scope="col">{item.majorId}</th>
                        <th scope="col">{item.majorName}</th>
                        <th scope="col">{item.status}</th>
                        <th scope="col">Edit</th>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MajorList
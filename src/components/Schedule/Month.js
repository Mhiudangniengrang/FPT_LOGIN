import axios from "axios";
import React, { useState, useEffect } from "react";
const Month = () => {

    async function getUser() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    getUser();

    return (
        <>
        </>
    )
}

export default Month;
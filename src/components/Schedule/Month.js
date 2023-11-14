import React, { useState, useEffect } from "react";
import Day from "./Day";
import Style from '../../assets/style/month.module.scss';
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import { ToastContainer, toast } from "react-toastify";
export default function Month({ month }) {
    const [emptySlot, setEmptySlot] = useState([])
    const { loginUser } = useData()
    useEffect(() => {
        const id = toast.loading("Please wait...")
        if (loginUser.roleName === "LECTURER") {
            axios
                .get(`/api/v1/user/emptySlot/lecturer/${loginUser.userId}`)
                .then((response) => {
                    setEmptySlot(response)
                    toast.update(id, { render: "Get slot complete", type: "success", isLoading: false, autoClose: true });
                })
                .catch(error => {
                    console.log("Error at Month.js " + error)
                    toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });

                })
        } else if (loginUser.roleName === "STUDENT") {
            axios
                .get(`/api/v1/students/bookedSlot/homePage/${loginUser.userId}`)
                .then((response) => {
                    setEmptySlot(response)
                    toast.update(id, { render: "Get slot complete", type: "success", isLoading: false, autoClose: true });
                })
                .catch(error => {
                    console.log("Error at Month.js " + error)
                    toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });

                })
        }

    }, [])

    const getFilterSlot = (day) => {

        const date = day.format("YYYY-MM-DD");
        const matchingSlots = emptySlot.reduce((accumulator, slot) => {
            if (slot.dateStart === date) {
                return [...accumulator, slot];
            }
            return accumulator;
        }, []);
        return matchingSlots;
    }

    return (
        <>
            <ToastContainer />
            <div className={Style.month}>
                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => {
                            const filterSlot = getFilterSlot(day)
                            return (
                                <Day day={day} key={idx} rowIdx={i} slots={filterSlot} />
                            )
                        })
                        }
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
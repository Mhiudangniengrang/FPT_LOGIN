import React, { useState, useEffect } from "react";
import Day from "./Day";
import Style from '../../assets/style/month.module.scss';
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
export default function Month({ month }) {
    const [emptySlot, setEmptySlot] = useState([])
    const [bookedSlot, setBookedSlot] = useState([])
    const [loading, isLoading] = useState(true)
    const { loginUser } = useData()
    useEffect(() => {
        axios
            .get(`/api/v1/user/emptySlot/lecturer/${loginUser.userId}`)
            .then((response) => {
                setEmptySlot(response)
            })
            .catch(error => {
                console.log("Error at Month.js " + error)

            })
            .finally(() => {
                isLoading(false)
            })

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
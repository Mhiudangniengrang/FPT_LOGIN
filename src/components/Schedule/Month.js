import React, { useState, useEffect } from "react";
import Day from "./Day";
import Style from '../../assets/style/month.module.scss';
import axios from "../../Services/customizeAxios";
export default function Month({ month }) {
    console.log("render me")
    const [emptySlot, setEmptySlot] = useState([])
    console.log(emptySlot)
    useEffect(() => {
        axios
            .get(`/api/v1/user/emptySlot/lecturer/2`)
            .then((response) => {
                response.map((slot) => {
                    setEmptySlot((prevSlot) => ([
                        ...prevSlot,
                        slot
                    ]))
                })
            })
            .catch(error => {
                console.log("Error at Week.js " + error)
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
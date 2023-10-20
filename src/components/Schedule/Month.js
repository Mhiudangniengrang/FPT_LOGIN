import React from "react";
import Day from "./Day";
import Style from '../../assets/style/month.module.scss';
export default function Month({ month }) {
    return (
        <>
            <div className={Style.month}>

                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <Day day={day} key={idx} rowIdx={i} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
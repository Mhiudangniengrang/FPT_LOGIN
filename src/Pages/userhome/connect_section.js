import React from "react";

export default function Connect_section() {

    return (

        <section className=" align-items-center justify-content-between hero" id='overview'>
            <div>
                <h2>Scheduling made easy for students and teachers</h2>

                <div>
                    <p>Meet My Lecturer simplifies the process of scheduling meetings with teachers, allowing students to easily request meetings and teachers to create available time slots. With our user-friendly platform, you can say goodbye to the hassle of coordinating schedules and hello to more productive meetings.</p>
                    <div>
                        <div>
                            <h3>Request Meetings with Teachers</h3>
                            <p>Students can browse available time slots and requests meetings. Requests require student and time slot detail</p>
                        </div>
                        <div>
                            <h3>Schedule Student Meetings</h3>
                            <p>Teachers can review accept, or reject student meeting requests. Accepted meetings are scheduled based in the time slot details</p>
                        </div>
                    </div>
                    <div>
                        {/* <ButtonLink /> */}
                    </div>
                </div>
            </div>
        </section >

    )
}
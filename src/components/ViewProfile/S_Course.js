import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import { Stack } from "react-bootstrap";

const S_Course = () => {
  const { loginUser } = useData()
  const [subject, setSubject] = useState([])
  const [err, isErr] = useState(false)
  useEffect(() => {
    const id = toast.loading("Getting subjects...")
    axios
      .get(`/api/v1/students/${loginUser.userId}/subjects/lecturers`)
      .then(res => {
        setSubject(res)
        toast.update(id, { render: "Get subjects complete", type: "success", isLoading: false, autoClose: true });

      }).catch(error => {
        console.log("Error at getting subject", error)
        toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
        isErr(true)
      })
  }, [])
  return (
    <div>
      <ToastContainer />
      <p className="pb-1"><strong>Subject:</strong></p>
      <Stack gap={3}>
        {subject.map(item => (
          <Stack direction="horizontal" >
            <FontAwesomeIcon icon={faBriefcase} style={{ color: "#000000", paddingRight: "10px" }} />

            <p key={item.subjectId} className="m-0">{item.subjectId} - {item.unique}</p>
          </Stack>
        ))}
        {err && <p>There is no subject for this student</p>}
      </Stack>
    </div>
  );
};

export default S_Course;

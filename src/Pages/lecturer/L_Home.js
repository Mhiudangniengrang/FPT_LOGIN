import React, { useContext } from "react";
import L_Layout from "../../Layouts/L_Layout";
import GlobalContext from "../../context/GlobalContext";
import CreateSlot from "../../components/Schedule/CreateSlot";
import L_HomeTeacher from "../../components/L_HomeTeacher";
const L_home = () => {

  const { showSlotModal, setLecturerId, emptySlots } = useContext(GlobalContext)
  const lecturerId = typeof window != null ? sessionStorage.getItem('lecturerId') : null
  setLecturerId(lecturerId)
  return (
    <>
      {showSlotModal && <CreateSlot />}
      <L_Layout>
        <L_HomeTeacher />
      </L_Layout>
    </>
  );
};

export default L_home;

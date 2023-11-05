import React from "react";
import S_Layout from "../Layouts/S_Layout";
import { Card } from "react-bootstrap";

const HelpCenter = () => {
  return (
    <S_Layout>
      <div>
        <h1>Help Center</h1>
        <p>Here is where you can find information on various topics:</p>
        <Card style={{ padding: "30px" }}>
          <div>
            <h5>I. Hướng dẫn sử dụng MML - MEET MY LECTURER:</h5>
            <p>
              <b>Giới Thiệu:</b> Đây là một trang web đặt lịch dành cho Giảng
              viên , Sinh viên có thể gặp nhau bằng cách đặt lịch hẹn qua Meet
              My Lecturer
            </p>
            <p>
              <b>Dành cho giảng viên - For Teachers:</b>{" "}
            </p>
            <p>
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
              <b>Chú ý:</b> Nếu giảng viên không xem được hướng dẫn MML vui lòng
              liên hệ zalo: 0939 421 192 hoặc liên hệ email KhangHQD@fe.edu.vn
            </p>
            <p>
              <b>Note:</b> If teachers can't find the MML, please contact{" "}
              <a href="mailto:KhangHQD@fe.edu.vn">KhangHQD@fe.edu.vn</a> via
              Zalo or email.
            </p>
          </div>

          <div>
            <b>Dành cho sinh viên - For Students:</b>
            <p>
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </p>
            <p>
              <a href="URL_TO_LMS_GUIDE_FOR_STUDENTS">Click here</a>
            </p>
            <p>
              <b>Lưu ý:</b>
            </p>
            <p>
              <b>Note:</b>
            </p>
          </div>
        </Card>
      </div>
    </S_Layout>
  );
};

export default HelpCenter;

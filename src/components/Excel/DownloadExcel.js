import React from 'react';
import * as XLSX from "xlsx/xlsx.mjs";
import dayjs from 'dayjs';
import Style from '../../assets/style/form.module.scss'

const DownloadButton = () => {
    const exportExcel = (data, nameSheet, nameFile) => {
        return new Promise((resolve, reject) => {
            let wb = XLSX.utils.book_new();

            let ws = XLSX.utils.json_to_sheet(data);

            XLSX.utils.book_append_sheet(wb, ws, nameSheet);

            XLSX.writeFile(wb, `${nameFile}.xlsx`);
            resolve("ok");
        });
    };
    const handleDownload = () => {
        const today = new dayjs();
        const todayString = `[MML] Materials ${today.$D}_${today.$M + 1}_${today.$y}`;
        const data = [
            {
                "date": "13",
                "month": "11",
                "year": "2023",
                "subjectId": "CSD201",
                "roomId": "Room101",
                "meetingURL": "https://example.com/meeting",
                "slotTimeId": 0
            },
        ];
        exportExcel(
            data,
            "TeachingSchedule",
            todayString,
        );

    };

    return (
        <button
            className={Style.btnExcel}
            style={{ border: 'none', borderRadius: '10px' }}
            onClick={handleDownload}>Download Excel</button>
    );
};

export default DownloadButton;

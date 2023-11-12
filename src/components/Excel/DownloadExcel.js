import React from 'react';
import * as XLSX from "xlsx/xlsx.mjs";
import dayjs from 'dayjs';

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
                "date": "11/13/2023",
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
        <button onClick={handleDownload}>Download Excel</button>
    );
};

export default DownloadButton;

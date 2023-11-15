import dayjs from 'dayjs';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useData } from '../../context/DataContext';
import { Stack } from 'react-bootstrap';
import axios from '../../Services/customizeAxios';
import { ToastContainer, toast } from 'react-toastify';

const ExcelReader = ({ handleTeachSlot }) => {
    const { loginUser } = useData()
    const [file, setFile] = useState({});
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const [teachSlot, setTeachSlot] = useState([]);

    const [saving, isSaving] = useState(false)
    const makeCols = (refstr) => {
        let o = [],
            C = XLSX.utils.decode_range(refstr).e.c + 1;
        for (let i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
        return o;
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) setFile(files[0]);
    };

    const handleFile = () => {
        try {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const parsedData = XLSX.utils.sheet_to_json(ws);
                setCols(makeCols(ws['!ref']));
                setData(parsedData);
                const teachingSlotData = parsedData.map(item => ({

                    dateStart: dayjs(new Date(`${parseInt(item.year)}-${parseInt(item.month)}-${parseInt(item.date)}`)).format("YYYY-MM-DD"),
                    lecturerId: loginUser.userId,
                    subjectId: item.subjectId,
                    roomId: item.roomId,
                    meetingUrl: item.meetingURL,
                    slotTimeId: item.slotTimeId
                }));
                setTeachSlot(teachingSlotData)
                handleTeachSlot(teachingSlotData);
            };

            if (rABS) {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        } catch (error) {
            toast.error("Error at reading excel file")
            console.log(error)
        }
    };

    const handleSave = () => {
        console.log(teachSlot)
        setFile({})
        const id = toast.loading("Please wait...")
        isSaving(true)
        axios
            .post(`/api/v1/schedule/lecturer/${loginUser.userId}`, teachSlot)
            .then(res => {
                console.log(res)
                toast.update(id, { render: "Get teaching slots complete", type: "success", isLoading: false, autoClose: true });

            }).catch(error => {
                toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });

                console.log(error)
            }).finally(() => {
                isSaving(false)
            })
    }
    return (
        <div>
            <ToastContainer />
            <label htmlFor="file">Upload an excel file</label>
            <br />
            <input
                type="file"
                className="form-control"
                id="file"
                accept={["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"]
                    .map((x) => "." + x)
                    .join(",")}
                onChange={handleChange}
            />
            <br />
            <Stack direction='horizontal' gap={3}>

                <input type="submit" value="Add to weekly calendar" onClick={handleFile} />
                <input type="submit" value={`${!saving ? "Save into database" : "Saving..."}`} onClick={handleSave} disabled={teachSlot.length === 0 ? true : false} />
            </Stack>
        </div>
    );
};

export default ExcelReader;

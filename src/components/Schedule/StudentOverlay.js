import { Stack } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Style from '../../assets/style/form.module.scss'
import { useContext, useEffect, useMemo } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import axios from '../../Services/customizeAxios'
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import BookPublicOverlay from './BookPublicOverlay';
import S_BookSlot from './S_BookSlotOverLay';

function StudentOverlay() {
    const { selectedSlot } = useContext(GlobalContext)
    const status = selectedSlot.status || selectedSlot.requestStatus
    console.log(status)
    return (
        <>
            {status === "BOOKED" &&
                <BookPublicOverlay />
            }
            {status === "OPEN" &&
                <S_BookSlot />
            }
        </>
    );
}

export default StudentOverlay;
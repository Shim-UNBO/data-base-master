import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarContainer, Popup, ButtonContainer, Button,eventContainer,eventTitle,eventStatus,eventStatusPending,eventStatusApproved,eventStatusReject,eventTime,CloseButton  } from './mainStyle';
import axios from 'axios';
import closeBtn from "../assets/icons/close-img.png"

// npm install @fullcalendar/react @fullcalendar/daygrid

const ReservationList = () => {
  const [events, setEvents] = useState([]);
  const category = localStorage.getItem('category');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedReservationTime, setUpdatedReservationTime] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.post('https://api.mever.me:8080/getReservation', {
        category,
      });
      // console.log(response);
      const formattedEvents = response.data.map((reservation) => ({
        title: reservation.orderId,
        start: reservation.reservationDate,
        email: reservation.email,
        status: reservation.status || 'Pending',
        extendedProps: reservation,
        name: reservation.memo,
      }));
      setEvents(formattedEvents);
      console.log(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEventClick = (info) => {
    // console.log(info.event)
    setSelectedEvent(info.event);
  };

  const handleConfirmReservation = async () => {
    if (selectedEvent) {
      const seq = selectedEvent.extendedProps.seq;
      const orderId = selectedEvent.extendedProps.orderId;
      try {
        const response =await axios.post('https://api.mever.me:8080/setReservation', {
          status: 'approved',
          seq,
          orderId,
          category
        });
        console.log('API response:', response.data);
        console.log('예약 확정:', selectedEvent.extendedProps);
      } catch (error) {
        console.log('API error:', error);
      }
    }
    fetchEvents();
    setSelectedEvent(null);
  };

  const handleCancelReservation = async () => {
    if (selectedEvent) {
      const seq = selectedEvent.extendedProps.seq;
      const orderId = selectedEvent.extendedProps.orderId;
      try {
        const response =await axios.post('https://api.mever.me:8080/setReservation', {
          status: 'reject',
          seq,
          orderId,
          category
        });
        console.log('API response:', response.data);
        console.log('예약 취소:', selectedEvent.extendedProps);
      } catch (error) {
        console.log('API error:', error);
      }
    }
    fetchEvents();
    setSelectedEvent(null);
  };
  const handleUpdateReservation = () => {
    // console.log(selectedEvent);
    // console.log(time.replace("T", " "));
    setChange(true)
  };
  const handleUpdateButtonClick = () => {
    // 수정할 예약 정보를 설정합니다.
    // 예약 정보를 상태에 업데이트하거나 필요한 동작을 수행합니다.
    // 예를 들어, 팝업 내에 있는 예약 정보를 수정할 수 있습니다.
    setUpdatedReservationTime(selectedEvent.start && selectedEvent.start.toLocaleString());
  };
  
  const handlePopupClose = () => {
    setSelectedEvent(null);
  };

  const [time, setTime] =useState('')
  const [change, setChange] = useState(false)
  const [show, setShow] = useState(true)
  const onTimeChange =()=>{
    console.log('hello');
    axios.post("https://api.mever.me:8080/updateReservation",{
      reservationDate: time.replace("T", " "),
      seq: selectedEvent._def.extendedProps.seq,
      email: selectedEvent._def.extendedProps.email,
      phone: selectedEvent._def.extendedProps.phone,

    }).then(alert('Date is changed'))
    .catch((error=>{console.log(error)}))
    setSelectedEvent(null)

  }
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div style={{eventContainer, display: 'flex' }}>
            <div style={eventTime}>{eventInfo.timeText}</div>
            <div style={eventTitle}>{eventInfo.event._def.extendedProps.name}</div>
            {/* <div
              style={
                eventInfo.event.extendedProps.status === 'Pending' || eventInfo.event.extendedProps.status === null
                ? eventStatusPending
                : eventInfo.event.extendedProps.status === 'approved'
                ? eventStatusApproved
                : eventStatusReject
              }
            >
              {eventInfo.event.extendedProps.status}
            </div> */}
          </div>
        )}
        />
      {selectedEvent &&  (
        <Popup >
          <CloseButton onClick={handlePopupClose}>
          { <img  className='closeBtn' src={closeBtn} alt="닫기" /> }
          </CloseButton >
          <h3>예약 정보</h3>
          <p>예약일시: {selectedEvent.start && selectedEvent.start.toLocaleString()}</p>
          {change && <input type="datetime-local" onChange={(e)=>setTime(e.target.value)}/>}
          {change && <Button onClick={onTimeChange}>수정</Button>}
          {/* <p>상품정보: {selectedEvent.title}</p> */}
          <p>고객: {selectedEvent.extendedProps.name && selectedEvent.extendedProps.name.toString()}</p>
          <p>전화번호: {selectedEvent.extendedProps.phone && selectedEvent.extendedProps.phone.toString()}</p>
          <p>이메일: {selectedEvent.extendedProps.email && selectedEvent.extendedProps.email.toString()}</p>
          {/* {selectedEvent.extendedProps.email !== 'null' && (
            <Button onClick={handleConfirmReservation}>예약확정</Button>
          )}
          {selectedEvent.extendedProps.email !== 'null' && (
            <Button onClick={handleCancelReservation}>예약취소</Button>
          )}
          <Button onClick={handleUpdateReservation}>예약수정</Button> */}
        </Popup>
      )}
    </CalendarContainer>
  );
};

export default ReservationList;
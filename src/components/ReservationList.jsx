import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Select, Button } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
    CalendarContainer,
    Popup,
    ButtonContainer,
    eventContainer,
    eventTitle,
    eventStatus,
    eventStatusPending,
    eventStatusApproved,
    eventStatusReject,
    eventTime,
    CloseButton,
} from './mainStyle';
import axios from 'axios';
import closeBtn from '../assets/icons/close-img.png';
import { useCookies } from 'react-cookie';

const ReservationList = () => {
    const [events, setEvents] = useState([]);
    // const category = localStorage.getItem('category');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [updatedReservationTime, setUpdatedReservationTime] = useState('');
    const category = useRef(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const newJeans = cookies.id === 'true';
    const handleSelectChange = (value) => {
        setSelectedValue(value); // 선택된 값 업데이트
    };

    const handleButtonClick = () => {
        if (selectedValue) {
            category.current = selectedValue;
            fetchData(selectedValue); // 선택된 값으로 데이터를 가져오는 함수 호출
            const todayButton = document.querySelector('.fc-today-button');
            if (todayButton) {
                todayButton.click();
            }
        }
    };
    const fetchData = async (selectedValue) => {
        const response = await axios.post(
            'https://api.mever.me:8080/getReservation',
            {
                category: selectedValue,
            }
        );
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
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            category.current = localStorage.getItem('category');
            const response = await axios.post(
                'https://api.mever.me:8080/getReservation',
                {
                    category: localStorage.getItem('category'),
                }
            );
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
                const response = await axios.post(
                    'https://api.mever.me:8080/setReservation',
                    {
                        status: 'approved',
                        seq,
                        orderId,
                        category: category.current,
                    }
                );
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
                const response = await axios.post(
                    'https://api.mever.me:8080/setReservation',
                    {
                        status: 'reject',
                        seq,
                        orderId,
                        category: category.current,
                    }
                );
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
        setChange(true);
    };
    const handleUpdateButtonClick = () => {
        // 수정할 예약 정보를 설정합니다.
        // 예약 정보를 상태에 업데이트하거나 필요한 동작을 수행합니다.
        // 예를 들어, 팝업 내에 있는 예약 정보를 수정할 수 있습니다.
        setUpdatedReservationTime(
            selectedEvent.start && selectedEvent.start.toLocaleString()
        );
    };

    const handlePopupClose = () => {
        setSelectedEvent(null);
    };

    const [time, setTime] = useState('');
    const [change, setChange] = useState(false);
    const [show, setShow] = useState(true);
    const onTimeChange = () => {
        console.log('hello');
        axios
            .post('https://api.mever.me:8080/updateReservation', {
                reservationDate: time.replace('T', ' '),
                seq: selectedEvent._def.extendedProps.seq,
                email: selectedEvent._def.extendedProps.email,
                phone: selectedEvent._def.extendedProps.phone,
            })
            .then(alert('Date is changed'))
            .catch((error) => {
                console.log(error);
            });
        setSelectedEvent(null);
    };
    return (
        <>
            {newJeans && (
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Select
                            value={selectedValue}
                            style={{ width: '100%' }}
                            onChange={handleSelectChange}
                            options={[
                                {
                                    value: '',
                                    label: '사이트 별 리스트 ↓',
                                },
                                {
                                    value: '/art1/',
                                    label: '청담 갤러리1부(단체전)',
                                },
                                {
                                    value: '/art2/',
                                    label: '청담 갤러리2부(단체전)',
                                },
                                {
                                    value: '/art3/',
                                    label: '남산 갤러리(김미영 작가)',
                                },
                                {
                                    value: '/cafe1/',
                                    label: '선릉 카페(대단한 커피)',
                                },
                                {
                                    value: '/hospital1/',
                                    label: '강남병원 (지인 병원)',
                                },
                                {
                                    value: '/office1/',
                                    label: '법인 빌딩 (삼익영농)',
                                },
                                {
                                    value: '/academy1/',
                                    label: '강남 학원 (영어 학원)',
                                },
                                {
                                    value: '/art4/',
                                    label: '종로 갤러리2(백영희작가)',
                                },
                                {
                                    value: '/mart1/',
                                    label: '편의점',
                                },
                                {
                                    value: '/antique1/',
                                    label: '대전아트아카데미',
                                },
                                {
                                    value: '/cafe2/',
                                    label: '대전자산협회',
                                },
                                {
                                    value: '/parking1/',
                                    label: '부천재건축단지',
                                },
                                {
                                    value: '/rebuilding1/',
                                    label: '부천 대진아파트',
                                },
                                {
                                    value: '/hall1/',
                                    label: '부산벡스코',
                                },
                                {
                                    value: '/building2/',
                                    label: '수원 관공서',
                                },
                                {
                                    value: '/warship1/',
                                    label: '용산 전쟁 기념관',
                                },
                                {
                                    value: '/academy2/',
                                    label: '고려직업전문학교',
                                },
                                {
                                    value: '/academy3/',
                                    label: '고려직업전문학교3',
                                },
                                {
                                    value: '/academy4/',
                                    label: '아카데미4',
                                },
                                {
                                    value: '/academy5/',
                                    label: '아카데미5',
                                },
                                {
                                    value: '/office2/',
                                    label: '크럼플 오피스',
                                },
                                {
                                    value: '/studio1/',
                                    label: '스튜디오',
                                },
                                {
                                    value: '/hall2/',
                                    label: '부산벡스코2',
                                },
                                {
                                    value: '/machine1/',
                                    label: '벡스코/수원관공서',
                                },
                                {
                                    value: '/kpop1/',
                                    label: 'BTS 초콜릿',
                                },
                                {
                                    value: '/modelhouse2/',
                                    label: '3D 신촌 빌리브 디 에이블',
                                },
                                {
                                    value: '/antique2/',
                                    label: '서울 감정평가원',
                                },
                                {
                                    value: '/pub1/',
                                    label: '앤티크 펍(미자살롱)',
                                },
                                {
                                    value: '/modelhouse1/',
                                    label: '3D 신촌 빌리브 디 에이블',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={handleButtonClick}>
                            전송
                        </Button>
                    </Col>
                </Row>
            )}
            <CalendarContainer>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={handleEventClick}
                    eventContent={(eventInfo) => (
                        <div style={{ eventContainer, display: 'flex' }}>
                            <div style={eventTime}>{eventInfo.timeText}</div>
                            <div style={eventTitle}>
                                {eventInfo.event._def.extendedProps.name}
                            </div>
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
                {selectedEvent && (
                    <Popup>
                        <CloseButton onClick={handlePopupClose}>
                            {
                                <img
                                    className="closeBtn"
                                    src={closeBtn}
                                    alt="닫기"
                                />
                            }
                        </CloseButton>
                        <h3>예약 정보</h3>
                        <p>
                            예약일시:{' '}
                            {selectedEvent.start &&
                                selectedEvent.start.toLocaleString()}
                        </p>
                        {change && (
                            <input
                                type="datetime-local"
                                onChange={(e) => setTime(e.target.value)}
                            />
                        )}
                        {change && <Button onClick={onTimeChange}>수정</Button>}
                        {/* <p>상품정보: {selectedEvent.title}</p> */}
                        <p>
                            고객:{' '}
                            {selectedEvent.extendedProps.name &&
                                selectedEvent.extendedProps.name.toString()}
                        </p>
                        <p>
                            전화번호:{' '}
                            {selectedEvent.extendedProps.phone &&
                                selectedEvent.extendedProps.phone.toString()}
                        </p>
                        <p>
                            이메일:{' '}
                            {selectedEvent.extendedProps.email &&
                                selectedEvent.extendedProps.email.toString()}
                        </p>
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
        </>
    );
};

export default ReservationList;

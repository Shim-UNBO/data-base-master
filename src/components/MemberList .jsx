import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Select, Button, Table, Row, Col } from 'antd';

import {
    Main,
    Head,
    HeadText,
    Body,
    BodyText,
    BodyWrap,
    Btn,
    LoginInput,
} from '../table/style';
import SubscripPage from './SubscribeInfo';
import SendingPage from './SendingPage';
import Modal from 'react-modal'; // react-modal import
import './modalStyles.css'; // 추가한 CSS 파일을 불러옵니다.
import * as XLSX from 'xlsx';
import { useCookies } from 'react-cookie';

const MemberList = () => {
    const [memberList, setMemberList] = useState([]);
    const [selectUser, setSelectUser] = useState();
    // const [selectEmail, setSelectEmail] = useState()
    const [uniquePage, setUniquePage] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [checkedArr, setCheckedArr] = useState([]);
    const [sendingPage, setSendingPage] = useState(false);
    // const [indexEmail, setIndexEmail] = useState()
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [uniqueData, setUniqueData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        userName: '',
        userPh: '',
        selectedCategory: '',
        inputDcrp: '',
    });
    const category = useRef(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const newJeans = cookies.id === 'true';

    const modelhouseColumns = [
        {
            title: '번호',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        { title: '일자', dataIndex: 'regdate', key: 'regdate' },
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        {
            title: '전화번호',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <a href={`tel:${text}`}>{text}</a>,
        },
        { title: '진행', dataIndex: 'progress', key: 'progress' },
        { title: '내용', dataIndex: 'dcrp', key: 'dcrp' },
        { title: '담당자', dataIndex: 'manager', key: 'manager' },
        {
            title: '저장',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Button type="primary" onClick={() => openModal(index)}>
                    수정
                </Button>
            ),
        },
    ];
    const columns = [
        {
            title: '번호',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        { title: '일자', dataIndex: 'regdate', key: 'regdate' },
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        {
            title: '전화번호',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <a href={`tel:${text}`}>{text}</a>,
        },
        { title: '설문 조사 결과', dataIndex: 'dcrp', key: 'dcrp' },
        {
            title: '내용',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Button type="primary" onClick={() => onSubscribe(index)}>
                    구독 정보
                </Button>
            ),
        },
    ];

    const handleSelectChange = (value) => {
        setSelectedValue(value); // 선택된 값 업데이트
    };

    //전체선택 기능
    const handleSelectAll = () => {
        const allIndices = memberList.map((_, index) => index);
        allIndices.forEach((index) => {
            const checkbox = document.querySelector(`.checkbox-${index}`);
            checkbox.checked = !checkbox.checked; // 선택 상태를 토글
        });
        setCheckedArr(allIndices);
    };
    //카테고리 변경 시 전체 체크 해제 후 데이터 가져오기
    const handleButtonClick = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        if (selectedValue) {
            category.current = selectedValue;
            fetchData(selectedValue); // 선택된 값으로 데이터를 가져오는 함수 호출
        }
    };
    const fetchData = (selectedCategory) => {
        axios
            .post('https://api.mever.me:8080/member/list', null, {
                params: {
                    category: selectedCategory,
                },
            })
            .then((response) => {
                setMemberList(
                    response.data.filter((member) => member.adminYn !== 'Y')
                );
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    // 셀렉트 박스의 선택된 분류 값을 저장할 상태
    // MEMBER DATA :
    useEffect(() => {
        category.current = localStorage.getItem('category');
        axios
            .post('https://api.mever.me:8080/member/list', null, {
                params: {
                    email: '',
                    category: category.current,
                },
            })
            .then((response) => {
                setMemberList(
                    response.data.filter((member) => member.adminYn !== 'Y')
                );
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // SUBSCRIBTION BUTTON FUNCTION :
    const onSubscribe = (index) => {
        setUniquePage(true);
        setSelectUser(index);
        setInputEmail(memberList[index]?.email);
        setInputPhone(memberList[index]?.phone);
    };
    // SEND EMAIL BTN FUNCTION:
    // const onSendEmail = (index) => {
    //   setSelectEmail(index)
    //   setSendingPage(true)
    //   setIndexEmail(index)
    // }

    // UNIQUE PAGE DATA :

    // useEffect(() => {
    //   axios.post('https://api.mever.me:8080/subscription/list', null, {
    //     email: inputEmail,
    //     phone: inputPhone,
    //   })
    //   .then((response) => {
    //     setUniqueData(response.data);
    //   })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }, [inputEmail,inputPhone]);

    const onCheck = (index) => {
        setCheckedArr((prevArr) => {
            if (!prevArr.includes(index)) {
                return [...prevArr, index];
            } else {
                return prevArr.filter((item) => item !== index);
            }
        });
    };
    // console.log(checkedUsers);

    const onSendList = () => {
        if (checkedArr.length > 0) {
            setCheckedUsers(checkedArr);
            setSendingPage(true);
        } else {
            alert('먼저 사용자를 선택하세요!');
        }
    };
    // 전화걸기 함수
    const callPhoneNumber = (phone) => {
        // 전화를 걸기 위한 로직을 구현합니다.
        // 예를 들어, window.open() 메서드를 사용하여 전화를 걸 수 있습니다.
        window.location.href = `tel:${phone}`;
    };
    const updateMember = (index, category, dcrp) => {
        const user = memberList[index];
        const mainId = localStorage.getItem('mainId');

        return new Promise((resolve, reject) => {
            if (user.manager === mainId || user.manager === null) {
                axios
                    .post('https://api.mever.me:8080/member/updateInfo', {
                        email: user.email,
                        phone: user.phone,
                        progress: category.current,
                        manager: mainId,
                        dcrp: dcrp,
                        category: category.current,
                    })
                    .then((response) => {
                        // 성공적으로 서버에 저장한 경우
                        console.log('서버 응답 데이터:', response.data);
                        resolve(); // Promise를 resolve하여 성공했음을 알립니다.
                    })
                    .catch((error) => {
                        // 데이터 전송 실패시 에러 처리를 해줄 수 있습니다.
                        console.error('데이터 전송 실패:', error);
                        reject(error); // Promise를 reject하여 실패했음을 알립니다.
                    });
            } else {
                alert('권한이 없습니다.');
                reject('권한이 없습니다.'); // Promise를 reject하여 실패했음을 알립니다.
            }
        });
    };
    // 모달 창 열기
    const openModal = (index) => {
        const user = memberList[index];
        setModalData({
            name: user.name,
            phone: user.phone,
            selectedCategory: user.progress || '', // 초기 select 박스 값 설정
            inputDcrp: user.dcrp || '', // 초기 textarea 값 설정
        });
        setIsModalOpen(true);
        setSelectUser(index); // 선택된 사용자 인덱스 설정
    };
    // select 박스와 textarea 변경을 처리하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({ ...prevData, [name]: value }));
    };
    const saveChanges = () => {
        if (selectUser !== null) {
            const { name, phone, selectedCategory, inputDcrp } = modalData;
            const updatedDcrp = inputDcrp + '\r\n' + getCurrentDateTimeString();

            updateMember(selectUser, selectedCategory, updatedDcrp);

            // 모달 창 닫기
            setIsModalOpen(false);

            // 데이터 업데이트
            setMemberList((prevList) =>
                prevList.map((item, idx) =>
                    idx === selectUser
                        ? {
                              ...item,
                              progress: selectedCategory,
                              dcrp: updatedDcrp, // 업데이트된 dcrp 값을 설정합니다.
                              manager: localStorage.getItem('mainId'),
                          }
                        : item
                )
            );
        }
    };
    // 모달 창 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const getCurrentDateTimeString = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const downloadExcel = () => {
        const sortedMemberList = [...memberList].sort(
            (a, b) => new Date(b.regdate) - new Date(a.regdate)
        );

        // 테이블의 데이터 가져오기
        const data = sortedMemberList.map((list) => ({
            일자: list.regdate,
            이름: list.name,
            이메일: list.email,
            전화번호: list.phone,
            진행: list.progress,
            내용: list.dcrp,
            담당자: list.manager,
        }));

        // 워크북 생성
        const workbook = XLSX.utils.book_new();

        // 워크시트 생성
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 워크북에 워크시트 추가
        XLSX.utils.book_append_sheet(workbook, worksheet, '테이블 데이터');

        // 엑셀 파일로 저장
        XLSX.writeFile(workbook, 'member.xlsx');
    };
    // 검색어 입력 시 실행되는 이벤트 핸들러
    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchKeyword(value);
    };

    // 회원 목록을 검색어에 따라 필터링하는 함수
    const filterMembers = (members) => {
        if (!searchKeyword) {
            return members;
        }
        const keyword = searchKeyword.toLowerCase();
        return members.filter(
            (member) =>
                member.name?.toLowerCase().includes(keyword) ||
                false ||
                member.email?.toLowerCase().includes(keyword) ||
                false ||
                member.phone?.toLowerCase().includes(keyword) ||
                false ||
                member.dcrp?.toLowerCase().includes(keyword) ||
                false ||
                member.manager?.toLowerCase().includes(keyword) ||
                false ||
                member.progress?.toLowerCase().includes(keyword) ||
                false ||
                member.regdate?.toLowerCase().includes(keyword) ||
                false
        );
    };
    return (
        <>
            {newJeans && (
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Select
                            defaultValue=""
                            style={{
                                width: '100%',
                            }}
                            onChange={handleSelectChange}
                            options={[
                                {
                                    value: '',
                                    label: '사이트 별 고객 리스트 ↓',
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
                    <Col span={8}>
                        <Button onClick={onSendList} style={{ float: 'right' }}>
                            이메일 보내기
                        </Button>
                    </Col>
                    <Col span={24}>
                        {category.current === '/modelhouse1/' && (
                            <LoginInput
                                type="text"
                                value={searchKeyword}
                                onChange={handleSearch}
                                placeholder="검색어를 입력하세요"
                            />
                        )}

                        {category.current === '/modelhouse1/' && (
                            <Btn onClick={downloadExcel}>엑셀 다운로드</Btn>
                        )}
                    </Col>
                </Row>
            )}
            <Table
                dataSource={memberList}
                columns={
                    category.current === '/modelhouse1/'
                        ? modelhouseColumns
                        : columns
                }
            />
            {/* 모달 창 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        border: 'none', // 기존의 border 스타일을 제거하고
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과를 추가합니다
                        padding: '20px',
                        borderRadius: '8px', // 둥근 테두리를 주어 더 부드러운 느낌을 줍니다
                        maxWidth: '400px',
                        width: '90%', // 모달의 너비를 조정합니다
                        zIndex: '1000', // 다른 요소들보다 앞에 표시하기 위해 z-index를 설정합니다
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: '1000',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // 모달을 화면 중앙에 배치하기 위해 flex를 사용합니다
                    },
                }}
            >
                <h2>데이터 수정</h2>
                <div>
                    <label>이름: {modalData.name}</label>
                </div>
                <div>
                    <label>번호: {modalData.phone}</label>
                </div>
                <div>
                    <label>분류:</label>
                    <select
                        name="selectedCategory"
                        value={modalData.selectedCategory}
                        onChange={handleChange}
                    >
                        <option value="선택안함">선택안함</option>
                        <option value="전화완료">전화완료</option>
                        <option value="초청">초청</option>
                        <option value="계약">계약</option>
                        <option value="무관심">무관심</option>
                    </select>
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        name="inputDcrp"
                        value={modalData.inputDcrp}
                        onChange={handleChange}
                        placeholder="텍스트를 입력하세요"
                        style={{ height: '120px', resize: 'none' }} // textarea의 높이를 조정하고 resize를 막습니다
                    />
                </div>
                {/* <button onClick={() => updateMember(selectUser, modalData.selectedCategory, modalData.inputDcrp)}>저장</button> */}
                <button onClick={saveChanges}>저장</button>
                <button onClick={closeModal}>닫기</button>
            </Modal>
            {uniquePage && (
                <SubscripPage
                    uniqueData={uniqueData}
                    userIndex={selectUser}
                    setClose={setUniquePage}
                />
            )}
            {sendingPage && (
                <SendingPage
                    memberList={memberList}
                    setClose={setSendingPage}
                    checkedUsers={checkedUsers}
                />
            )}
        </>
    );
};

export default MemberList;

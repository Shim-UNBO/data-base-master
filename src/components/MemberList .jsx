import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {
    Main,
    Head,
    HeadText,
    Body,
    BodyText,
    BodyWrap,
    Btn,
    LoginInput,
} from '../table/style'
import SubscripPage from './SubscribeInfo'
import SendingPage from './SendingPage'
import Modal from 'react-modal' // react-modal import
import './modalStyles.css' // 추가한 CSS 파일을 불러옵니다.
import * as XLSX from 'xlsx'
import { useCookies } from 'react-cookie'

const MemberList = () => {
    const [memberList, setMemberList] = useState([])
    const [selectUser, setSelectUser] = useState()
    // const [selectEmail, setSelectEmail] = useState()
    const [uniquePage, setUniquePage] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const [inputPhone, setInputPhone] = useState('')
    const [checkedArr, setCheckedArr] = useState([])
    const [sendingPage, setSendingPage] = useState(false)
    // const [indexEmail, setIndexEmail] = useState()
    const [checkedUsers, setCheckedUsers] = useState([])
    const [uniqueData, setUniqueData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({
        userName: '',
        userPh: '',
        selectedCategory: '',
        inputDcrp: '',
    })
    const category = useRef(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['id'])
    const newJeans = cookies.id === 'true'

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value) // 선택된 값 업데이트
    }

    //전체선택 기능
    const handleSelectAll = () => {
        const allIndices = memberList.map((_, index) => index)
        allIndices.forEach((index) => {
            const checkbox = document.querySelector(`.checkbox-${index}`)
            checkbox.checked = !checkbox.checked // 선택 상태를 토글
        })
        setCheckedArr(allIndices)
    }
    //카테고리 변경 시 전체 체크 해제 후 데이터 가져오기
    const handleButtonClick = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false
        })
        if (selectedValue) {
            category.current = selectedValue
            fetchData(selectedValue) // 선택된 값으로 데이터를 가져오는 함수 호출
        }
    }
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
                )
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    // 셀렉트 박스의 선택된 분류 값을 저장할 상태
    // MEMBER DATA :
    useEffect(() => {
        category.current = localStorage.getItem('category')
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
                )
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    // SUBSCRIBTION BUTTON FUNCTION :
    const onSubscribe = (index) => {
        setUniquePage(true)
        setSelectUser(index)
        setInputEmail(memberList[index]?.email)
        setInputPhone(memberList[index]?.phone)
    }
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
                return [...prevArr, index]
            } else {
                return prevArr.filter((item) => item !== index)
            }
        })
    }
    // console.log(checkedUsers);

    const onSendList = () => {
        if (checkedArr.length > 0) {
            setCheckedUsers(checkedArr)
            setSendingPage(true)
        } else {
            alert('먼저 사용자를 선택하세요!')
        }
    }
    // 전화걸기 함수
    const callPhoneNumber = (phone) => {
        // 전화를 걸기 위한 로직을 구현합니다.
        // 예를 들어, window.open() 메서드를 사용하여 전화를 걸 수 있습니다.
        window.location.href = `tel:${phone}`
    }
    const updateMember = (index, category, dcrp) => {
        const user = memberList[index]
        const mainId = localStorage.getItem('mainId')

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
                        console.log('서버 응답 데이터:', response.data)
                        resolve() // Promise를 resolve하여 성공했음을 알립니다.
                    })
                    .catch((error) => {
                        // 데이터 전송 실패시 에러 처리를 해줄 수 있습니다.
                        console.error('데이터 전송 실패:', error)
                        reject(error) // Promise를 reject하여 실패했음을 알립니다.
                    })
            } else {
                alert('권한이 없습니다.')
                reject('권한이 없습니다.') // Promise를 reject하여 실패했음을 알립니다.
            }
        })
    }
    // 모달 창 열기
    const openModal = (index) => {
        const user = memberList[index]
        setModalData({
            name: user.name,
            phone: user.phone,
            selectedCategory: user.progress || '', // 초기 select 박스 값 설정
            inputDcrp: user.dcrp || '', // 초기 textarea 값 설정
        })
        setIsModalOpen(true)
        setSelectUser(index) // 선택된 사용자 인덱스 설정
    }
    // select 박스와 textarea 변경을 처리하는 함수
    const handleChange = (e) => {
        const { name, value } = e.target
        setModalData((prevData) => ({ ...prevData, [name]: value }))
    }
    const saveChanges = () => {
        if (selectUser !== null) {
            const { name, phone, selectedCategory, inputDcrp } = modalData
            const updatedDcrp = inputDcrp + '\r\n' + getCurrentDateTimeString()

            updateMember(selectUser, selectedCategory, updatedDcrp)

            // 모달 창 닫기
            setIsModalOpen(false)

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
            )
        }
    }
    // 모달 창 닫기
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const getCurrentDateTimeString = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    const downloadExcel = () => {
        const sortedMemberList = [...memberList].sort(
            (a, b) => new Date(b.regdate) - new Date(a.regdate)
        )

        // 테이블의 데이터 가져오기
        const data = sortedMemberList.map((list) => ({
            일자: list.regdate,
            이름: list.name,
            이메일: list.email,
            전화번호: list.phone,
            진행: list.progress,
            내용: list.dcrp,
            담당자: list.manager,
        }))

        // 워크북 생성
        const workbook = XLSX.utils.book_new()

        // 워크시트 생성
        const worksheet = XLSX.utils.json_to_sheet(data)

        // 워크북에 워크시트 추가
        XLSX.utils.book_append_sheet(workbook, worksheet, '테이블 데이터')

        // 엑셀 파일로 저장
        XLSX.writeFile(workbook, 'member.xlsx')
    }
    // 검색어 입력 시 실행되는 이벤트 핸들러
    const handleSearch = (e) => {
        const { value } = e.target
        setSearchKeyword(value)
    }

    // 회원 목록을 검색어에 따라 필터링하는 함수
    const filterMembers = (members) => {
        if (!searchKeyword) {
            return members
        }
        const keyword = searchKeyword.toLowerCase()
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
        )
    }
    return (
        <>
            {newJeans && (
                <div>
                    <select value={selectedValue} onChange={handleSelectChange}>
                        <option value="">사이트 별 고객 리스트 ↓</option>
                        <option value="/art1/">청담 갤러리1부(단체전)</option>
                        <option value="/art2/">청담 갤러리2부(단체전)</option>
                        <option value="/art3/">남산 갤러리(김미영 작가)</option>
                        <option value="/cafe1/">선릉 카페(대단한 커피)</option>
                        <option value="/hospital1/">
                            강남병원 (지인 병원)
                        </option>
                        <option value="/office1/">법인 빌딩 (삼익영농)</option>
                        <option value="/academy1/">
                            강남 학원 (영어 학원)
                        </option>
                        <option value="/art4/">종로 갤러리2(백영희작가)</option>
                        <option value="/mart1/">편의점</option>
                        <option value="/antique1/">대전아트아카데미</option>
                        <option value="/cafe2/">대전자산협회</option>
                        <option value="/parking1/">부천재건축단지</option>
                        <option value="/rebuilding1/">부천 대진아파트</option>
                        <option value="/hall1/">부산벡스코</option>
                        <option value="/building2/">수원 관공서</option>
                        <option value="/warship1/">용산 전쟁 기념관</option>
                        <option value="/academy2/">고려직업전문학교</option>
                        <option value="/academy3/">고려직업전문학교3</option>
                        <option value="/academy4/">아카데미4</option>
                        <option value="/academy5/">아카데미5</option>
                        <option value="/office2/">크럼플 오피스</option>
                        <option value="/studio1/">스튜디오</option>
                        <option value="/hall2/">부산벡스코2</option>
                        <option value="/machine1/">벡스코/수원관공서</option>
                        <option value="/kpop1/">BTS 초콜릿</option>
                        <option value="/modelhouse2/">
                            3D 신촌 빌리브 디 에이블
                        </option>
                        <option value="/antique2/">서울 감정평가원</option>
                        <option value="/pub1/">앤티크 펍(미자살롱)</option>
                        <option value="/modelhouse1/">
                            3D 신촌 빌리브 디 에이블
                        </option>
                    </select>
                    <button onClick={handleButtonClick}>전송</button>
                </div>
            )}
            <button onClick={handleSelectAll}> 전체 선택 </button>
            {category.current === '/modelhouse1/' && (
                <LoginInput
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearch}
                    placeholder="검색어를 입력하세요"
                />
            )}
            <Btn onClick={onSendList}>이메일 보내기</Btn>
            {category.current === '/modelhouse1/' && (
                <Btn onClick={downloadExcel}>엑셀 다운로드</Btn>
            )}
            <Main>
                <Head>
                    {category.current === '/modelhouse1/' ? (
                        <>
                            <HeadText>번호</HeadText>
                            <HeadText flex=".4">선택</HeadText>
                            <HeadText>일자</HeadText>
                            <HeadText>이름</HeadText>
                            <HeadText>이메일</HeadText>
                            <HeadText>전화번호</HeadText>
                            <HeadText>진행</HeadText>
                            <HeadText>내용</HeadText>
                            <HeadText>담당자</HeadText>
                            <HeadText>저장</HeadText>
                        </>
                    ) : (
                        <>
                            <HeadText>번호</HeadText>
                            <HeadText flex=".4">선택</HeadText>
                            <HeadText>일자</HeadText>
                            <HeadText>이름</HeadText>
                            <HeadText>이메일</HeadText>
                            <HeadText>전화번호</HeadText>
                            <HeadText flex="1.6">설문 조사 결과</HeadText>
                            <HeadText flex=".9">내용</HeadText>
                        </>
                    )}
                </Head>
                <BodyWrap>
                    {filterMembers(memberList).map((list, index) => {
                        if (category.current === '/modelhouse1/') {
                            return (
                                <Body
                                    key={index}
                                    style={
                                        index % 2 === 0
                                            ? {
                                                  background:
                                                      'rgba(0, 0, 0, 0.05)',
                                              }
                                            : { background: 'white' }
                                    }
                                >
                                    <BodyText>{index + 1}</BodyText>
                                    <BodyText flex=".4">
                                        <input
                                            className={`checkbox-${index}`}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                            }}
                                            type="checkbox"
                                            onChange={() => {
                                                onCheck(index)
                                            }}
                                        />
                                    </BodyText>
                                    <BodyText>{list.regdate}</BodyText>
                                    <BodyText>{list.name}</BodyText>
                                    <BodyText>{list.email}</BodyText>
                                    <BodyText>
                                        {' '}
                                        <a href={`tel:${list.phone}`}>
                                            {list.phone}
                                        </a>
                                    </BodyText>
                                    <BodyText>{list.progress}</BodyText>
                                    <BodyText>
                                        <textarea
                                            type="text"
                                            value={list.dcrp}
                                            readOnly
                                        />
                                    </BodyText>
                                    <BodyText>{list.manager}</BodyText>
                                    <BodyText flex=".9">
                                        <Btn
                                            style={
                                                index === selectUser
                                                    ? {
                                                          background: 'coral',
                                                          color: '#000',
                                                          margin: '0',
                                                      }
                                                    : {
                                                          border: 'none',
                                                          margin: '0',
                                                      }
                                            }
                                            onClick={() => openModal(index)}
                                        >
                                            수정
                                        </Btn>
                                    </BodyText>
                                </Body>
                            )
                        } else {
                            return (
                                <Body
                                    key={index}
                                    style={
                                        index % 2 === 0
                                            ? {
                                                  background:
                                                      'rgba(0, 0, 0, 0.05)',
                                              }
                                            : { background: 'white' }
                                    }
                                >
                                    <BodyText>{index + 1}</BodyText>
                                    <BodyText flex=".4">
                                        <input
                                            className={`checkbox-${index}`}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                            }}
                                            type="checkbox"
                                            onChange={() => {
                                                onCheck(index)
                                            }}
                                        />
                                    </BodyText>
                                    <BodyText>{list.regdate}</BodyText>
                                    <BodyText>{list.name}</BodyText>
                                    <BodyText>{list.email}</BodyText>
                                    <BodyText>
                                        {' '}
                                        <a
                                            href="#"
                                            onClick={() =>
                                                callPhoneNumber(list.phone)
                                            }
                                        >
                                            {list.phone}
                                        </a>
                                    </BodyText>
                                    <BodyText flex="1.6">{list.dcrp}</BodyText>
                                    <BodyText flex=".9">
                                        <Btn
                                            style={
                                                index === selectUser
                                                    ? {
                                                          background: 'coral',
                                                          color: '#000',
                                                          margin: '0',
                                                      }
                                                    : {
                                                          border: 'none',
                                                          margin: '0',
                                                      }
                                            }
                                            onClick={() => {
                                                onSubscribe(index)
                                            }}
                                        >
                                            구독 정보
                                        </Btn>
                                    </BodyText>
                                </Body>
                            )
                        }
                    })}
                </BodyWrap>
            </Main>

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
    )
}

export default MemberList

import React, { useState, useEffect, useRef } from 'react'
import { Head, HeadText, Body, InputContainer, Input, Btn } from './mainStyle'
import axios from 'axios'
import { Space, Main } from '../table/style'
import { useCookies } from 'react-cookie'

const ContolList = () => {
    const [mainTitle, setMainTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [titleList, setTitleList] = useState([])
    const [selectedTitle, setSelectedTitle] = useState(null)
    const category = useRef(null)
    // const category = localStorage.getItem('category');
    const [selectedValue, setSelectedValue] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['id'])
    const newJeans = cookies.id === 'true'
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value) // 선택된 값 업데이트
    }

    const handleButtonClick = () => {
        if (selectedValue) {
            getTitle(selectedValue) // 선택된 값으로 데이터를 가져오는 함수 호출
            category.current = selectedValue
        }
    }
    const getTitle = async (selectedValue) => {
        try {
            const response = await axios.post(
                'https://api.mever.me:8080/getMainTitleList',
                {
                    category: selectedValue,
                }
            )
            if (response.data && response.data.length > 0) {
                console.log(response.data)
                setTitleList(response.data)
                setMainTitle(response.data[0].title)
                setSubTitle(response.data[0].subTitle)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleInputChange = (e) => {
        if (e.target.id === 'mainTitle') {
            setMainTitle(e.target.value)
        } else if (e.target.id === 'subTitle') {
            setSubTitle(e.target.value)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await axios.post(
                'https://api.mever.me:8080/getMainTitleList',
                {
                    category: localStorage.getItem('category'),
                }
            )
            if (response.data && response.data.length > 0) {
                console.log(response.data)
                setTitleList(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateTitle = () => {
        axios
            .post('https://api.mever.me:8080/updateTitle', {
                mainTitle: document.getElementById('mainTitle').value,
                subTitle: document.getElementById('subTitle').value,
                category,
            })
            .then((response) => {
                console.log('업데이트 완료')
                alert('업데이트 되었습니다.')
                fetchData()
            })
            .catch((error) => {
                console.log('에러 발생:', error)
                // 에러 처리에 대한 추가로 실행할 코드 작성
            })
    }
    const handleApplyButton = (title, subtitle) => {
        // return () => {
        //   setTimeout(() => {
        //     document.getElementById('mainTitle').value = title;
        //     document.getElementById('subTitle').value = subtitle;
        //   }, 1);
        // };
        setSelectedTitle({ title, subtitle })
    }
    const hadleDeleteButton = (seq) => {
        axios
            .post('https://api.mever.me:8080/deleteTitle', {
                seq,
            })
            .then((response) => {
                alert('삭제가 되었습니다.')
                fetchData()
            })
            .catch((error) => {
                console.log('에러 발생:', error)
            })
    }
    useEffect(() => {
        if (selectedTitle) {
            setMainTitle(selectedTitle.title)
            setSubTitle(selectedTitle.subtitle)
        }
    }, [selectedTitle])
    return (
        <>
            {newJeans && (
                <div>
                    <select value={selectedValue} onChange={handleSelectChange}>
                        <option value="">사이트 별 리스트 ↓</option>
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
            <Space />
            <Main>
                <Head>
                    <HeadText>페이지 설정</HeadText>
                </Head>
                <Body
                    style={
                        window.innerWidth < 500
                            ? {
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  width: '100%',
                              }
                            : { flexDirection: 'row' }
                    }
                >
                    <InputContainer>
                        메인 :{' '}
                        <input
                            type="text"
                            id="mainTitle"
                            value={mainTitle}
                            onChange={handleInputChange}
                            placeholder={localStorage.getItem('mainTitle')}
                        />
                    </InputContainer>
                    <InputContainer>
                        서브 :{' '}
                        <input
                            type="text"
                            id="subTitle"
                            value={subTitle}
                            onChange={handleInputChange}
                            placeholder={localStorage.getItem('subTitle')}
                        />
                    </InputContainer>
                    <Btn onClick={handleUpdateTitle}>업데이트</Btn>
                </Body>
                <div className="title-list-container">
                    <h1>이력</h1>
                    {titleList.map((title, index) => (
                        <div className="product" key={index}>
                            <h3>
                                TiTle: {title.title} SubTitle : {title.subTitle}{' '}
                                <button
                                    onClick={() =>
                                        handleApplyButton(
                                            title.title,
                                            title.subTitle
                                        )
                                    }
                                >
                                    적용
                                </button>
                                <button
                                    onClick={() => hadleDeleteButton(title.seq)}
                                >
                                    삭제
                                </button>{' '}
                                {title.insertDate}
                            </h3>
                        </div>
                    ))}
                </div>
            </Main>
        </>
    )
}

export default ContolList

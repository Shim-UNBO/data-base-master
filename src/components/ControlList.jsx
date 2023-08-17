import React, { useState, useEffect, useRef } from 'react';
import { Select, Button, Row, Col, Input } from 'antd';
import { Head, HeadText, Body, InputContainer, Btn } from './mainStyle';
import axios from 'axios';
import { Space, Main } from '../table/style';
import { useCookies } from 'react-cookie';

const ContolList = () => {
    const [mainTitle, setMainTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [titleList, setTitleList] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const category = useRef(null);
    // const category = localStorage.getItem('category');
    const [selectedValue, setSelectedValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const newJeans = cookies.id === 'true';
    const handleSelectChange = (value) => {
        setSelectedValue(value); // 선택된 값 업데이트
    };

    const handleButtonClick = () => {
        if (selectedValue) {
            getTitle(selectedValue); // 선택된 값으로 데이터를 가져오는 함수 호출
            category.current = selectedValue;
        }
    };
    const getTitle = async (selectedValue) => {
        try {
            const response = await axios.post(
                'https://api.mever.me:8080/getMainTitleList',
                {
                    category: selectedValue,
                }
            );
            if (response.data && response.data.length > 0) {
                console.log(response.data);
                setTitleList(response.data);
                setMainTitle(response.data[0].title);
                setSubTitle(response.data[0].subTitle);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (e) => {
        if (e.target.id === 'mainTitle') {
            setMainTitle(e.target.value);
        } else if (e.target.id === 'subTitle') {
            setSubTitle(e.target.value);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.post(
                'https://api.mever.me:8080/getMainTitleList',
                {
                    category: localStorage.getItem('category'),
                }
            );
            if (response.data && response.data.length > 0) {
                console.log(response.data);
                setTitleList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdateTitle = () => {
        axios
            .post('https://api.mever.me:8080/updateTitle', {
                mainTitle: document.getElementById('mainTitle').value,
                subTitle: document.getElementById('subTitle').value,
                category,
            })
            .then((response) => {
                console.log('업데이트 완료');
                alert('업데이트 되었습니다.');
                fetchData();
            })
            .catch((error) => {
                console.log('에러 발생:', error);
                // 에러 처리에 대한 추가로 실행할 코드 작성
            });
    };
    const handleApplyButton = (title, subtitle) => {
        // return () => {
        //   setTimeout(() => {
        //     document.getElementById('mainTitle').value = title;
        //     document.getElementById('subTitle').value = subtitle;
        //   }, 1);
        // };
        setSelectedTitle({ title, subtitle });
    };
    const hadleDeleteButton = (seq) => {
        axios
            .post('https://api.mever.me:8080/deleteTitle', {
                seq,
            })
            .then((response) => {
                alert('삭제가 되었습니다.');
                fetchData();
            })
            .catch((error) => {
                console.log('에러 발생:', error);
            });
    };
    useEffect(() => {
        if (selectedTitle) {
            setMainTitle(selectedTitle.title);
            setSubTitle(selectedTitle.subtitle);
        }
    }, [selectedTitle]);
    return (
        <>
            {newJeans && (
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Select
                            defaultValue=""
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
            <Row gutter={20}>
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 40 }}>메인:</label>
                    <Input
                        id="mainTitle"
                        value={mainTitle}
                        onChange={handleInputChange}
                        placeholder={localStorage.getItem('mainTitle')}
                    />
                </Col>
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 40 }}>서브:</label>
                    <Input
                        id="subTitle"
                        value={subTitle}
                        onChange={handleInputChange}
                        placeholder={localStorage.getItem('subTitle')}
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary" onClick={handleUpdateTitle}>
                        업데이트
                    </Button>
                </Col>
            </Row>
            <Space />
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
        </>
    );
};

export default ContolList;

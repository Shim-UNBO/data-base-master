import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Select, Button } from 'antd';
import {
    Main,
    Head,
    HeadText,
    Body,
    InputContainer,
    Input,
    Btn,
} from '../../table/style';
import axios from 'axios';
import './itemList.css';
import ItemDetails from '../ItemDetails';
import { useCookies } from 'react-cookie';

const Management = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [thumbnailUrls, setThumbnailUrls] = useState([]);
    const videoUrlRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [itemDetails, setItemDetails] = useState(false);
    // const category = localStorage.getItem('category');
    const category = useRef(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const newJeans = cookies.id === 'true';
    const handleSelectChange = (value) => {
        setSelectedValue(value); // 선택된 값 업데이트
    };
    const handleButtonClick = () => {
        if (selectedValue) {
            fetchData(selectedValue); // 선택된 값으로 데이터를 가져오는 함수 호출
            category.current = selectedValue;
        }
    };
    const fetchData = async (selectedValue) => {
        axios
            .post('https://api.mever.me:8080/itemList', {
                category: selectedValue,
            })
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchItemList();
    }, []);
    const fetchItemList = () => {
        category.current = localStorage.getItem('category');
        axios
            .post('https://api.mever.me:8080/itemList', {
                category: category.current,
            })
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleViewDetails = (orderId) => {
        axios
            .post('https://api.mever.me:8080/getItemContents', {
                category: category.current,
                orderId,
                videoUrl: '',
                photoUrl: '',
            })
            .then((response) => {
                console.log(response.data);
                setSelectedProduct(response.data);
                setShowPopup(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleRefresh = () => {
        fetchItemList();
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
            <div className="itemList">
                {products.map((product, index) => (
                    <div className="product" key={index}>
                        {/* <img src={process.env.PUBLIC_URL + '/' + product.photoUrl} alt="상품 사진" /> */}
                        <img src={product.photoUrl} alt="상품 사진" />
                        {/* {product.photoUrl} */}
                        <h3 className="itemTitle">{product.itemTitle}</h3>
                        <div>
                            가격:{' '}
                            {product.price.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                            )}
                            원{' '}
                        </div>
                        <Btn
                            className="viewDetails"
                            onClick={() => handleViewDetails(product.orderId)}
                        >
                            상세보기
                        </Btn>
                    </div>
                ))}
                {selectedProduct && showPopup && (
                    <div className="popup">
                        <ItemDetails
                            itemDetails={selectedProduct}
                            handleClosePopup={handleClosePopup}
                            handleRefresh={handleRefresh}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Management;

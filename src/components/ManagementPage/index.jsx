import React, { useEffect, useState, useRef } from 'react'
import {
    Main,
    Head,
    HeadText,
    Body,
    InputContainer,
    Input,
    Btn,
} from '../../table/style'
import axios from 'axios'
import './itemList.css'
import ItemDetails from '../ItemDetails'
import { useCookies } from 'react-cookie'

const Management = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [thumbnailUrls, setThumbnailUrls] = useState([])
    const videoUrlRef = useRef(null)
    const [showPopup, setShowPopup] = useState(false)
    const [itemDetails, setItemDetails] = useState(false)
    // const category = localStorage.getItem('category');
    const category = useRef(null)
    const [selectedValue, setSelectedValue] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['id'])
    const newJeans = cookies.id === 'true'
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value) // 선택된 값 업데이트
    }
    const handleButtonClick = () => {
        if (selectedValue) {
            fetchData(selectedValue) // 선택된 값으로 데이터를 가져오는 함수 호출
            category.current = selectedValue
        }
    }
    const fetchData = async (selectedValue) => {
        axios
            .post('https://api.mever.me:8080/itemList', {
                category: selectedValue,
            })
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchItemList()
    }, [])
    const fetchItemList = () => {
        category.current = localStorage.getItem('category')
        axios
            .post('https://api.mever.me:8080/itemList', {
                category: category.current,
            })
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleViewDetails = (orderId) => {
        axios
            .post('https://api.mever.me:8080/getItemContents', {
                category: category.current,
                orderId,
                videoUrl: '',
                photoUrl: '',
            })
            .then((response) => {
                console.log(response.data)
                setSelectedProduct(response.data)
                setShowPopup(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }
    const handleRefresh = () => {
        fetchItemList()
    }
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
    )
}

export default Management

import React, { useEffect, useState, useRef } from 'react'
import './menuStyles.css'
import axios from 'axios'

const Management = () => {
    const [menus, setMenu] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showPopup, setShowPopup] = useState(false)
    const category = localStorage.getItem('category')
    const [selectedMenu, setSelectedMenu] = useState(null)

    useEffect(() => {
        fetchItemList()
    }, [])
    const fetchItemList = () => {
        axios
            .post('https://api.mever.me:8080/menuList', {})
            .then((response) => {
                console.log(response.data)
                setMenu(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleViewDetails = (seq) => {
        // 해당 메뉴의 상세 정보를 가져와서 selectedMenu에 저장
        const selectedMenu = menus.find((menu) => menu.seq === seq)
        setSelectedMenu(selectedMenu)
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setSelectedMenu({
            ...selectedMenu,
            [name]: value,
        })
    }

    const handleSaveChanges = (event) => {
        const jsonData = JSON.stringify(selectedMenu)
        console.log(jsonData)
        axios
            .post('https://api.mever.me:8080/updateMenu', jsonData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                if (response.status === 200) {
                    alert('수정이 완료되었습니다.')
                } else {
                    alert('수정에 실패했습니다.')
                }
            })
            .catch((error) => {
                alert('에러 발생:', error)
            })
    }

    //메뉴 추가하기
    const handleAddMenu = () => {
        const newMenu = {
            menuName: '',
            url: '',
            matterLink: '',
            thumbImg: '',
            videoUrl: '',
            introPhoto: '',
            ogTitle: '',
            ogDescription: '',
        }
        setSelectedMenu(newMenu)
        setShowPopup(true)
    }

    return (
        <div>
            <button className="addButton" onClick={handleAddMenu}>
                메뉴 추가
            </button>
            <div className="menu-list">
                {menus.map((menu, index) => (
                    <div className="menu" key={index}>
                        <img src={menu.thumbImg} alt="상품 사진" />
                        <h3 className="menuTitle">{menu.menuName}</h3>
                        <button
                            className="menuDetails"
                            onClick={() => handleViewDetails(menu.seq)}
                        >
                            수정하기
                        </button>
                    </div>
                ))}
                {selectedMenu && showPopup && (
                    <div className="popup">
                        <div className="popup-header">
                            <h2>{selectedMenu.menuName}</h2>
                        </div>
                        <div className="popup-content">
                            <p>
                                <span className="key">메뉴이름:</span>
                                <input
                                    type="text"
                                    name="menuName"
                                    value={selectedMenu.menuName || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">홈페이지:</span>
                                <input
                                    type="text"
                                    name="url"
                                    value={selectedMenu.url || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">메타포트 링크:</span>
                                <input
                                    type="text"
                                    name="matterLink"
                                    value={selectedMenu.matterLink || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">URL링크 썸네일:</span>
                                <input
                                    type="text"
                                    name="thumbImg"
                                    value={selectedMenu.thumbImg || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">앱인트로 영상:</span>
                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={selectedMenu.videoUrl || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">웹인트로 사진:</span>
                                <input
                                    type="text"
                                    name="webImg"
                                    value={selectedMenu.webImg || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">지도 좌표:</span>
                                <input
                                    type="text"
                                    name="map"
                                    value={selectedMenu.map || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">사용 여부:</span>
                                <input
                                    type="text"
                                    name="useYn"
                                    value={selectedMenu.useYn || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">태그 타이틀:</span>
                                <input
                                    type="text"
                                    name="ogTitle"
                                    value={selectedMenu.ogTitle || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <span className="key">태그 설명:</span>
                                <input
                                    type="text"
                                    name="ogDescription"
                                    value={selectedMenu.ogDescription || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p className="hidden">
                                <span className="key">seq : </span>
                                <input
                                    type="text"
                                    name="seq"
                                    value={selectedMenu.seq || ''}
                                    onChange={handleInputChange}
                                />
                            </p>
                        </div>
                        <div className="popup-button">
                            <button
                                className="closeButton"
                                onClick={handleSaveChanges}
                            >
                                수정완료
                            </button>
                            <button
                                className="closeButton"
                                onClick={handleClosePopup}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Management

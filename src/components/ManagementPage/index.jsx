import React, {useEffect, useState,useRef } from 'react';
import { Main, Head, HeadText, Body, InputContainer, Input, Btn } from '../../table/style';
import axios from 'axios';
import ItemDetails from '../ItemDetails';

const Management = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const videoUrlRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [itemDetails, setItemDetails] = useState(false)
  const category = localStorage.getItem('category');
  useEffect(() => {
    fetchItemList();
  }, []);
  const fetchItemList = () => {
    axios
      .post('https://api.mever.me:8080/itemList',{
        category,
        
      })
      .then((response) =>{
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewDetails = (orderId) => {
    axios
    .post('https://api.mever.me:8080/getItemContents',{
        category,
        orderId,
        videoUrl: '',
        photoUrl: '',
    })
    .then((response) =>{
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
    <div>
      {products.map((product, index) => (
        <div className="product" key={index}>
          {/* <img src={process.env.PUBLIC_URL + '/' + product.photoUrl} alt="상품 사진" /> */}
          <img src={product.photoUrl} alt="상품 사진" />
          {/* {product.photoUrl} */}
          <h3 className="itemTitle">{product.itemTitle}</h3>
          <div>가격: {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 </div>
          <Btn className="viewDetails"onClick={() => handleViewDetails(product.orderId)}>상세보기</Btn>
        </div>
      ))}
      {selectedProduct && showPopup && (
        <div className="popup">
          <ItemDetails itemDetails={selectedProduct} handleClosePopup={handleClosePopup} handleRefresh={handleRefresh}/>
        </div>
      )}
    </div>
  );
};

export default Management;
import React, { useState,useEffect  } from 'react'
import { Btn, Container, Icon, Input, Text, TextArea, Wrap, Select, Alert, HeadWrap } from './style'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const ItemDetails = ({ itemDetails, handleClosePopup,handleRefresh }) => {
  // const thumbnailUrls = [];
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [contents, setContents] = useState(itemDetails.contents || '');
  const [itemTitle, setItemTitle] = useState(itemDetails.itemTitle || '');
  const [orderName, setOrderName] = useState(itemDetails.orderName || '');
  const [photoUrl, setPhotoUrl] = useState(itemDetails.photoUrl || '');
  const [videoUrl, setVideoUrl] = useState(itemDetails.videoUrl || '');
  const [price, setPrice] = useState(itemDetails.price || '');
  const [orderId, setOrderId] = useState(itemDetails.orderId || '');
const [readOnly, setReadOnly] = useState(true);
const [isEditing, setIsEditing] = useState(false);

  const updateThumbnailUrls = () => {
    clearThumbnailUrls();
    const urls = [];
    console.log(itemDetails);
    const { videoUrl } = itemDetails || {};
    if (videoUrl && videoUrl !== '') { 
      let replaceUrl = videoUrl;
      replaceUrl = replaceUrl.replace('https://youtu.be/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/embed/', '');
      replaceUrl = replaceUrl.replace('https://www.youtube.com/watch?v=', '');
      const finUrl = replaceUrl.split('&')[0];
      urls.push(`https://img.youtube.com/vi/${finUrl}/mqdefault.jpg`);
    }
    setThumbnailUrls(urls);
  };

  const clearThumbnailUrls = () => {
    thumbnailUrls.length = 0;
  };

  const handleUpdateContents = () => {
    const category = localStorage.getItem('category');
    if (isEditing) {
      axios
        .post('https://api.mever.me:8080/updateContents', {
          orderId,
          contents: contents,
          orderName: orderName,
          itemTitle: itemTitle,
          photoUrl: photoUrl,
          videoUrl: videoUrl,
          price: price,
          category: category,
        })
        .then((response) => {
          console.log(orderId);
          console.log('업데이트 완료');
          alert('업데이트 되었습니다.');
          handleClosePopup();
          handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsEditing(true);
      setReadOnly(false);
    }
  };

  useEffect(() => {
    updateThumbnailUrls();
  }, [itemDetails]);

  return (
    <Container>
      <Icon.Close onClick={handleClosePopup} />
      <Wrap>
        <div className="popup">
          <div id="getget">
            <Text>
              Title: <input id='itemTitle' value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} readOnly={readOnly} ></input>
            </Text>
            <Text>
              Order Name: <input id='orderName' value={orderName} onChange={(e) => setOrderName(e.target.value)} readOnly={readOnly} ></input>
            </Text>
            <Text>
              Price: <input id='price' value={price} onChange={(e) => setPrice(e.target.value)} readOnly={readOnly} ></input>
            </Text>
            <Text>
              <div>Contents:</div>
            </Text>
            <TextArea value={contents} onChange={(e) => setContents(e.target.value)} id="contents" readOnly={readOnly} />
            <Text>
            Photo URL: <input id='photoUrl' value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} readOnly={readOnly} ></input>
            </Text>
            <Text>
            Video URL: <input id='videoUrl' value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} readOnly={readOnly} ></input>
            </Text>
            {/* Additional content */}
            <input type="text" className="youtube-url" defaultValue={itemDetails.videoUrl} style={{ display: 'none' }}/>
            <div className="thumbnail-wrap">
              {/* Render thumbnail images */}
              {thumbnailUrls.map((url, index) => (
                <img key={index} src={url} alt="썸네일" />
              ))}
            </div>
          </div>
        </div>
       <Btn id="change2" onClick={handleUpdateContents}>
          {isEditing ? '수정 완료' : '수정'}
        </Btn>
      </Wrap>
    </Container>
  );
};

export default ItemDetails;
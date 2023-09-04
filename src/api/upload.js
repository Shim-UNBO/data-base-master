import instance from '.';

export const getVideos = () => instance.get('/upload/allVideos');
export const removeVideo = (id) => instance.post(`/upload//delete/${id}`);

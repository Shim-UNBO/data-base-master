import { useEffect, useState } from 'react';

import { getVideos, removeVideo } from '../../api/upload';

// Components
import { Button, Modal, Upload, message, Table } from 'antd';

// Icons
import {
    InboxOutlined,
    DeleteOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';

// Utils
import { dateFilter } from '../../utils';

// Styles
import './UploadVideo.scss';

const { Dragger } = Upload;
const { confirm } = Modal;

export default function () {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);

    const columns = [
        {
            title: '비디오',
            dataIndex: 'title',
            key: 'title',
            render(text) {
                return (
                    <video
                        src={`https://api.mever.me:8080/upload/stream?uniqueFileName=${text}`}
                        controls
                        playsInline
                        style={{ width: 300, height: 200 }}
                    ></video>
                );
            },
        },
        {
            title: '생성시간',
            dataIndex: 'crtDt',
            key: 'crtDt',
            render(text) {
                return dateFilter(text);
            },
        },
        {
            title: '삭제',
            dataIndex: 'action',
            key: 'action',
            render(text, record) {
                return (
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            confirm({
                                title: '비디오를 삭제 하시겠습니까?',
                                icon: <ExclamationCircleFilled />,
                                okText: '삭제',
                                cancelText: '취소',
                                okButtonProps: {
                                    type: 'primary',
                                    danger: true,
                                },
                                onOk() {
                                    removeVideo(record.id)
                                        .then((res) => {
                                            message.success('삭제 되었습니다');
                                            getList();
                                        })
                                        .catch(() => {
                                            message.error(
                                                '삭제 실패하였습니다'
                                            );
                                        });
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                        }}
                    >
                        <DeleteOutlined />
                    </Button>
                );
            },
        },
    ];

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://api.mever.me:8080/upload/video',
        showUploadList: false,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success('업로드 되었습니다');
                getList();
                setUploadModalOpen(false);
            } else if (status === 'error') {
                message.error('업로드 실패하였습니다');
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    function handleUploadModalOpen() {
        setUploadModalOpen(true);
    }

    function handleUploadModalOk() {
        setUploadModalOpen(false);
    }

    function handleUploadModalCancel() {
        setUploadModalOpen(false);
    }

    function getList() {
        getVideos().then((res) => {
            if (res.status === 200) {
                setVideos(res.data);
            }
        });
    }

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="upload-video-container">
            <div className="mb-20 clearfix">
                <Button
                    className="pull-right"
                    type="primary"
                    onClick={handleUploadModalOpen}
                >
                    비디오 업로드
                </Button>
            </div>
            <Table rowKey="id" dataSource={videos} columns={columns} />
            <Modal
                title="Basic Modal"
                open={uploadModalOpen}
                okText="확인"
                cancelText="취소"
                onOk={handleUploadModalOk}
                onCancel={handleUploadModalCancel}
            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        클릭 혹은 파일을 드래그해서 올릴수 있습니다.
                    </p>
                    <p className="ant-upload-hint">
                        단일 또는 대량 업로드를 지원합니다. 회사 데이터 또는
                        기타 금지된 파일을 업로드하는 것은 엄격히 금지됩니다.
                    </p>
                </Dragger>
            </Modal>
        </div>
    );
}

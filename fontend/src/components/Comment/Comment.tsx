import React, { useState } from 'react';
import { Avatar, Input, Button, List, Tooltip, message, Rate, Card } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

interface CommentItem {
  id: string;
  user: string;
  content: string;
  createdAt: string;
  rating?: number;
}

const CommentTour: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: '1',
      user: 'Nguyễn Văn A',
      content: 'Tour rất tuyệt vời! Hướng dẫn viên thân thiện.',
      createdAt: '2025-10-11 09:30',
      rating: 5,
    },
    {
      id: '2',
      user: 'Trần Thị B',
      content: 'Dịch vụ ổn, nhưng thời gian hơi gấp.',
      createdAt: '2025-10-11 09:45',
      rating: 3,
    },
    {
      id: '3',
      user: 'Lê Cường',
      content: 'Phong cảnh rất đẹp, đồ ăn ngon.',
      createdAt: '2025-10-11 10:10',
      rating: 4,
    },
    {
      id: '4',
      user: 'Phạm Lan',
      content: 'Xe di chuyển hơi cũ, nhưng hướng dẫn viên dễ thương.',
      createdAt: '2025-10-11 10:30',
      rating: 4,
    },
    {
      id: '5',
      user: 'Nguyễn Tuấn',
      content: 'Giá hợp lý, mình sẽ quay lại!',
      createdAt: '2025-10-11 11:00',
      rating: 5,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!newComment.trim()) {
      message.warning('Vui lòng nhập nội dung bình luận!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const comment: CommentItem = {
        id: Date.now().toString(),
        user: 'Bạn',
        content: newComment.trim(),
        createdAt: new Date().toLocaleString(),
        rating,
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment('');
      setRating(0);
      setLoading(false);
      message.success('Đã gửi bình luận!');
    }, 500);
  };

  return (
    <Card className="w-full mx-auto rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Đánh giá & Bình luận Tour</h2>

      {/* Ô nhập bình luận */}
      <div className="flex gap-3 mb-4">
        <Avatar size={40} icon={<UserOutlined />} />
        <div className="flex-1">
          <Rate value={rating} onChange={(val) => setRating(val)} className="mb-2" />
          <Input.TextArea
            rows={3}
            placeholder="Chia sẻ trải nghiệm của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="text-right mt-2">
            <Button type="primary" icon={<SendOutlined />} loading={loading} onClick={handleSend}>
              Gửi
            </Button>
          </div>
        </div>
      </div>

      {/* Danh sách bình luận có phân trang */}
      <List
        dataSource={comments}
        itemLayout="horizontal"
        pagination={{
          pageSize: 3,
          position: 'bottom',
          align: 'center',
          showSizeChanger: false,
          showLessItems: true,
        }}
        renderItem={(item) => (
          <List.Item className="border-b last:border-none pb-4">
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.user}</span>
                  <Tooltip title={item.createdAt}>
                    <span className="text-xs text-gray-500">{item.createdAt}</span>
                  </Tooltip>
                </div>
              }
              description={
                <div>
                  {item.rating && <Rate disabled defaultValue={item.rating} className="text-sm" />}
                  <p className="mt-1" style={{ color: 'black' }}>
                    {item.content}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CommentTour;

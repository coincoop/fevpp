import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  List,
  Tooltip,
  Pagination,Form, Button, Input
} from "antd";
import { Pie } from "@ant-design/charts";
import { Comment } from "@ant-design/compatible";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_URL } from "../../config";

const PieChart = () => {
  const data = [
    { type: "Product A", value: 30 },
    { type: "Product B", value: 50 },
    { type: "Product C", value: 20 },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      style: { textAlign: "center" },
      autoRotate: false,
      content: "{value}",
    },
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
};

const Dashboard = () => {
  const [review, setReview] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [replyContent, setReplyContent] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);


  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    try {
      const response = await axios.get(`${API_URL}admin/review/dashboard`);
      setReview(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReview = review.slice(startIndex, endIndex);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (selectedReview) {
      const { makh, masp } = selectedReview;
      try {
        await axios.patch(`${API_URL}admin/review/dashboard/${makh}/${masp}`, {
          reply: replyContent,
        });
        setReplyContent("");
        setSelectedReview(null);
        getReview();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReplyCancel = () => {
    setReplyContent("");
    setSelectedReview(null);
  };

  const handleReply = (review, index) => {
    setReplyContent("");
    setSelectedReview(review);
    setSelectedCommentIndex(index);
  };
  

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng doanh thu" value={1000000} suffix="VNĐ" />
            <Typography.Text type="secondary">
              Doanh thu hôm nay: 500000 VNĐ
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Số người xem" value={5000} />
            <Typography.Text type="secondary">
              Lượt xem hôm nay: 5
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Số lượng thanh toán" value={10} />
            <Typography.Text type="secondary">
              Số lượng thanh toán hôm nay: 5
            </Typography.Text>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>
              Biểu đồ sản phẩm đã bán
            </Typography.Title>
            <PieChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>Đánh giá bình luận</Typography.Title>
            <List
  className="comment-list"
  header={`${review.length} đánh giá`}
  itemLayout="horizontal"
  dataSource={currentReview}
  renderItem={(item, index) => (
    <li>
      <Comment
        actions={[
          <Button
            key={`comment-list-reply-to-${index}`}
            onClick={() => handleReply(item, index)}
          >
            Reply to
          </Button>,
        ]}
        author={`Đánh giá của ${item.user.tenkh} về sản phẩm ${item.sanpham.tensp}`}
        avatar="https://ibiettuot.com/wp-content/uploads/2021/10/avatar-mac-dinh.png"
        content={item.noidung}
        datetime={item.createAt}
      />
      {item.reply && (
        <Comment
          style={{ marginLeft: 32 }}
          author="Admin"
          avatar="https://cdn-icons-png.flaticon.com/256/1930/1930026.png"
          content={item.reply}
          datetime={item.replyAt}
        />
      )}
      {selectedReview && selectedCommentIndex === index && (
        <Form>
          <Form.Item>
            <Input.TextArea
              value={replyContent}
              onChange={handleReplyChange}
              placeholder="Reply content"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleReplySubmit}>
              Reply
            </Button>{" "}
            <Button onClick={handleReplyCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      )}
    </li>
  )}
/>


            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={review.length}
              onChange={handlePageChange}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;

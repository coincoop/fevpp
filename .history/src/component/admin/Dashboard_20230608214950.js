import { Card, Col, Row, Statistic, Typography, Rate } from "antd";
import { Pie } from "@ant-design/charts";

const Dashboard = () => {
  const data = [
    { type: "Đánh giá 5 sao", value: 30 },
    { type: "Đánh giá 4 sao", value: 25 },
    { type: "Đánh giá 3 sao", value: 20 },
    { type: "Đánh giá 2 sao", value: 15 },
    { type: "Đánh giá 1 sao", value: 10 },
  ];

  const config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return (
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
            Lượt xem hôm nay : 5
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
      <Col span={12}>
        <Card>
          <Typography.Title level={4}>Biểu đồ đánh giá</Typography.Title>
          <Pie {...config} />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Typography.Title level={4}>Đánh giá từ người dùng</Typography.Title>
          <div>
            <Rate allowHalf defaultValue={3.5} />
            <Typography.Text type="secondary">(4.5 / 5)</Typography.Text>
          </div>
          <div>
            <Rate allowHalf defaultValue={4} />
            <Typography.Text type="secondary">(3.9 / 5)</Typography.Text>
          </div>
          <div>
            <Rate allowHalf defaultValue={2.5} />
            <Typography.Text type="secondary">(2.8 / 5)</Typography.Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;

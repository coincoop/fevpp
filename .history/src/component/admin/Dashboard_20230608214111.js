import { Card, Col, Row, Statistic, Typography, Rate } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Positive', value: 60 },
  { name: 'Neutral', value: 30 },
  { name: 'Negative', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const Dashboard = () => {
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
      <Col span={12}>
        <Card>
          <Typography.Title level={4}>Biểu đồ sản phẩm đã bán</Typography.Title>
          <PieChart width={400} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Typography.Title level={4}>Đánh giá sản phẩm</Typography.Title>
          <div>
            <Typography.Text>Người dùng 1:</Typography.Text>
            <Rate disabled defaultValue={4} />
          </div>
          <div>
            <Typography.Text>Người dùng 2:</Typography.Text>
            <Rate disabled defaultValue={3} />
          </div>
          <div>
            <Typography.Text>Người dùng 3:</Typography.Text>
            <Rate disabled defaultValue={5} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;

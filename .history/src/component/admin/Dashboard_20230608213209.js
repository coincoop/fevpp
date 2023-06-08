import { Card, Col, Row, Statistic } from 'antd';
const Dashboard = () => (
    <Row gutter={16}>
    <Col span={8}>
      <Card>
        <Statistic
          title="Tổng doanh thu"
          value={1000000}
          suffix="VNĐ"
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic
          title="Số người xem"
          value={500}
        />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic
          title="Số lượng thanh toán"
          value={10}
        />
      </Card>
    </Col>
  </Row>
);
export default Dashboard;
import { Card, Col, Row, Statistic,Typography } from 'antd';
const Dashboard = () => (
    
   <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Tổng doanh thu"
            value={1000000}
            suffix="VNĐ"
          />
          <Typography.Text type="secondary">Hằng ngày: 18/05/2023</Typography.Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Số người xem"
            value={500}
          />
          <Typography.Text type="secondary">Hằng ngày: 18/05/2023</Typography.Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Số lượng thanh toán"
            value={10}
          />
          <Typography.Text type="secondary">Hằng ngày: 18/05/2023</Typography.Text>
        </Card>
      </Col>
    </Row>
);
export default Dashboard;
import { Card, Col, Row, Statistic, Typography , List, Tooltip} from "antd";
import { Pie } from "@ant-design/charts";
import { Comment } from '@ant-design/compatible';

const data = [
  { type: "Product A", value: 30 },
  { type: "Product B", value: 50 },
  { type: "Product C", value: 20 },
];
const datareview = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://xsgames.co/randomusers/assets/avatars/pixel/28.jpg',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://xsgames.co/randomusers/assets/avatars/pixel/37.jpg',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 10:22:33">
          <span>9 hours ago</span>
        </Tooltip>
      ),
    },
  ];
const PieChart = () => {
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

const Dashboard = () => (
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
        <Typography.Text type="secondary">Lượt xem hôm nay: 5</Typography.Text>
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
    Row
    <Col span={12}>
      <Card>
        <Typography.Title level={4}>Biểu đồ sản phẩm đã bán</Typography.Title>
        <PieChart />
      </Card>
    </Col>
    <Col span={12}>
      <Card>
        <Typography.Title level={4}>Đánh giá bình luận</Typography.Title>
        <List
    className="comment-list"
    header={`${datareview.length} replies`}
    itemLayout="horizontal"
    dataSource={datareview}
    renderItem={(item) => (
      <li>
        <Comment
          actions={item.actions}
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.datetime}
        />
      </li>
    )}
  />
      </Card>
    </Col>
  </Row>
);

export default Dashboard;

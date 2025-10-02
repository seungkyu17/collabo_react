import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App({ user }) {
    //'loading' 이 'true' 이면 현재 데이터를 읽고있는 중입니다.
    const [loading, setLoading] = useState(true);

    //오류 정보를 저장할 스테이트
    const [error, setError] = useState('');

    //주문 목록들을 저장할 스테이트('초기 값 : 빈 배열')
    const [orders, setOrders] = useState([]);

    //다음의 'hook' 은 사용자 정보 'user' 가 변경될 때마다 'rendering' 됩니다.
    useEffect(() => {
        if (!user) {
            setError('로그인이 필요합니다.');
            setLoading(false);
        }

        //스프링 부트의 'OrderController'의 'getOrderList()' 메소드 참조
        const fetchOrders = async () => {
            try {
                const url = `${API_BASE_URL}/order/list`;

                //'get 방식' 은 파라미터를 넘길때 'params' 라는 키를 사용하여 넘겨야 합니다.
                //여기서 'role' 은 관리자 유무를 판단하기 위해 넘겨줍니다.
                const parameters = { params: { memberId: user.id, role: user.role } };
                const response = await axios.get(url, parameters);
                setOrders(response.data);

            } catch (error) {
                setError('주문 목록을 불러오는데 실패하였습니다.');
                console.log(error);

            } finally {
                setLoading(false);

            };
        };

        fetchOrders(); //함수 호출

    }, [user]);

    const navigate = useNavigate();

    //관리자를 위한 컴포넌트, 함수
    const makeAdminButton = (bean) => {
        //로그인하지 않았으면 'null' 을 리턴
        if (user?.role !== "ADMIN" && user?.role !== "USER") return null;
        // if (!["ADMIN", "USER"].includes(user?.role)) return null;

        //'완료 버튼' 을 클릭하여 'PENDING' 모드를 'COMPLETED' 모드로 변경합니다.
        const changeStatus = async (newStatus) => {
            try {
                const url = `${API_BASE_URL}/order/update/status/${bean.orderId}?status=${newStatus}`;
                await axios.put(url);

                alert(`송장 번호 ${bean.orderId}의 주문 상태가 ${newStatus}으로 변경이 되었습니다.`);

                //'COMPLETED' 모드로 변경이 되면 화면에 보이지 않습니다.
                //'bean.orderId' 와 동일하지 않은 항목들만 다시 'rendering' 합니다.
                setOrders((previous) => previous.filter((order) => order.orderId !== bean.orderId));


            } catch (error) {
                console.log(error);
                alert('상태 변경(주문 완료)에 실패했습니다.');

            }
        };
        //'취소 버튼' 을 클릭하여 '대기 상태'인 주문 내역을 취소합니다.
        const orderCancel = async () => {
            try {
                const url = `${API_BASE_URL}/order/delete/${bean.orderId}`;
                await axios.delete(url);

                alert(`송장 번호 ${bean.orderId}의 주문이 취소 되었습니다.`);

                //'COMPLETED' 모드로 변경이 되면 화면에 보이지 않습니다.
                //'bean.orderId' 와 동일하지 않은 항목들만 다시 'rendering' 합니다.
                setOrders((previous) => previous.filter((order) => order.orderId !== bean.orderId));


            } catch (error) {
                console.log(error);
                alert('주문 취소에 실패했습니다.');

            }
        }

        return (
            <div>
                {/* '완료 버튼' 은 관리자만 볼수 있습니다. */}
                {user?.role === 'ADMIN' && (
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => changeStatus('COMPLETED')}>
                        완료
                    </Button>
                )}

                <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={() => orderCancel()}>
                    취소
                </Button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">주문 목록을 불러오는 중입니다.</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <h1 className="my-4">주문 내역</h1>
            {orders.length === 0 ? (
                <Alert variant="secondary">주문 내역이 없습니다.</Alert>
            ) : (
                <Row>
                    {orders.map((bean) => (
                        <Col key={bean.orderId} md={6} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <Card.Title>주문 번호 : {bean.orderId}</Card.Title>
                                        <small className="text-muted">{bean.orderDate}</small>

                                    </div>

                                    <Card.Text>
                                        상태 : <strong>{bean.status}</strong>
                                    </Card.Text>
                                    <ul style={{ paddingLeft: "20px" }}>
                                        {bean.orderItems.map((item, index) => (
                                            <li key={index}>
                                                {item.productName}({item.quantity}개)
                                            </li>
                                        ))}
                                    </ul>
                                    {/* 관리자 전용 버튼 생성 */}
                                    {makeAdminButton(bean)}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default App;
/* [상품 상세 보기]
    전체 화면을 좌, 우측 1:2로 분리합니다.
    왼쪽은 상품의 이미지 정보, 오른쪽은 상품의 정보 및 '장바구니'와 '구매하기' 버튼을 만듭니다. */

import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function App({ user }) {
    const { id } = useParams(); //id 파라미터 챙기기
    const [product, setProduct] = useState(null); //백엔드에서 넘어온 상품 정보
    //로딩 상태를 의미하는 'state'로 값이 'true'이면 현재 로딩 중입니다.
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    //파라미터 id 가 갱신이되면 화면을 다시 'rendering' 시킵니다.
    useEffect(() => {
        const url = `${API_BASE_URL}/product/detail/${id}`;

        axios
            .get(url)
            .then((response) => {
                setProduct(response.data);
                setLoading(false); //상품 정보를 읽어왔습니다.
            })
            .catch((error) => {
                console.log(error);
                alert('상품 정보를 불러오는 중에 오류가 발생하였습니다.');
                navigate(-1); //이전 페이지로 이동하기
            });
    }, [id]);

    //아직 'backend' 에서 읽어오지 못한 경우를 대비한 코딩입니다.
    if (loading === true) {
        return (
            <Container className="my-4 text-center">
                <h3>
                    상품 정보를 읽어오는 중입니다.
                </h3>
            </Container>
        );
    }

    //상품에대한 정보가 없는 경우를 대비한 코딩입니다.
    if (!product) {
        return (
            <Container className="my-4 text-center">
                <h3>
                    상품 정보를 찾을 수 없습니다.
                </h3>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <Card>
                <Row className="g-0">
                    {/* 좌측 상품 이미지 */}
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={`${API_BASE_URL}/images/${product.image}`}
                            alt={`${product.name}`}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </Col>
                    {/* 우측 상품 정보 및 구매 관련 버튼 */}
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="fd-3">
                                <h3>{product.name}</h3>
                            </Card.Title>
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td className="text-center">가격</td>
                                        <td>{product.price}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">카테고리</td>
                                        <td>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">재고</td>
                                        <td>{product.stock}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">설명</td>
                                        <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">등록일자</td>
                                        <td>{product.inputdate}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            {/* 구매 수량 입력란 */}
                            {/* as={Row} 는 렌더링시 기본 값인 <div> 말고 Row로 렌더링하도록 해줍니다. */}
                            <Form.Group as={Row} className="mb-3 align-items-center">
                                <Col xs={3} className="text-center">
                                    <strong>구매 수량</strong>
                                </Col>
                                <Col xs={5}>
                                    {/* 구매 수량은 최소 '1이상' 으로 설정했고, user 모드에 따라서 분기 코딩했습니다. */}
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        disabled={!user} />
                                </Col>
                            </Form.Group>

                            {/* 버튼(이전 목록, 장바구니, 구매하기) */}
                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="primary" className="me-3 px-4" href="/product/list">
                                    이전 목록
                                </Button>
                                <Button variant="success" className="me-3 px-4">
                                    장바구니
                                </Button>
                                <Button variant="danger" className="me-3 px-4">
                                    구매하기
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default App;
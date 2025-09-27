import { useEffect, useState } from "react";

import { Button, Card, Col, Container, Row, Image, Table, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/config";
import axios from "axios";

function App({ user }) {
    const thStyle = { fontSize: '1.2rem' }; //테이블 헤더 스타일
    return (
        <Container className="mt-4">
            <h2 className="mb-4">
                {/* 'xxrem' 은 주위 글꼴의 'xx 배' 를 의미합니다. */}
                <span style={{ color: 'blue', fontSize: '2rem' }}>{user?.name}</span>
                <span style={{ fontSize: '1.3rem' }}>님의 장바구니</span>
            </h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th style={thStyle}>
                            <Form.Check
                                type="checkbox"
                                onChange={``}
                                label="전체 선택" />
                        </th>
                        <th style={thStyle}>상품 정보</th>
                        <th style={thStyle}>수량</th>
                        <th style={thStyle}>금액</th>
                        <th style={thStyle}>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>xx</td>
                    </tr>
                </tbody>
            </Table>
            {/* 좌측 정렬(text-start), 가운데 정렬(text-center), 우측 정렬(text-end)을 의미합니다. */}
            <h3 className="text-end mt-3">총 주문 금액 : 0 원</h3>
            <div className="text-end">
                <Button variant="primary" size="lg" onClick={``}>
                    주문하기
                </Button>
            </div >
        </Container >
    );
}

export default App;
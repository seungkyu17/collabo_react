import { Container } from "react-bootstrap";

function App() {
    return (
        <Container className="mt-4">
            <h2 className="mb-4">
                <span style={{ color: 'blue', fontSize: '2rem' }}>{user?.name}</span>
                <span style={{ fontSize: '1.3rem' }}>님의 주문내역</span>
            </h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th style={thStyle}>상품 정보</th>
                        <th style={thStyle}>수량</th>
                        <th style={thStyle}>금액</th>
                    </tr>
                </thead>
                <tbody>
                    {cartProducts.length > 0 ? (
                        <tr key={product.cartProductId}>
                            <td>

                            </td>
                        </tr>
                    ) : (
                        <tr><td></td></tr>
                    )}
                </tbody>
            </Table>
            <h3 className="text-end mt-3">총 주문 금액 : {orderTotalPrice.toLocaleString()}원</h3>
        </Container>
    );
}

export default App;
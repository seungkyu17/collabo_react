import axios from "axios";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/config";
import { Table } from "react-bootstrap";

function App() {
    const [ball, setBall] = useState({});

    useEffect(() => {
        const url = `${API_BASE_URL}/ball`;

        axios
            .get(url, {})
            .then((response) => {
                console.log('응답 받은 데이터');
                console.log(response.data);

                setBall(response.data);
            });
    }, []);

    return (
        <>
            <Table hover style={{ margin: '5px' }}>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>{ball.id}</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{ball.name}</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>{Number(ball.price).toLocaleString()} 원</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default App;
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";


function App() {
    const [ballList, setBallList] = useState([]);

    useEffect(() => {
        const url = `${API_BASE_URL}/ball/list`;

        axios
            .get(url, {})
            .then((response) => {
                setBallList(response.data);
            });
    }, []);

    return (
        <>
            <Table hover style={{ margin: '5px' }}>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>상품명</th>
                        <th>단가</th>
                    </tr>
                </thead>
                <tbody>
                    {ballList.map((ball) =>
                        <tr key={ball.id}>
                            <td>{ball.id}</td>
                            <td>{ball.name}</td>
                            <td>{Number(ball.price).toLocaleString()} 원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default App;
import { Container, Row , Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
function Mahasiswa(){
    const [mhs, setMhs] = useState([]);
    const url = "http://localhost:3000/static/";
    useEffect(() => {
    fectData();
    }, []);
    const fectData = async () =>{
    const response1 = await axios.get('http://localhost:3000/api/mhs');
    const data1 = await response1.data.data;
    setMhs (data1);
    }
    return(
        <Container>
            <Row>
                <Col><h2>Data Mahasiswa</h2></Col>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Jurusan</th>
                            <th scope="col">gambar</th>
                            <th scope="col">gambar</th>
                        </tr>
                    </thead>
                    <tbody>
                            { mhs.map((mh, index) =>(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{mh.nama}</td>
                                <td>{mh.jurusan}</td>
                                <td>
                                    <img src={url + mh.gambar} height="100" />
                                </td>
                                <td>
                                    <img src={url + mh.swa_foto} height="100" />
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            </Row>      
        </Container>
    );
}

export default Mahasiswa;
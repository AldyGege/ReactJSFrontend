import { Container, Row , Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Mahasiswa(){
    const [mhs, setMhs] = useState([]);
    const [jrs, setJrs] = useState([]);

    const url = "http://localhost:3000/static/";
    useEffect(() => {
    fectData();
    }, []);
    const fectData = async () =>{
    const response1 = await axios.get('http://localhost:3000/api/mhs');
    const data1 = await response1.data.data;
    setMhs(data1);

    const response2 = await axios.get('http://localhost:3000/api/jurusan');
    const data2 = await response2.data.data;
    setJrs(data2);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nama, setNama] = useState('');
    const [nrp, setNrp] = useState('');
    const [id_jurusan, setIdJurusan] = useState('');
    const [gambar, setGambar] = useState(null);
    const [swa_foto, setSwaFoto] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handleNamaChange = (e) => {
        setNama(e.target.value)
    };
    const handleNrpChange = (e) => {
        setNrp(e.target.value)
    };
    const handleIdJurusanChange = (e) => {
        setIdJurusan(e.target.value)
    };
    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        setGambar(file);
    };
    const handleSwaFotoChange = (e) => {
        const file = e.target.files[0];
        setSwaFoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nama', nama);
        formData.append('nrp', nrp);
        formData.append('id_jurusan', id_jurusan);
        formData.append('gambar', gambar);
        formData.append('swa_foto', swa_foto);

        try {
            await axios.post('http://localhost:3000/api/mhs/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/mhs');
            fectData();
        } catch(error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };
    return(
        <Container>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">Nama : </label>
                <input type="text" className="form-control" value={nama} onChange={handleNamaChange}/>
                </div>
                <div className="mb-3">
                <label className="form-label">NRP : </label>
                <input type="text" className="form-control" value={nrp} onChange={handleNrpChange}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Jurusan : </label>
                <select className="form-select" value={id_jurusan} onChange={handleIdJurusanChange}>
                {jrs.map((jr) => (
                    <option key={jr.id_j} value={jr.id_j}>
                    {jr.nama_jurusan}
                    </option>
                ))}
                </select>
                </div>
                <div className="mb-3">
                <label className="form-label">Gambar : </label>
                <input type="file" className="form-control" accept="image/*" onChange={handleGambarChange}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Swa Foto : </label>
                <input type="file" className="form-control" accept="image/*" onChange={handleSwaFotoChange}/>
                </div>
                <button onClick={handleClose} type="submit" className="btn btn-primary">Kirim</button>
                </form>
            </Modal.Body>
            </Modal>
            <Row>
                <Col>
                <h2>Data Mahasiswa</h2>
                <Button variant="primary" onClick={handleShow}>Tambah</Button>
                </Col>
                <table className="table">
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
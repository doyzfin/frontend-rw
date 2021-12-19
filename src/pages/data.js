import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/id";

const Data = () => {
  const [data, setData] = useState([]);
  const [one, setOne] = useState({});
  const [show, setShow] = useState(false);
  const [nama, setNama] = useState(one.rw_name);
  const [alamat, setAlamat] = useState(one.rw_alamat);
  const [tanggal, setTanggal] = useState(one.rw_tanggal_lahir);
  const [umur, setUmur] = useState(0);
  const [pendidikan, setPendidikan] = useState(one.rw_pendidikan);
  const [nik, setNik] = useState(one.rw_nik);
  const [bpjs, setBpjs] = useState(one.rw_bpjs);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://rw10-app.herokuapp.com/backend1/api/v1/rw/")
      .then((res) => {
        setData(res.data.data);
      });
  };

  const handleModal = (item) => {
    axios
      .get(`https://rw10-app.herokuapp.com/backend1/api/v1/rw/${item.rw_id}`)
      .then((res) => {
        setOne(res.data.data[0]);
      });
    setShow(true);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Apakah Anda Yakin  Hapus?",
      showDenyButton: true,

      confirmButtonText: "Iyaa",
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://rw10-app.herokuapp.com/backend1/api/v1/rw/${item.rw_id}`
          )
          .then((res) => {
            Swal.fire("Berhasil!", "Berhasil Hapus", "success");
            getData();
          })
          .catch((err) => {
            Swal.fire("Error!", "Gagal Menghapus", "error");
          });
      }
    });
  };

  const handleUmur = (e) => {
    let umur = moment(e.target.value, "YYYYMMDD").fromNow();
    setTanggal(e.target.value);
    setUmur(umur.slice(0, 8));
  };

  const onUpdate = (id) => {
    Swal.fire({
      title: "Apakah Anda Yakin  Update?",
      showDenyButton: true,

      confirmButtonText: "Iyaa",
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        const setData = {
          nama: nama,
          alamat: alamat,
          tanggalLahir: tanggal,
          umur: umur && umur.slice(0, 2),
          pendidikan: pendidikan,
          nik: nik,
          bpjs: bpjs,
          vaksin: "",
          tempatVaksin: "",
        };
        axios
          .patch(
            `https://rw10-app.herokuapp.com/backend1/api/v1/rw/${id}`,
            setData
          )
          .then((res) => {
            Swal.fire("Berhasil!", "Berhasil Update", "success");
            setShow(false);
            getData();
          })
          .catch((err) => {
            Swal.fire("Error!", "Gagal MengUpdate", "error");
          });
      }
    });
  };

  return (
    <>
      <Row style={{ marginBottom: "20px", margin: "10px 20px" }}>
        <Col xs={4}>
          <Button href="/">Kembali</Button>
        </Col>
        <Col xs={4} style={{ textAlign: "center" }}>
          <h5>List Data Warga</h5>
        </Col>
        <Col xs={4} style={{ textAlign: "right" }}>
          <Button variant="success">Export</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Nama</th>
            <th style={{ textAlign: "center" }}>Alamat</th>
            <th style={{ textAlign: "center" }}>Tanggal Lahir</th>
            <th style={{ textAlign: "center" }}>Umur</th>
            <th style={{ textAlign: "center" }}>Pendidikan</th>
            <th style={{ textAlign: "center" }}>NIK</th>
            <th style={{ textAlign: "center" }}>BPJS</th>
            <th style={{ textAlign: "center" }} colSpan={2}>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => {
            return (
              <>
                <tr>
                  <th>{index + 1}</th>
                  <th>{items.rw_name}</th>
                  <th>{items.rw_alamat}</th>
                  <th>{moment(items.rw_tanggal_lahir).format("ll")}</th>
                  <th>{items.rw_umur}</th>
                  <th>{items.rw_pendidikan}</th>
                  <th>{items.rw_nik}</th>
                  <th>{items.rw_bpjs}</th>
                  <th>
                    <Button
                      style={{ width: "100%" }}
                      variant="primary"
                      onClick={() => handleModal(items)}
                    >
                      Edit
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      style={{ width: "100%" }}
                      variant="danger"
                      onClick={() => handleDelete(items)}
                    >
                      Hapus
                    </Button>
                  </th>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <h5>Edit Data</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Silahkan Isi Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Silahkan Isi Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                required
                value={tanggal}
                onChange={(event) => handleUmur(event)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Umur</Form.Label>
              <Form.Control
                type="text"
                disabled
                required
                value={umur}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pendidikan</Form.Label>
              <Form.Control
                type="text"
                required
                value={pendidikan}
                placeholder="Silahkan Isi Pendidikan"
                onChange={(e) => setPendidikan(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="number"
                required
                value={nik}
                maxLength={16}
                minLength={16}
                placeholder="Silahkan Isi NIK"
                onChange={(e) => setNik(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>BPJS</Form.Label>
              <Form.Control
                type="number"
                required
                value={bpjs}
                placeholder="Silahkan Isi BPJS"
                onChange={(e) => setBpjs(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Kembali
          </Button>
          <Button variant="primary" onClick={() => onUpdate(one.rw_id)}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Data;

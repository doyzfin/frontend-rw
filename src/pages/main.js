import { Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";
import axiosApiIntances from "../utils/axios";

const Main = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [umur, setUmur] = useState(0);
  const [pendidikan, setPendidikan] = useState("");
  const [nik, setNik] = useState("");
  const [bpjs, setBpjs] = useState("");

  const handleSubmit = () => {
    Swal.fire({
      title: "Apakah Anda Yakin Untuk Simpan ?",
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
        axiosApiIntances
          .post("/rw", setData)
          .then((res) => {
            Swal.fire("Berhasil!", res.data.msg, "success");
            resetForm();
          })
          .catch((err) => {
            Swal.fire("Error!", err.response.data.msg, "error");
          });
      }
    });
  };

  const resetForm = () => {
    setNama("");
    setAlamat("");
    setTanggal("");
    setUmur(0);
    setPendidikan("");
    setNik("");
    setBpjs("");
  };

  const handleUmur = (e) => {
    let umur = moment(e.target.value, "YYYYMMDD").fromNow();
    setTanggal(e.target.value);
    setUmur(umur.slice(0, 8));
  };
  return (
    <>
      <center>
        <h1 style={{ marginTop: "20px", marginBottom: "30px" }}>
          INPUT DATA WARGA RW 10
        </h1>
      </center>
      <Card
        style={{
          width: "500px",
          padding: "20px",
          margin: "0 auto",

          marginBottom: "20px",
        }}
      >
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
          <Button block variant="primary" onClick={handleSubmit}>
            Kirim
          </Button>
        </Form>
      </Card>
      <center>
        <a href="/data">Lihat Table</a>
      </center>
    </>
  );
};

export default Main;

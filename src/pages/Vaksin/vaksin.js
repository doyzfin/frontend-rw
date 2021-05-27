import React, { Component } from "react";
import axiosApiIntances from "../../utils/axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./vaksin.module.css";
import Data from "../../components/vaksin";

class Vaksin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
      sort: "rw_umur DESC",
      id: "",
      form: {
        name: "",
        vaksin: "",
        tempatVaksin: "",
      },
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const { sort, search } = this.state;
    axiosApiIntances.get(`/rw?sort=${sort}&search=${search}`).then((res) => {
      console.log(res);
      this.setState({ data: res.data.data });
    });
  };
  changeTextSearch = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state.search,
      [event.target.name]: event.target.value,
    });
  };
  handleSelectUpdate = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleSelect = (event) => {
    event.preventDefault();
    this.setState({ sort: event.target.value });
  };
  handleUpdate = (event) => {
    event.preventDefault();
    const { id } = this.state;
    axiosApiIntances.patch(`/rw/vaksin/${id}`, this.state.form).then((res) => {
      window.confirm("Yakin ingin Update ?");
      this.getData();
      this.resetData(event);
    });
  };
  resetData = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        name: "",
        vaksin: "",
        tempatVaksin: "",
      },
    });
  };
  handleSearch = (event) => {
    this.getData();
    this.resetDataSearch(event);
  };
  resetDataSearch = (event) => {
    event.preventDefault();
    this.setState({
      search: "",
    });
  };
  setUpdate = (data) => {
    this.setState({
      id: data.rw_id,
      form: {
        name: data.rw_name,
        vaksin: data.rw_vaksin,
        tempatVaksin: data.tempat_vaksin,
      },
    });
  };
  render() {
    console.log(this.state.form);
    return (
      <>
        <Container fluid>
          <h1 className={styles.mainTitle}>RW 10 Daftar Vaksin</h1>
          <Form>
            <Form.Group>
              <Form.Label className={styles.label}>Cari Nama Warga </Form.Label>
              <Form.Control
                type="text"
                placeholder="Cari nama warga disini"
                name="search"
                value={this.state.search}
                onChange={(event) => this.changeTextSearch(event)}
              />
              <Button
                className={styles.button1}
                onClick={(event) => this.handleSearch(event)}
              >
                Search
              </Button>
              <Form.Control
                as="select"
                className={styles.button1}
                onChange={(event) => this.handleSelect(event)}
              >
                <option value="">Urutkan Berdasarkan ....</option>
                <option value="rw_vaksin">Sudah Di Vaksin</option>
                <option value="RT01">RT 01</option>
                <option value="RT02">RT 02</option>
                <option value="RT03">RT 03</option>
                <option value="RT04">RT 04</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Card className={styles.mainCardForm}>
            <Form>
              <Form.Group>
                <Form.Label className={styles.label}>
                  Nama Warga yang ingin diubah{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama warga"
                  disabled
                  name="name"
                  value={this.state.form.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Status Vaksin </Form.Label>
                <Form.Control
                  as="select"
                  name="vaksin"
                  onChange={(event) => this.handleSelectUpdate(event)}
                >
                  <option value="">Pilih warga sudah di vaksin ?</option>
                  <option value="sudah">Sudah</option>
                  <option value="belum">Belum</option>
                  <option value="tidak">Tidak</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Tempat Vaksin </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Isi dimana warga di vaksin"
                  name="tempatVaksin"
                  value={this.state.form.tempatVaksin}
                  onChange={(event) => this.handleSelectUpdate(event)}
                />
              </Form.Group>
              <Button
                className={styles.button}
                onClick={(event) => this.handleUpdate(event)}
              >
                Ubah Data
              </Button>
              <Button
                className={styles.button}
                onClick={(event) => this.resetData(event)}
              >
                Batal
              </Button>
            </Form>
          </Card>

          <Row>
            <Col xs={12}>
              <Card className={styles.mainCard1}>
                <Row>
                  <Col className={styles.mainTitle1} sm={2}>
                    Nama
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Alamat
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Tanggal Lahir
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Umur
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Pendidikan
                  </Col>
                  <Col className={styles.mainTitle1} sm={2}>
                    NIK
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    BPJS
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Status Vaksin
                  </Col>
                  <Col className={styles.mainTitle1} sm={1}>
                    Tempat Vaksin
                  </Col>
                </Row>
              </Card>
            </Col>
            <hr />
            {this.state.data.map((item, index) => {
              return (
                <>
                  <Data data={item} setUpdate={this.setUpdate.bind(this)} />
                </>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Vaksin;

import React, { Component } from "react";
import axiosApiIntances from "../utils/axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import styles from "./main.module.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axiosApiIntances.get("/rw").then((res) => {
      console.log(res);
      this.setState({ data: res.data.data });
    });
  };
  handleVaksin = () => {
    this.props.history.push("/vaksin");
  };
  render() {
    return (
      <>
        <Container fluid>
          <h1 className={styles.mainTitle}>RW 10 Daftar Warga</h1>
          <Card className={styles.mainCardForm}>
            <Form>
              <Form.Group>
                <Form.Label className={styles.label}>Nama </Form.Label>
                <Form.Control type="text" placeholder="isi nama warga" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Alamat </Form.Label>
                <Form.Control type="text" placeholder="isi alamat warga" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Tanggal Lahir </Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Umur </Form.Label>
                <Form.Control type="text" disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Pendidikan </Form.Label>
                <Form.Control type="text" placeholder="isi pendidikan warga" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>NIK </Form.Label>
                <Form.Control type="text" placeholder="isi no NIK warga" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>BPJS </Form.Label>
                <Form.Control type="text" placeholder="isi no BPJS warga" />
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Status Vaksin </Form.Label>
                <Form.Control as="select">
                  <option value="">Pilih warga sudah di vaksin ?</option>
                  <option value="sudah">Sudah</option>
                  <option value="belum">Belum</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className={styles.label}>Tempat Vaksin </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="isi dimana warga di vaksin"
                />
              </Form.Group>
              <Button className={styles.button} onClick={this.handleVaksin}>
                Vaksin
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
                  <Col sm={12} key={index}>
                    <Card className={styles.mainCard}>
                      <Row>
                        <Col sm={2} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_name}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_alamat}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>
                            {item.rw_tanggal_lahir.slice(0, 10)}
                          </h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_umur}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>
                            {item.rw_pendidikan}
                          </h1>
                        </Col>
                        <Col sm={2} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_nik}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_bpjs}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_vaksin}</h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>
                            {item.rw_tempat_vaksin}
                          </h1>
                        </Col>
                        <Col sm={1} className={styles.mainCol}>
                          <h1 className={styles.mainText}>{item.rw_name}</h1>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;

import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "../pages/Vaksin/vaksin.module.css";

class Data extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Col sm={12}>
          <Card
            className={styles.mainCard}
            onClick={() => this.props.setUpdate(this.props.data)}
          >
            <Row>
              <Col sm={2} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_name}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_alamat}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>
                  {this.props.data.rw_tanggal_lahir.slice(0, 10)}
                </h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_umur}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>
                  {this.props.data.rw_pendidikan}
                </h1>
              </Col>
              <Col sm={2} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_nik}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_bpjs}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_vaksin}</h1>
              </Col>
              <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>
                  {this.props.data.rw_tempat_vaksin}
                </h1>
              </Col>
              {/* <Col sm={1} className={styles.mainCol}>
                <h1 className={styles.mainText}>{this.props.data.rw_name}</h1>
              </Col> */}
            </Row>
          </Card>
        </Col>
      </>
    );
  }
}

export default Data;

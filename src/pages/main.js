// import { Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import axiosApiIntances from "../utils/axios";
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Form,
  Input,
  Space,
  Tooltip,
  InputNumber,
  Select,
} from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Main = () => {
  const [data, setData] = useState([]);
  const [one, setOne] = useState({});
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const columns = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Nama",
      dataIndex: "rw_name",
    },
    {
      title: "Alamat",
      dataIndex: "rw_alamat",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "rw_tanggal_lahir",
    },
    {
      title: "Umur",
      dataIndex: "rw_umur",
    },
    {
      title: "Pendidikan",
      dataIndex: "rw_pendidikan",
    },
    {
      title: "NIK",
      dataIndex: "rw_nik",
    },
    {
      title: "BPJS",
      dataIndex: "rw_bpjs",
    },
    {
      title: "Aksi",

      render: (text, record) => (
        <>
          <Space size="middle">
            <Tooltip title="Edit">
              <EditOutlined
                className="mr-3"
                onClick={() => handleModal(record)}
              />
            </Tooltip>
            <Tooltip title="Hapus">
              <DeleteOutlined onClick={() => handleDelete(record)} />
            </Tooltip>
          </Space>
        </>
      ),
    },
  ];

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosApiIntances.get("/rw").then((res) => {
      setData(
        res.data.data.map((item, index) => {
          return {
            ...item,
            no: index + 1,
            rw_tanggal_lahir: moment(item.rw_tanggal_lahir).format("ll"),
            rw_tanggal: item.rw_tanggal_lahir,
          };
        })
      );
    });
  };

  const handleModal = (values) => {
    form.setFieldsValue({
      name: values.rw_name,
      alamat: values.rw_alamat,
      tanggal_lahir: values.rw_tanggal_lahir,
      umur: values.rw_umur,
      pendidikan: values.rw_pendidikan,
      nik: values.rw_nik,
      bpjs: values.rw_bpjs,
    });
    axiosApiIntances.get(`/rw/${values.rw_id}`).then((res) => {
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
        axiosApiIntances
          .delete(`/rw/${item.rw_id}`)
          .then((res) => {
            message.success("Berhasil Hapus Data");
            getData();
          })
          .catch((err) => {
            message.error("Gagal Menghapus");
          });
      }
    });
  };

  const onUpdate = (id) => {
    form.validateFields().then((values) => {
      Swal.fire({
        title: "Apakah Anda Yakin  Update?",
        showDenyButton: true,

        confirmButtonText: "Iyaa",
        denyButtonText: `Batal`,
      }).then((result) => {
        if (result.isConfirmed) {
          const setData = {
            nama: values.name,
            alamat: values.alamat,
            tanggalLahir: new Date(values.tanggal_lahir),
            umur: values.umur && values.umur.slice(0, 2),
            pendidikan: values.pendidikan,
            nik: values.nik,
            bpjs: values.bpjs,
            vaksin: "",
            tempatVaksin: "",
          };
          axiosApiIntances
            .patch(`/rw/${id}`, setData)
            .then((res) => {
              message.success("Berhasil Update Data Warga");
              setShow(false);
              getData();
            })
            .catch((err) => {
              message.error("Gagal Update Data Warga");
            });
        }
      });
    });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      Swal.fire({
        title: "Apakah Anda Yakin Untuk Simpan ?",
        showDenyButton: true,

        confirmButtonText: "Iyaa",
        denyButtonText: `Batal`,
      }).then((result) => {
        if (result.isConfirmed) {
          const setData = {
            nama: values.name,
            alamat: values.alamat,
            tanggalLahir: values.tanggal_lahir,
            umur: values.umur && values.umur.slice(0, 2),
            pendidikan: values.pendidikan,
            nik: values.nik,
            bpjs: values.bpjs,
            vaksin: "",
            tempatVaksin: "",
          };
          axiosApiIntances
            .post("/rw", setData)
            .then((res) => {
              message.success("Berhasil Menambah Data");
              form.resetFields();
              setAdd(false);
              getData();
            })
            .catch((err) => {
              message.error(err.response.data.msg);
            });
        }
      });
    });
  };

  const handleUmur = (e) => {
    let umur = moment(e.target.value, "YYYYMMDD").fromNow();

    form.setFieldsValue({
      umur: umur.slice(0, 8),
    });
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    axiosApiIntances.get(`/rw?search=${e.target.value}`).then((res) => {
      setData(
        res.data.data.map((item, index) => {
          return {
            ...item,
            no: index + 1,
            rw_tanggal_lahir: moment(item.rw_tanggal_lahir).format("ll"),
            rw_tanggal: item.rw_tanggal_lahir,
          };
        })
      );
    });
  };

  const onSearchEnter = (e) => {
    setSearch(e);
    axiosApiIntances.get(`/rw?search=${e}`).then((res) => {
      setData(
        res.data.data.map((item, index) => {
          return {
            ...item,
            no: index + 1,
            rw_tanggal_lahir: moment(item.rw_tanggal_lahir).format("ll"),
            rw_tanggal: item.rw_tanggal_lahir,
          };
        })
      );
    });
  };

  const { Search } = Input;

  const { Option } = Select;

  function handleChange(value) {
    setSort(value);
    if (search) {
      axiosApiIntances.get(`/rw?search=${search}&sort=${value}`).then((res) => {
        setData(
          res.data.data.map((item, index) => {
            return {
              ...item,
              no: index + 1,
              rw_tanggal_lahir: moment(item.rw_tanggal_lahir).format("ll"),
              rw_tanggal: item.rw_tanggal_lahir,
            };
          })
        );
        setSort("");
      });
    } else {
      axiosApiIntances.get(`/rw?sort=${value}`).then((res) => {
        setData(
          res.data.data.map((item, index) => {
            return {
              ...item,
              no: index + 1,
              rw_tanggal_lahir: moment(item.rw_tanggal_lahir).format("ll"),
              rw_tanggal: item.rw_tanggal_lahir,
            };
          })
        );
        setSort("");
      });
    }
  }

  const handleLogut = () => {
    Swal.fire({
      title: "Apakah Anda Yakin Keluar ?",
      showDenyButton: true,

      confirmButtonText: "Iyaa",
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <Card
        size="small"
        title="Data Warga RW 10"
        extra={
          <>
            <Button type="primary" onClick={() => setAdd(true)}>
              Tambah Data
            </Button>{" "}
            <Button type="primary" icon={<DownloadOutlined />} />
            <Button type="danger" className="ml-3" onClick={handleLogut}>
              Keluar
            </Button>
          </>
        }
      >
        <Search
          placeholder="Cari disini ..."
          onSearch={onSearchEnter}
          onChange={onSearch}
          style={{ width: 200, marginBottom: "10px" }}
        />
        <Form>
          <Form.Item label="Filter">
            <Select
              defaultValue={sort}
              style={{ width: 120 }}
              onChange={handleChange}
              className="ml-3"
              value={sort}
            >
              <Option value="">Silahkan Pilih Filter</Option>
              <Option value="rw_name ASC">A - Z</Option>
              <Option value="rw_name DESC">Z - A</Option>
              <Option value="rw_umur ASC">Umur 0 - 100</Option>
              <Option value="rw_umur DESC">Umur 100 - 0</Option>
            </Select>
          </Form.Item>
        </Form>

        <div style={{ overflowX: "scroll" }}>
          <Table
            columns={columns}
            style={{ width: "100%" }}
            dataSource={data}
            size="small"
            pagination={false}
          />
        </div>
      </Card>
      <Modal
        title="Edit Data Warga"
        visible={show}
        onOk={() => onUpdate(one.rw_id)}
        onCancel={() => setShow(false)}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Nama Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Nama" />
          </Form.Item>
          <Form.Item
            label="Alamat"
            name="alamat"
            rules={[{ required: true, message: "Alamat Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Alamat" />
          </Form.Item>
          <Form.Item
            label={
              <p>
                Tanggal Lahir{" "}
                <span className="text-danger">*(harap diisi kembali)</span>
              </p>
            }
            name="tanggal_lahir"
            rules={[{ required: true, message: "Tanggal Lahir Wajib Diisi!" }]}
          >
            <Input type="date" onChange={(e) => handleUmur(e)} />
          </Form.Item>
          <Form.Item
            label="Umur"
            name="umur"
            rules={[{ required: true, message: "Umur Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Umur" />
          </Form.Item>
          <Form.Item
            label="Pendidikan"
            name="pendidikan"
            rules={[{ required: true, message: "Pendidikan Diisi!" }]}
          >
            <Input placeholder="Masukkan Pendidikan" />
          </Form.Item>
          <Form.Item
            label="NIK"
            name="nik"
            rules={[{ required: true, message: "NIK Wajib Diisi!" }]}
          >
            <InputNumber
              placeholder="Masukkan NIK"
              maxLength={16}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="No BPJS"
            name="bpjs"
            rules={[{ required: true, message: "No BPJS Diisi!" }]}
          >
            <InputNumber
              placeholder="Masukkan No BPJS"
              maxLength={16}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Tambah Data Warga"
        visible={add}
        onOk={handleSubmit}
        onCancel={() => setAdd(false)}
      >
        {" "}
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Nama Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Nama" />
          </Form.Item>
          <Form.Item
            label="Alamat"
            name="alamat"
            rules={[{ required: true, message: "Alamat Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Alamat" />
          </Form.Item>
          <Form.Item
            label={`Tanggal Lahir `}
            name="tanggal_lahir"
            rules={[{ required: true, message: "Tanggal Lahir Wajib Diisi!" }]}
          >
            <Input type="date" onChange={(e) => handleUmur(e)} />
          </Form.Item>
          <Form.Item
            label="Umur"
            name="umur"
            rules={[{ required: true, message: "Umur Wajib Diisi!" }]}
          >
            <Input placeholder="Masukkan Umur" disabled />
          </Form.Item>
          <Form.Item
            label="Pendidikan"
            name="pendidikan"
            rules={[{ required: true, message: "Pendidikan Diisi!" }]}
          >
            <Input placeholder="Masukkan Pendidikan" />
          </Form.Item>
          <Form.Item
            label="NIK"
            name="nik"
            rules={[{ required: true, message: "NIK Wajib Diisi!" }]}
          >
            <InputNumber
              placeholder="Masukkan NIK"
              maxLength={16}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="No BPJS"
            name="bpjs"
            rules={[{ required: true, message: "BPJS Wajib Diisi!" }]}
          >
            <InputNumber
              placeholder="Masukkan No BPJS"
              maxLength={16}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Main;

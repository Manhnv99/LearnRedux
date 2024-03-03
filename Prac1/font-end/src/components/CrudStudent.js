import GlobalLoading from "./GlobalLoading";
import {Container} from "react-bootstrap";
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllStudentAction} from "../redux/actions/StudentActions";
import dayjs from "dayjs";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {deleteStudentAPI, postStudentAPI, putStudentAPI} from "../apis/StudentAPI";
import {toast} from "react-toastify";


const CrudStudent = () =>{

    const [student_id,setStudent_id] = useState(undefined);
    const [whatAction,setWhatAction] = useState("post");
    const [loading,setLoading] = useState(false);
    const [form]=Form.useForm();
    const [openPostModal,setOpenPostModal] = useState(false);
    const listStudent = useSelector(state => state.student.listStudent);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllStudentAction());
    }, []);

    const columns = [
        {
            key:"1",
            title:"Name",
            dataIndex:"name",
            sorter:(a,b)=> a.name.localeCompare(b.name)
        },
        {
            key:"2",
            title:"Email",
            dataIndex:"email",
            sorter:(a,b)=> a.name.localeCompare(b.name)
        },
        {
            key:"3",
            title:"Gender",
            dataIndex:"gender",
            render:(text,record,index)=>{
                return(
                    <>
                        {record.gender ? "Nam" : "Nữ"}
                    </>
                )
            },
            sorter:(a,b)=> a.name.localeCompare(b.name)
        },
        {
            key:"4",
            title:"BirthDay",
            dataIndex:"birthDay",
            sorter:(a,b)=>{
                return(
                    dayjs(a.birthDay).unix() - dayjs(b.birthDay).unix()
                )
            }
        },
        {
            key:"5",
            title:"Function",
            render:(record)=>{
                return (
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                        <EditOutlined onClick={()=>{
                            setWhatAction("put");
                            setOpenPostModal(true);
                            setStudent_id(record.id);
                            handleFillFields(record);
                        }}/>
                        <DeleteOutlined onClick={()=>{handleDeleteStudent(record)}}/>
                    </div>
                )
            }
        }
    ]
    const handleDeleteStudent = (record) => {
        Modal.confirm({
            title:"Xác nhận",
            content:"Bạn có chắc muốn xóa học sinh này ?",
            onOk: async ()=>{
                setLoading(true);
                try {
                    const response = await deleteStudentAPI(record.id);
                    if(response && response.data.status === "OK"){
                        toast.success("Xóa Nhân Viên Thành Công!");
                        dispatch(getAllStudentAction());
                        setLoading(false);
                    }
                }catch (e) {
                    console.log(e)
                    toast.error(e.response.data.message);
                    setLoading(false);
                }
            }
        })
    }

    const handleFillFields = (record) => {
        console.log(record)
        form.setFieldsValue({
            name:record.name,
            email:record.email,
            status:record.status === "0" ? "DI_HOC" : "NGHI_HOC",
            birthDay:dayjs(record.birthDay,"YYYY-MM-DD"),
            gender:record.gender
        })
    }

    const handleSolveStudent = async () => {
        if(whatAction === "post"){
            setLoading(true);
            setTimeout( async () => {
                const fields = form.getFieldsValue();
                const formData = new FormData();
                formData.append("name",fields.name);
                formData.append("email",fields.email);
                formData.append("gender",fields.gender);
                formData.append("status",fields.status);
                formData.append("birthDay",dayjs(fields.birthDay.$d.toLocaleDateString()).format("YYYY-MM-DD"));

                try {
                    const postStudent = await postStudentAPI(formData);
                    if(postStudent && postStudent.data.status === "CREATED"){
                        toast.success(postStudent.data.message);
                        setLoading(false);

                        form.resetFields();
                        setOpenPostModal(false);
                        dispatch(getAllStudentAction());
                    }
                }catch (e) {
                    toast.error(e.response.data.message);
                    setLoading(false);
                }
            },[2000])
        }else{
            setLoading(true);
            setTimeout( async () => {
                const fields = form.getFieldsValue();
                const formData = new FormData();
                formData.append("name",fields.name);
                formData.append("email",fields.email);
                formData.append("gender",fields.gender);
                formData.append("status",fields.status);
                formData.append("birthDay",dayjs(fields.birthDay.$d.toLocaleDateString()).format("YYYY-MM-DD"));

                try {
                    const putStudent = await putStudentAPI(student_id,formData);
                    if(putStudent && putStudent.data.status === "OK"){
                        toast.success(putStudent.data.message);
                        setLoading(false);

                        form.resetFields();
                        setOpenPostModal(false);
                        dispatch(getAllStudentAction());
                    }
                }catch (e) {
                    toast.error(e.response.data.message);
                    setLoading(false);
                }
            },[2000])
        }
    }



    return(
        <>
            <>
                {loading && <GlobalLoading/>}
                <Container style={{marginTop:"100px"}}>
                    <div className="text-center mb-4">
                        <Button onClick={()=>{setOpenPostModal(true);setWhatAction("post")}}>Thêm mới nhân viên</Button>
                    </div>
                    <Table rowKey={(record, index) => record.key = index}
                           columns={columns} dataSource={listStudent}
                           pagination={{
                               pageSize:5
                           }}
                    />
                    {/*Modal*/}
                    <Modal title="Thêm học sinh"
                           okText={whatAction === "post" ? "Thêm" : "Cập nhật"}
                           open={openPostModal}
                           onOk={handleSolveStudent}
                           onCancel={()=>{setOpenPostModal(false);form.resetFields();}}>
                        <Form name="basic" form={form} labelCol={{span:24}} wrapperCol={{span:"24"}}>

                            <Form.Item label="Tên học sinh" name="name"
                                       rules={[
                                           {required:true,message:"Vui lòng nhập tên!"}
                                       ]}>
                                <Input placeholder="Enter your name!"/>
                            </Form.Item>

                            <Form.Item autoComplete="off" label="Email học sinh" name="email"
                                       rules={[
                                           {required:true,message:"Vui lòng nhập email!"},
                                       ]}>
                                <Input placeholder="Enter your email!"/>
                            </Form.Item>

                            <Form.Item label="Giới tính" name="gender" labelCol={{span:"4"}} wrapperCol={{span:"20"}}>
                                <Radio.Group style={{marginLeft:"5px"}}>
                                    <Radio value={true}>Nam</Radio>
                                    <Radio value={false}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Chọn Trạng thái" name="status">
                                <Select allowClear placeholder="Chọn trạng thái" options={[
                                    {value:"DI_HOC", label:"Đi học"},
                                    {value:"NGHI_HOC", label:"Nghỉ học"}
                                ]}/>
                            </Form.Item>

                            <Form.Item label="Ngày sinh" name="birthDay" >
                                <DatePicker format="YYYY-MM-DD"/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Container>
            </>
        </>
    )
}

export default CrudStudent
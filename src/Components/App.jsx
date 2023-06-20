import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { addData, deleteData, editData } from '../Action/Action';
const App = () => {
    const dispatch = useDispatch();
    var data = useSelector((state) => state.counter.tasks);
    console.log(data)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [prevContent, setPrevContent] = useState('')
    const [prevTitle, setPrevTitle] = useState('')
    const [previd, setPrevId] = useState(null);
    const [text, setText] = useState('')
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setTitle('');
        setContent('');
        setIsModalOpen(false);
    };
    const editModal = () => {
        setIsModalOpen(false);
        setEditOpen(true);
    };
    const editOk = () => {
        setIsModalOpen(false);
        setEditOpen(false);
        console.log(title);
        console.log(content);
    };
    const editCancel = () => {
        setIsModalOpen(false);
        setEditOpen(false);
    };
    const submitHanlder = () => {
        let id = Date.now();
        dispatch(addData({ id, title, content }))
    }
    const editHandler = (idx, id) => {
        setIsModalOpen(false);
        editModal();
        setPrevId(id);
        setPrevContent(data[idx]?.content)
        setPrevTitle(data[idx]?.title)
        setIsModalOpen(true);
    }
    const deleteHandler = (id) => {
        dispatch(deleteData(id))
    }
    const editBtn = () => {
        let id = Date.now();
        dispatch(editData({ id, previd, prevTitle, prevContent }))
    }
    return (
        <>
            <div className='main'>
                <div className='header'>Keep App</div>
                <div className="container">
                    <div className='icons' onClick={showModal}><ControlPointIcon fontSize='large' /></div>
                    <input type="text" placeholder="Search" onChange={e => setText(e.target.value)} style={{ marginLeft: 10, marginTop: 10, width: 200, borderRadius: 15 }} />
                    <div className='editor'>
                        {
                            data?.map((item, idx) => {
                                const query = text.toLowerCase();
                                if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)) {
                                    return (
                                        <>
                                            <div className="content">
                                                <h1 style={{ fontSize: "15px" }}>{item.title}</h1>
                                                <div style={{ fontSize: "15px" }} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                                <div className='myBtns'>
                                                    <button onClick={(e) => { editHandler(idx, item.id) }}><EditIcon /></button>
                                                    <button onClick={(e) => deleteHandler(item.id)}><DeleteIcon /></button>
                                                    {/* <button onClick={(e) => viewHandler(idx,item.id)}><PageviewIcon /></button> */}
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                    <Modal title="Save Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                        <Input placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onBlur={newContent => setContent(newContent)}
                        />
                        <Button type="primary" style={{ backgroundColor: 'green' }} onClick={(e) => submitHanlder()}>Save</Button>
                    </Modal>
                </div>
            </div>
            <Modal title="You can Edit" open={editOpen} onOk={editOk} onCancel={editCancel} footer={[]}>
                <Input placeholder="Enter title" value={prevTitle} onChange={e => setPrevTitle(e.target.value)} />
                <JoditEditor
                    ref={editor}
                    value={prevContent}
                    onBlur={newContent => setPrevContent(newContent)}
                />
                <Button type="primary" onClick={(e) => editBtn()}>Save</Button>
            </Modal>
        </>
    )
}

export default App
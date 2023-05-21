import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function PopUpdate(props) {
  const { show, onHide ,item} = props;
  const [inputValue1, setInputValue1] = useState(item.header);
  const [inputValue2, setInputValue2] = useState(item.pic);
  const [inputValue3, setInputValue3] = useState(item.body);
  const [inputValue4, setInputValue4] = useState(item.type);
  const [errorMessage, setErrorMessage] = useState('');


  const handleInput1Change = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInputValue2(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setInputValue3(event.target.value);
  };

  const handleInput4Change = (event) => {
    setInputValue4(event.target.value);
  };

  const handleClose = () => {
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setInputValue4('');
    setErrorMessage('');
    onHide();
  }

  const handlehand=()=>{
    handleUpdate();
    handleClose();
    window.location.reload();
  }

  const handleUpdate = () => {
    const updatedData = {
      nid: item.nid,
      header: inputValue1,
      body: inputValue3,
      pic: inputValue2,
      type: inputValue4,
    };
  
    axios.put(`https://easy-cyan-mite-tam.cyclic.app/news/update/${item.nid}`, updatedData, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log('Update Complete!');
    console.log(item.type);
    // ทำตามต้องการหลังจากบันทึกข้อมูลสำเร็จ
  })
  .catch(error => {
    console.error(error);
    // จัดการข้อผิดพลาด (error handling) ตามที่ต้องการ
  });
  
    onHide();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create news</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{marginLeft:"150px"}}>
          <label>Topic news:</label>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            value={inputValue1}
            onChange={handleInput1Change}
          />
        </div>
        <div style={{marginLeft:"150px"}}>
          <label>Picture:</label>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            value={inputValue2}
            onChange={handleInput2Change}
          />
        </div>
        <div style={{marginLeft:"10px"}}>
          <label>Detail:</label>
          <textarea
            style={{ display: 'block', height: '150px',resize: 'vertical',width:"450px" }}
            value={inputValue3}
            onChange={handleTextareaChange}
          />
        </div>
        <div style={{marginLeft:"150px"}}>
          <label>Type:</label>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            value={inputValue4}
            onChange={handleInput4Change}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginRight: "150px" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ marginRight: "10px", marginBottom: "5px" }}>
            Close
          </Button>
          <Button variant="primary"
            style={{ marginLeft: "10px", marginBottom: "5px" }}
            onClick={handlehand}
            
            >
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUpdate;
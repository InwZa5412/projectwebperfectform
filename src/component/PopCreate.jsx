import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';


function PopCreate(props) {
  const { show, onHide } = props;
  let id = Cookies.get('id');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
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


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue1 || !inputValue2) {
      setErrorMessage('Please enter a username and password');
      return;
    }
    fetch('https://easy-cyan-mite-tam.cyclic.app/news/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: inputValue1,
        pic: inputValue2,
        body: inputValue3,
        wid:id,
        type:inputValue4
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setErrorMessage('');
        onHide();
        window.location.reload();
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setErrorMessage('There was an error while submitting the form');
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
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
          <lable>Picture:</lable>
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
            onClick={onHide}
            style={{ marginRight: "10px", marginBottom: "5px" }}>
            Close
          </Button>
          <Button variant="primary"
            username={inputValue1}
            password={inputValue2}
            style={{ marginLeft: "10px", marginBottom: "5px" }}
            onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PopCreate;
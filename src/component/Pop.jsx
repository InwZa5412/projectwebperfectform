import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';


function Pop(props) {
  const { show, onHide } = props;
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput1Change = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInputValue2(event.target.value);
  };

  const handleClose = () => {
    setInputValue1('');
    setInputValue2('');
    setErrorMessage('');
    onHide();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue1 || !inputValue2) {
      setErrorMessage('Please enter a username and password');
      return;
    }
    fetch('https://easy-cyan-mite-tam.cyclic.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputValue1,
        password: inputValue2,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        Cookies.set('username', data[0].username, { expires: 7 });
        Cookies.set('id',data[0].wid,{expires: 7});
        Cookies.set('isLoggedIn', true, { expires: 7 });
        setErrorMessage('');
        onHide();
        window.location.reload();
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setErrorMessage('Username or password is incorrect');
      });
  };

  return (
    <Modal show={show} onHide={() => {
      handleClose();
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p style={{marginLeft:"50px",position:'absolute'}}>Username</p>
      <p style={{marginTop:"40px",marginLeft:"50px",position:'absolute'}}>Password</p>
        <div style={{marginLeft:"150px"}}>
        <input
          style={{ display: 'block', marginBottom: '10px' }}
          value={inputValue1}
          onChange={handleInput1Change}
        />
        <input
          type='password'
          style={{ display: 'block'}}
          value={inputValue2}
          onChange={handleInput2Change}
        />
        </div>
        {errorMessage && (
    <p style={{ color: 'red', marginTop: '10px',marginLeft:'50px' }}>{errorMessage}</p>
  )}
      </Modal.Body>
      <Modal.Footer>
        <div style={{marginRight:"150px"}}>
        <Button 
        variant="secondary" 
        onClick={handleClose} 
        style={{marginRight:"10px",marginBottom:"5px"}}>
          Close
        </Button>
        <Button variant="primary" 
        username={inputValue1} 
        password={inputValue2} 
        style={{marginLeft:"10px",marginBottom:"5px"}}
        onClick={handleSubmit}>
          Login
        </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default Pop;
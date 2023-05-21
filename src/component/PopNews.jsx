import React, { useState, useEffect  } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopNews(props) {
  const { show, onHide,items } = props;

  return (
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <div>
      <Modal.Title style={{marginLeft:"200px"}}>News</Modal.Title>
      <img src={items.pic} className="img-fluid" style={{ maxHeight: "200px", maxWidth: "200px" ,marginLeft:"140px"}}/>
      </div>
    </Modal.Header>
    <Modal.Body >
      {items.body}
    </Modal.Body>
    <Modal.Footer>
      <div style={{marginRight:"150px"}}>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      </div>
    </Modal.Footer>
  </Modal>
  );
}

export default PopNews;
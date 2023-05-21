import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css';
import PopNews from './PopNews';
import PopUpdate from './PopUpdate';
import axios from 'axios';
import Cookies from 'js-cookie';

function CD() {
  let user = Cookies.get('username');
  const [items, setItems] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const handleClosePopUp = () => setShowPopUp(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const [showUpdate, setShowUpdate] = useState(false);
const handleCloseUpdate = () => setShowUpdate(false);
const handleShowUpdate = () => setShowUpdate(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState(null);
  const handlePopUpItem = (item) => {
    setSelectedItem(item);
    handleShowPopUp();
  };
  const handleUpdateItem = (item) => {
    setSelectedUpdateItem(item);
    handleShowUpdate();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    fetch('https://easy-cyan-mite-tam.cyclic.app/news/game')
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  const unlock = () => {
    if(user){
      return{ visibility: "active"}
    }else{
      return{ visibility: "hidden"}
    }
    
  };

  const handleDelete = async (nid) => {
    try {
      await axios.delete('https://easy-cyan-mite-tam.cyclic.app/news/detele', { data: { nid } });
      setItems((prevItems) => prevItems.filter((item) => item.nid !== nid));
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <Button key={number} variant="light" active={currentPage === number} onClick={() => setCurrentPage(number)}>
        {number}
      </Button>
    );
  });

  return (
    <div>
      <div className="card-container">
        {currentItems.map((item) => (
          <Card className="custom-card" key={item.nid}>
            <Card.Img
              variant="top"
              src={item.pic}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <Card.Body>
              <Card.Title>{item.header}</Card.Title>
              <Card.Text className="card-description">{item.body.substring(0, 150) + '...'}</Card.Text>
              <Button variant="primary" onClick={() => handlePopUpItem(item)}>
                Read More
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item.nid) } style={unlock()}>
                Delete
              </Button>
              <Button variant="success" onClick={() => handleUpdateItem(item)} style={unlock()}>
                Update
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="pagination">{renderPageNumbers}</div>
      {selectedItem && <PopNews show={showPopUp} onHide={handleClosePopUp} items={selectedItem} />}
     {selectedUpdateItem && (<PopUpdate show={showUpdate} onHide={handleCloseUpdate} item={selectedUpdateItem} />)}
    </div>
  );
}

export default CD;
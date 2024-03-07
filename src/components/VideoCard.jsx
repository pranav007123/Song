import React, { useState } from 'react'
import {  Card, Modal } from 'react-bootstrap'
import { removeSongAPI, saveHistoryAPI } from '../services/AllAPI';

function VideoCard({displayData ,setDeleteSongResponse,insideCategory}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
      setShow(true);
      // song details
      const {caption,youtubelink} = displayData
      let timeData = new Date()
      let timeStamp = new Intl.DateTimeFormat('en-US',{
        year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'
      }).format(timeData)
      // console.log(timeStamp);
      await saveHistoryAPI({caption,youtubelink,timeStamp})

  }

  const deleteSong = async (sId)=>{
   const result = await removeSongAPI(sId)
   setDeleteSongResponse(result.data)

  }
  const dragStarted = (e,sId)=>{
    console.log(`Draging started ${sId}`);
    e.dataTransfer.setData("songId",sId)
  }
  return (
    <>
       <Card draggable onDragStart={(e)=>dragStarted(e,displayData?.id)} className='shadow'>
      <Card.Img style={{cursor:'pointer'}} onClick={handleShow} variant="top" height={'200px'} src={displayData?.imageurl} />
      <Card.Body>
        <Card.Title className='d-flex' >
          <p>{displayData?.caption}</p>
          {!insideCategory && <button className='btn'onClick={()=>deleteSong(displayData?.id)}><i className="fa-solid fa-trash text-danger"></i></button>}
        </Card.Title>        
      </Card.Body>
    </Card>



    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="100%" height="400" src={`${displayData?.youtubelink}?autoplay=1`}></iframe></Modal.Body>
        
      </Modal>
    </>
  )
}

export default VideoCard
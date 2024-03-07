import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { uploadSongAPI } from '../services/AllAPI';



function Add({setUploadSongResponse}) {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUploadSong({ ...uploadSong, caption: "", imageurl: "", youtubelink: "" })
  }

  const handleShow = () => setShow(true);


  // upload song
  const [uploadSong, setUploadSong] = useState({ caption: "", imageurl: "", youtubelink: "" })
  // to see whether the entries are correct 
  // console.log(uploadSong);

  // to store in localhost
  const handleUpload = async () => {
    const { caption, imageurl, youtubelink } = uploadSong

    if (caption && imageurl && youtubelink) {
      // alert("proceed to store video")
      const result = await uploadSongAPI(uploadSong)
      // console.log(result);
      
      if(result.status>=200 && result.status<300){
        alert(`Song ${result.data.caption} uploaded sucessfully`)
        setUploadSongResponse(result.data)
        handleClose()

      }else{
alert("API Call Failed plz try after some time")
      }

    } else {
      alert("plz fill form completly")
    }

  }

  // to convert youtubelink to embeded link
  const getYoutubeEmbedLink = (link) => {
    if (link.includes("v=")) {
      let videoid = link.split("v=")[1].slice(0, 11)
      setUploadSong({ ...uploadSong, youtubelink: `https://www.youtube.com/embed/${videoid}` })
    } else {
      setUploadSong({ ...uploadSong, youtubelink: "" })
      alert("Input proper link!!!")
    }
  }
  return (
    <>
      <div className=" d-flex">
        <h5>
          Upload Song
          <button className='btn ' onClick={handleShow} ><i className="fa-solid fa-upload fa-xl"></i></button>

        </h5>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter The Song Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Floating className="mb-3">
            <Form.Control
              value={uploadSong.caption}
              onChange={e => setUploadSong({ ...uploadSong, caption: e.target.value })}
              id="floatingInputCustom"
              type="text"
              placeholder="Song Caption"
            />
            <label htmlFor="floatingInputCustom">Song Caption</label>
          </Form.Floating>

          <Form.Floating className="mb-3" >
            <Form.Control
              value={uploadSong.imageurl}
              onChange={e => setUploadSong({ ...uploadSong, imageurl: e.target.value })}
              id="floatingImageCustom"
              type="text"
              placeholder="Image URL"
            />
            <label htmlFor="floatingImageCustom">Cover Image</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingYoutubeCustom"
              type="text"
              placeholder="Youtube link"
              value={uploadSong.youtubelink}
              onChange={e => getYoutubeEmbedLink(e.target.value)}
            />
            <label htmlFor="floatingYoutubeCustom">Youtube Link</label>

          </Form.Floating>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
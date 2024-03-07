import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { addPlaylistAPI, getASongAPI, getPlaylistAPI, removePlaylistAPI, updatePlaylistAPI } from '../services/AllAPI';
import VideoCard from './VideoCard';
import { json } from 'react-router-dom';




function Category(removePlaylistSongResponse) {
  const [playlistName, setPlaylistName] = useState("")
  const [allPlaylist, setAllPlaylist] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPlaylistName("")
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleAddPlaylist = async () => {
    if (playlistName) {
      const result = await addPlaylistAPI({ playlistName, allSongs: [] })
      handleClose()
      getAllPlaylist()

    } else {
      alert("Plz fill Form completely!!!")
    }
  }

  const getAllPlaylist = async () => {
    const result = await getPlaylistAPI()
    setAllPlaylist(result.data)

  }
  // console.log(allPlaylist);
  useEffect(() => {
    getAllPlaylist()
  }, [removePlaylistSongResponse])

  const handleRemovePlaylist = async (pId) => {
    await removePlaylistAPI(pId)
    getAllPlaylist()
  }
  const dragOverPlaylist =(e)=>{
    e.preventDefault()
    // console.log("Dragging over Playlist");

  }
  const songDropped = async (e,playlistId)=>{
    const songId = e.dataTransfer.getData("songId")
    // console.log(`song dropped with vid:${songId},inside playlist id:${playlistId}`);
const {data} = await getASongAPI(songId)
// console.log(data);
let selectedPlaylist = allPlaylist.find(item=>item.id==playlistId)
// console.log(selectedPlaylist);
selectedPlaylist.allSongs.push(data)
// console.log(selectedPlaylist);
await updatePlaylistAPI(playlistId,selectedPlaylist)
getAllPlaylist()
  }
  const songdragStarted= (e,songId,playlistId)=>{
    // console.log(`${playlistId} ${songId}`);
    let datashare ={songId,playlistId}
    e.dataTransfer.setData("removeSongDetails",JSON.stringify(datashare))
  }
  return (
    <>
      <div className='d-flex justify-content-around'>
        <h3>My Playlists</h3>
        <button className='btn btn-primary' onClick={handleShow}>Create your playlist</button>
      </div>

      <div className="container mt-3">
        {allPlaylist.length > 0 ? allPlaylist.map((item, index) => (
          <div droppable="true" onDragOver={(e)=>dragOverPlaylist(e)} onDrop={(e)=>songDropped(e,item?.id)} key={index} className="border rounded p-3 mb-2">
            <div className='d-flex justify-content-between'> <h5>{item.playlistName}</h5>
              <button className='btn btn-danger' onClick={() => handleRemovePlaylist(item.id)}>delete</button>
            </div>
            <div className='row mt-2'>
              {
                item.allSongs?.length > 0 &&
                item.allSongs?.map((song, index) => (
                  <div draggable onDragStart={e=>songdragStarted(e,song.id,item.id)} key={index} className="col-lg-6">
                    <VideoCard insideCategory={true} displayData={song} />
                  </div>


                ))
              }
            </div>
          </div>
        ))

          : <div>No playlist added yet!!!</div>
        }
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form.Floating className="mb-3">
          <Form.Control
            onChange={e => setPlaylistName(e.target.value)}
            value={playlistName}
            id="floatingInputCustom"
            type="text"
            placeholder="playlist Name"
          />
          <label htmlFor="floatingInputCustom">Playlist Name</label>
        </Form.Floating></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPlaylist}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>



  )
}

export default Category
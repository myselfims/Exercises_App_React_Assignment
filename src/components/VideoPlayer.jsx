import React from 'react'

const VideoPlayer = (props) => {
    const closeVideo = ()=>{
        props.setVideo('')
    }
  return (
    <div className='video-container'>
        <video width={600} autoPlay controls src={props.url}></video>
        <button onClick={closeVideo} className='btn m-2 btn-outline-danger'>Close</button>
    </div>
  )
}

export default VideoPlayer

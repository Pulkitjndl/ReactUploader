import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';
import '../App.css'

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [selectedFiles,setSelectedFiles] = useState([]);

  const onChange = e => {
   if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) =>prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
   }

    const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('File uploaded');
    } catch(err) {
      if(err.response.status === 500) {
        setMessage('There was a problem witht the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{renderPhotos(selectedFiles)}</h3>
            <img width="200"src={renderPhotos(selectedFiles)} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
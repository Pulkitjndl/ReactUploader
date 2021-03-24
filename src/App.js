import React from 'react';
import FileUploader from './components/FileUploader'
import './App.css';

const App = () => 
  <div className ='container mt-4'>
    <h4 className ="display-4 text-center mb-4">
      <i className="fab fa-react fa-spin"></i>React File Upload
    </h4>
    <FileUploader/>
  </div>;
export default App;

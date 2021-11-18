import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [neuroioData, setNeuroioData] = useState({
    result: 'exact',
    pid: '1273ee8b-896f-4721-8f07-bfbe06cd11af',
    age: null,
    sex: null,
    mood: null,
    confidence: 97.89,
    pan: 4.98,
    tilt: 2.96,
  });

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fetchNeuroio = async () => {
    const response = await axios({
      method: 'post',
      url: 'https://api.neuroio.com/v1/persons/search/',
      data: {
        image,
      },
    });
    console.log(response);
  };

  const onButtonClick = () => {
    console.log('onButtonClick');
    fetchNeuroio();
  };

  console.log('NEUROIO_TOKEN', process.env.NEUROIO_TOKEN);
  console.log('REACT_APP_NEUROIO_TOKEN', process.env.REACT_APP_NEUROIO_TOKEN);

  return (
    <div className="App">
      <div className="HalfWidth">
        <input type="file" onChange={onImageChange} className="filetype" />
        {image && (
          <button className="ImageSendBtn" onClick={onButtonClick}>
            Отправить фото в neuroio
          </button>
        )}
        <img src={image} alt="Загрузите фото сотрудника" />
      </div>

      <div className="HalfWidth">
        <div>
          <pre>{JSON.stringify(neuroioData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;

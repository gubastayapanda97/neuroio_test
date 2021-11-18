import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageUSRL] = useState(null);
  const [fileName, setFileName] = useState('');
  const [neuroioData, setNeuroioData] = useState(null);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setFileName(file.name);
      setImageUSRL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fetchNeuroio = async () => {
    const formData = new FormData();
    formData.append('image', image, fileName);
    const { data } = await axios({
      method: 'post',
      url: 'https://cors-anywhere.herokuapp.com/https://api.neuroio.com/v1/persons/search/',
      headers: {
        Authorization: `Token ${process.env.REACT_APP_NEUROIO_TOKEN}`,
      },
      data: formData,
    });
    setNeuroioData(data);
  };

  const onButtonClick = () => {
    fetchNeuroio();
  };

  return (
    <div className="App">
      <div className="HalfWidth">
        <input type="file" onChange={onImageChange} className="filetype" />
        {imageURL && (
          <button className="ImageSendBtn" onClick={onButtonClick}>
            Отправить фото в neuroio
          </button>
        )}
        <img
          src={imageURL}
          alt="Загрузите фото сотрудника"
          height={550}
          width={415}
        />
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

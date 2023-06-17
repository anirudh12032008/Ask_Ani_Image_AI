"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [imageText, setImageText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setImageText(response.data.text);
      setInputText(response.data.text);
    } catch (error) {
      console.error('Image OCR error:', error);
    }
  };
  const [model, setModel] = useState('text-davinci-003');

  const handleDropdownChange = (event) => {
    setModel(event.target.value);
  };


  const generateText = async () => {
    try {
      const response = await axios.post('/api/gpt', { prompt: inputText, model: model });
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Text generation error:', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 flex flex-col justify-between items-center">
      <h1 className="text-4xl text-white mb-8">Ask Ani </h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-lg text-white mb-2">Generated Text:</h3>
        <p className="text-white">{generatedText}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className='flex items-centre justify-center align-middle'>

        </div>
        <label htmlFor="chat" className="sr-only">Send A message</label>
        <div className="flex items-center flex-col px-3 py-2 rounded-lg bg-gray-800">
          <div className="bg-gray-800 flex items-center p-4 rounded-lg mb-4">
            <h3 className="text-lg text-white mr-2">Model:</h3>

            <select

              value={model}
              onChange={handleDropdownChange}
              className="p-2 text-white bg-gray-700 rounded"
            >
              <option value="text-davinci-003">text-davinci-003</option>
              <option value="text-ada-001">text-ada-001</option>
              <option value="davinci">davinci </option>
              <option value="davinci">davinci </option>
              <option value="code-davinci-002">code-davinci-002 </option>
              <option value="davinci">davinci </option>
              <option value="gpt-4">gpt-4 </option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo </option>
              <option value="text-curie-001">text-curie-001 </option>
              <option value="text-babbage-001">text-babbage-001 </option>
            </select>
          </div>
          <div className='flex  items-center'>

            <label htmlFor="imageUpload" className="cursor-pointer">

              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Upload image</span>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <textarea value={inputText} onChange={(event) => setInputText(event.target.value)} id="chat" rows="1" className="block mx-4 p-2.5 text-sm bg-gray-800 text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message...                       "   ></textarea>
            <button onClick={generateText} type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
              <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
          <div className="flex mb-2">
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;

// client/src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

const UserDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('Straight');

  useEffect(() => {
    axios.get(`/api/videos?category=${category}`).then((res) => {
      setVideos(res.data);
    });
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Video Categories</h1>
      <div className="flex gap-4">
        <button onClick={() => setCategory('Straight')}>Straight</button>
        <button onClick={() => setCategory('Gay')}>Gay</button>
        <button onClick={() => setCategory('Lesbian')}>Lesbian</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {videos.slice(0, 2).map((video) => (
          <VideoPlayer key={video._id} url={video.url} isFree={video.isFree} />
        ))}
      </div>
      <a href="https://wa.me/your-whatsapp-number">Contact Owner (WhatsApp)</a>
      <a href="https://t.me/your-telegram">Contact Owner (Telegram)</a>
    </div>
  );
};

export default UserDashboard;

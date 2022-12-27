import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTilte] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://posts.com/posts/create', { title });

    setTilte('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTilte(event.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;

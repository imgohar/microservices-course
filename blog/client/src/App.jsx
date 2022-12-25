import { React } from 'react';
import PostCreate from './PostCreate';
import PostLists from './PostLists';

const App = () => {
    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>Posts</h1>
            <PostLists />
        </div>
    );
};

export default App;

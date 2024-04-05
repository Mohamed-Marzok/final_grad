import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowAddPostForm } from '../../redux/UiInteractionSlice';
import { addPost } from '../../redux/addPostSlice';

const PostForm = () => {
    const postTittle = useRef(null);
    const postText = useRef(null);
    const dispatch = useDispatch();

    const handleAddPost = (e) => {
        e.preventDefault();

        const postInfo = {
            postName: postTittle,
            postText: postText,
        };

        dispatch(addPost(postInfo));
        dispatch(toggleShowAddPostForm());
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='max-w-lg w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
                <button className="absolute -top-2 right-0 m-2 text-gray-500 text-3xl" onClick={() => dispatch(toggleShowAddPostForm())}>X</button>
                <h1 className='text-2xl font-bold mb-6 text-center'>Add Post</h1>
                <form onSubmit={handleAddPost}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Post Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='text'
                            placeholder='Enter Post Tittle'
                            ref={postTittle}
                            // onChange={(e)=>setPostText(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Post Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='text'
                            placeholder='Enter Post Text'
                            ref={postText}
                            // onChange={(e)=>setPostText(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='flex justify-center'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;

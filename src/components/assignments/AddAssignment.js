import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowAddAssignmentForm } from '../../redux/UiInteractionSlice';

const AddAssignment = ({id}) => {
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const deadLineRef = useRef(null);
    const gradeRef = useRef(null);
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    const handleAddAssignment = async (e) => {
        e.preventDefault();
        
        const assignmentInfo = new FormData();
        assignmentInfo.append('Tittle', nameRef.current.value);
        assignmentInfo.append('Description', descriptionRef.current.value);
        assignmentInfo.append('Grade',gradeRef.current.value);
        assignmentInfo.append('EndDate', deadLineRef.current.value);
        assignmentInfo.append('File', fileRef.current.files[0]);

        try {
            const response = await fetch(`https://academix.runasp.net/api/Asignments/${id}`, {
                method: 'POST',
                body: assignmentInfo,
            });

            if (!response.ok) {
                throw new Error('Failed to add assignment');
            }

            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
        console.log(assignmentInfo);
        nameRef.current.value = '';
        fileRef.current.value = '';
        deadLineRef.current.value = '';
        descriptionRef.current.value = '';
        gradeRef.current.value = null;
        dispatch(toggleShowAddAssignmentForm());
    };    
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='max-w-lg w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
                <button className="absolute -top-2 right-0 m-2 text-gray-500 text-3xl" onClick={() => dispatch(toggleShowAddAssignmentForm())}>X</button>
                <h1 className='text-2xl font-bold mb-6 text-center'>Add Assignment</h1>
                <form onSubmit={handleAddAssignment}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Assignment Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='text'
                            placeholder='Enter Assignment Name'
                            ref={nameRef}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Assignment Description</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='text'
                            placeholder='Enter Assignment Description'
                            ref={descriptionRef}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Deadline</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='text'
                            placeholder='Enter Assignment Deadline'
                            ref={deadLineRef}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureName'>Assignment Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureName'
                            type='number'
                            placeholder='Enter Assignment Grade'
                            ref={gradeRef}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lectureFile'>Upload File</label>
                        <input
                            ref={fileRef}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='lectureFile'
                            type='file'
                            accept='.pdf, .doc, .docx, .ppt, .pptx'
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

export default AddAssignment;

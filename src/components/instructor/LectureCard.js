import React from 'react';

const LectureCard = ({ lecture }) => {
    console.log(lecture.endDate)
    if(!lecture) return;
    const { name, file } = lecture;
    
    const handleDownload = () => {
        const anchor = document.createElement('a');
        anchor.href = file; // Assuming file.url contains the file URL
        anchor.download = name; // Set the downloaded file name
        anchor.click(); // Trigger click event to initiate download
    };

    return (
        <div className='w-80 rounded-xl overflow-hidden shadow-md m-4 bg-white hover:shadow-lg cursor-pointer'>
            <div className="relative flex h-52 flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                <div className="p-6">
                    <h5 className="block mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900 text-center">
                        {name}
                    </h5>
                    <h1 className='text-center'>{lecture.endDate}</h1>
                    <p className=''>{lecture.describtion}</p>
                    <div className='mb-4 flex justify-center'>
                        <button className='bg-blue-500 absolute bottom-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleDownload}>
                            Download {lecture.endDate? 'Assignment' : 'Lecture'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LectureCard;

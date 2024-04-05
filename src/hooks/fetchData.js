import { useEffect, useState } from "react"

const FetchData = (api , id)=>{
        const [data,setData] = useState() 
        const fetchData = async ()=>{
            const response = await fetch(`${api}${id}`);
            const jsonResponse = await response.json();
            setData(jsonResponse);
            console.log(jsonResponse,'ll');
        }
        useEffect(()=>{
            fetchData();
        },[])
        return data;
}

export default FetchData;
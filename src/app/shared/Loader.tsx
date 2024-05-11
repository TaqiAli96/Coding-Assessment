import React, { useEffect, useState } from 'react'

const Loader = () => {
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        const text = 'Loading...';
        let index = 0;
        const interval = setInterval(() => {
            setLoadingText(prevText => prevText + text[index]);
            console.log(index)
            index++;
            if (index === text.length - 1) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", height: "100vh" }}>
            <div>
                <div className='loader'></div>
                <h5>{loadingText}</h5>
            </div>
        </div>
    )
}

export default Loader

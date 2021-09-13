import { useEffect, useState } from 'react'


const Link = () => {
    const [metaData, setMetaData] = useState({
        totalLinks: "",
        externalLinks: "",
        internalLinks:""
    });


    async function getData() {
        const response1 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d&order=published_at%20desc');


        const data = await response1.json();
        console.log(data);

        setMetaData(prevState => ({
            ...prevState,
            totalLinks: data.posts.filter(obj => obj.url != null).length + data.posts.filter(obj => obj.feature_image != null).length,
            externalLinks: data.posts.filter(obj => !obj.url.includes("https://ghost-blog.ipxp.in")).length + data.posts.filter(obj => !obj.feature_image.includes("https://ghost-blog.ipxp.in")).length,
            internalLinks: data.posts.filter(obj=>obj.url.includes("https://ghost-blog.ipxp.in")).length + data.posts.filter(obj=>obj.feature_image.includes("https://ghost-blog.ipxp.in")).length
        }));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="wrapper">
            <h1>Links</h1>
            <div className="grid-container-4">
                <div className="grid-item">
                    <div>
                    <h4>Total Number of Links</h4>
                        <p>{metaData.totalLinks}</p>
                    </div>
                    <div>
                    <h4>Total Number of External Links</h4>
                        <p>{metaData.externalLinks}</p>
                    </div>
                    <div>
                    <h4>Total Number of Internal Links</h4>
                        <p>{metaData.internalLinks}</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Link

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
        setMetaData(prevState => ({
            ...prevState,
            totalLinks: data.posts.filter(obj => obj.url != null).length + data.posts.filter(obj => obj.feature_image != null).length,
            externalLinks: data.posts.filter(obj => !obj.url.includes("https://ghost-blog.ipxp.in")).concat(data.posts.filter(obj => !obj.feature_image.includes("https://ghost-blog.ipxp.in"))),
            internalLinks: data.posts.filter(obj=>obj.url.includes("https://ghost-blog.ipxp.in")).concat(data.posts.filter(obj=>obj.feature_image.includes("https://ghost-blog.ipxp.in")))
        }));
    }

    const checkLinks = (links, containerArray) => {
        links.map((link) => {
            fetch(link).then(function (response) {
                if (!response.status < 300) {
                    containerArray.push(link);
                }
            }, function (error) {
                console.log(error.message);
            })
        })
    return containerArray   
    }

    let externalBrokenLinks = [];
    let internalBrokenLinks = [];
    if (metaData.externalLinks) {
        checkLinks(metaData.externalLinks, externalBrokenLinks);
    }

    if (metaData.internalLinks) {
        checkLinks(metaData.internalLinks, internalBrokenLinks);
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
                        <p>{metaData.externalLinks.length}</p>
                    </div>
                    <div>
                    <h4>Total Number of Internal Links</h4>
                        <p>{metaData.internalLinks.length}</p>
                        </div>
                </div>
                <div className="grid-item">
                <div>
                    <h4>List of Broken Internal Links</h4>
                        {
                            internalBrokenLinks.length > 0 ?
                            internalBrokenLinks.map((link) => (
                                <p>{link}</p>
                            )) :
                                <p>No broken links</p>
                                
                        }
                    </div>
                </div>
                <div className="grid-item">
                <div>
                    <h4>List of Broken External Links</h4>
                    {
                            externalBrokenLinks.length > 0 ?
                            externalBrokenLinks.map((link) => (
                                <p>{link}</p>
                            )) :
                                <p>No broken links</p>
                                
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Link

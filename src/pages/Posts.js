import { useEffect, useState } from 'react'
import List from '../components/List'


const Posts = () => {
    const [metaData, setMetaData] = useState({
        postWithoutMetaDescription: "",
        postWithTooLongMetaDescription: "",
        postWithTooLongURL: "",
        postWithoutFeatureImg: "",
        postTooShort: "",
        postTooLong: ""
    });

    async function getData() {
        const response1 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d&filter=meta_description:null');
        const response2 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d');


        const data = await response1.json();
        const data2 = await response2.json();

        console.log(data2);
        setMetaData(prevState => ({
            ...prevState,
            postWithoutMetaDescription: data.posts,
            postWithTooLongMetaDescription: data2.posts.filter(obj => obj.meta_description != null && obj.meta_description.length > 200),
            postWithTooLongURL: data2.posts.filter(obj => obj.url.length > 100),
            postWithoutFeatureImg: data2.posts.filter(obj => obj.feature_image === null),
            postTooShort: data2.posts.filter(obj => obj.excerpt.length < 250),
            postTooLong: data2.posts.filter(obj => obj.excerpt.length > 1500)
        }));
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="wrapper">
            <h1>Posts</h1>
            <div className="grid-container-4">
                <div className="grid-item">
                    <List title="List of Posts without Meta Description" data={metaData.postWithoutMetaDescription} />
                </div>
                <div className="grid-item">
                    {/* Have assumed that more than 200 characters is Too long. */}
                    <List title="Too long Meta Description" data={metaData.postWithTooLongMetaDescription} />

                </div>
                <div className="grid-item">
                    <List title="Too long URL" data={metaData.postWithTooLongURL} />
                </div>

                <div className="grid-item">
                    <List title="Post without Feature Image" data={metaData.postWithoutFeatureImg} />
                </div>

                <div className="grid-item">
                    <List title="Too Short Posts" data={metaData.postTooShort} />
                </div>

                <div className="grid-item">
                    <List title="Too Long Posts" data={metaData.postTooLong} />
                </div>
            </div>

        </div >
    )
}

export default Posts


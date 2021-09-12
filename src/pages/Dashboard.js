import { useEffect, useState } from 'react'
import Card from '../components/Card'

const Dashboard = () => {
    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        const response1 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d&order=published_at%20desc');
        const response2 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/authors/?key=8196190b08906dda0ebf6e6f5d');
        const response3 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/tags/?key=8196190b08906dda0ebf6e6f5d');

        const data = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        setMetaData(prevState => ({
            ...prevState,
            totalPost: data.meta.pagination.total,
            totalPages: data.meta.pagination.pages,
            totalAuthors: data2.authors.length,
            totalTags: data3.tags.length,
            latestPost: data.posts.slice(0, 5)
        }));
    }


    const [metaData, setMetaData] = useState({
        totalPost: '',
        totalPages: '',
        totalAuthors: '',
        totalTags: '',
        latestPost: ''
    });

    return (
        <div className="wrapper">
            <h1>Dashboard</h1>
            <div className="grid-container-4">
                <div className="grid-item">
                    <Card title="Total number of Posts" figure={metaData.totalPost} />
                </div>
                <div className="grid-item">
                    <Card title="Total number of Pages" figure={metaData.totalPages} />
                </div>
                <div className="grid-item">
                    <Card title="Total number of Authors" figure={metaData.totalAuthors} />
                </div>
                <div className="grid-item">
                    <Card title="Total number of Tags" figure={metaData.totalTags} />
                </div>
            </div>
            <div className="grid-container-2 mt-3">
                <div className="grid-item">
                    <div>
                        <h4>Latest 5 Published posts List</h4>
                        {
                            metaData.latestPost.length >= 1 &&
                            metaData.latestPost.map((obj, id) => (
                                <a key={id} rel="noreferrer" href={obj.url} target="_blank"><p className="mb-1">{obj.title}</p></a>
                            ))
                        }
                    </div>
                </div>
                <div className="grid-item">
                    <div>
                        <h4>Post per month</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

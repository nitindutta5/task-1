import { useEffect, useState } from 'react'
import Card from '../components/Card'


const Posts = () => {
    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        const response1 = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d&order=published_at%20desc');

        const data = await response1.json();
        console.log(data);
        setMetaData(prevState => ({
            ...prevState,
            totalPost: data.meta.pagination.total,
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
            <h1>Posts</h1>
            <div className="grid-container-4">
                <div className="grid-item">
                    <Card title="Total number of Posts" figure={metaData.totalPost} />
                </div>
              
            </div>

        </div>
    )
}

export default Posts


import { useEffect, useState } from 'react'
import Card from '../components/Card'
import List from '../components/List'
import { Bar } from 'react-chartjs-2'

const Dashboard = () => {
    const [metaData, setMetaData] = useState({
        totalPost: '',
        totalPages: '',
        totalAuthors: '',
        totalTags: '',
        latestPost: '',
        publishDates: ''
    });


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
            latestPost: data.posts.slice(0, 5),
            postDates: data.posts.map(obj => new Date(obj.published_at).getMonth())
        }));
    }

    // For finding out the unique key value from an array
    const counts = {};
    function countUnique(arr) {
        for (var i = 0; i < arr.length; i++) {
            counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        return counts;
    }

    // For creating an array dataSet for chart data
    let dataSet = [];
    const createDataSet = () => {
        for (let i = 1; i <= 12; i++) {
            if (!(i in counts)) {
                dataSet.push(0);
            }
            else {
                dataSet.push(counts[i]);
            }
        }
        return dataSet;
    }


    if (metaData.postDates) {
        countUnique(metaData.postDates);
        createDataSet();
    }


    useEffect(() => {
        getData();
    }, [])





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
                    <List title="Latest 5 Published posts List" data={metaData.latestPost} />
                </div>
                <div className="grid-item">
                    <div>
                        <h4>Posts per month</h4>
                        {
                            dataSet &&
                            <Bar
                                data={{
                                    // Name of the variables on x-axies for each bar
                                    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        {
                                            // Label for bars
                                            label: "posts/month",
                                            // Data or value of your each variable
                                            data: dataSet,
                                        },
                                    ],
                                }}
                                // Height of graph
                                height={100}
                                options={{
                                    maintainAspectRatio: true,
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

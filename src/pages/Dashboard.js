import { useEffect } from 'react'



const Dashboard = () => {
    useEffect(() => {
        async function getData() {
            const response = await fetch('https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d')
                .catch(error => {
                    alert(error)
                });
            const data = await response.json();
        }
        getData();
    }, [])

    return (
        <div className="wrapper">
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard

// https://ghost-blog.ipxp.in/ghost/api/v3/content/posts/?key=8196190b08906dda0ebf6e6f5d
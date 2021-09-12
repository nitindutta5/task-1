const List = ({title,data}) => {
    return (
        <div>
        <h4>{title}</h4>
        {
            data.length >= 1 &&
            data.map((obj, id) => (
                <a key={id} rel="noreferrer" href={obj.url} target="_blank"><p className="mb-1">{obj.title}</p></a>
            ))
        }
        {
            data.length === 0 &&
            <p>No Data Available</p>
        }
    </div>
    )
}

export default List
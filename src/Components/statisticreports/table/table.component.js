function Table() {
    // Static Data
    const DataTable = [
        {
            id: 1,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 2,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 3,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        }
    ]
    return (<table className="table">
        <thead>
            <tr>
                <th width="5%">#</th>
                <th width="25%">Empty</th>
                <th width="20%">Empty</th>
                <th width="20%">Empty</th>
            </tr>
        </thead>
        <tbody>
            {
                DataTable.map(data =>
                    <tr>
                        <th scope="row">{data.id}</th>
                        <td>{data.title}</td>
                        <td>{data.location}</td>
                        <td>{data.description}</td>
                    </tr>
                )
            }
        </tbody>
    </table>)
}

export default Table;
import React from 'react'

import './Database.css'

type DataItem = {
    [key: string]: string | number
}

type Props = {
    title: string
    data: DataItem[]
}

type DatabaseItemProps = {
    dataItem: DataItem
}

const DatabaseItem = ({ dataItem }: DatabaseItemProps) => (
    <tr>
        {Object.keys(dataItem).map((field) => (
            <td key={dataItem[field]}>{dataItem[field]}</td>
        ))}
    </tr>
)

const Database = ({ data, title }: Props): React.ReactElement => (
    <div className="Database">
        <table className="Database-table">
            <thead>
                <tr>
                    <th>{title}</th>
                </tr>
            </thead>
            {data.map((item) => (
                <DatabaseItem dataItem={item} />
            ))}
        </table>
    </div>
)

export default Database

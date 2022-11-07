// import { Badge } from 'antd';
// import { Button } from 'antd';
// import { useState } from 'react';
// import { openPopover } from './TableComponent';
import tableModule from './TableComponent.module.css'

export const subTableColumns = [
    {
        title: <p><b>Image</b></p>,
        dataIndex: 'image',
        key: 'image',
        // width: "10%",
        render: (image) => <>
            <img className={tableModule.tableImage} src={image} alt="" />
        </>
    },
    {
        title: <p><b>Title</b></p>,
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: <p><b>product Details</b></p>,
        dataIndex: 'details',
        key: 'details',
        render: (detail) => Object.keys(detail).map((key) => {
            return (<>
                <p><b>{key}</b>: {detail[key]}</p>
            </>)
        })
    },
    {
        title: <p><b>Inventory</b></p>,
        dataIndex: 'inventory',
        key: 'inventory',
    },
    {
        title: <p><b>Amazon Status</b></p>,
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: <p><b>Activity</b></p>,
        dataIndex: 'activity',
        key: 'activity',
    },
];
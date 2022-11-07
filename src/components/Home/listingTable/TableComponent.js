import React, { useCallback, useEffect, useState } from 'react'
import tableModule from './TableComponent.module.css'
import { Button, Card, Icon, Modal, Stack, Tabs, TextContainer } from '@shopify/polaris';
import useFetch from '../../../custom';
import { Badge, Popover, Table } from 'antd';
import UpdatedComponent from '../../withHooks';
import { subTableColumns } from './TableData'
import Header from './Header';
import { addTabsFilter, removeDrawerFiltersByTitle, removeSearchFilter, setCurrenTab, setDrawerFilters } from '../../../redux/listingSlice';
import {
    DiamondAlertMajor
} from '@shopify/polaris-icons';
import {
    ClockMajor
} from '@shopify/polaris-icons';
// import {
//     ClockMinor
//   } from '@shopify/polaris-icons';

function TableComponent(props) {

    const [selected, setSelected] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [modalTitle, setModalTitle] = useState()
    const modalMsg = {
        'Amazon Lookup': 'You can choose a number of products you want Amazon Lookup to run for and update your listings that are “Not Listed: Offer”.',
        'Sync Inventory': 'Do you want to proceed with syncing inventory of selected product(s) ?',
        'Sync Price': 'Do you want to proceed with syncing price of selected product(s) ?',
        'Sync Image': 'Do you want to proceed with syncing image of selected product(s) ?',
        'Sync Product': 'Do you want to upload the selected product(s) ?',
        'Delete Product': 'Do you want to delete the selected product(s) ?',
    }

    const tabsFilters = {
        'All': '',
        'Not Listed': 'filter[cif_amazon_multi_inactive][1]',
        'Inactive': 'filter[items.status][1]',
        'Incomplete': 'filter[items.status][1]',
        'Active': 'filter[items.status][1]',
        'Error': 'filter[cif_amazon_multi_activity][1]'
    }

    const handleTabChange = (selectedTabIndex) => {
        setFilters(prevState => ({ ...prevState, activity: myTabs[selectedTabIndex].title }))
        props.dispatch(setCurrenTab(myTabs[selectedTabIndex].title))
        setSelected(selectedTabIndex)
    }

    const [filters, setFilters] = useState({
        activity: 'All'
    })

    const { result, fetchData } = useFetch()

    const opt = {
        type: "GET",
        headers: {
            "Ced-Source-Id": 476,
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": 479,
            "Ced-Target-Name": "amazon",
            appCode: "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
            appTag: "amazon_sales_channel",
            Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg'
        },
        payload: {
            "source": {
                "marketplace": "shopify",
                "shopId": "507"
            },
            "target": {
                "marketplace": "amazon",
                "shopId": "509"
            },
            "count": 1,
        }
    }

    useEffect(() => {
        if (Object.keys(props.state.listing.selectedSuggestion).length === 0) {
            // var fetchUrl = "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?"
            if (filters.activity !== 'All') {
                // fetchUrl = fetchUrl + tabsFilters[filters.activity] + '=' + filters.activity;
                props.dispatch(setDrawerFilters(
                    {
                        filterObject: {
                            property: "Product status",
                            condition: "Equals",
                            value: filters.activity,
                            conditionValue: "1"
                        },
                        filterIndex: 6
                    }))
            }
            else {
                // alert(props.state.listing.drawerFilters[6].property)
                props.dispatch(removeDrawerFiltersByTitle(props.state.listing.drawerFilters[6].property))
            }
            //     (filters.activity === "Error")?props.dispatch(addTabsFilter({
            //         property: "Activity",
            //         condition: "equals",
            //         value: filters.activity
            //     })):props.dispatch(addTabsFilter({
            //         property: "Status",
            //         condition: "equals",
            //         value: filters.activity
            //     }))
            // }
            // else {
            //     props.dispatch(addTabsFilter({
            //         property: "Status",
            //         condition: "equals",
            //         value: filters.activity
            //     }))
            // }
            // console.log("url", fetchUrl)
            // fetchData("products", fetchUrl, opt)

        }
    }, [filters.activity])

    useEffect(() => {
        var url = "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
        fetchData("count", url, opt)
    }, [])





    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        // onChange: (selectedRowKeys, selectedRows) => {
        //     console.log("onChange")
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log("onSelect")
        //     console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log("onSelectAll")
        //     console.log(selected, selectedRows, changeRows);
        // },
    };

    const myTabs = [
        {
            id: 'all-products-1',
            title: 'All',
            content: <b>All</b>,
            accessibilityLabel: 'All products',
            panelID: 'all-products-content-1',
        },
        {
            id: 'not-listed-1',
            title: 'Not Listed',
            content: <><span style={{ margin: "0% 4%" }}><b>Not Listed</b></span><Badge count={props.state.listing.statusCount[Object.keys(props.state.listing.statusCount)[0]]} style={{ backgroundColor: "rgb(241, 248, 245, 1)", color: "black" }} /></>,
            panelID: 'not-listed-content-1',
        },
        {
            id: 'inactive-1',
            title: 'Inactive',
            content: <><span style={{ margin: "0% 4%" }}><b>Inactive</b></span><Badge count={props.state.listing.statusCount.Inactive} style={{ backgroundColor: "rgb(254, 211, 209, 1)", color: "black" }} /></>,
            panelID: 'inactive-content-1',
        },
        {
            id: 'incomplete-1',
            title: 'Incomplete',
            content: <><span style={{ margin: "0% 4%" }}><b>Incomplete</b></span><Badge count={(props.state.listing.statusCount.Incomplete === 0) ? "O" : props.state.listing.statusCount.Incomplete} style={{ backgroundColor: "rgb(255, 215, 157, 1)", color: "black" }} /></>,
            panelID: 'incomplete-content-1',
        },
        {
            id: 'active-1',
            title: 'Active',
            content: <><span style={{ margin: "0% 4%" }}><b>Active</b></span><Badge count={(props.state.listing.statusCount.Active === 0) ? "O" : props.state.listing.statusCount.Active} style={{ backgroundColor: "rgb(174, 233, 209, 1)", color: "black" }} /></>,
            panelID: 'active-content-1',
        },
        {
            id: 'error-1',
            title: 'Error',
            content: 'Error',
            panelID: 'error-content-1',
        },
    ];


    const handleModalChange = (option) => {
        if (option !== 'Edit Product') {
            setModalTitle(option)
            setModalActive(!modalActive)
        }

    };

    var renderContent = (data) => {
        var temp = data.options.map((item) => {
            return <>
                <p className={tableModule.popoverOption} onClick={() => handleModalChange(item)}>{item}</p>
            </>
        })
        return temp
    }

    var fetchBadge = (status) => {
        console.log(status)
        switch (status) {
            case "Active":
                return <div style={{ textAlign: "center" }}><Badge count={status} style={{ backgroundColor: "rgb(174 233 209)", color: "black" }}> </Badge></div>
            case "Not Listed: Offer":
                return <div style={{ textAlign: "center" }}><Badge count={status} style={{ backgroundColor: "rgb(228 229 231)", color: "black" }}> </Badge></div>
            case "Error":
                return <div style={{ textAlign: "center" }}><Badge count="Error" style={{ backgroundColor: "rgb(254, 157, 152, 1)", color: "black" }}></Badge></div>
            default:
                return <Badge>Default</Badge>
        }
    }

    const [errorModalActive, setErrorModalActive] = useState(false);
    const [errorModalDetails, setErrorModalDetails] = useState({})
    const [errorTabSelected, setErrorTabSelected] = useState(0);
    const [progressModalActive, setProgressModalActive] = useState(false)
    const [progressModalDetails, setProgressModalDetails] = useState([])

    const handleErrorTabChange = (selectedTabIndex) => setErrorTabSelected(selectedTabIndex)

    const errorTabsArray = [
        {
            id: 'product-error-id',
            title: 'PRODUCT',
            content: 'Product Errors',
            accessibilityLabel: 'product label',
            panelID: 'product-error-panel',
        },
        {
            id: 'variant-error-id',
            title: 'PRODUCT',
            content: 'Variant Errors',
            panelID: 'variant-error-panel',
        },
    ]
    // const handleChange = useCallback(() => setErrorModalActive(!errorModalActive), [errorModalActive]);
    // const activator = <Button onClick={handleChange}>Open</Button>;

    var openErrorModal = (statusObject) => {
        // console.log(statusObject)
        setErrorModalDetails({ ...statusObject })
        setErrorModalActive(!errorModalActive)
    }

    var openProgressModal = (record) => {
        // alert()
        console.log(record)
        setProgressModalDetails(record)
        setProgressModalActive(!progressModalActive)
    }

    const tableColumns = [
        {
            title: <p><b>Image</b></p>,
            dataIndex: 'image',
            key: 'image',
            width: '12.5%',
            render: (image) => <>
                <img className={tableModule.tableImage} src={image} alt="" />
            </>
        },
        {
            title: <p><b>Title</b></p>,
            dataIndex: 'title',
            key: 'title',
            width: '12.5%',
        },
        {
            title: <p><b>Product Details</b></p>,
            dataIndex: 'details',
            key: 'details',
            width: '12.5%',
            render: (detail) => Object.keys(detail).map((key) => {
                return (<>
                    <p><b>{key}</b>: {detail[key]}</p>
                </>)
            })
        },
        {
            title: <p><b>Template</b></p>,
            dataIndex: 'template',
            key: 'template',
            width: '12.5%',
        },
        {
            title: <p><b>Inventory</b></p>,
            dataIndex: 'inventory',
            key: 'inventory',
            width: '12.5%',
            render: (stock) => {
                return (<>
                    {stock.inStock} in stock {(stock.variants !== null) ? `for ${stock.variants} variants` : ''}
                </>)
            }
        },
        {
            title: <p><b>Amazon Status</b></p>,
            dataIndex: 'status',
            key: 'status',
            width: '12.5%',
            render: (record) => {
                console.log("render", record)
                return (
                    <>
                        {fetchBadge(record.status)}
                        {(record.status === "Error") ? <p className={tableModule.viewErrorlink} onClick={() => openErrorModal(record)}>View Error</p> : ''}
                    </>
                )
            }
        },
        {
            title: <p><b>Activity</b></p>,
            dataIndex: 'activity',
            key: 'activity',
            width: '12.5%',
            render: (record) => {
                return (
                    <>
                        {(record.length > 0) ? <Stack>
                            <Icon
                                source={ClockMajor}
                                color="base"
                            />
                            <p className={tableModule.progressLabel} onClick={() => openProgressModal(record)}>In Progress</p>
                        </Stack> : '--'}
                    </>
                )
            }
        },
        {
            title: <p><b>Actions</b></p>,
            dataIndex: 'action',
            key: 'action',
            width: '12.5%',
            render: (data) => {
                return <>
                    <Popover content={renderContent(data)} trigger="click">
                        <Button><i class="fa-solid fa-ellipsis-vertical"></i></Button>
                    </Popover>
                </>
            }
        },
    ];

    const removeSearchFilterHandler = (filter) => {
        props.dispatch(removeSearchFilter(filter))
        var url = 'https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts'
        fetchData("products", url, opt)
    }

    return (
        <div className={tableModule.entireTableContainer}>
            <Card>
                <Tabs tabs={myTabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section>
                        <Header />
                        <div className={tableModule.appliedFiltersContainer}>
                            {props.state.listing.filtersApplied.map((filter) => {
                                return (
                                    (filter.value === 'All') ? '' : <p>{filter.property} {filter.condition} {filter.value} <span className={tableModule.closeAppliedFilter} onClick={() => removeSearchFilterHandler(filter)}><i class="fa-solid fa-xmark"></i></span></p>
                                )
                            })}
                        </div>
                        <div className={tableModule.tableContainer}>
                            <Table expandable={{
                                expandedRowRender: (record) => (
                                    <div
                                        style={{
                                            margin: 0,
                                            paddingLeft: "35px",
                                        }}
                                    >
                                        <Table
                                            columns={subTableColumns}
                                            dataSource={record.description}
                                            rowSelection={rowSelection}
                                            scroll={{ x: true }}
                                            className={tableModule.subTable}
                                        // childrenColumnName="children
                                        />
                                    </div>
                                ),
                                rowExpandable: (record) => record?.description?.length > 0
                            }}
                                columns={tableColumns}
                                rowSelection={{
                                    ...rowSelection,
                                }}
                                dataSource={props.state.listing.tableData}
                                bordered
                                scroll={{ x: true }}
                                loading={props.state.listing.tableSpinner}
                            />
                        </div>
                    </Card.Section>
                </Tabs>
            </Card>
            <Modal
                // activator={activator}
                open={modalActive}
                onClose={handleModalChange}
                title={<b>{modalTitle}</b>}
                primaryAction={{
                    content: 'Start',
                    onAction: handleModalChange,
                }}
            >
                <Modal.Section>
                    <TextContainer>
                        <p style={{ fontWeight: "bolder" }}>
                            {modalMsg[modalTitle]}
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Modal
                // activator={activator}
                open={errorModalActive}
                onClose={openErrorModal}
                title="Error"
                primaryAction={{
                    content: <b>Fix Errors</b>,
                    onAction: openErrorModal,
                }}
            // secondaryActions={[
            //     {
            //         content: 'Learn more',
            //         onAction: openErrorModal,
            //     },
            // ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>Errors</p>
                        <Tabs tabs={errorTabsArray} selected={errorTabSelected} onSelect={handleErrorTabChange}>
                            <Card.Section>
                                {(Object.keys(errorModalDetails).length > 0) ? errorModalDetails?.statusMsg?.map((item) => {
                                    return (
                                        <Stack>
                                            <Icon
                                                source={DiamondAlertMajor}
                                                color="base"
                                            />
                                            <p>{item}</p>
                                        </Stack>
                                    )
                                }) : ''}
                            </Card.Section>
                        </Tabs>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Modal
                // activator={activator}
                open={progressModalActive}
                onClose={openProgressModal}
                title="In Progress"
                primaryAction={{
                    content: 'Start',
                    onAction: openProgressModal,
                }}
            >
                <Modal.Section>
                    <TextContainer>
                        <div>
                            {(progressModalDetails.length > 0) ? progressModalDetails.map((item) => {
                                return (
                                    <p>{item}</p>
                                )
                            }) : ''}
                        </div>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    )
}

export default UpdatedComponent(TableComponent)
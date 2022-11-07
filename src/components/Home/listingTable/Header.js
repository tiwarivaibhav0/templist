import { Autocomplete, Button, Filters, Icon } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import tableModule from './TableComponent.module.css'
import { SearchMinor } from '@shopify/polaris-icons';
import UpdatedComponent from '../../withHooks';
import { addSearchFilter, addTabsFilter, setDrawerFilters, setSelectedSuggestion, toggleSearchSpinner } from '../../../redux/listingSlice';
import useFetch from '../../../custom';
import FiltersComponent from './FiltersComponent';

function Header(props) {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [matchedProperty, setMatchedProperty] = useState()
    const { result, fetchData } = useFetch()
    const tabsFilters = {
        'All': '',
        'Not Listed': 'filter[cif_amazon_multi_inactive][1]',
        'Inactive': 'filter[items.status][1]',
        'Incomplete': 'filter[items.status][1]',
        'Active': 'filter[items.status][1]',
        'Error': 'filter[cif_amazon_multi_activity][1]'
    }

    const [options, setOptions] = useState([]);
    var searchURL = ``

    const updateText = (value) => {
        setOptions([])
        props.dispatch(toggleSearchSpinner(true))
        var tempArray = []
        setInputValue(value);
        if (value !== '') {
            if (window.controller) {
                window.controller.abort()
            }

            window.controller = new AbortController()
            var signal = window.controller.signal;

            searchURL = `https://multi-account.sellernext.com/home/public/connector/product/getSearchSuggestions?query=${value}`

            setTimeout(() => {
                fetch(searchURL, {
                    type: "GET",
                    signal: signal,
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
                })
                    .then(res => res.json())
                    .then(temp => {
                        temp.data.map((eachSuggestion) => {
                            eachSuggestion.items.map((eachItem) => {
                                if (eachItem.title.includes(value) || eachSuggestion.brand.includes(value) || eachSuggestion.product_type.includes(value)) {

                                    //to check which property matched with the entered string
                                    var tempProperty = (eachItem.title.includes(value) ? "Title" : (eachSuggestion.brand.includes(value) ? "Brand" : "Product Type"))
                                    setMatchedProperty(tempProperty)

                                    tempArray.push({
                                        value: {
                                            title: eachItem.title,
                                            image: eachItem.main_image,
                                            brand: eachSuggestion.brand,
                                            source_product_id: eachItem.source_product_id,
                                            container_id: eachSuggestion.container_id
                                        },
                                        label: <div className={tableModule.suggestionDiv}>
                                            <div className={tableModule.suggestionImageDiv}>
                                                <img src={eachItem.main_image} alt="" />
                                            </div>
                                            <div className={tableModule.suggestionDetailsDiv}>
                                                <p className={tableModule.suggestionTitle}>{eachItem.title}</p>
                                                <p className={tableModule.suggestionBrand}><b>Brand:</b>{eachSuggestion.brand}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            })
                        })
                        props.dispatch(toggleSearchSpinner(false))
                        if (tempArray.length === 0) {
                            tempArray.push({ label: <p style={{ margin: "0%" }}><i class="fa-solid fa-magnifying-glass"></i>No Data Found</p>, value: "No Data Found" })
                            setOptions([...tempArray])
                        }
                        else {
                            setOptions([...tempArray])
                        }
                    })
            }, 2000)
        }
        else {
            setOptions([])
            props.dispatch(setSelectedSuggestion({}))
        }
    }

    const updateSelection = useCallback(
        (selected) => {
            // console.log(selected)
            // console.log(selected[matchedProperty])
            if (selected[0] !== "No Data Found") {
                setSelectedOptions(selected);
                props.dispatch(setSelectedSuggestion(selected[0]))
                setInputValue(selected[0].title)

                props.dispatch(addSearchFilter({
                    property: matchedProperty,
                    condition: "includes",
                    value: selected[0].title
                }))
            }
        },
        [options],
    );

    useEffect(() => {

        var suggestionURL = ``
        if (Object.keys(props.state.listing.selectedSuggestion).length > 0) {
            if (props.state.listing.currentTab === 'All') {
                suggestionURL = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?filter[container_id][1]=${props.state.listing.selectedSuggestion.container_id}`
                fetchData("suggestion", suggestionURL, {
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
                })
            }
            else {
                props.dispatch(setDrawerFilters(
                    {
                        filterObject: {
                            property: "Product status",
                            condition: "Equals",
                            value: props.state.listing.currentTab,
                            conditionValue: "1"
                        },
                        filterIndex: 6
                    }))

                // suggestionURL = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?filter[container_id][1]=${props.state.listing.selectedSuggestion.container_id}&${tabsFilters[props.state.listing.currentTab]}=${props.state.listing.currentTab}`
            }


            // props.dispatch(addTabsFilter({
            //     property: (props.state.listing.currentTab === "Error") ? "Activity" : "Status",
            //     condition: "equals",
            //     value: props.state.listing.currentTab
            // }))
        } else {
            // var suggestionURL2 = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts`

            // fetchData("suggestion", suggestionURL2, {
            //     type: "GET",
            //     headers: {
            //         "Ced-Source-Id": 476,
            //         "Ced-Source-Name": "shopify",
            //         "Ced-Target-Id": 479,
            //         "Ced-Target-Name": "amazon",
            //         appCode: "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
            //         appTag: "amazon_sales_channel",
            //         Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg'
            //     },
            //     payload: {
            //         "source": {
            //             "marketplace": "shopify",
            //             "shopId": "507"
            //         },
            //         "target": {
            //             "marketplace": "amazon",
            //             "shopId": "509"
            //         },
            //         "count": 1,
            //     }
            // })
            // setInputValue()
        }
    }, [props.state.listing.selectedSuggestion, props.state.listing.currentTab])


    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            value={inputValue}
            prefix={<Icon source={SearchMinor} color="base" />}
            placeholder="Search with Title, Vendor, or Product Type"
        />
    );

    return (
        <div className={tableModule.panelHeader}>
            <div className={tableModule.headerFirst}>
                <div className={tableModule.searchDiv}>
                    <Autocomplete
                        options={options}
                        selected={selectedOptions}
                        onSelect={updateSelection}
                        textField={textField}
                        loading={props.state.listing.searchSpinner}
                    />
                </div>
                {/* <Button>More Filters</Button> */}
                <FiltersComponent />
            </div>
            <div className={tableModule.headerSecond}>
                <Button>Sync Status</Button>
                <Button>Amazon Lookup</Button>
                {/* <Button>Bulk Update</Button> */}
            </div>
        </div>
    )
}

export default UpdatedComponent(Header)
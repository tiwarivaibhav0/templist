import React, { useEffect } from 'react'
import tableModule from './TableComponent.module.css'
import {
    Filters,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import useFetch from '../../../custom';
import SelectComponent from './SelectComponent';
import TextFieldComponent from './TextFieldComponent';
import UpdatedComponent from '../../withHooks';
import { removeAllFilters, removeDrawerFiltersByTitle } from '../../../redux/listingSlice';

function FiltersComponent(props) {
    const [allFilters, setAllFilters] = useState()
    const [drawerRender, setDrawerRender] = useState([])
    const { result, fetchData } = useFetch()

    var filter_opt = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            "Ced-Source-Id": 476,
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": 479,
            "Ced-Target-Name": "amazon",
            appCode: "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
            appTag: "amazon_sales_channel",
            Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg'
        },
        body: JSON.stringify({
            "target_marketplace": "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
            "source": {
                "shopId": "476",
                "marketplace": "shopify"
            }
        }),
    }


    var skuOptions = [
        { label: "Equals", value: "1" },
        { label: "Not Equals", value: "2" },
        { label: "Contains", value: "3" },
        { label: "Does Not Contain", value: "4" },
        { label: "Starts With", value: "5" },
        { label: "Ends With", value: "6" },
    ]

    var vendorOptions = [
        { label: "Equals", value: "1" },
        { label: "Not Equals", value: "2" }
    ]

    var quantityOptions = [
        { label: "Equals", value: "1" },
        { label: "Not Equals", value: "2" },
        { label: "Greater than equal to", value: "8" },
        { label: "Less than equal to", value: "9" },
    ]

    var selectRender = (filter, index) => {
        var render = ''
        if (filter.title === 'Vendor') {
            render = <>
                <SelectComponent filter={filter} index={index} options={vendorOptions} role="conditionSelect" />
                <SelectComponent filter={filter} index={index} options={filter.options} role="valueSelect" />
            </>
        }
        else {
            render = <>
                <SelectComponent filter={filter} index={index} options={filter.options} role="valueSelect" />
            </>
        }

        return render
    }



    var textFieldRender = (filter, index) => {
        var render = ''
        if (filter.title === 'Sku') {
            render = <>
                <SelectComponent filter={filter} index={index} options={skuOptions} role="conditionSelect" />
                <TextFieldComponent filter={filter} index={index} role="valueSelect" />
            </>
        }
        else if (filter.title === 'Quantity') {
            render = <>
                <SelectComponent filter={filter} index={index} options={quantityOptions} role="conditionSelect" />
                <TextFieldComponent filter={filter} index={index} role="valueSelect" />
            </>
        }
        else {
            render = <>
                <TextFieldComponent filter={filter} index={index} role="valueSelect" />
            </>
        }

        return render
    }

    // const [drawerFilters, setDrawerFilters] = useState([Array(8)])

    useEffect(() => {
        var tempObj = {}
        var tempArray = []
        var fetchAllFilters = "https://multi-account.sellernext.com/home/public/connector/source/getFilterAttributes"

        fetch(fetchAllFilters, filter_opt)
            .then(res => res.json())
            .then(temp => {
                if (temp.success === true) {
                    temp.data.map((eachFilter, index) => {
                        tempObj = {
                            key: eachFilter.code,
                            label: <b>{eachFilter.title}</b>,
                            filter: (Object.keys(eachFilter).includes("options") ? selectRender(eachFilter, index) : textFieldRender(eachFilter, index)),
                            shortcut: true
                        }
                        tempArray.push(tempObj)
                    })
                    setDrawerRender([...tempArray])
                    setAllFilters([...temp.data])
                }
            })
    }, [])

    // var filterFetch = {}

    const tabsFilters = {
        'All': '',
        'Not Listed': 'filter[cif_amazon_multi_inactive][1]',
        'Inactive': 'filter[items.status][1]',
        'Incomplete': 'filter[items.status][1]',
        'Active': 'filter[items.status][1]',
        'Error': 'filter[cif_amazon_multi_activity][1]',
        'Uploaded': 'filter[items.status][1]',
        'Available for Offer': 'filter[items.status][1]'
    }

    var fetchAppend = (item) => {
        var appendString = ''
        var filterFetch = {
            "Title": "",
            "Tags": "&filter[tags][3]",
            "Type": "&filter[type][1]",
            "Price": "",
            "Sku": `&filter[items.sku][${item.conditionValue}]`,
            "Quantity": `&filter[items.quantity][${item.conditionValue}]`,
            "Product status": (Object.keys(props.state.listing.selectedSuggestion).length > 0) ? `&filter[container_id][1]=${props.state.listing.selectedSuggestion.container_id}&${tabsFilters[item.value]}` : `&${tabsFilters[item.value]}`,
            "Variant attributes": `&filter[variant_attributes][1]`,
            "Collections": ``,
            "Product Type": `&filter[product_type][3]`,
            "Vendor": `&filter[brand][${item.conditionValue}]`
        }
        appendString = filterFetch[item.property]
        return appendString
    }

    var fetchValue = (item) => {
        var value = ''
        if (item.value === "Error") {
            value = item.value.toLowerCase()
        }
        else {
            value = item.value
        }
        return value
    }

    useEffect(() => {
        if (window.controller) {
            window.controller.abort()
        }

        window.controller = new AbortController()
        var signal = window.controller.signal;
        var filterURL = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?count=50`
        props.state.listing.drawerFilters.map((item) => {
            if (Object.keys(item).length > 0) {
                if (item.value !== '' && item.property !== 'Title' && item.property !== 'Price' && item.property !== 'Collections') {
                    filterURL = filterURL + fetchAppend(item) + '=' + fetchValue(item)
                }
                else {

                }
            }
        })
        fetchData("filterResults", filterURL, {
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

    }, [props.state.listing.drawerFilters])



    const [accountStatus, setAccountStatus] = useState(null);
    const [moneySpent, setMoneySpent] = useState(null);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);

    const handleAccountStatusChange = useCallback(
        (value) => setAccountStatus(value),
        [],
    );
    const handleMoneySpentChange = useCallback(
        (value) => setMoneySpent(value),
        [],
    );
    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleAccountStatusRemove = useCallback(
        () => setAccountStatus(null),
        [],
    );
    const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
   

    const handleFiltersClearAll = () => {
        props.dispatch(removeAllFilters())
    }

    var removeAppliedFilter = (filter) => {
        props.dispatch(removeDrawerFiltersByTitle(filter))
    }

    const appliedFilters = [];

    props.state.listing.drawerFilters.map((eachFilter) => {
        if (Object.keys(eachFilter).length > 0) {
            const key = eachFilter.property
            appliedFilters.push({
                key,
                label: disambiguateLabel(key, eachFilter),
                onRemove: removeAppliedFilter
            })
        }
    })

    function disambiguateLabel(key, filter) {
        return `${key} ${filter.condition} ${filter.value}`
    }


    return (
        <>
            <Filters
                queryValue={queryValue}
                filters={drawerRender}
                appliedFilters={appliedFilters}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
                onClearAll={handleFiltersClearAll}
                hideQueryField
            />
        </>
    )
}

export default UpdatedComponent(FiltersComponent)
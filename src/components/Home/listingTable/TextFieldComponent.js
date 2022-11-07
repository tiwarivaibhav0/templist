import { TextField } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeDrawerFilters, setDrawerFilters } from '../../../redux/listingSlice'

export default function TextFieldComponent(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [textInput, setTextInput] = useState()

    var selectOptions = {
        "Sku": [
            { label: "Equals", value: "1" },
            { label: "Not Equals", value: "2" },
            { label: "Contains", value: "3" },
            { label: "Does Not Contain", value: "4" },
            { label: "Starts With", value: "5" },
            { label: "Ends With", value: "6" },
        ],
        "Vendor": [
            { label: "Equals", value: "1" },
            { label: "Not Equals", value: "2" }
        ],
        "Quantity": [
            { label: "Equals", value: "1" },
            { label: "Not Equals", value: "2" },
            { label: "Greater than equal to", value: "8" },
            { label: "Less than equal to", value: "9" },
        ]
    }

    var handleTextFieldChange = (value) => {
        setTextInput(value)
        if (value !== '') {
            // window.controller = new AbortController()
            // var signal = window.controller.signal;

            dispatch(setDrawerFilters({
                filterObject: {
                    property: props.filter.title,
                    condition: (Object.keys(state.listing.drawerFilters[props.index]).includes("condition")?state.listing.drawerFilters[props.index].condition: 'Equals'),
                    value: value,
                    conditionValue: (Object.keys(state.listing.drawerFilters[props.index]).includes("condition"))?fetchConditionValue(state.listing.drawerFilters[props.index].condition): "1"
                },
                filterIndex: props.index
            }))
        }
        else {
            dispatch(removeDrawerFilters(props.index))
        }
    }

    var fetchConditionValue=()=>{
        var conditionValue = ''
        if(props.filter.title !== 'Sku' && props.filter.title !== 'Vendor' && props.filter.title !== 'Quantity') {
            conditionValue = "1"
        }
        else {
            selectOptions[props.filter.title].map((item)=> {
                if(item.label === state.listing.drawerFilters[props.index].condition) {
                    conditionValue = item.value
                }
            })
        }
        return conditionValue
    }

    // useEffect(()=> {
    //     var url = `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?`

    // }, [props.state.listing.drawerFilters])

    return (
        <TextField
            disabled={(props.filter.title === 'Title' || props.filter.title === 'Price')?true:false}
            placeholder='enter value'
            onChange={handleTextFieldChange}
            value={state.listing.drawerFilters[props.index].value}
        />
    )
}

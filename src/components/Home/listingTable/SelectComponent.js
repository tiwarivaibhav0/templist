import { Select } from '@shopify/polaris'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerFilters } from '../../../redux/listingSlice'
import tableModule from './TableComponent.module.css'

function SelectComponent(props) {


    const state = useSelector(state => state)
    const dispatch = useDispatch()

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

    var fetchCondition = (filter, value) => {
        var condition = ''
        selectOptions[filter.title].map((item) => {
            if (item.value === value) {
                condition = item.label
            }
        })
        return condition
    }

    var fetchConditionValue = (checkValue) => {
        // alert(props.filter.title)
        var conditionValue = ''
        if (props.filter.title !== 'Sku' && props.filter.title !== 'Vendor' && props.filter.title !== 'Quantity') {
            conditionValue = "1"
        }
        else {
            selectOptions[props.filter.title].map((item) => {
                if (item.label === checkValue) {
                    conditionValue = item.value
                }
            })
        }
        return conditionValue
    }

    var handleConditionChange = (value) => {
        // console.log("condition Selected", props.filter, props.index, value)
        dispatch(setDrawerFilters(
            {
                filterObject: {
                    property: props.filter.title,
                    condition: fetchCondition(props.filter, value),
                    value: (Object.keys(state.listing.drawerFilters[props.index]).includes("value") ? state.listing.drawerFilters[props.index].value : ''),
                    conditionValue: fetchConditionValue(fetchCondition(props.filter, value))
                },
                filterIndex: props.index
            }))
    }

    var handleValueChange = (value) => {
        // console.log("value selected", props.filter, props.index, value)
        dispatch(setDrawerFilters(
            {
                filterObject: {
                    property: props.filter.title,
                    condition: (Object.keys(state.listing.drawerFilters[props.index]).includes("condition") ? state.listing.drawerFilters[props.index].condition : 'Equals'),
                    value: value,
                    conditionValue: (Object.keys(state.listing.drawerFilters[props.index]).includes("condition")) ? fetchConditionValue(state.listing.drawerFilters[props.index].condition) : "1"
                },
                filterIndex: props.index
            }))
    }

    var fetchSelectValue = () => {
        var value = ''
        selectOptions[props.filter.title].map((item) => {
            if (item.label === state.listing.drawerFilters[props.index]?.condition) {
                value = item.value
            }
        })
        return value
    }

    //to change the option value from 'Not_listed' to 'Not Listed'
    var fetchStatusOptions = () => {
        var tempOptions = [...props.options]
        tempOptions.map((item) => {
            if (item.label === "Not Listed") {
                item.value = "Not Listed"
            }
        })
        return tempOptions
    }

    var fetchTypeOptions=()=> {
        var tempOptions = [...props.options]
        tempOptions.map((item)=> {
            item.value = item.value.toLowerCase()
        })
        return tempOptions
    }

    return (
        <div className={tableModule.drawerSelect}>
            <Select
                disabled={(props.filter.title === "Collections")?true:false}
                placeholder='Choose...'
                options={(props.filter.title === "Product status") ? fetchStatusOptions() : (props.filter.title === "Type")?fetchTypeOptions():props.options}
                onChange={(props.role === "conditionSelect") ? handleConditionChange : handleValueChange}
                value={(props.role === "conditionSelect") ? fetchSelectValue() : state.listing.drawerFilters[props.index]?.value}
            />
        </div>
    )
}

export default SelectComponent

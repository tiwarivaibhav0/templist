import { createSlice } from "@reduxjs/toolkit"
import { Badge } from "antd"
import { tableModule } from '../components/Home/listingTable/TableComponent.module.css'

const initialState = {
    loginCredentials: {
        userName: '',
        password: ''
    },
    tableSpinner: false,
    searchSpinner: false,
    currentTab: 'All',
    refinedProducts: {},
    tableData: [],
    statusCount: {
        'Not Listed': 0,
        'Inactive': 0,
        'Incomplete': 0,
        'Active': 0
    },
    selectedSuggestion: {},
    // filtersApplied: [{
    //     property: "Status",
    //     condition: "Equals",
    //     value: "All"
    // }],
    filtersApplied: [],
    drawerFilters: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}

var addActions = (id, type) => {
    var popupRender = {
        options: (type === 'Not Listed' || type === 'Not Listed: Offer') ? ["Edit Product", "Amazon Lookup"] : ["Edit Product", "Amazon Lookup", "Sync Inventory", "Sync price", "Sync Image", "Sync Product", "Delete Product"],
        id: id
    }
    return popupRender

}

var fetchSum = (mainProduct) => {
    var quantitySum = 0
    mainProduct.items.map((each) => {
        if (each.source_product_id !== mainProduct.container_id) {
            quantitySum += parseInt(each.quantity)
        }
    })
    return quantitySum
}

var fetchStatus = (mainProduct) => {
    var flag = ''
    var tempObj = {}
    mainProduct.items.map((eachSub) => {
        if (Object.keys(eachSub).includes("error") && eachSub.source_product_id === mainProduct.container_id) {
            flag = "Error"
            tempObj = {
                status: "Error",
                statusMsg: eachSub.error.product,
                id: eachSub.source_product_id
            }
        }
    })
    if (flag === 'Error') {
        // return <Badge count="Error" style={{ backgroundColor: "rgb(254, 157, 152, 1)", color: "black" }}></Badge>
        return { ...tempObj }
    }
    else {
        var elseFlag = ''
        mainProduct.items.map((eachSub) => {

            if (Object.keys(eachSub).includes("status") && eachSub.source_product_id !== mainProduct.container_id) {
                var myCount = 0
                mainProduct.items.map((reCheckItem) => {
                    if (Object.keys(reCheckItem).includes("status") && (reCheckItem.status === eachSub.status && reCheckItem.source_product_id !== mainProduct.container_id)) {
                        myCount += 1;
                        // console.log(reCheckItem.title, myCount)
                    }
                })

                if (myCount === mainProduct.items.length - 1) {
                    // elseFlag = <Badge count={eachSub.status} style={{ backgroundColor: "rgb(254, 211, 209, 1)", color: "black" }}></Badge>
                    elseFlag = {
                        status: eachSub.status,
                        statusMsg: '',
                        id: mainProduct.container_id
                    }
                }
            }
        })
        if (elseFlag === '') {
            var elseFlagException = ''
            mainProduct.items.map((eachSub) => {
                if (eachSub.status === undefined) {
                    // elseFlag = <Badge count="Not Listed" style={{ backgroundColor: "rgb(241, 248, 245, 1)", color: "black" }}></Badge>
                    elseFlagException = {
                        status: "Some Items are Listed",
                        statusMsg: '',
                        id: mainProduct.container_id
                    }
                }
                else if (eachSub.status === 'Not Listed: Offer') {
                    // elseFlagException = <Badge count="Not Listed: Offer" style={{ backgroundColor: "rgb(228, 229, 231, 1)", color: "black" }}></Badge>
                    elseFlagException = {
                        status: "Not Listed: Offer",
                        statusMsg: '',
                        id: mainProduct.container_id
                    }
                }
            })
            if (elseFlagException !== '') {
                elseFlag = elseFlagException
            }
        }
        return elseFlag
    }
}

var fillChildren = (mainProduct) => {
    var tempArray = []
    mainProduct.items.map((myItem) => {
        if (myItem.source_product_id !== mainProduct.container_id) {
            tempArray.push({
                key: myItem.source_product_id,
                image: myItem.main_image,
                title: myItem.title,
                details: {
                    price: myItem.price,
                    sku: myItem.sku,
                    barcode: myItem.barcode,
                    asin: Object.keys(myItem).includes('asin') ? myItem.asin : 'N/A',
                },
                inventory: myItem.quantity,
                status: (Object.keys(myItem).includes('error') ? <Badge count="Error" style={{ backgroundColor: "rgb(254, 157, 152, 1)", color: "black" }}></Badge> : (Object.keys(myItem).includes('status')) ? myItem.status : <Badge count="Not Listed" style={{ backgroundColor: "rgb(241, 248, 245, 1)", color: "black" }}></Badge>),
                activity: (Object.keys(myItem).includes('process_tags')) ? myItem.process_tags : "--",
            })
        }
    })
    return tempArray
}

var countVariants = (mainProduct) => {
    var count = 0
    mainProduct.items.map((each) => {
        if (each.source_product_id !== mainProduct.container_id) {
            count++
        }
    })
    return count
}


export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        saveLoginCredentials: (state, action) => {
            state.loginCredentials.userName = action.payload.userName
            state.loginCredentials.password = action.payload.password
        },
        storeRefinedProducts: (state, action) => {
            state.refinedProducts = { ...action.payload }
        },
        storeTableData: (state, action) => {
            var tempArray = []
            var tempObj = {}

            action.payload.data.rows.map((mainProduct) => {
                //products with simple type
                if (mainProduct.items.length === 1) {
                    tempObj = {
                        key: mainProduct.items[0].source_product_id,
                        image: mainProduct.items[0].main_image,
                        title: mainProduct.items[0].title,
                        details: {
                            price: mainProduct.items[0].price,
                            sku: mainProduct.items[0].sku,
                            barcode: mainProduct.items[0].barcode,
                            asin: Object.keys(mainProduct.items[0]).includes('asin') ? mainProduct.items[0].asin : 'N/A',
                        },
                        template: (Object.keys(mainProduct).includes("profile") ? mainProduct.profile.profile_name : "N/A"),
                        inventory: {
                            inStock: mainProduct.items[0].quantity,
                            variants: null
                        },
                        status: ((Object.keys(mainProduct.items[0]).includes("error")) ? { status: "Error", statusMsg: mainProduct.items[0].error.product, id: mainProduct.items[0].source_product_id } : Object.keys(mainProduct.items[0]).includes("status") ? { status: mainProduct.items[0].status, statusMsg: [], id: mainProduct.items[0].source_product_id } : { status: "Not Listed", statusMsg: [], id: mainProduct.items[0].source_product_id }),
                        activity: (Object.keys(mainProduct.items[0]).includes('process_tags')) ? mainProduct.items[0].process_tags : [],
                        // action: ["Edit Product", "Amazon Lookup"]
                        // action: addActions(mainProduct.items[0].source_product_id, "Not Listed"),
                        action: ((Object.keys(mainProduct.items[0]).includes("error")) ? addActions(mainProduct.items[0].source_product_id, "others") : Object.keys(mainProduct.items[0]).includes("status") ? addActions(mainProduct.items[0].source_product_id, mainProduct.items[0].status) : addActions(mainProduct.items[0].source_product_id, "Not Listed")),
                        description: []
                    }
                }
                //products with variation type
                else {
                    mainProduct.items.map((subProduct) => {
                        if (subProduct.source_product_id === mainProduct.container_id) {
                            tempObj = {
                                key: subProduct.source_product_id,
                                image: subProduct.main_image,
                                title: subProduct.title,
                                details: {
                                    sku: subProduct.sku,
                                    asin: Object.keys(subProduct).includes('asin') ? subProduct.asin : 'N/A',
                                },
                                template: (Object.keys(mainProduct).includes("profile") ? mainProduct.profile.profile_name : "N/A"),
                                inventory: {
                                    inStock: fetchSum(mainProduct),
                                    variants: countVariants(mainProduct)
                                },
                                status: fetchStatus(mainProduct),
                                activity: (Object.keys(subProduct).includes('process_tags')) ? subProduct.process_tags : [],
                                action: (fetchStatus(mainProduct).status === 'Not Listed' || fetchStatus(mainProduct).status === 'Not Listed: Offer') ? addActions(subProduct.source_product_id, "Not Listed") : addActions(subProduct.source_product_id, "Others"),
                                description: fillChildren(mainProduct)
                            }
                            // console.log(fetchStatus("after creation",mainProduct));
                        }
                    })
                }
                tempArray.push({ ...tempObj })

            })
            state.tableData = [...tempArray]
        },
        storeProductCount: (state, action) => {
            action.payload.map((item) => {
                if (item._id === null) {
                    state.statusCount[Object.keys(state.statusCount)[0]] = item.total
                }
                else if (item._id !== 'Not Listed: Offer') {
                    state.statusCount[item._id] = item.total
                }

            })
        },
        toggleTableSpinner: (state, action) => {
            state.tableSpinner = action.payload
        },
        toggleSearchSpinner: (state, action) => {
            state.searchSpinner = action.payload
        },
        setSelectedSuggestion: (state, action) => {
            state.selectedSuggestion = action.payload
        },
        setCurrenTab: (state, action) => {
            state.currentTab = action.payload
        },
        // addTabsFilter: (state, action)=> {
        //     state.filtersApplied[0] = {...action.payload}
        // },
        addSearchFilter: (state, action) => {
            state.filtersApplied[0] = { ...action.payload }
        },
        setDrawerFilters: (state, action) => {
            var tempArray = [...state.drawerFilters]
            tempArray[action.payload.filterIndex] = action.payload.filterObject
            state.drawerFilters = [...tempArray]
        },
        removeDrawerFilters: (state, action) => {
            var tempArray = [...state.drawerFilters]
            tempArray[action.payload] = {}
            state.drawerFilters = [...tempArray]
        },
        removeDrawerFiltersByTitle: (state, action) => {
            var tempArr = [...state.drawerFilters]
            tempArr.map((item, index) => {
                if (item.property === action.payload) {
                    tempArr[index] = {}
                }
            })
            state.drawerFilters = [...tempArr]
        },
        removeAllFilters: (state, action) => {
            state.drawerFilters = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        },
        removeSearchFilter: (state, action) => {
            state.filtersApplied = []
            state.selectedSuggestion = {}
        }
    },
})

export const { saveLoginCredentials, storeRefinedProducts, storeTableData, storeProductCount, toggleTableSpinner, toggleSearchSpinner, setSelectedSuggestion, setCurrenTab, addTabsFilter, addSearchFilter, setDrawerFilters, removeDrawerFilters, removeDrawerFiltersByTitle, removeAllFilters, removeSearchFilter } = listingSlice.actions

export default listingSlice.reducer
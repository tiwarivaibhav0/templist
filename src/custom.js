import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { storeProductCount, storeRefinedProducts, storeTableData, toggleTableSpinner } from './redux/listingSlice'

export default function useFetch() {
  const [result, setResult] = useState()
  const dispatch = useDispatch()

  const fetchData = (type, url, options) => {
    // console.log("fetching")
    dispatch(toggleTableSpinner(true))
    fetch(url, options)
      .then(res => res.json())
      .then(temp => {
        if (type === 'login') {
          setResult({ ...temp })
        }
        if (type === 'products') {
          dispatch(toggleTableSpinner(false))
          dispatch(storeRefinedProducts(temp))
          dispatch(storeTableData(temp))
        }
        if (type === 'count') {
          // console.log("count", temp)
          dispatch(storeProductCount(temp.data))
        }
        if (type === 'suggestion') {
          dispatch(toggleTableSpinner(false))
          dispatch(storeTableData(temp))
        }
        if (type === "getFilters") {
          // console.log("all Filter Attributes", temp)
          if (temp.success === true) {
            setResult([...temp.data])
          }
        }
        if (type === "filterResults") {
          console.log(temp.data.rows)
          dispatch(toggleTableSpinner(false))
          dispatch(storeTableData(temp))
        }

      })
  }
  return { result, fetchData }
}

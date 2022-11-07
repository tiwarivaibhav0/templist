import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const UpdatedComponent = (OriginalComponent) => {

    function NewComponent() {
        const state = useSelector(state => state)
        const dispatch = useDispatch()
        const [spinner, setSpinner] = useState(false)

        return <OriginalComponent state={state} dispatch={dispatch} spinner={spinner} setSpinner={setSpinner} />
    }

    return NewComponent
}

export default UpdatedComponent
import { useDispatch,useSelector } from "react-redux"
import AddClient from "../components/Modals/AddClient"
import AddOffer from "../components/Modals/AddOffer"
import { selectModalClient,handleModalClient } from "../redux/modals/modalSlice"

const example = () => {
    const dispatch = useDispatch()
    const modalClient = useSelector(selectModalClient)


    const handleModal = (e) => {
        e.preventDefault()
        dispatch(
            handleModalClient()
        )
        console.log(handleModalClient())

    }

    const closeModal = (e) => {
        e.preventDefault()
        dispatch(
            handleModalClient()
        )
    }

  return (
    <div>
        <button onClick={
            handleModal
        }>Open Modal</button>
        {modalClient && <AddClient />}
    </div>
  )
}

export default example

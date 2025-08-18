import { useState } from "react"
import swal from 'sweetalert'
import api from "../../../server/api";

type Response = {
    review_text: string;
    predicted_rating: string;
}

const useAddReview = () => {
    const [inputData, setInputData] = useState<string>("")
    const [responeData, setResponeData] = useState<Response>()
    const [loading, setloading] = useState(false)
    const handleSubmit = async () => {
        if (!inputData || inputData.trim() === "") {
            swal("Please Enter a Value")
            return
        }

        setloading(true)
        try {
            const response = await api.post(`/reviews/create/`, { review_text: inputData })

            setResponeData(response.data)
            swal("Review Added")
        } catch (error: any) {

            swal(error.response?.data?.error || "Failed Add Review")

        } finally {
            setloading(false)
        }
    }
    return { handleSubmit, inputData, setInputData, loading, responeData }
}

export default useAddReview
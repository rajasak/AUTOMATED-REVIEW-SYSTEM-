import { useEffect, useState } from "react"
import swal from 'sweetalert'
import api from "../../../server/api";

type Response = {
    id: string;
    review_text: string;
    predicted_rating: string;
}

const useAllReviews = () => {
    const [fetchAllData, setFetchAllData] = useState<Response[]>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`/reviews/`)
                setFetchAllData(response.data)

            } catch (error: any) {
                swal(error.respone?.data?.message || "Failed to Fetch All Review")

            } finally {
                setIsLoading(false)
            }
        }
        fetchApi()
    }, [])

    return { isLoading, fetchAllData }
}

export default useAllReviews
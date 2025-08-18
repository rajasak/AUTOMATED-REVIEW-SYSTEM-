import { useEffect, useState } from "react"
import swal from 'sweetalert'
import api from "../../../server/api";

type Response = {
    id: string;
    review_text: string;
    predicted_rating: string;
}

const useRecentReview = () => {
    const [fetchData, setFetchData] = useState<Response[]>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`/reviews/recent/`)
                setFetchData(response.data)

            } catch (error: any) {
                swal(error.respone?.data?.message || "Failed to Fetch Recent Review")

            } finally {
                setIsLoading(false)
            }
        }
        fetchApi()
    }, [])

    return { isLoading, fetchData }
}

export default useRecentReview
import RecentReview from "./RecentReview"
import ReviewInput from "./ReviewInput"

const AddReviewPage = () => {
    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
            <ReviewInput />
            <RecentReview />
        </div>
    )
}

export default AddReviewPage

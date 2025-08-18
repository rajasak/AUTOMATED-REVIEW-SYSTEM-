import { BiChevronLeft } from "react-icons/bi"
import { FaStar } from "react-icons/fa"
import { Link } from "react-router"
import { useState } from "react"
import useAllReviews from "../hooks/useAllReviews"

const ReviewListPage = () => {
  const { isLoading, fetchAllData } = useAllReviews()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Ensure fetchAllData is always an array
  const reviews: any[] = Array.isArray(fetchAllData) ? fetchAllData : []

  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  // Get reviews for current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Back Button */}
        <Link 
          to={'/'} 
          className="flex items-center text-xl text-white font-medium mb-6 hover:text-gray-200 transition"
        >
          <BiChevronLeft size={30} />
          <span>Back</span>
        </Link>

        {/* Page Title */}
        <h2 className="text-center my-6 font-semibold text-3xl text-white drop-shadow-lg">
          All Reviews
        </h2>

        {/* Reviews Section */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-xl text-white my-10">Loading...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-xl text-white my-10">No Reviews</p>
          ) : (
            currentReviews.map((item: any) => (
              <div 
                key={item?.id} 
                className="flex justify-between items-center px-4 py-5 rounded-2xl 
                           bg-white/20 backdrop-blur-md border border-white/30
                           shadow-lg hover:shadow-xl transition"
              >
                <p className="font-semibold text-lg text-white">{item?.review_text}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      size={22}
                      key={i}
                      className={i < Number(item?.predicted_rating) ? "text-yellow-400 drop-shadow-md" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {reviews.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl font-medium shadow-md transition 
                ${currentPage === 1 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-white text-blue-600 hover:bg-gray-100"}`}
            >
              Prev
            </button>

            <span className="text-white font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl font-medium shadow-md transition 
                ${currentPage === totalPages ? "bg-gray-400 text-white cursor-not-allowed" : "bg-white text-blue-600 hover:bg-gray-100"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewListPage

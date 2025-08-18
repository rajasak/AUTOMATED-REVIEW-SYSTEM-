import { FaStar } from "react-icons/fa"
import useRecentReview from "../hooks/useRecentReview"
import { Link } from "react-router"


const RecentReview = () => {
    const { isLoading, fetchData } = useRecentReview()

    return (
        <div className="max-w-[1000px] mx-auto my-6">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-white drop-shadow-md">⭐ Recent Reviews</p>
                <Link
                    to={"/review-list"}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-semibold 
                               py-2 px-5 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition"
                >
                    All Reviews
                </Link>
            </div>

            {/* Glass Review Cards */}
            <div className="my-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-lg my-10 animate-pulse text-white/70">Loading...</p>
                ) : fetchData?.length == 0 ? (
                    <p className="text-center text-lg my-10 text-white/70">No Recent Reviews</p>
                ) : (
                    fetchData?.map((item: any) => (
                        <div
                            key={item?.id}
                            className={`flex justify-between items-center px-5 py-5 rounded-2xl 
                                        shadow-md hover:shadow-2xl transition duration-300 
                                        border border-white/30 bg-white/20 backdrop-blur-md`}
                        >
                            <p className="font-medium text-lg text-gray-900">{item?.review_text}</p>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        size={22}
                                        key={i}
                                        className={`transition-transform duration-200 ${i < Number(item?.predicted_rating)
                                            ? "text-yellow-400 drop-shadow-md hover:scale-110"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default RecentReview

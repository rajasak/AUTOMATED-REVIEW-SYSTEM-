import useAddReview from "../hooks/useAddReview"
import { FaStar } from "react-icons/fa";

const ReviewInput = () => {
    const { handleSubmit, inputData, setInputData, loading, responeData } = useAddReview()

    return (
        <div className="max-w-[1000px] mx-auto my-10">
            <h2 className="text-center text-3xl font-bold my-6 text-white tracking-wide drop-shadow-lg">
                🍽️ Food Review Rating System
            </h2>

            <div className="rounded-2xl bg-white/20 backdrop-blur-md shadow-lg hover:shadow-2xl 
                            transition-shadow duration-300 p-6 border border-white/30">
                <div>
                    <textarea
                        value={inputData || ""}
                        onChange={(e) => setInputData(e.target.value)}
                        name="review"
                        placeholder="Enter Review..."
                        className="border border-white/30 bg-white/40 text-gray-900 placeholder-gray-600 
                                   outline-none text-lg w-full p-3 rounded-xl resize-none
                                   focus:ring-2 focus:ring-blue-300 transition duration-200 
                                   min-h-[150px] max-h-[150px]"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || inputData.trim() === ""}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-6 rounded-xl font-semibold my-4 
                               hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 
                               shadow-md hover:shadow-lg transition"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>

            {/* Latest Review */}
            {responeData && (
                <div className="my-6">
                    <h2 className="text-xl font-semibold mb-3 text-white drop-shadow-md">Latest Review</h2>
                    <div className="flex justify-between items-center bg-white/20 backdrop-blur-md px-4 py-5 rounded-2xl 
                                    shadow-md hover:shadow-2xl transition border border-white/30">
                        <p className="font-medium text-lg text-gray-900">{responeData?.review_text}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    size={22}
                                    key={i}
                                    className={`transition-transform duration-200 ${i < Number(responeData?.predicted_rating)
                                        ? "text-yellow-400 drop-shadow-md hover:scale-110"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewInput

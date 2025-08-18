import { Route, Routes } from "react-router"
import { AddReview, ReviewList } from "../pages"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AddReview />} />
            <Route path="/review-list" element={<ReviewList />} />
        </Routes>
    )
}

export default AppRoutes
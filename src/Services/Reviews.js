import axios from 'axios'
import seedReviews from "../Data/Reviews.json";

const API_URL = "https://hqkzfluaalojxhwlhvwk.supabase.co/rest/v1/Reviews"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3pmbHVhYWxvanhod2xodndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjIyMzQsImV4cCI6MjA5Njc5ODIzNH0.f6R9m70wSbXmmxyHaWMXKJRuca8mTWtpIT2Y9C4So00"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

const STORAGE_KEY = "coffee-dashboard-reviews";

const readFallbackReviews = () => {
  const savedReviews = localStorage.getItem(STORAGE_KEY);
  if (!savedReviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedReviews));
    return seedReviews;
  }
  return JSON.parse(savedReviews);
};

export const reviewsAPI = {
    async fetchReviews() {
        try {
            const response = await axios.get(API_URL, { headers })
            return response.data
        } catch {
            return readFallbackReviews();
        }
    },

    async createReview(data) {
        try {
            const response = await axios.post(API_URL, data, { headers })
            return response.data
        } catch (err) {
            // Fallback to localStorage if Supabase fails
            console.warn("Supabase insert failed, using localStorage fallback:", err);
            const reviews = readFallbackReviews();
            const newReview = {
                review_id: reviews.length + 1,
                customer_id: data.customer_id || "Guest",
                star_review: data.star_review || 5,
                review_text: data.review_text || "",
            };
            reviews.push(newReview);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
            return newReview;
        }
    },
    async deleteReview(id) {
        try {
            await axios.delete(`${API_URL}?review_id=eq.${id}`, { headers })
        } catch {
            // Fallback to localStorage
            const reviews = readFallbackReviews();
            const filtered = reviews.filter(r => r.review_id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
    }
}
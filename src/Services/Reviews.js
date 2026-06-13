import axios from 'axios'

const API_URL = "https://hqkzfluaalojxhwlhvwk.supabase.co/rest/v1/Reviews"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3pmbHVhYWxvanhod2xodndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjIyMzQsImV4cCI6MjA5Njc5ODIzNH0.f6R9m70wSbXmmxyHaWMXKJRuca8mTWtpIT2Y9C4So00"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const reviewsAPI = {
    async fetchReviews() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createReview(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteReview(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}
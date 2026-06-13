import axios from 'axios'

const API_URL = "https://hqkzfluaalojxhwlhvwk.supabase.co/rest/v1/Staff"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3pmbHVhYWxvanhod2xodndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjIyMzQsImV4cCI6MjA5Njc5ODIzNH0.f6R9m70wSbXmmxyHaWMXKJRuca8mTWtpIT2Y9C4So00"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const staffAPI = {
    async fetchStaff() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createStaff(data) {
        const payload = { ...data }
        delete payload.staff_id
        const response = await axios.post(API_URL, payload, { headers })
        return response.data
    },

    async updateStaff(id, data) {
        const payload = { ...data }
        delete payload.staff_id
        const response = await axios.patch(`${API_URL}?staff_id=eq.${id}`, payload, { headers })
        return response.data
    },

    async deleteStaff(id) {
        const response = await axios.delete(`${API_URL}?staff_id=eq.${id}`, { headers })
        return response.data
    }
}
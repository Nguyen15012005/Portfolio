/**
 * themeSlice.js
 * Redux slice quản lý trạng thái dark/light theme.
 * Sử dụng localStorage để persist theme giữa các session.
 */

import { createSlice } from '@reduxjs/toolkit'

// Helper: lấy initial theme từ localStorage hoặc system preference
const getInitialTheme = () => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') return saved
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Helper: áp dụng class lên <html> và lưu vào localStorage
const applyTheme = (theme) => {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  localStorage.setItem('portfolio-theme', theme)
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(), // 'dark' | 'light'
  },
  reducers: {
    /**
     * toggleTheme: Chuyển đổi giữa dark và light
     */
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      applyTheme(state.mode)
    },

    /**
     * setTheme: Set theme cụ thể
     * @param {string} action.payload - 'dark' | 'light'
     */
    setTheme: (state, action) => {
      if (action.payload === 'dark' || action.payload === 'light') {
        state.mode = action.payload
        applyTheme(state.mode)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state) => state.theme.mode
export const selectIsDark = (state) => state.theme.mode === 'dark'

export default themeSlice.reducer

/**
 * store/index.js
 * Redux store trung tâm của ứng dụng Portfolio.
 * Sử dụng Redux Toolkit's configureStore để tự động setup DevTools,
 * immer (immutable state) và thunk middleware.
 */

import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Các reducer khác có thể thêm vào đây khi cần
    // projects: projectsReducer,
    // contact: contactReducer,
  },
  devTools: import.meta.env.DEV, // Bật Redux DevTools chỉ trong môi trường dev
})

export default store

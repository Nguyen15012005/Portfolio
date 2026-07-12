/**
 * main.jsx
 * Entry point của ứng dụng Portfolio.
 * Bọc toàn bộ app trong Redux Provider để mọi component
 * đều có thể truy cập store thông qua hooks.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

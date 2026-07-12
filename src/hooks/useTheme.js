/**
 * useTheme.js
 * Custom hook bọc Redux selectors và actions cho theme.
 * Các component chỉ cần import hook này thay vì gọi useSelector/useDispatch trực tiếp.
 *
 * Usage:
 *   const { isDark, theme, toggleTheme, setTheme } = useTheme()
 */

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  selectTheme,
  selectIsDark,
  toggleTheme as toggleThemeAction,
  setTheme as setThemeAction,
} from '../store/slices/themeSlice'

export function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isDark = useSelector(selectIsDark)

  // Đảm bảo class được áp dụng đúng khi component mount lần đầu
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  return {
    theme,                                           // 'dark' | 'light'
    isDark,                                          // boolean
    toggleTheme: () => dispatch(toggleThemeAction()), // () => void
    setTheme: (t) => dispatch(setThemeAction(t)),    // (theme: string) => void
  }
}

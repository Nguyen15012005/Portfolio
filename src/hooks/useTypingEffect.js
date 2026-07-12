/**
 * useTypingEffect.js
 * Custom hook tạo hiệu ứng typing animation mượt mà.
 * Hỗ trợ nhiều chuỗi text, tốc độ gõ/xóa tùy chỉnh, và loop.
 */

import { useState, useEffect, useRef } from 'react'

/**
 * @param {string[]} texts - Mảng các chuỗi text để type
 * @param {object} options
 * @param {number} options.typeSpeed - Tốc độ gõ (ms/ký tự), mặc định 80
 * @param {number} options.deleteSpeed - Tốc độ xóa (ms/ký tự), mặc định 40
 * @param {number} options.pauseDuration - Dừng sau khi gõ xong (ms), mặc định 1800
 * @param {boolean} options.loop - Lặp lại vô hạn, mặc định true
 * @returns {{ displayText: string, isTyping: boolean, currentIndex: number }}
 */
export function useTypingEffect(texts = [], options = {}) {
  const {
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseDuration = 1800,
    loop = true,
  } = options

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const phaseRef = useRef('typing') // 'typing' | 'pausing' | 'deleting' | 'switching'
  const charIndexRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!texts.length) return

    const currentText = texts[currentIndex]

    const tick = () => {
      const phase = phaseRef.current

      if (phase === 'typing') {
        if (charIndexRef.current < currentText.length) {
          charIndexRef.current++
          setDisplayText(currentText.slice(0, charIndexRef.current))
          setIsTyping(true)
          // Thêm random variance để trông tự nhiên hơn
          const variance = Math.random() * 30 - 15
          timeoutRef.current = setTimeout(tick, typeSpeed + variance)
        } else {
          // Gõ xong → dừng
          phaseRef.current = 'pausing'
          setIsTyping(false)
          timeoutRef.current = setTimeout(tick, pauseDuration)
        }
      } else if (phase === 'pausing') {
        // Bắt đầu xóa
        phaseRef.current = 'deleting'
        tick()
      } else if (phase === 'deleting') {
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setDisplayText(currentText.slice(0, charIndexRef.current))
          setIsTyping(true)
          timeoutRef.current = setTimeout(tick, deleteSpeed)
        } else {
          // Xóa xong → chuyển sang text tiếp theo
          phaseRef.current = 'switching'
          tick()
        }
      } else if (phase === 'switching') {
        if (loop || currentIndex < texts.length - 1) {
          setCurrentIndex(prev => (prev + 1) % texts.length)
          phaseRef.current = 'typing'
        }
      }
    }

    // Reset khi currentIndex thay đổi
    charIndexRef.current = 0
    setDisplayText('')
    phaseRef.current = 'typing'

    // Small delay trước khi bắt đầu gõ
    timeoutRef.current = setTimeout(tick, 200)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, texts, typeSpeed, deleteSpeed, pauseDuration, loop])

  return { displayText, isTyping, currentIndex }
}

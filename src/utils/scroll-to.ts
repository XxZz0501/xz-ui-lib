// src/utils/scroll-to.ts

/**
 * 页面滚动工具集
 *
 * 提供平滑滚动到指定位置的能力，使用 requestAnimationFrame + 缓动函数实现流畅动画，
 * 兼容不同浏览器的滚动容器差异，并支持 SSR 安全调用。
 *
 * @example
 * ```ts
 * import { scroll } from '@/utils/scroll-to'
 * scroll.to(0, 800) // 滚动到顶部，800ms 动画
 * scroll.to(500, 500, () => console.log('滚动完成'))
 * ```
 */
export const scroll = {
  /**
   * 平滑滚动到指定垂直位置（Y 坐标）
   *
   * 使用二次方缓动（ease-in-out）实现自然动画效果，
   * 自动兼容 documentElement 和 body 的滚动差异。
   *
   * @param to - 目标垂直滚动位置（单位：px），例如 0 表示页面顶部
   * @param duration - 动画持续时间（单位：毫秒），默认 500ms
   * @param callback - 动画完成后的回调函数（可选）
   *
   * @example
   * ```ts
   * // 滚动到顶部
   * scroll.to(0)
   *
   * // 滚动到 1000px 位置，600ms，完成后提示
   * scroll.to(1000, 600, () => alert('已滚动到指定位置'))
   * ```
   *
   * @note 在非浏览器环境（如 SSR、单元测试）中会静默跳过，不会报错。
   */
  to(to: number, duration: number = 500, callback?: () => void): void {
    // SSR 安全检查
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      if (callback && typeof callback === 'function') {
        callback()
      }
      return
    }

    // ---- 内部工具函数（仅在浏览器环境中定义）----
    const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const requestAnimFrame =
      window.requestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      function (cb: () => void) {
        window.setTimeout(cb, 1000 / 60)
      }

    const move = (amount: number): void => {
      document.documentElement.scrollTop = amount
      ;(document.body.parentNode as HTMLElement | null)?.scrollTo?.(0, amount)
      document.body.scrollTop = amount
    }

    const position = (): number => {
      return (
        document.documentElement.scrollTop ||
        (document.body.parentNode as HTMLElement | null)?.scrollTop ||
        document.body.scrollTop ||
        0
      )
    }

    // ---- 执行动画 ----
    const start = position()
    const change = to - start
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment
      const val = easeInOutQuad(currentTime, start, change, duration)
      move(val)

      if (currentTime < duration) {
        requestAnimFrame(animateScroll)
      } else {
        if (callback && typeof callback === 'function') {
          callback()
        }
      }
    }

    animateScroll()
  },

  /**
   * 快速滚动到页面顶部
   *
   * @param duration - 动画时长（毫秒），默认 500ms
   * @param callback - 完成回调（可选）
   */
  toTop(duration: number = 500, callback?: () => void): void {
    this.to(0, duration, callback)
  }
}
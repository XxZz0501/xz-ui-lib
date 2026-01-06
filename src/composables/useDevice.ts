// src/composables/useDevice.ts
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * 统一设备检测组合式函数
 * 为组件库提供全局一致的响应式设备判断，避免每个组件重复监听 resize
 * 
 * 断点定义（可根据项目实际调整）：
 * - mobile:  < 768px
 * - tablet:  768px ~ 991px
 * - desktop: ≥ 992px
 * 
 * 使用方式：
 * const { isMobile, isTablet, isDesktop, device } = useDevice()
 */

const currentWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

const breakpoints = {
    mobile: 768,
    tablet: 992,
} as const

function updateWidth() {
    currentWidth.value = window.innerWidth
}

// 全局只注册一次 resize 监听（Vue 会自动复用该 composable）
onMounted(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth() // 初始执行
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
})

export function useDevice() {
    const isMobile = computed(() => currentWidth.value < breakpoints.mobile)
    const isTablet = computed(() => currentWidth.value < breakpoints.tablet)
    const isDesktop = computed(() => currentWidth.value >= breakpoints.tablet)

    const device = computed<'mobile' | 'tablet' | 'desktop'>(() => {
        if (currentWidth.value < breakpoints.mobile) return 'mobile'
        if (currentWidth.value < breakpoints.tablet) return 'tablet'
        return 'desktop'
    })

    return {
        /** 是否为移动端（< 768px） */
        isMobile,
        /** 是否为平板端（< 992px） */
        isTablet,
        /** 是否为桌面端（≥ 992px） */
        isDesktop,
        /** 当前设备类型 */
        device,
        /** 当前窗口宽度（只读） */
        width: currentWidth,
    }
}
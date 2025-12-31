// src/utils/modal.ts

import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'
import type { MessageBoxData } from 'element-plus'

// 用于存储 loading 实例
let loadingInstance: { close: () => void } | null = null

/**
 * 通用 UI 操作工具（基于 Element Plus）
 *
 * 封装常用用户交互方法，包括消息提示、弹窗确认、通知、加载遮罩等，
 * 用于解耦业务逻辑与 UI 框架，提升可维护性与可测试性。
 *
 * @example
 * ```ts
 * import modal from '@/utils/modal'
 * modal.msgSuccess('操作成功')
 * await modal.confirm('确定要删除吗？')
 * modal.loading('提交中...')
 * modal.closeLoading()
 * ```
 */
export const xzModal = {
  // ========== 消息提示（Message）==========

  /**
   * 显示普通信息消息提示（顶部居中，自动消失）
   *
   * @param content - 提示内容，支持字符串或配置对象
   */
  msg(content: string): void {
    ElMessage.info(content)
  },

  /**
   * 显示错误类型的消息提示（红色）
   *
   * @param content - 错误提示内容
   */
  msgError(content: string): void {
    ElMessage.error(content)
  },

  /**
   * 显示成功类型的消息提示（绿色）
   *
   * @param content - 成功提示内容
   */
  msgSuccess(content: string): void {
    ElMessage.success(content)
  },

  /**
   * 显示警告类型的消息提示（黄色）
   *
   * @param content - 警告提示内容
   */
  msgWarning(content: string): void {
    ElMessage.warning(content)
  },

  // ========== 弹窗提示（Alert / Confirm / Prompt）==========

  /**
   * 打开普通提示弹窗（仅“确定”按钮）
   *
   * @param content - 弹窗提示文本
   * @returns Promise<MessageBoxData> 用户点击“确定”后 resolve
   */
  alert(content: string): Promise<MessageBoxData> {
    return ElMessageBox.alert(content, '系统提示')
  },

  /**
   * 打开错误类型的提示弹窗（带 ❌ 图标）
   *
   * @param content - 错误提示文本
   * @returns Promise<MessageBoxData>
   */
  alertError(content: string): Promise<MessageBoxData> {
    return ElMessageBox.alert(content, '系统提示', { type: 'error' })
  },

  /**
   * 打开成功类型的提示弹窗（带 ✅ 图标）
   *
   * @param content - 成功提示文本
   * @returns Promise<MessageBoxData>
   */
  alertSuccess(content: string): Promise<MessageBoxData> {
    return ElMessageBox.alert(content, '系统提示', { type: 'success' })
  },

  /**
   * 打开警告类型的提示弹窗（带 ⚠️ 图标）
   *
   * @param content - 警告提示文本
   * @returns Promise<MessageBoxData>
   */
  alertWarning(content: string): Promise<MessageBoxData> {
    return ElMessageBox.alert(content, '系统提示', { type: 'warning' })
  },

  /**
   * 打开确认对话框（含“确定”和“取消”按钮）
   *
   * @param content - 确认提示文本
   * @returns Promise<MessageBoxData> 用户点击“确定”时 resolve；点击“取消”或关闭时 reject
   *
   * @example
   * ```ts
   * try {
   *   await modal.confirm('确定要删除该数据吗？')
   *   // 执行删除
   * } catch {
   *   // 用户取消操作
   * }
   * ```
   */
  confirm(content: string): Promise<MessageBoxData> {
    return ElMessageBox.confirm(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  },

  /**
   * 打开输入对话框，允许用户输入文本
   *
   * @param content - 输入提示文本
   * @returns Promise<MessageBoxData> 包含用户输入值（`value` 字段）
   *
   * @example
   * ```ts
   * const result = await modal.prompt('请输入备注：')
   * console.log(result.value)
   * ```
   */
  prompt(content: string): Promise<MessageBoxData> {
    return ElMessageBox.prompt(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  },

  // ========== 通知（Notification）==========

  /**
   * 在右上角显示普通通知（不会自动覆盖 Message）
   *
   * @param content - 通知内容，可为字符串或配置对象（如 { title, message }）
   */
  notify(content: string | object): void {
    ElNotification.info(content)
  },

  /**
   * 显示错误类型的通知（红色）
   *
   * @param content - 通知内容
   */
  notifyError(content: string | object): void {
    ElNotification.error(content)
  },

  /**
   * 显示成功类型的通知（绿色）
   *
   * @param content - 通知内容
   */
  notifySuccess(content: string | object): void {
    ElNotification.success(content)
  },

  /**
   * 显示警告类型的通知（黄色）
   *
   * @param content - 通知内容
   */
  notifyWarning(content: string | object): void {
    ElNotification.warning(content)
  },

  // ========== 加载遮罩（Loading）==========

  /**
   * 显示全屏加载遮罩（带半透明背景和文字提示）
   *
   * 若已有加载实例，则先关闭再创建新实例，避免叠加。
   *
   * @param content - 加载提示文字，例如 "正在提交..."
   *
   * @example
   * ```ts
   * modal.loading('数据加载中...')
   * fetchData().finally(() => modal.closeLoading())
   * ```
   */
  loading(content: string): void {
    if (loadingInstance) {
      loadingInstance.close()
    }
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },

  /**
   * 关闭当前正在显示的加载遮罩
   *
   * 安全调用：若无加载实例，不会报错。
   */
  closeLoading(): void {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }
}
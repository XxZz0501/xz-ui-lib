// utils/date.ts

/**
 * 日期工具函数集合
 *
 * 提供常用日期格式化、计算、判断等实用方法。
 * 所有方法均支持 `Date` 对象或时间戳（number）作为输入。
 *
 * @example
 * ```ts
 * import { xzDate } from 'xz-ui-lib';
 *
 * const nowStr = xzDate.dateFormatNow();
 * const days = xzDate.calculateDaysBetweenDates('2024-01-01', new Date());
 * ```
 */
export const xzDate = {
  /**
   * 格式化日期为 'YYYY-MM-DD HH:mm:ss'（最大精度）
   * @param date - 日期对象或时间戳
   * @returns 格式化后的字符串
   *
   * @example
   * ```ts
   * xzDate.dateFormatMax(new Date()); // "2024-12-30 15:30:45"
   * ```
   */
  dateFormatMax(date: Date | number): string {
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  },

  /**
   * 获取当前时间的格式化字符串（'YYYY-MM-DD HH:mm:ss'）
   * @returns 当前时间字符串
   *
   * @example
   * ```ts
   * const now = xzDate.dateFormatNow(); // "2024-12-30 15:30:45"
   * ```
   */
  dateFormatNow(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 计算两个日期之间的天数差（endDate - startDate）
   * @param startDate - 开始日期（字符串或 Date）
   * @param endDate - 结束日期（字符串或 Date）
   * @returns 天数（可为负数）
   *
   * @example
   * ```ts
   * xzDate.calculateDaysBetweenDates('2024-01-01', '2024-12-31'); // 365
   * ```
   */
  calculateDaysBetweenDates(startDate: Date | string, endDate: Date | string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  },

  /**
   * 格式化日期为指定格式（简易版）
   * 支持：'YYYY-MM-DD', 'YYYY/MM/DD', 'MM-DD', 'HH:mm' 等
   * @param date - 日期对象或时间戳
   * @param format - 格式字符串，默认 'YYYY-MM-DD'
   * @returns 格式化后的字符串
   *
   * @example
   * ```ts
   * xzDate.formatDate(new Date(), 'YYYY/MM/DD'); // "2024/12/30"
   * ```
   */
  formatDate(date: Date | number, format = 'YYYY-MM-DD'): string {
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hour = pad(d.getHours());
    const minute = pad(d.getMinutes());

    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute);
  },

  /**
   * 判断给定日期是否为今天
   * @param date - 日期对象或时间戳
   * @returns 是否为今天
   *
   * @example
   * ```ts
   * xzDate.isToday(new Date()); // true
   * ```
   */
  isToday(date: Date | number): boolean {
    const today = new Date();
    const target = new Date(date);
    return (
      target.getFullYear() === today.getFullYear() &&
      target.getMonth() === today.getMonth() &&
      target.getDate() === today.getDate()
    );
  },

  /**
   * 获取指定日期所在周的周一和周日（按中国习惯，周一为每周第一天）
   * @param date - 日期对象或时间戳，默认为今天
   * @returns [周一日期, 周日日期] 的 Date 数组
   *
   * @example
   * ```ts
   * const [mon, sun] = xzDate.getWeekRange(new Date());
   * ```
   */
  getWeekRange(date: Date | number = new Date()): [Date, Date] {
    const d = new Date(date);
    const day = d.getDay(); // 0 (周日) ~ 6 (周六)
    const diffToMonday = day === 0 ? -6 : 1 - day; // 周一为第1天
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return [monday, sunday];
  },

  /**
   * 判断是否为闰年
   * @param year - 年份（数字）
   * @returns 是否为闰年
   *
   * @example
   * ```ts
   * xzDate.isLeapYear(2024); // true
   * ```
   */
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  /**
   * 在指定日期上增加/减少天数
   * @param date - 原始日期
   * @param days - 要增加的天数（可为负数）
   * @returns 新的 Date 对象
   *
   * @example
   * ```ts
   * const tomorrow = xzDate.addDays(new Date(), 1);
   * const yesterday = xzDate.addDays(new Date(), -1);
   * ```
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};
// utils/formRules.ts

/**
 * Element Plus 表单常用校验规则集合
 *
 * 专为 `<el-form>` 的 `rules` 字段设计，提供开箱即用的 validator 规则对象。
 * 所有规则均使用 `trigger: 'blur'`，符合常规表单交互习惯。
 *
 * @example
 * // 基础用法
 * import { xzFormRules } from 'xz-ui-lib';
 *
 * const rules = {
 *   phone: [xzFormRules.requiredRule('手机号'), xzFormRules.phoneRule],
 * };
 *
 * // 在模板中
 * // <el-form-item prop="phone" :rules="rules.phone">
 */
export const xzFormRules = {
  // --- 内部消息常量（私有，不导出）---
  _messages: {
    required: '请输入{field}',
    idCard: '请输入正确的身份证号码',
    phone: '请输入正确的手机号码',
    email: '请输入正确的邮箱地址',
    name: '姓名只能包含中文、字母、·，长度2-20位',
    number: '请输入有效数字',
    integer: '请输入整数',
    positiveInteger: '请输入正整数',
    url: '请输入有效的网址',
    bankCard: '请输入正确的银行卡号',
    plateNumber: '请输入正确的车牌号',
    password: '密码需包含大小写字母、数字和特殊字符，长度8-20位',
    ip: '请输入有效的 IPv4 地址',
  },

  /**
   * 生成必填校验规则
   *
   * @param field - 字段名称，用于错误提示（如 "用户名"），默认为空
   * @returns Element Plus 表单校验规则对象
   *
   * @example
   * ```ts
   * const rules = {
   *   username: [xzFormRules.requiredRule('用户名')]
   * };
   * ```
   */
  requiredRule(field: string = '') {
    return {
      required: true,
      message: this._messages.required.replace('{field}', field || '内容'),
      trigger: 'blur',
    };
  },

  /**
   * 身份证校验（支持15位或18位，18位含校验码验证）
   *
   * @example
   * ```ts
   * const rules = {
   *   idCard: [xzFormRules.requiredRule('身份证'), xzFormRules.idCardRule]
   * };
   * ```
   */
  get idCardRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.idCard));
        }
        if (value.length === 18) {
          const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          const Ai = '10X98765432';
          let sum = 0;
          for (let i = 0; i < 17; i++) {
            sum += parseInt(value[i]) * Wi[i];
          }
          const mod = sum % 11;
          const checkDigit = Ai[mod];
          if (checkDigit !== value[17].toUpperCase()) {
            return callback(new Error(this._messages.idCard));
          }
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 中国大陆手机号校验（支持 13~19 开头）
   *
   * @example
   * ```ts
   * const rules = {
   *   phone: [xzFormRules.requiredRule('手机号'), xzFormRules.phoneRule]
   * };
   * ```
   */
  get phoneRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^1[3-9]\d{9}$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.phone));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 邮箱格式校验
   *
   * @example
   * ```ts
   * const rules = {
   *   email: [xzFormRules.requiredRule('邮箱'), xzFormRules.emailRule]
   * };
   * ```
   */
  get emailRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.email));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 中文姓名校验（允许中文、字母、空格、中间点 ·，如“玛丽·苏”）
   * 长度限制：2-20 位
   *
   * @example
   * ```ts
   * const rules = {
   *   name: [xzFormRules.requiredRule('姓名'), xzFormRules.nameRule]
   * };
   * ```
   */
  get nameRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^[\u4e00-\u9fa5·a-zA-Z\s]{2,20}$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.name));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 数字校验（支持整数和小数，可负）
   *
   * @example
   * ```ts
   * const rules = {
   *   price: [xzFormRules.requiredRule('价格'), xzFormRules.numberRule]
   * };
   * ```
   */
  get numberRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^-?\d+(\.\d+)?$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.number));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 整数校验（可负）
   *
   * @example
   * ```ts
   * const rules = {
   *   count: [xzFormRules.requiredRule('数量'), xzFormRules.integerRule]
   * };
   * ```
   */
  get integerRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^-?\d+$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.integer));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 正整数校验（>0 的整数）
   *
   * @example
   * ```ts
   * const rules = {
   *   age: [xzFormRules.requiredRule('年龄'), xzFormRules.positiveIntegerRule]
   * };
   * ```
   */
  get positiveIntegerRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.positiveInteger));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * URL 校验（使用原生 URL 构造函数验证）
   *
   * @example
   * ```ts
   * const rules = {
   *   website: [xzFormRules.requiredRule('网站'), xzFormRules.urlRule]
   * };
   * ```
   */
  get urlRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        try {
          new URL(value);
          callback();
        } catch {
          callback(new Error(this._messages.url));
        }
      },
      trigger: 'blur',
    };
  },

  /**
   * 手机号或邮箱校验（常用于登录账号字段）
   *
   * @example
   * ```ts
   * const rules = {
   *   account: [xzFormRules.requiredRule('账号'), xzFormRules.phoneOrEmailRule]
   * };
   * ```
   */
  get phoneOrEmailRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const isPhone = /^1[3-9]\d{9}$/.test(value);
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        if (!isPhone && !isEmail) {
          return callback(new Error('请输入正确的手机号或邮箱'));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 银行卡号校验（支持16/19位，使用 Luhn 算法）
   *
   * @example
   * ```ts
   * const rules = {
   *   bankCard: [xzFormRules.requiredRule('银行卡号'), xzFormRules.bankCardRule]
   * };
   * ```
   */
  get bankCardRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const cleaned = value.replace(/\s/g, '');
        const reg = /^\d{16,19}$/;
        if (!reg.test(cleaned)) {
          return callback(new Error(this._messages.bankCard));
        }

        // Luhn 算法校验
        let sum = 0;
        let isEven = false;
        for (let i = cleaned.length - 1; i >= 0; i--) {
          let digit = parseInt(cleaned.charAt(i));
          if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          sum += digit;
          isEven = !isEven;
        }
        if (sum % 10 !== 0) {
          return callback(new Error(this._messages.bankCard));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 中国大陆车牌号校验（支持新能源、普通车牌）
   *
   * 格式示例：
   * - 普通：京A12345、粤B123456
   * - 新能源：京AD12345、粤BD12345
   *
   * @example
   * ```ts
   * const rules = {
   *   plateNumber: [xzFormRules.requiredRule('车牌号'), xzFormRules.plateNumberRule]
   * };
   * ```
   */
  get plateNumberRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg =
          /^[\u4e00-\u9fa5][A-Z][A-Z0-9]{5,6}$|^[\u4e00-\u9fa5][A-Z][A-Z0-9]{4}[D|F][A-Z0-9]$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.plateNumber));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * 密码强度校验
   * 要求：8-20位，必须包含大写字母、小写字母、数字、特殊字符（!@#$%^&* 等）
   *
   * @example
   * ```ts
   * const rules = {
   *   password: [xzFormRules.requiredRule('密码'), xzFormRules.passwordRule]
   * };
   * ```
   */
  get passwordRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
        if (!reg.test(value)) {
          return callback(new Error(this._messages.password));
        }
        callback();
      },
      trigger: 'blur',
    };
  },

  /**
   * IPv4 地址校验
   *
   * @example
   * ```ts
   * const rules = {
   *   ip: [xzFormRules.requiredRule('IP地址'), xzFormRules.ipRule]
   * };
   * ```
   */
  get ipRule() {
    return {
      validator: (_: any, value: string, callback: (error?: Error) => void) => {
        if (!value) return callback();
        const reg = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        const match = value.match(reg);
        if (!match) {
          return callback(new Error(this._messages.ip));
        }
        for (let i = 1; i <= 4; i++) {
          const part = parseInt(match[i], 10);
          if (part > 255) {
            return callback(new Error(this._messages.ip));
          }
        }
        callback();
      },
      trigger: 'blur',
    };
  },
};
[**xz-ui-lib**](../../README.md)

***

# xzDate

> `const` **xzDate**: `object`

日期工具函数集合

提供常用日期格式化、计算、判断等实用方法。
所有方法均支持 `Date` 对象或时间戳（number）作为输入。

## Type Declaration

---

## addDays

```ts
addDays(...)
```

在指定日期上增加/减少天数


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `date` | `Date` | 原始日期 |
| `days` | `number` | 要增加的天数（可为负数） |


#### 返回值

`Date`

### 示例

```ts
const tomorrow = xzDate.addDays(new Date(), 1);
const yesterday = xzDate.addDays(new Date(), -1);
```

---

## calculateDaysBetweenDates

```ts
calculateDaysBetweenDates(...)
```

计算两个日期之间的天数差（endDate - startDate）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `startDate` | `string | Date` | 开始日期（字符串或 Date） |
| `endDate` | `string | Date` | 结束日期（字符串或 Date） |


#### 返回值

`number`

### 示例

```ts
xzDate.calculateDaysBetweenDates('2024-01-01', '2024-12-31'); // 365
```

---

## dateFormatMax

```ts
dateFormatMax(...)
```

格式化日期为 'YYYY-MM-DD HH:mm:ss'（最大精度）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `date` | `number | Date` | 日期对象或时间戳 |


#### 返回值

`string`

### 示例

```ts
xzDate.dateFormatMax(new Date()); // "2024-12-30 15:30:45"
```

---

## dateFormatNow

```ts
dateFormatNow(...)
```

获取当前时间的格式化字符串（'YYYY-MM-DD HH:mm:ss'）



#### 返回值

`string`

### 示例

```ts
const now = xzDate.dateFormatNow(); // "2024-12-30 15:30:45"
```

---

## formatDate

```ts
formatDate(...)
```

格式化日期为指定格式（简易版）
支持：'YYYY-MM-DD', 'YYYY/MM/DD', 'MM-DD', 'HH:mm' 等


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `date` | `number | Date` | 日期对象或时间戳 |
| `format` | `string = 'YYYY-MM-DD'` | 格式字符串，默认 'YYYY-MM-DD' |


#### 返回值

`string`

### 示例

```ts
xzDate.formatDate(new Date(), 'YYYY/MM/DD'); // "2024/12/30"
```

---

## getWeekRange

```ts
getWeekRange(...)
```

获取指定日期所在周的周一和周日（按中国习惯，周一为每周第一天）


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `date` | `number | Date` | 日期对象或时间戳，默认为今天 |



### 示例

```ts
const [mon, sun] = xzDate.getWeekRange(new Date());
```

---

## isLeapYear

```ts
isLeapYear(...)
```

判断是否为闰年


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `year` | `number` | 年份（数字） |


#### 返回值

`boolean`

### 示例

```ts
xzDate.isLeapYear(2024); // true
```

---

## isToday

```ts
isToday(...)
```

判断给定日期是否为今天


#### 参数

| 名称 | 类型 | 说明 |
|------|------|------|
| `date` | `number | Date` | 日期对象或时间戳 |


#### 返回值

`boolean`

### 示例

```ts
xzDate.isToday(new Date()); // true
```

## Example

```ts
import { xzDate } from 'xz-ui-lib';

const nowStr = xzDate.dateFormatNow();
const days = xzDate.calculateDaysBetweenDates('2024-01-01', new Date());
```
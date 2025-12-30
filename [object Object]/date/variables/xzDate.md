[**xz-ui-lib**](../../README.md)

***

# Variable: xzDate

> `const` **xzDate**: `object`

日期工具函数集合

提供常用日期格式化、计算、判断等实用方法。
所有方法均支持 `Date` 对象或时间戳（number）作为输入。

## Type Declaration

### addDays()

> **addDays**(`date`, `days`): `Date`

在指定日期上增加/减少天数

#### Parameters

##### date

`Date`

原始日期

##### days

`number`

要增加的天数（可为负数）

#### Returns

`Date`

新的 Date 对象

#### Example

```ts
const tomorrow = xzDate.addDays(new Date(), 1);
const yesterday = xzDate.addDays(new Date(), -1);
```

### calculateDaysBetweenDates()

> **calculateDaysBetweenDates**(`startDate`, `endDate`): `number`

计算两个日期之间的天数差（endDate - startDate）

#### Parameters

##### startDate

开始日期（字符串或 Date）

`string` | `Date`

##### endDate

结束日期（字符串或 Date）

`string` | `Date`

#### Returns

`number`

天数（可为负数）

#### Example

```ts
xzDate.calculateDaysBetweenDates('2024-01-01', '2024-12-31'); // 365
```

### dateFormatMax()

> **dateFormatMax**(`date`): `string`

格式化日期为 'YYYY-MM-DD HH:mm:ss'（最大精度）

#### Parameters

##### date

日期对象或时间戳

`number` | `Date`

#### Returns

`string`

格式化后的字符串

#### Example

```ts
xzDate.dateFormatMax(new Date()); // "2024-12-30 15:30:45"
```

### dateFormatNow()

> **dateFormatNow**(): `string`

获取当前时间的格式化字符串（'YYYY-MM-DD HH:mm:ss'）

#### Returns

`string`

当前时间字符串

#### Example

```ts
const now = xzDate.dateFormatNow(); // "2024-12-30 15:30:45"
```

### formatDate()

> **formatDate**(`date`, `format`): `string`

格式化日期为指定格式（简易版）
支持：'YYYY-MM-DD', 'YYYY/MM/DD', 'MM-DD', 'HH:mm' 等

#### Parameters

##### date

日期对象或时间戳

`number` | `Date`

##### format

`string` = `'YYYY-MM-DD'`

格式字符串，默认 'YYYY-MM-DD'

#### Returns

`string`

格式化后的字符串

#### Example

```ts
xzDate.formatDate(new Date(), 'YYYY/MM/DD'); // "2024/12/30"
```

### getWeekRange()

> **getWeekRange**(`date`): \[`Date`, `Date`\]

获取指定日期所在周的周一和周日（按中国习惯，周一为每周第一天）

#### Parameters

##### date

日期对象或时间戳，默认为今天

`number` | `Date`

#### Returns

\[`Date`, `Date`\]

[周一日期, 周日日期] 的 Date 数组

#### Example

```ts
const [mon, sun] = xzDate.getWeekRange(new Date());
```

### isLeapYear()

> **isLeapYear**(`year`): `boolean`

判断是否为闰年

#### Parameters

##### year

`number`

年份（数字）

#### Returns

`boolean`

是否为闰年

#### Example

```ts
xzDate.isLeapYear(2024); // true
```

### isToday()

> **isToday**(`date`): `boolean`

判断给定日期是否为今天

#### Parameters

##### date

日期对象或时间戳

`number` | `Date`

#### Returns

`boolean`

是否为今天

#### Example

```ts
xzDate.isToday(new Date()); // true
```

## Example

```ts
import { xzDate } from 'xz-ui-lib';

const nowStr = xzDate.dateFormatNow();
const days = xzDate.calculateDaysBetweenDates('2024-01-01', new Date());
```

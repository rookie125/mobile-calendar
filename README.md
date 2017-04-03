## mobile-calendar 
简易版移动端版日期插件，没第三方库依赖

### 安装

```bash
# 安装 mobile-calendar
npm install --save mobile-calendar
```

### 引入方式和使用

```html
<link rel="stylesheet" href="/dist/calendar.min.css">

<script src="/dist/calendar.min.js"></script>

<input type="text" class="calendars" />
```   

### API
通过在元素上添加属性的方式

* start-year 开始年份 String defalut:1915
* end-year   结束年份 String defalut:2050
* start-date 起始日期 String defalut:当前日期
* min-date 起始日期 String defalut:null
* max-date 起始日期 String defalut:null
* format 显示的格式 String defalut:'yy/mm/dd' 只支持 yy/mm/dd 或 yy-mm-dd
* shield 指定禁用日期 Array defalut:undefined 例: shield="[2015/3/8, 2015/3/9]"
* past  不可选择过去日期 defalut:false 只需要设置属性即可，不需要值
* hours 可以选择时间 defalut:false 只需要设置属性即可，不需要值
   * hours-past 不可选择过去时间 defalut:false 只需要设置属性即可，不需要值

### 图片

选择列表  
![选择列表](src/assets/images/4.png '选择列表')

左右滑动切换    
![左右滑动切换](src/assets/images/4-1.png '左右滑动切换')

月份选择    
![月份选择](src/assets/images/1.png '月份选择')

年份选择    
![年份选择](src/assets/images/2.png '年份选择')

左右滑动切换年份列表    
![左右滑动切换年份列表](src/assets/images/2-1.png '左右滑动切换年份列表')

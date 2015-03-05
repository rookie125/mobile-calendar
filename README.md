简单说明
-------

可定义是否可以选择过期日期   
日历列表、年份选择支持左右滑动切换月份、年份。   

选择列表  
![选择列表](img/4.png '选择列表')

左右滑动切换    
![左右滑动切换](img/4-1.png '左右滑动切换')

月份选择    
![月份选择](img/1.png '月份选择')

年份选择    
![年份选择](img/2.png '年份选择')

左右滑动切换年份列表    
![左右滑动切换年份列表](img/2-1.png '左右滑动切换年份列表')


## 使用方法

引入该项目中的 CSS样式和JS文件

	<link rel="stylesheet" href="css/main.min.css">
	<script src="script/main.js"></script>

在<input /\>标签上定义class属性值为 "calendars"

	<input type="text" class="calendars" />


## 参数定义说明

参数直接定义在标签上面

开始年份 **start="2008"**，默认为"1915"年

	<input class="calendars" type="text" start="2008" />

结束年份 **end="2030"**，默认为"2020"年
	
	<input class="calendars" type="text" end="2030" />


是否可选过期日期 **past**, 设置该属性则不可选
	
	<input class="calendars" type="text" past />

日期的显示格式 **format**, 默认为 **"yy/mm/dd"** , 暂时只支持 斜杠 <code>/</code> 和 横杠 <code>-</code> 作为分割符
	
<code> yy:年 </code> <code>mm:月</code> <code>dd:日</code>
	 
	<input class="calendars" type="text" format="yy-mm-dd" />



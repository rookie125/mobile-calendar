简单说明
-------

可定义是否可以选择过期日期   
日历列表、年份选择支持左右滑动切换月份、年份。   


###先体验一下再说
![在线地址](img/code.png '二维码')

####[地址：http://calendar.coding.io/](http://calendar.coding.io/)

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

	<link rel="stylesheet" href="src/calendar.min.css">

引入JS文件方法有两种：  
 
>方法一：模块化引入JS文件

	<script src="xx/sea.js"></script>
	<script>
	    seajs.use('./src/calendar');
	</script>

>方法二：普通引入JS文件

	<script src="src/calendar.js"></script>

在<input /\>标签上定义class属性值为 "calendars"

	<input type="text" class="calendars" />


## 可选参数定义说明

参数直接定义在标签上面

定义年份列表中开始年份： <code>**start="2008"**</code>，默认开始为"1915"年

	<input class="calendars" type="text" start="2008" />

定义年份列表中结束年份： <code>**end="2030"**</code>，默认为"2020"年
	
	<input class="calendars" type="text" end="2030" />

定义可选的起始日期： <code>**start-date="2015/3/6"**</code>，默认为当前日期

	<input class="calendars" type="text" start-date="2015/3/6" />

定义是否不可选过期日期： <code>**past**</code>, 默认可选过期的日期
	
	<input class="calendars" type="text" past />


定义是否可选时间： <code>**hours**</code>, 默认不可选时间
	
	<input class="calendars" type="text" hours />

定义是否不可选过期时间： <code>**hours-past**</code>，默认可选过期时间    
该属性只有当你定义了<code>**hours**</code> 属性才会生效

	<input class="calendars" type="text" hours hours-past />

定义日期的显示格式： <code>**format**</code>, 默认为 <code>**"yy/mm/dd"**</code> , 暂时只支持 斜杠 <code>/</code> 和 横杠 <code>-</code> 作为分割符   
<code> yy:年</code> <code>mm:月</code> <code>dd:日</code>
	 
	<input class="calendars" type="text" format="yy-mm-dd" />

定义指定禁用的日期属性： <code>**shield="[2015/3/8, 2015/3/9]"**</code>
	
	<input class="calendars" type="text" shield="[2015/3/8, 2015/3/9]" />



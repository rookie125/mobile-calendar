(function(document){
    
    var oCalen = getObj(document, '.calen')[0],
        calendarList = getObj(oCalen, '.calen-list')[0],
        monthTitle = getObj(oCalen, '.calen-month-txt')[0],
        yearTitle = getObj(oCalen, '.calen-year-txt')[0],
        calenTitle = getObj(oCalen, '.calen-title'),
        prevMonthBtn = getObj(oCalen, '.month-prev')[0],
        nextMonthBtn = getObj(oCalen, '.month-next')[0],
        prevYearBtn = getObj(oCalen, '.year-prev')[0],
        nextYearBtn = getObj(oCalen, '.year-next')[0],
        aBtns = getObj(getObj(oCalen, '.calen-header')[0], 'a');

    var mNow = 0,       // 当前相对月份
        yNow = 0,       // 当前相对年份
        silde = false,  // 日历列表正在滑动
        nowMonth,       // 触发显示月份选择按钮
        nowYear;        // 触发显示年份选择按钮

    /**
     * 创建日历对象
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    function createCalenList(data, setTitle){
        var oList = document.createElement('div'),
            created = 0;

        data = data || {};
        data.m = data.m || 0;
        data.y = data.y || 0;

        //
        var date = new Date(),
            tDay = date.getDate();

            date.setFullYear(date.getFullYear() + data.y, (date.getMonth() + data.m + 1), 1, 0, 0, 0);
            date.setDate(0);


        var dSun = date.getDate();

        date.setDate(1);
        var dWeek = date.getDay();

        var date = new Date();
            date.setFullYear(date.getFullYear() + data.y, date.getMonth() + data.m, 1, 0, 0, 0);

        var tMonth = date.getMonth() + 1,
            tYear = date.getFullYear();

        // 设置上一个月的最后一天
            date.setDate(0);

        var lastDay = date.getDate(),
            lastMonths = [];

        for(var i = lastDay ; i > 0 ; i--){
            lastMonths.push(i);
        }

        // 设置标题
        if(setTitle){
            yearTitle.innerHTML = tYear;
            monthTitle.innerHTML = (tMonth < 10 ? '0' + tMonth : tMonth);

            monthTitle.setAttribute('data-value', tMonth - 1);
            yearTitle.setAttribute('data-value', tYear);
        }

        // 创建上月尾部分
        var lastMonthDay = dWeek + 7;
            lastMonthDay = lastMonthDay >= 10 ? lastMonthDay - 7 : lastMonthDay;

        for(var i = 0 ; i < lastMonthDay ; i++){

            var oSpan = document.createElement('span'),
                oNum = document.createElement('a');

            oNum.href = 'javascript:;';
            oNum.className = 'prev-m prev-to-month';

            if(lastMonths[i] ==tDay && data.m == 1 && !data.y)toolClass(oNum, 'today');

            oNum.innerHTML = lastMonths[i];
            oNum.setAttribute('data-calen', tYear + '/' + (tMonth - 1) + '/' + lastMonths[i]);

            oSpan.appendChild(oNum);

            if(oList.children.length){
                oList.insertBefore(oSpan, oList.children[0]);
            } else {
                oList.appendChild(oSpan);
            }

            created++;
        }

        // 这当前月的日期列表
        for(var i = 0 ; i < dSun ; i++){
            created++;

            var oSpan = document.createElement('span'),
                oNum = document.createElement('a'),
                n = i + 1;

            oNum.href = 'javascript:;';
            oNum.innerHTML = n;
            oNum.setAttribute('data-calen', tYear + '/' + tMonth + '/' + n);

            if(created % 7 == 1 || created % 7 == 0){
                oNum.className = 'weekend';
            }

            if(!data.m && !data.y){

                if(n == tDay){
                    oNum.className = oNum.className + ' today';
                }
                else if(n < tDay){
                    oNum.className = oNum.className + ' expire';
                }

            }

            oSpan.appendChild(oNum);
            oList.appendChild(oSpan);
        }

        // 创建下月尾部分
        var nextMonths = 42 - oList.children.length;

        for(var i = 0 ; i < nextMonths ; i++){
            var oSpan = document.createElement('span'),
                oNum = document.createElement('a'),
                n = i + 1;

            oNum.href = 'javascript:;';
            oNum.className = 'next-m next-to-month';

            if(n ==tDay && data.m == -1 && !data.y)toolClass(oNum, 'today');

            oNum.innerHTML = n;

            oNum.setAttribute('data-calen', tYear + '/' + (tMonth + 1) + '/' + n);

            oSpan.appendChild(oNum);
            oList.appendChild(oSpan);
        }

        return oList;
    }

    /**
     * 创建年月
     * @param  {[type]} start  [开始日期]
     * @param  {[type]} end    [结束日期]
     * @param  {[type]} type   [description]
     * @return {[type]}        [description]
     */
    function createDate(start, end, type){
        type = type || 'month';
        start = start || 1;
        end = end || 12;

        var oDateList = document.createElement('div');
        var oList = document.createElement('div');

        oDateList.className = type == 'month' ? 'calen-months' : 'calen-years';

        for(var i = start ; i <= end ; i++){
            var oSpan = document.createElement('span'),
                oNum = document.createElement('a');

            oNum.href = 'javascript:;';
            oNum.innerHTML = (i < 10 ? '0' + i : i);
            oNum.setAttribute('data-value', (type == 'year' ? i : i - 1));

            if(type == 'year'){
                oSpan.appendChild(oNum);
                oList.appendChild(oSpan);
            }
            else {
                oSpan.appendChild(oNum);
                oDateList.appendChild(oSpan);
            }

        }

        if(type == 'year')oDateList.appendChild(oList);
        oCalen.appendChild(oDateList);
    }

    /**
     *
     * 插入日历对象
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    function appendList(data, cb){
        data = data || {};
        data.prev = data.prev || {m : mNow - 1, y : yNow};
        data.now = data.now || {m : mNow, y : yNow};
        data.next = data.next || {m : mNow + 1, y : yNow};

        calendarList.innerHTML = '';

        calendarList.appendChild(createCalenList(data.prev));
        calendarList.appendChild(createCalenList(data.now, true));
        calendarList.appendChild(createCalenList(data.next));

        cb && cb();
    }

    /**
     * 设置日历事件
     */
    function addEvent(){
        var aCalenSet = calendarList.getElementsByTagName('a');

        for(var i = 0 ; i < aCalenSet.length ; i++){
            aCalenSet[i].onclick = function(){

                if(toolClass(this, 'prev-to-month', 'has')){
                    switchDate(-1);
                }
                else if(toolClass(this, 'next-to-month', 'has')){
                    switchDate(1);
                }
                else {
                    var date = this.getAttribute('data-calen');
                    document.title = date;

                }
            }
        }
    }

    /**
     * 切换上下月
     * @param  {[type]} dir  [description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    function switchDate(dir, type){
        type = type || 'month';

        switch(type){
            case 'month':
                if(dir > 0){
                    mNow++;
                    transitions(calendarList, -1);
                } else {
                    mNow--;
                    transitions(calendarList, 1);
                }
                break;
            case 'year':
                appendList({
                    prev : {
                        m : mNow,
                        y : yNow - 1
                    },
                    next : {
                        m : mNow,
                        y : yNow + 1
                    }
                }, function(){
                    if(dir > 0){
                        yNow++;
                        transitions(calendarList, -1);
                    } else {
                        yNow--;
                        transitions(calendarList, 1);
                    }
                });



                break;
        }
    }


    /**
     * 滑动切换日期
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    function start(ev){

        var oEv = ev.targetTouches ? ev.targetTouches[0] : (ev || event);
        var disX = oEv.pageX;
        var needW = parseInt(document.documentElement.clientWidth / 5, 10);
        var dir;

        var _this = this;

        function move(ev){
            var oEv = ev.targetTouches ? ev.targetTouches[0] : (ev || event);

            dir = oEv.pageX - disX;

            if(silde)return false;

            if(Math.abs(dir) >= needW){
                silde = true;

                dir > 0 ? mNow-- : mNow++;

                transitions(_this, dir);
            }

            oEv.preventDefault && oEv.preventDefault();
            return false;
        }

        function end(ev){

            this.ontouchmove && (this.ontouchmove = null);
            this.ontouchend && (this.ontouchend = null);
            this.onmousemove && (this.onmousemove = null);
            this.onmouseup && (this.onmouseup = null);
        }

        // 移动
        this.ontouchmove = move;
        this.onmousemove = move;

        // 结束
        this.ontouchend = end;
        this.onmouseup = end;
    }

    /**
     * 切换月份动画
     * @param  {[type]} obj [description]
     * @param  {[type]} dir [上个月还是下个月]
     */
    function transitions(obj, dir){

        if(dir > 0){
            toolClass(obj, 'silde');
            toolClass(obj, 'prev-to');
        }
        else {
            toolClass(obj, 'silde');
            toolClass(obj, 'next-to');
        }

        setTimeout(function(){
            end();
        }, 500)

        function end(){
            appendList({}, function(){
                toolClass(obj, 'silde', 'remove');
                toolClass(obj, 'prev-to', 'remove');
                toolClass(obj, 'next-to', 'remove');
                addEvent();
                silde = false;
            })
        }
    }

    /**
     * 查找/添加/删除 className
     * @param  {[type]} obj    [description]
     * @param  {[type]} sClass [需要处理的class]
     * @param  {[type]} type   ['add:添加'(默认), 'remove:删除', 'has:查找']
     */
    function toolClass(obj, sClass, type){
        if(!sClass)return;

        var nowClass = obj.className.replace(/\s+/g, ' ');
            nowClass = nowClass.split(' ');

            sClass = sClass.replace(/\s+/, '');
            type = type || 'add';

        for(var i = 0 ; i < nowClass.length ; i++){
            switch(type){
                case 'has': if(sClass == nowClass[i])return true; break;
                case 'add':
                case 'remove': if(sClass == nowClass[i])nowClass.splice(i, 1); break;
            }
        }

        if(type == 'add')nowClass.push(sClass);

        obj.className = nowClass.join(' ');
    }

    /**
     * 获取元素
     * @param  {[type]} parent [description]
     * @param  {[type]} str    [type]
     */
    function getObj(parent, str){
        var type = str.charAt(0), result;
        switch(type){
            case '#':
                result = parent.getElementById(str.substring(1));
                break;
            case '.':
                result = parent.getElementsByClassName(str.substring(1));
                break;
            default:
                result = parent.getElementsByTagName(str);
                break;
        }

        return result;
    }


    // 按钮切换上下月/年
    prevMonthBtn.onclick = function(){switchDate(-1);}
    nextMonthBtn.onclick = function(){switchDate(1);}
    prevYearBtn.onclick = function(){switchDate(-1, 'year');}
    nextYearBtn.onclick = function(){switchDate(1, 'year');}

    // 滑动切换上下月
    calendarList.ontouchstart = start;
    calendarList.onmousedown = start;

    // 创建日历对象列表
    appendList();
    addEvent();

    // 创建年月
    createDate();                       // 月
    createDate(2004, 2015, 'year');     // 年

    var calenYears = getObj(oCalen, '.calen-years')[0],
        calenMonths = getObj(oCalen, '.calen-months')[0],
        aYears = getObj(calenYears, 'a'),
        aMonths = getObj(calenMonths, 'a');


    // 显示/隐藏 月/年 份选择
    for(var i = 0 ; i < calenTitle.length ; i++){

        calenTitle[i].show = false;
        calenTitle[i].onclick = function(){

            if(toolClass(this, 'calen-month-txt', 'has')){

                // 显示或者隐藏
                toolClass(calenMonths, 'active', (calenMonths.show ? 'remove' : 'add'));

                // 同时隐藏年月份
                if(calenYears.show){
                    toolClass(calenYears, 'active', 'remove');
                    calenYears.show = false;
                }

                nowMonth = this;

                // 设置当前月份高亮
                toolClass(aMonths[this.getAttribute('data-value')], 'active');

                calenMonths.show = !calenMonths.show;
            }
            else if(toolClass(this, 'calen-year-txt', 'has')){

                toolClass(calenYears, 'active', (calenYears.show ? 'remove' : 'add'));

                if(calenMonths.show){
                    toolClass(calenMonths, 'active', 'remove');
                    calenMonths.show = false;
                }

                nowYear = this;

                // 设置当前年份高亮
                for(var x = 0 ; x < aYears.length ; x++){

                    if(aYears[x].getAttribute('data-value') == this.getAttribute('data-value')){
                        toolClass(aYears[x], 'active');
                    }
                    else {
                        toolClass(aYears[x], 'active', 'remove');
                    }
                }

                calenYears.show = !calenYears.show;
            }
        }
    }

    // 选择月份
    for(var i = 0 ; i < aMonths.length ; i++){

        aMonths[i].onclick = function(){
            for(var x = 0 ; x < aMonths.length ; x++){
                toolClass(aMonths[x], 'active', 'remove');
            }

            mNow += this.getAttribute('data-value') - nowMonth.getAttribute('data-value');

            appendList({}, function(){
                addEvent();
            });

            toolClass(this, 'active');
            toolClass(calenMonths, 'active', 'remove');

            calenYears.show = false;
            calenMonths.show = false;
        }
    }

    // ios不认识:active，改用.active代替
    for(var i = 0 ; i < aBtns.length ; i++){
        aBtns[i].ontouchstart = function(){
            toolClass(this, 'active');
        }
        aBtns[i].ontouchend = function(){
            toolClass(this, 'active', 'remove');
        }
    }


})(document);

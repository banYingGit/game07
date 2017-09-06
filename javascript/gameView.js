/**
 * Created by banYing on 2017/8/24 0024.
 */


/* 全局变量
 * atuoTime：倒计时
 * atuoTime420：420秒倒计时
 * level: 当前等级
 * clickIndex: 当前点击索引
 * dataRole: 记录点击属性值
 * isTrue: 记录点击的是否正确
 * corTimeArr: 每题答对用时
 * startTime: 记录每题结束时间
 *
 */


var atuoTime,
    atuoTime420,
    level,
    clickIndex = -1,
    dataRole,
    isTrue = false,
    corTimeArr = [],
    startTime = 0;

/* 全局变量
 * source：小雪花图片
 * liIndex: 界面索引
 */
var source = [], liIndex = [];

for (var i = 1; i < 23; i++) {

    var $obj = 's' + i;

    source.push($obj)

}
for (var i = 0; i < 15; i++) {

    liIndex.push(i)

}


_event()


// 游戏内事件处理
function _event() {

    $('#goScreen2').click(function () {

        $('#screen1').remove()
        $('#screen2').show()

    })

    $('#goPractice').click(function () {

        $('#screen2').remove()

        $('#list').show()

        $('#list .processA').show()

        level = 3

        _setPartA()

    })

    $('#goTest').click(function () {

        $('#list .processA').hide()

        $('#list .processB').show()

        $('#screen3').remove()

        $('#stopBntBox , #timeBox , #list').show()

        level = 5

        startTime = $('#hideTime').text()

        _setPartB()

        _time420(420, function () {

            //停掉30秒倒计时
            clearInterval(atuoTime)

            //420秒时间到，游戏结束
            $('#list').remove()

            $('#over').show()

            _over()

        })


    })

    $('#stop').click(function () {

        clearInterval(atuoTime)
        clearInterval(atuoTime420)
        $('#stopBox').show()
        $('#list').hide()


    })

    $('#continue').click(function () {

        $('#stopBox').hide()
        $('#list').show()

        var $timeA = $('#time').text(),

            $timeB = $('#hideTime').text()

        _time420($timeB, function () {

            //停掉30秒倒计时
            clearInterval(atuoTime)

            //420秒时间到，游戏结束
            $('#list').remove()

            $('#over').show()

            _over()

        })

        _time($timeA, function () {

            _setPartB()


        })
    })

    $('.button[data-role="out"]').click(function () {

        _out()
    })


}


// 点击按钮事件处理
function _clickBtn(e) {


    //禁止两次点击自己
    if (clickIndex == $(e.target).parent('li').index()) return

    //禁止点击空白

    if (typeof($(e.target).attr('data-role')) == "undefined") return

    clickIndex = $(e.target).parent('li').index()

    var $dataRole = $(e.target).attr('data-role')

    $(e.target).addClass('active')

    if (!dataRole) {
        //全局变量 dataRole 没有值，这是点击第一次

        dataRole = $dataRole


    } else {
        //全局变量 dataRole 有值，这是点击第二次

        // 禁止页面等待时间内点击
        $('body').css('pointer-events', 'none')

        if (dataRole == $dataRole) {
            //点击正确

            isTrue = true;

            level = level + 1

            //设置进度条
            if ($('#list').attr('data-part') == 'A') {

                _setProcess('A')

            } else {

                _setProcess('B')

            }


            setTimeout(function () {

                if ($('#list').attr('data-part') == 'A') {

                    if (level >= 5) {

                        $('#list').hide()

                        $('#screen3').show()

                    } else {

                        _setPartA()

                    }


                }

                else if ($('#list').attr('data-part') == 'B') {


                    //停掉30秒倒计时
                    clearInterval(atuoTime)

                    var $overTime = $('#hideTime').text()

                    var $corTime = startTime - $overTime;

                    corTimeArr.push($corTime)


                    startTime = $('#hideTime').text();


                    if (level >= 15) {


                        clearInterval(atuoTime420)

                        $('#list').remove()

                        $('#over').show()

                        _over()


                    }
                    else if (level < 15) {


                        _setPartB()


                    }

                }
                $('body').css('pointer-events', 'auto')


            }, 1000)


        } else {

            isTrue = false;

            $('#list li p.active').addClass('error')


            setTimeout(function () {

                if ($('#list').attr('data-part') == 'A') {

                    _setPartA()

                } else if ($('#list').attr('data-part') == 'B') {


                    _setPartB()

                }

                $('body').css('pointer-events', 'auto')

            }, 2500)

        }


    }

    //禁止双击
    $(e.target).removeAttr('onclick')

}


//设置练习题界面 _setPartA
function _setPartA() {

    //清空全局变量
    clickIndex = -1;
    dataRole = '';
    isTrue = false

    $('#list').attr('data-part', 'A')

    $('#snow li p').removeAttr().removeClass()

    // 获取图片
    var $getImg = _getArrayItems(source, level - 1),

        $imgClone = _getArrayItems($getImg, 1),

        $sumImg = _getArrayItems($getImg.concat($imgClone), level),

        $getIndex = _getArrayItems(liIndex, level)

    for (var i = 0; i < $getIndex.length; i++) {

        $('#snow li').eq($getIndex[i]).children('p').addClass($sumImg[i]).attr({
            'data-role': $sumImg[i],
            'onclick': '_clickBtn(event)'
        })

    }


}

//设置练习题界面 _setPartB
function _setPartB() {

    //清空全局变量
    clickIndex = -1;
    dataRole = '';
    isTrue = false
    clearInterval(atuoTime)


    $('#list').attr('data-part', 'B')

    $('#snow li p').removeAttr().removeClass()

    // 获取图片
    var $getImg = _getArrayItems(source, level - 1),

        $imgClone = _getArrayItems($getImg, 1),

        $sumImg = _getArrayItems($getImg.concat($imgClone), level),

        $getIndex = _getArrayItems(liIndex, level)

    // console.log('$getImg', $getImg)
    // console.log('$imgClone', $imgClone)
    // console.log('$sumImg', $sumImg)
    // console.log('$getIndex', $getIndex)


    for (var i = 0; i < $getIndex.length; i++) {

        $('#snow li').eq($getIndex[i]).children('p').addClass($sumImg[i]).attr({
            'data-role': $sumImg[i],
            'onclick': '_clickBtn(event)'
        })

    }


    _time(30, function () {

        _setPartB()


    })


}

/*** 设置倒计时
 * part：A or B
 ***/
function _setProcess(part) {

    var $el = part == "A" ? $('#processA ul') : $('#processB ul'),

        $i = part == "A" ? 4 : 6


    $el.children('li').eq(level - $i).addClass('correct').text('✔')


}


//游戏结束
function _over() {


    /* ajax 请求接口路径，返回json 数据
     * corTimeArr: 每题答对用时
     * */

    var param = {
        corTimeArr: corTimeArr
    }

    console.log('当前返回参数', param)

}

//游戏退出
function _out() {

    console.log('游戏退出')

}


/*** 倒计时
 * i：时间
 * fn：倒计时结束回调
 ***/
function _time(i, fn) {

    $('#time').text(i)

    var timeFn = function () {

        i = i - 1

        $('#time').text(i)

        if (i == 0) {

            clearInterval(atuoTime)

            fn && fn.call(this)

        }

    }

    atuoTime = setInterval(timeFn, 1000);


}

//420秒全局倒计时
function _time420(i, fn) {

    var timeFn = function () {

        i = i - 1

        $('#hideTime').text(i)

        if (i == 0) {

            clearInterval(atuoTime420)

            fn && fn.call(this)

        }

    }

    atuoTime420 = setInterval(timeFn, 1000);


}

/*** 数组随机
 * arr：数组
 * num：随机个数
 ***/
function _getArrayItems(arr, num) {

    var array = [];

    for (var index in arr) {

        array.push(arr[index]);
    }

    var return_array = [];

    for (var i = 0; i < num; i++) {

        if (array.length > 0) {

            var arrIndex = Math.floor(Math.random() * array.length);

            return_array[i] = array[arrIndex];

            array.splice(arrIndex, 1);

        } else {
            break;
        }
    }
    return return_array;
}

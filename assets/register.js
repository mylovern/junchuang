// 判断页面是否首次加载
if (localStorage.getItem('s') == null && localStorage.getItem('userlist') == null) {
    // 获取首次登录的code和语言标的
    localStorage.setItem('invitecode', window.location.search.split('&')[0].split('=')[1])
    var invitecode = localStorage.getItem('invitecode')
    $('#invitecode').val(invitecode)
    window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值 
}
$('#invitecode').val(localStorage.getItem('invitecode'))
    // 注册接口
$('.sendBtn').click(() => {
    let mobile = $('#tel').val()
    let code = $('#code').val()
    let password = $('#password').val()
    var mreg = new RegExp(/^1[345789]\d{9}$/)
    var usernametest = new RegExp(/^[A-Za-z0-9]+$/)
    if (!mreg.test(mobile)) {
        $('.notshowtel').removeClass('notshowtel')
        setTimeout(() => {
            $('.midflag').addClass('notshowtel')
        }, 3000)
        return false
    }



    if (password.length > 16 || password.length < 6) {
        $('.notshow').removeClass('notshow')
        setTimeout(() => {
            $('.midflag').addClass('notshow')
        }, 3000)
        return false
    }


    $.ajax({

        type: 'post',
        dataType: 'json',
        url: '  http://47.244.158.154:9000/api/auth/register',
        data: {
            mobile: mobile,
            country_code: 86,
            password: password,
            verification_code: code,
            invitation_code: localStorage.getItem('invitecode')
        },
        success: function(data) {
            console.log(data)
            if (data.status_code == 200) {
                // 获取下载链接
                localStorage.removeItem('csessionid')
                localStorage.removeItem('nc_token')
                localStorage.removeItem('sig')
                localStorage.removeItem('tel')
                localStorage.removeItem('s')
                localStorage.removeItem('c')
                localStorage.removeItem('allowed')
                localStorage.removeItem('userlist')
                localStorage.removeItem('username')

                // var u = navigator.userAgent;

                // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
                // var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                // if (isAndroid) {
                //     window.location.href = 'https://wq4i.isign.pub/';
                // }

                // if (isIos) {
                $('.noiceTop').html(
                    `<div class="alert alert-success  midflag" role="alert">注册成功</div>`)
                $('.noiceTop').show()
                setTimeout(() => {
                    $('.noiceTop').hide()
                }, 3000)

                // }

            }
        },
        error: function(err) {
            $('.noiceTop').html(
                `<div class="alert alert-danger  midflag" role="alert">${err.responseJSON.message}</div>`)
            $('.noiceTop').show()
            setTimeout(() => {
                $('.noiceTop').hide()
            }, 3000)

            localStorage.removeItem('csessionid')
            localStorage.removeItem('nc_token')
            localStorage.removeItem('sig')
            localStorage.removeItem('tel')
            localStorage.removeItem('s')
            localStorage.removeItem('c')
            localStorage.removeItem('allowed')
            localStorage.removeItem('userlist')



        }
    })

})

//获取二维码的倒计时
$('.getCode').click(() => {
    $('.innerconetent').html(`  <iframe style="z-index: 99999999999999999999;" width="100%" height="500px" src="./verification.html?scene=nc_message_h5&platform=web&language=zh" frameborder="0"></iframe>`)
})


//英文版


//控制两个密码输入框的切换
var flag = false
$('.showpasswordImg').click(() => {
    if (flag) {
        $('.hidepassword').show()
        $('.showpassword').hide()
        flag = false
    } else {
        $('.hidepassword').hide()
        $('.showpassword').show()
        flag = true
    }


})
$('#tel').change(() => {
    $('#telen').val($('#tel').val())


})
$('#telen').change(() => {
    $('#tel').val($('#telen').val())


})
$('#username').change(() => {
        localStorage.setItem('username', $('#username').val())
    })
    // 绑定两个输入框
$('#password').change(() => {
    $('#showpwdinput').val($('#password').val())
    if ($('#code').val() !== '' && $('#tel').val() !== '' && $('#password').val() !== '') {
        $('.sendBtn').addClass('activeBtn')
    } else {
        $('.sendBtn').removeClass('activeBtn')
    }

})
$('#code').change(() => {
    $('#showpwdinput').val($('#password').val())
    if ($('#code').val() !== '' && $('#tel').val() !== '' && $('#password').val() !== '') {
        $('.sendBtn').addClass('activeBtn')
    } else {
        $('.sendBtn').removeClass('activeBtn')
    }

})
$('#tel').change(() => {
    $('#showpwdinput').val($('#password').val())
    if ($('#code').val() !== '' && $('#tel').val() !== '' && $('#password').val() !== '') {
        $('.sendBtn').addClass('activeBtn')
    } else {
        $('.sendBtn').removeClass('activeBtn')
    }

})

$('#showpwdinput').change(() => {
    $('#password').val($('#showpwdinput').val())
})
$('#passworden').change(() => {
    $('#showpwdinputen').val($('#passworden').val())


})
$('#showpwdinputen').change(() => {
    $('#passworden').val($('#showpwdinputen').val())
})
var sureflag = 'checked'
$('.sureBtn').click(() => {
    if (sureflag == 'checked') {
        $('.sureBtn').prop('checked', true)
        sureflag = 'fasle'
    } else {
        $('.sureBtn').prop('checked', false)
        sureflag = 'checked'

    }
})






function getcode(e) {


    if (!e.data.nc_token) {
        return false
    }
    if (e) {
        $('#exampleModal').modal('hide')
    }
    console.log(e)
    if ($('#tel').val() == '') {
        $('.noiceTop').html(
            `<div class="alert alert-danger  midflag" role="alert">请输入电话号码</div>`)
        $('.noiceTop').show()
        setTimeout(() => {
            $('.noiceTop').hide()
        }, 3000)

        return false
    }

    $.ajax({
            type: 'post',
            dataType: "json",
            url: 'http://47.244.158.154:9000/api/verification/code',
            data: {
                mobile: $('#tel').val(),
                action: 'register',
                nc_sessionid: e.data.sessionid,
                nc_token: e.data.nc_token,
                nc_sig: e.data.sig
            },
            success: function(data) {

                $('.getCode').hide()
                $('.getCodeTime').show()
                var num = 60
                $('.getCodeTime').html(`<span>${num}(s)</span>`)
                var timer = setInterval(() => {

                    if (num == 0) {
                        clearInterval(timer)
                        $('.getCode').show()
                        $('.getCodeTime').hide()
                    } else {
                        num = num - 1
                        $('.getCodeTime').html(`<span>${num}(s)</span>`)
                    }

                }, 1000)


                window.removeEventListener('message', getcode, false)
                localStorage.removeItem('csessionid')
                localStorage.removeItem('nc_token')
                localStorage.removeItem('sig')
                localStorage.removeItem('tel')
                localStorage.removeItem('c')
                localStorage.removeItem('s')
                localStorage.removeItem('allowed')

            },
            error: function(err) {

                $('.noiceTop').html(
                    `<div class="alert alert-danger  midflag" role="alert">${err.responseJSON.message}</div>`)
                $('.noiceTop').show()
                setTimeout(() => {
                    $('.noiceTop').hide()
                }, 3000)
                window.removeEventListener('message', getcode, false)
                localStorage.removeItem('csessionid')
                localStorage.removeItem('nc_token')
                localStorage.removeItem('sig')
                localStorage.removeItem('tel')
                localStorage.removeItem('allowed')
                localStorage.removeItem('s')
                localStorage.removeItem('c')

            }
        }


    )


}
// 判断是否通过人机验证
window.addEventListener('message', getcode, false)
window.onpagehide = function() {
    window.removeEventListener('message', getcode, false)
}
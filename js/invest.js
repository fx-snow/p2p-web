$(function(){
    $("lable").mouseenter(function(){
        $('input').find().siblings().addClass('active');
    }).mousemove(function(){
        $('input').find().siblings().addClass('');
    })
})
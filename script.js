$(function(){
    const nowTime = new Date();
    const thisyear = nowTime.getFullYear();

    $('.modalWindowBack').hide();

    $('a:not([href^="#"])').attr('target','_blank');

    // スムーススクロール　a[href=^#]
    $(document).on('click','a[href^="#"]',function(){
        const adjust = -40;
        const speed = 400;
        const href= $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        const position = target.offset().top + adjust;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });

    // .js-headerNav
    $('#firstView').nextAll('section').each(function(){
        const ankerLink = $(this).attr('id');
        const ankerTitle = $(this).find('h2').text();
        const $appendLi = $('<li><a href="#'+ankerLink+'">＃'+ankerTitle+'</a></li>')
        $('.js-headerNav ul').append($appendLi);
    });

    // .js-age
    function getAge(){
        const birth = {
            year: 1993,
            month: 7,
            day: 30
        }
        const thisYearsBd = new Date(thisyear, birth.month - 1, birth.day);
        let age = thisyear - birth.year;
        if(thisYearsBd > nowTime){
            age -= 1;
        }
        return age;
    }
    const myAge = getAge();
    $('.js-age').text(myAge);

    // .js-culcYear
    $('.js-culcYear').each(function(){
        let term;
        const attrTerm = $(this).attr('data-termSince');
        const termSince = {
            year: attrTerm.slice(0,4),
            month: attrTerm.slice(4,2),
            day: attrTerm.slice(6,2)
        }
        const thisYearAniv = new Date(thisyear, termSince.month - 1, termSince.day);
        let thisYearHalfAniv;
        if(termSince.month < 7 ){
            thisYearHalfAniv = new Date(thisyear, termSince.month + 5, termSince.day);
        }else{
            thisYearHalfAniv = new Date(thisyear, termSince.month - 7, termSince.day);
        }
        term = thisyear - termSince.year;
        if(thisYearAniv > nowTime){
            term -= 1;
        }
        if(thisYearHalfAniv < nowTime){
            term += '年半';
        }else{
            term += '年';
        }
        $(this).text(term);
    });

    // .js-modal--cards
    $('.js-modal--cards').click(function(){
        $('.modalWindowBack').show();
        $('.modalWindow .cts').remove();
        if($(this).find('.cts').is('.cts--career')){
            $('.modalWindow h2').text('経歴の詳細');
        }else if($(this).find('.cts').is('.cts--archieve')){
            $('.modalWindow h2').text('実績の詳細');
        }
        const $cloneCts = $(this).children('.cts').clone();
        $('.modalWindow header').after($cloneCts);
    });

    // .modalWindow
    $('.modalWindowBack, .js-closeModalWindow').click(function(){
        $('.modalWindowBack').hide();
    });
    $('.modalWindow').click(function(e){
        e.stopPropagation();
    });

    // .js-closedMaterials
    $('.js-closedMaterials').click(function(){
        $(this).parents('footer').toggleClass('is-closed');
    });
});
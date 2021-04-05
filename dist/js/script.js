$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1100,
        slidesToShow: 1,
        autoplay: true,
        autospeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>'
      });

    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal Windows

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    });

    $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay #order').fadeIn('slow');
        });
    });

    //Validation

    function validateForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите имя",
                phone: "Пожалуйста, введите телефон",
                email:{
                    required: "Пожалуйста, введите e-mail",
                    email: "Некорректный формат почты"
                }
        
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    //Masks

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Mailer

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');

        });
        return false;
    });

    //smooth scroll page up

    $(window).scroll(function(){
        if ($(this).scrollTop()>1600){
            $('.pageup').fadeIn();
        }
        else{
            $('.pageup').fadeOut();
        }
    });

    $(function(){
        $("a[href=#up]").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
    });

    new WOW().init();
});


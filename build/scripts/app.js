$(function () {

    if ($('input[type="range"]').length) {
        $('input[type="range"]').rangeslider({
            polyfill: false,

            onInit: function () {
                getCalcSumm(1);
            },

            onSlide: function (position, value) {
                getCalcSumm(value);
            }

        });
    }

    function getCalcSumm(value) {

        var number = $(".calc__value-number");

        var sum1 = $("#sum1");
        var sum2 = $("#sum2");
        var sum3 = $("#sum3");

        var sum1Text = sum1.data("sum") * +number.eq(value - 1).text();
        var sum2Text = sum1Text * +sum2.data("coef");
        var sum3Text = +sum1Text - +sum2Text;

        function editSum(sum, sumText) {
            sum.text(("" + sumText).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        }

        editSum(sum1, sum1Text);
        editSum(sum2, sum2Text);
        editSum(sum3, sum3Text);
    }

    $(".sec10__gallery").slick({
        slidesToShow: 3,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    webshim.setOptions('forms', {
        lazyCustomMessages: true,
        replaceValidationUI: true
    });
    webshim.polyfill('forms');

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $("[data-phone]");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-small-btn");
            console.log("mobile");
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-small-btn");
            console.log("pc");
        }
    }
    phoneLink();

    // form handler
    var body = $("body");
    var name;

    $("input[name=phone]").inputmask({
        "mask": "+9(999)999-9999",
        greedy: false
    });

    body.on("click", ".js-small-btn", function (e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            $("html").addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    body.on("click", function (e) {
        var self = $(e.target);

        if (self.hasClass("form-wrap_small") || self.hasClass("form__close")) {
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        } else if (self.hasClass("form-wrap_big")) {
            location = "thanks.html";
        }
    });

    body.on("click", ".js-anchor-link", function (e) {
        e.preventDefault();
        var self = $(this);
        var id = self.attr("href");

        $("html,body").animate({
            scrollTop: $(id).offset().top
        }, 500);
    });

    if (typeof wl != "undefined") {
        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {

                if (res.status == 200) {
                    $(".form-wrap_open").removeClass("form-wrap_open");

                    var selfName = $form.find("input[name=name]");
                    var selfPhone = $form.find("input[name=phone]");
                    var selfEmail = $form.find("input[name=email]");
                    var formData = $form.serialize();
                    console.log(formData);

                    $("[name=name1]").val(selfName.val());
                    $("[name=phone1]").val(selfPhone.val());
                    $("[name=email1]").val(selfEmail.val());

                    $("html").addClass("form-open");
                    $(".form-wrap_big").addClass("form-wrap_open");

                    name = selfName.val();

                    if (name) {
                        localStorage.setItem("landclientname", name + ", наши");
                    } else {
                        localStorage.setItem("landclientname", "Наши");
                    }
                } else {
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {
                location = "thanks.html";
            }
        };
    } else {
        $("#smallForm, #bottomForm, #bottomFormSecond").submit(function (e) {
            e.preventDefault();
            $(".form-wrap_open").removeClass("form-wrap_open");

            var self = $(this);
            var selfName = self.find("input[name=name]");
            var selfPhone = self.find("input[name=phone]");
            var selfEmail = self.find("input[name=email]");
            var formData = self.serialize();
            console.log(formData);

            $("[name=name1]").val(selfName.val());
            $("[name=phone1]").val(selfPhone.val());
            $("[name=email1]").val(selfEmail.val());

            $.when($.ajax({
                type: "POST",
                url: "php/send.php",
                data: formData,
                success: function (data) {}
            }));

            $("html").addClass("form-open");
            $(".form-wrap_big").addClass("form-wrap_open");

            name = selfName.val();

            if (name) {
                localStorage.setItem("landclientname", name + ", наши");
            } else {
                localStorage.setItem("landclientname", "Наши");
            }
        });

        $("#bigForm").submit(function (e) {
            e.preventDefault();

            var self = $(this);
            var formData = self.serialize();

            $.ajax({
                type: "POST",
                url: "php/sendpresent.php",
                data: formData,
                success: function (data) {
                    location = "thanks.html";
                }
            });
        });
    }

    if ($("#thanksName").length) {
        $("#thanksName").text(localStorage.getItem("landclientname"));
    };

    $(window).on("resize", function () {});
});
//# sourceMappingURL=app.js.map

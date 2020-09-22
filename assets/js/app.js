$(document).ready(function () {
    var prev = function () {
        var carousel = document.getElementById('carousel');
        carousel.prev();
    };

    var next = function () {
        var carousel = document.getElementById('carousel');
        carousel.next();
    };

    ons.ready(function () {
        var carousel = document.addEventListener('postchange', function (event) {
            console.log('Changed to ' + event.activeIndex)
        });
    });

    document.addEventListener('init', function (event) {
        var page = event.target;
        $("#Back-btn").hide();
        if (page.id === 'Home') {
            document.querySelector('ons-back-button').hide()
            page.querySelector('#NTND').onclick = function () {
                document.querySelector('#Navigator_home').pushPage('views/DetailNTND.html');
            };
            page.querySelector('#SPEC').onclick = function () {
                document.querySelector('#Navigator_home').pushPage('views/DetailSPEC.html');
            };
            page.querySelector('#SKY').onclick = function () {
                document.querySelector('#Navigator_home').pushPage('views/DetailSKY.html');
            };
        } else if (page.id === 'Search') {
            page.querySelector('#SearchNTND').onclick = function () {
                document.querySelector('#Navigator_search').pushPage('views/DetailNTND.html');
            };
        } else if (page.id === 'DetailNTND' || page.id === 'DetailSPEC' || page.id === 'DetailSKY') {
            $("#Back-btn").show();
            document.querySelector('ons-back-button').onclick = function (event) {
                document.querySelector('#Navigator_home').pushPage('views/Home.html');
                document.querySelector('#Navigator_search').pushPage('views/Search.html');
            };
        }
    });
})
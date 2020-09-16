$(document).ready(function(){
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
        
        if (page.id === 'Home') {
            $("#Back-btn").hide();
            page.querySelector('#NTND').onclick = function () {
                document.querySelector('#myNavigator').pushPage('views/DetailNTND.html');
            };
            page.querySelector('#SPEC').onclick = function () {
                document.querySelector('#myNavigator').pushPage('views/DetailSPEC.html');
            };
            page.querySelector('#SKY').onclick = function () {
                document.querySelector('#myNavigator').pushPage('views/DetailSKY.html');
            };
        }else if(page.id === 'DetailNTND' || page.id === 'DetailSPEC' || page.id === 'DetailSKY'){
            $("#Back-btn").show();
            document.querySelector('ons-back-button').onclick = function(event){
                document.querySelector('#myNavigator').pushPage('views/Home.html');
            }
        }
    });
})
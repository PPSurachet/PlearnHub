var firebaseConfig = {
    apiKey: "AIzaSyBbJnVvL1YjxtX17Rk7tqBukUGMObT4zAg",
    authDomain: "porhub-bf02f.firebaseapp.com",
    databaseURL: "https://porhub-bf02f.firebaseio.com",
    projectId: "porhub-bf02f",
    storageBucket: "porhub-bf02f.appspot.com",
    messagingSenderId: "580268459147",
    appId: "1:580268459147:web:613c1bfc8883bc4bd4808e",
    measurementId: "G-VC5M761WHZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

$(function () {
    getmovie();
})

function getmovie() {
    db.collection("movies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const movieCarousel = document.createElement('ons-carousel-item');
            movieCarousel.setAttribute("id", `${doc.data().id}`);
            movieCarousel.innerHTML = `<img src="${doc.data().posterURL}" width="100%">`
            $("#CarouselMovie").append(movieCarousel);
        });

        $('ons-carousel-item').click(function () {
            const movietarget = $(this).attr('id');
            getmovieDetail(movietarget);
            document.querySelector('#Navigator_home').pushPage(`views/DetailMovie.html`);
        })

        document.querySelector('ons-back-button').onclick = function () {
            document.querySelector('#Navigator_home').popPage();
        };

    });
}

function getmovieDetail(target) {

    const docRef = db.collection("movies").doc(target);

    docRef.get().then(function (doc) {
        console.log(doc.data());
        const detailImg = document.createElement('div');
        detailImg.classList.add('DetailPage');
        detailImg.innerHTML = `<div class="DetailImg" style="
                                    background: url(${doc.data().posterURL}) ;
                                    background-repeat: no-repeat; 
                                    background-size: cover;">
                                    <div class="iconDetail">
                                        <ons-icon style="color: red;" size="80px" icon="md-play-circle"></ons-icon>
                                    </div>
                                </div>
                                <div class="Detail-title-padding">
                                    <div class="title-movie">
                                        ${doc.data().title} (${doc.data().year})
                                    </div>
                                </div>
                                <div class="Detail-title-padding">
                                    <div class="Detail-text">
                                        ${doc.data().review}
                                    </div>
                                </div>`;
        $("#allDetail").append(detailImg);
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function getmoviefromSearch() {

    const searchText = document.getElementById('ValueSearch').value;

    $("#searchResultItem").empty();
    db.collection("movies").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const titlemovie = doc.data().title
            if (titlemovie.indexOf(searchText) != -1) {
                const searchResult = document.createElement('div');
                searchResult.classList.add('padding-box-movie');
                searchResult.innerHTML = `<ons-row id="${doc.data().id}">
                                                <ons-col width="130px">
                                                    <img src="${doc.data().posterURL}" alt="" width="120px" height="190px">
                                                </ons-col>
                                                <ons-col>
                                                    <div class="title-movie">${doc.data().title}</div>
                                                    <div class="text-movie">${doc.data().review}</div>
                                                    <div class="title-movie">Rating</div>
                                                    <div class="iconstar">
                                                        <ons-icon size="25px" icon="md-star"></ons-icon>
                                                        <ons-icon size="25px" icon="md-star"></ons-icon>
                                                        <ons-icon size="25px" icon="md-star"></ons-icon>
                                                        <ons-icon size="25px" icon="md-star"></ons-icon>
                                                        <ons-icon size="25px" icon="md-star-half"></ons-icon>
                                                    </div>
                                                </ons-col>
                                            </ons-row>`
                $("#searchResultItem").append(searchResult);
            }
        });

        $('ons-row').click(function () {
            const movietarget = $(this).attr('id');
            getmovieDetail(movietarget);
            document.querySelector('#Navigator_search').pushPage(`views/DetailMovie.html`);
        })

        document.querySelector('ons-back-button').onclick = function () {
            document.querySelector('#Navigator_search').popPage();
        };
    });

}
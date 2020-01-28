let baseUrl = "http://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;



$(document).ready(function () {

    // artistSearch = document.querySelector("artist").selected;
    // console.log(artistSearch);
    let selectBar = document.getElementsByClassName("custom-select");
    $("select").each(function () {
        var $this = $(this), numberOfOptions =
            $(this).children("option").length;
    })
    // // console.log(input.value.toString());

    /*Dropdown Menu*/
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    // let dropdownValue;
    $('.dropdown .dropdown-menu li').click(function () {
        dropdownValue = "";
        $(this).parents('.dropdown').find('span').text($(this).text());
        // $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        // console.log($(this).attr("id"));
        dropdownValue = $(this).attr("id");
        // console.log(dropdownValue);
        searchTheAPI(dropdownValue);
    });
    /*End Dropdown Menu*/
})

function searchTheAPI(dropdownValue) {
    $("#search").on("click", function () {
        // Artist Search 
        // console.log(input);
        let input = "";
        let searchType = dropdownValue;
        input = $("#myInput").val();
        if (searchType === "artist") {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `${baseUrl}/2.0/?method=artist.search&artist=${input}&api_key=${apiKey}&limit=10&format=json`,
                "method": "GET",
            }).then(function (response) {
                console.log(response.results.artistmatches.artist[0])
                let artistArray = response.results.artistmatches.artist;
                let newArtistArray = [];
                console.log(response.results)
                artistArray.forEach(function (artist) {
                    newArtistArray.push(`<img src="${artist.image[1]["#text"]}"><h4>${artist.name}</h4><p></p>`)
                    console.log(artist);
                })
                // console.log(newAlbumArray);
                $("#artist-list").html(newArtistArray);

            })
        } else if (searchType === "album") {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": ` ${baseUrl}/2.0/?method=album.search&album=${input}&api_key=${apiKey}&limit=10&format=json`,
                "method": "GET",
            }).then(function (response) {
                console.log(response)
                let albumArray = response.results.albummatches.album;
                let newAlbumArray = [];
                albumArray.forEach(function (album) {
                    let albumImage = `<img src="${album.image[1]["#text"]}">`
                    // console.log(album.artist)
                    if (album.image[1]["#text"] === "") {
                        console.log(album.artist);
                        albumImage = "<h2>Cant retrieve Image</h2>"
                    }
                    newAlbumArray.push(`${albumImage}<h4>${album.artist}</h4><p>${album.name}</p>`)
                    // console.log(album);
                })
                // console.log(newAlbumArray);
                $("#album-list").html(newAlbumArray);
            })
        } else if (searchType === "song") {
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": ` ${baseUrl}/2.0/?method=track.search&track=${input}&api_key=${apiKey}&limit=10&format=json`,
                "method": "GET",
            }).then(function (response) {
                let trackArray = response.results.trackmatches.track;
                let newTrackArray = [];
                trackArray.forEach(function (track) {
                    newTrackArray.push(`<h4>${track.name}</h4><p>${track.artist}</p>`)
                })
                $("#track-list").html(newTrackArray);
                // console.log(response.results.trackmatches.track);
            })
        }
    })
    $("#chart").on("click", function () {
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`,
            "method": "GET",
        }).then(function (response) {
            console.log(response.tracks.track);
        })
    })


}





                    // let baseUrl = "https://deezerdevs-deezer.p.rapidapi.com/"
                    // let searchUrl = "https://deezerdevs-deezer.p.rapidapi.com/artist/"



// function searchApi() {
//     let input = $("#myInput").val();
//     let settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=` + input,
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//             "x-rapidapi-key": "5374ac71aamsh28799f9ee90f681p14740djsn101c4922f345"
//         }
//     };

//     $.ajax(settings).done(function (response) {
//         console.log(response);


//         let artistID = response.data[0].artist.id

//         $.ajax({
//             "async": true,
//             "crossDomain": true,
//             "url": `https://deezerdevs-deezer.p.rapidapi.com/artist/` + artistID,
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                 "x-rapidapi-key": "5374ac71aamsh28799f9ee90f681p14740djsn101c4922f345"
//             }
//         }).then(function (data) {
//             console.log(data);
//             let artistName = data.name;
//             let artistImage = data.picture_medium;
//             let artistTrackList = data.tracklist;
//             console.log(artistName, artistTrackList, artistImage)
//             $('#artist-image').html(`<img src="${artistImage}">`)
//             $('#artist-songs').html(`<li>${artistTrackList}</li>`)
//             console.log(artistTrackList)
//             $.ajax({
//                 "async": true,
//                 "crossDomain": true,
//                 "url": `${artistTrackList}`,
//                 "method": "GET",
//                 "timeout": 0,
//                 "headers": {
//                     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//                     "x-rapidapi-key": "5374ac71aamsh28799f9ee90f681p14740djsn101c4922f345",
//                     // "Access-Control-Allow-Origin": "*",
//                     // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//                     // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//                 }
//             }).then(function (response) {
//                 console.log(response)
//             })
//         })

//     })
// };



// $("#search").on("click", function () {
//     $.ajax(settings).done(function (response) {
//         // let artistName = response.name;
//         // let artistID = response.data[0].artist.id
//         // let artistImage = response.picture;
//         // let artistTrackList = response.tracklist;
//         console.log(response);
//     });
// })
// document.getElementById("myInput").addEventListener("keyup", function (event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         document.getElementById("search").click();
//     }
// });


    //     let input = $("#myInput").val();

    //     console.log(typeof (input));
    //     $.ajax({
    //         "async": true,
    //         "crossDomain": true,
    //         "url": `https://api.deezer.com/search?q=` + input,
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    //             "x-rapidapi-key": "5374ac71aamsh28799f9ee90f681p14740djsn101c4922f345"
    //         }
    //     }).then(function (response) {
    //         console.log(response);
    //         let artistName = response.name;
    //         // let artistID = response.
    //         let artistImage = response.picture;
    //         let artistTrackList = response.tracklist;
    //         console.log(artistTrackList, artistImage, artistName);
    //     })
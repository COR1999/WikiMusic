let baseUrl = "http://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"



$(document).ready(function () {

    $("#search").on("click", function () {
        // Artist Search 
        let input = $("#myInput").val();
        console.log(input);
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=artist.search&artist=${input}&api_key=${apiKey}&format=json`,
            "method": "GET",
        }).then(function (response) {
            console.log(response.results.artistmatches.artist[0])
        })

    })


    // // console.log(input.value.toString());


})
// Material Select
$('.mdb-select').materialSelect({
});



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

// require('config.json');

$(document).ready(function () {

    $("#search").on("click", searchApi);
    // Get the input field
    document.getElementById("myInput").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("search").click();
        }
    });

});
function refreshToken(token) {
    
}




function searchApi() {
    var token = 'BQCaY-Mu87Mcnxf9k5_GGWuJGNQ7okr_fnuinXEQBxAaSI-OJCPiWtZG1wRHaaA21S9rSXaRmSpsU-lYTubkHHB_0DyMpV8C2na9e5f5gyyz11PskF1FM-SkDNFciXwS8TF4QDHiOXDyRYx6x6Z_v6fFAk3gu-29mfk'

    $.ajax({
        url: 'https://api.spotify.com/v1/search?type=artist&query=' + $("#myInput").val(),
        headers: {
            Authorization: 'Bearer ' + token,
            // client_id: client_id,
            // client_secret: client_secret
        },
    })
        .then(function (oData) {
            var artistId = oData.artists.items[0].id;
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=IE',
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }).then(function (response) {
                let songName = []
                let playNow = []
                response.tracks.forEach(function (album) {
                    songName.push("<li>" + album.name + '<a href="' + album.external_urls.spotify + '" target="_blank"> Play Now</a></li>');
                    // playNow.push('<a href="' + album.external_urls.spotify + '">Play Now</a>');
                    console.log(album.external_urls.spotify);
                })
                $('#artist-songs').html(songName);
                // $('#artist-playNow').html(playNow);

            });
            let artistName = oData.artists.items[0].name;
            $('#artist-name').html(`<h2>${artistName}</h2>`)

            let artistImage = oData.artists.items[0].images[1].url;
            $('#artist-image').html(`<img src="${artistImage}">`)
        })
}


let baseUrl = "http://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;



$(document).ready(function () {

    // artistSearch = document.querySelector("artist").selected;
    // console.log(artistSearch);
    // // console.log(input.value.toString());

    /*Dropdown Menu*/
    let transitonTimeMs = 300;
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(transitonTimeMs);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(transitonTimeMs);
    });
    // let dropdownValue;
    $('.dropdown .dropdown-menu li').click(function () {
        // dropdownValue = ""
        // dropdownValue.replace(dropdownValue, "");
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        // console.log($(this).attr("id"));
        dropdownValue = $(this).attr("id").toLowerCase();
        // console.log(dropdownValue);
        // console.log(dropdownValue)
        searchTheAPI(dropdownValue);


        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(transitonTimeMs);
    });
    /*End Dropdown Menu*/
})
$("#search").on("click", searchTheAPI);


function searchTheAPI(dropdownValue) {
    // $("#search").on("click", function () {
    $("#artist-list").empty()
    $("#album-list").empty()
    $("#track-list").empty()

    // artist-list
    //     album-list
    // track-list
    // Artist Search 
    let input;
    let searchType = dropdownValue;
    console.log(searchType);

    input = $("#myInput").val();
    // console.log(typeof (searchType))
    if (searchType === "artist") {
        apiUrl(searchType, input)
            .then(function (response) {
                // console.log(response.results.artistmatches.artist[0])
                let artistArray = response.results.artistmatches.artist;
                let newArtistArray = [];
                // console.log(response.results)
                artistArray.forEach(function (artist) {
                    newArtistArray.push(`<img src="${artist.image[1]["#text"]}"><h4>${artist.name}</h4><p></p>`)
                    // console.log(artist);
                })
                // console.log(response)
                // console.log(newAlbumArray);
                $("#artist-list").html(newArtistArray);
            })
    } else if (searchType === "album") {
        apiUrl(searchType, input)
            .then(function (response) {
                // console.log(response)
                let albumArray = response.results.albummatches.album;
                // let newAlbumArray = [];
                let rows = [];
                let cardRow = [];
                let NumberPerRow = 12;
                albumArray.forEach(function (album, index) {
                    let imageIndex = 2;
                    let albumImage = `<img src="${album.image[imageIndex]["#text"]}">`
                    // console.log(album.artist)
                    if (album.image.length >= 2) {
                        if (album.image[imageIndex]["#text"] === "") {
                            // console.log("working" album.artist);
                            albumImage = "<h2>Cant retrieve Image</h2>"
                        }
                    }
                    cardRow.push(`<div class="card col-sm-6 col-md-3">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                    if ((index + 1) % NumberPerRow === 0 || (index + 1) === albumArray.length) {
                        // cardRow.push(`<div class="card">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p></div>`)
                        rows.push(`<div class="row">${cardRow}</div>`);
                        cardRow.length = 0;
                        // console.log("rows:", rows)
                        // console.log("cardRow:", cardRow)
                        // console.log(index)
                    }
                    // console.log("rows:", rows)
                    // console.log("cardRow:", cardRow)
                    // console.log("index:", index)
                    // console.log(album);
                })

                // console.log("rows:", rows)
                // console.log("cardRow:", cardRow)
                // console.log(newAlbumArray);
                $(".artist-cards").html(`${rows}`.replace(/,/g, ""))
            })
    } else if (searchType === "song") {
        apiUrl(searchType, input)
            .then(function (response) {
                let trackArray = response.results.trackmatches.track;
                let newTrackArray = [];
                trackArray.forEach(function (track) {
                    newTrackArray.push(`<h4>${track.name}</h4><p>${track.artist}</p>`)
                })
                $("#track-list").html(newTrackArray);

                // console.log(response.results.trackmatches.track);
            })
    } else if (searchType === "chart") {
        apiUrl(searchType)
            .then(function (response) {
                // console.log(response.tracks.track);
            })
    }
    // searchType.clear();
    // console.log(searchType);
    dropdownValue = "";
    // })


}
function apiUrl(searchType, input) {

    let searchBy;
    switch (searchType) {
        case "artist":
            searchBy = "artist.search&artist=";
            break;
        case "album":
            searchBy = "album.search&album=";
            break;
        case "song":
            searchBy = "track.search&track=";
            break;
        case "chart":
            searchBy = "chart.gettoptracks";
            input = "";
            break;
        default:
            console.log("unkown Input", searchBy);
        // code block
    }
    console.log("search ", searchType)

    return (
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=${searchBy}${input}&api_key=${apiKey}&limit=22&format=json`,
            "method": "GET",
        }))
}




function GetSelectedValue() {
    var e = document.getElementById("option-menu");
    var result = e.options[e.selectedIndex].value;

    document.getElementById("result").innerHTML = result;
}

function GetSelectedText() {
    var e = document.getElementById("option-menu");
    var result = e.options[e.selectedIndex].text;

    document.getElementById("result").innerHTML = result;


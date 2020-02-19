
let baseUrl = "https://ws.audioscrobbler.com"
let apiKey = "977e2d82b14fe34163d15b95f2c1ce55"
let dropdownValue;
// let submit = document.getElementById('search');
// let myInput = document.getElementById("myInput");
let myInput = $("#myInput");
let submit = $("#search");
// let chartData = apiUrl("chart")
let table;
let height = $(window).height();
let fadeDuration = 1500;
$(document).ready(function () {
    $(window).on("resize", function () {
        resizedHeight = $(window).height();
        tableResize(resizedHeight);
    });

    // Only listens for the submit on the Home page
    getCharts();
    submit.on("click", function () {
        GetSelectedValue();
        $('html,body').animate({
            scrollTop: $("#animation-div").position().top,

        },
            fadeDuration);
    })
    // Checks if the enter key is pressed in the input
    $('#myInput').keydown(function (event) {
        if (event.keyCode == '13') {
            $("#search").click();
        }

    });
    // Gets a date to display on the chart's page
    let date = new Date();
    $("#date").html(date.toLocaleString())
    // console.log(date)    
})


// Get the selected value from the dropdown on the home page
function GetSelectedValue() {
    let e = document.getElementById("option-menu");
    let result = e.options[e.selectedIndex].value;
    // $(e).focus();
    $(result).toggleClass('active');
    searchTheAPI(result);
}

// Search the API
function searchTheAPI(result) {
    let input;
    let searchType = result;
    // Sets to input to equal the value in the input feild
    input = $("#myInput").val();
    if (input.length === 0) {
        $(".info-text").html("<h1>Invalid Input</h1>")
    } else {
        // if the Search Type equal album then searches the album endpoint and displays the data in cards
        if (searchType === "album") {
            apiUrl(searchType, input)
                .then(function (response) {
                    // Animations
                    $(".song-search-div").fadeOut(fadeDuration);
                    $(".list-songs-div").fadeOut(fadeDuration);

                    let albumArray = response.results.albummatches.album;
                    let rows = createAlbumCards(albumArray);

                    $(".artist-cards").html(`<center><h2>Search Results for ${input}</h2></center>${rows.join("")}`);
                    $(".artist-cards").fadeIn(fadeDuration);
                })
        } else if (searchType === "song") { // Checks to see if the dropdown value is Song and if it is goes to the songs endpoint and displays the data
            apiUrl(searchType, input)
                .then(function (response) {
                    // Animations
                    $(".artist-cards").fadeOut(fadeDuration);
                    $(".list-songs-div").fadeOut(fadeDuration);

                    trackArray = response.results.trackmatches.track;
                    let rows = createSongsCards(trackArray);

                    $(".song-search-div").html(`<div class="song-search-outer"><h2>Search Results for ${input}</h2>${rows.join("")}</div>`);
                    $(".song-search-div").fadeIn(fadeDuration);
                })

            // Sets the drop down value to a empty string
            dropdownValue = "";
        }
    }
}
// Create the Cards
function createSongsCards(trackArray) {
    let rows = [];
    let newTrackArray = [];
    let NumberPerRow = 4;
    trackArray.forEach(function (track, index) {
        newTrackArray.push(`<div class="card songs-search col-sm-6 col-md-3 col-lg-2"><h4>${track.name}</h4><p>Artist: ${track.artist}<br>Total listens: ${(numberWithCommas(track.listeners))}</p></div>`);
        if ((index + 1) % NumberPerRow === 0 || (index + 1) === trackArray.length) {
            rows.push(`<div class="row">${newTrackArray.join("")}</div>`);
            newTrackArray.length = 0;
        }
    })
    return rows;
}
function createAlbumCards(albumArray) {
    let rows = [];
    let cardRow = [];
    let NumberPerRow = 12;
    albumArray.forEach(function (album, index) {
        let albumImage = checkIfImageExists(album);
        cardRow.push(`<div class="card col-sm-12 col-md-6 col-lg-4">${albumImage}<h1>${album.artist}</h1><p class="title">${album.name}</p><button class="viewAlbum-songs"id="view-songs${index}">View Songs</button></div>`);
        if ((index + 1) % NumberPerRow === 0 || (index + 1) === albumArray.length) {
            rows.push(`<div class="row">${cardRow.join("")}</div>`);
            cardRow.length = 0;
        }
        getSongs(album, index);
    })
    return rows;
}


// Switch statement that checks to see if the input is album or song, or if they are on the chart's page then its set to chart
function apiUrl(searchType, input) {
    let limit;
    let searchBy;
    switch (searchType) {
        case "album":
            searchBy = "album.search&album=";
            limit = "20";
            break;
        case "song":
            searchBy = "track.search&track=";
            limit = "20";
            break;
        case "chart":
            searchBy = "chart.gettoptracks";
            input = "";
            limit = "100";
            break;
        default:
            console.log("unKnown Input", searchBy);

    }
    return (
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `${baseUrl}/2.0/?method=${searchBy}${input}&api_key=${apiKey}&limit=${limit}&format=json`,
            "method": "GET",
        }))
}

// Gets the song when you click on the album/artist card
function getSongs(album, index) {
    let albumImage = checkIfImageExists(album);
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": `${baseUrl}/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${album.artist}&album=${album.name}&format=json`,
        "method": "GET",
    }).then(function (data) {
        let arrayOfTracks = data.album.tracks.track;

        if (arrayOfTracks.length < 1 || arrayOfTracks === undefined) {
            $(`#view-songs${index}`).html(`<p class="mt-1">Sorry no songs</p>`);
        }

        let trackArray = [];
        arrayOfTracks.forEach(function (track) {

            $(`#view-songs${index}`).on("click", function () {
                $(".artist-cards").fadeOut(fadeDuration);

                trackArray.push(`<div class="card col-sm-6 col-md-4 col-lg-3 ml-auto mr-auto" style="height:100px"><div class="track-name"><h4>${track.name}</h4></div><div class="track-duration"><p>Duration: ${turnSec(track.duration)}</p></div></div>`);
                $(".list-songs-div").html(`<div class="album-songs">${albumImage}<div class="list-songs">${trackArray}</div></<div>`);
                $(".list-songs-div").fadeIn(fadeDuration);
            })
        })
    })
}

function checkIfImageExists(album) {
    let imageIndex = 2;
    let albumImage;
    if (album.image.length >= imageIndex) {
        if (album.image[imageIndex]["#text"] === "") {
            albumImage = `<img class="no-imagesizeing" src="assets/images/no-image-available.png">`;
        }
        else {
            albumImage = `<img src="${album.image[imageIndex]["#text"]}">`;
        }
    }
    return albumImage;
}

// Searches the api for the top 100 songs(cause i set it to only give back 100), then turns this response into arrays of 4 items, gives this data to the dataTables
// and displays them nicely on the page for us
function getCharts() {
    let tableRows = [];
    apiUrl("chart")
        .then(function (response) {
            let tracksArray = response.tracks.track;
            tracksArray.forEach(function (track, index) {
                let dataRow = [];
                let newIndex = index + 1;
                let trackName = track.name;
                let artistName = track.artist.name;
                let playCount = numberWithCommas(track.playcount);

                dataRow.push(newIndex);
                dataRow.push(trackName);
                dataRow.push(artistName);
                dataRow.push(playCount);
                tableRows.push(dataRow);
            })
            buildTable(tableRows);
        })

}

// turns the given intager into seconds
function turnSec(s) {
    var minutes = ("00" + Math.floor((s % 3600) / 60)).slice(-2);
    let seconds = ("00" + (s % 3600) % 60).slice(-2);
    return minutes + ":" + seconds;
}
// divides a digit with a comma eg:3,540,343 = 3,540,343
function numberWithCommas(num) {
    let numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
}
// Builds DataTable 
function buildTable(array) {
    table = $("#chart-table").DataTable({
        data: array,
        lengthChange: false,
        responsive: true,
        autoWidth: false,
        language: {
            searchPlaceholder: "Search Charts",
            search: "",
        },
        columns: [
            { title: "#", width: "5%" },
            { title: "Name", width: "15%" },
            { title: "Artist", width: "10%" },
            { title: "Play Count", width: "10%" }
        ]
    });
    tableResize(height);
}
// Sets the size of DataTable
function tableResize(height) {
    if (height > 670) {
        table.page.len(25).draw();
    } else {
        table.page.len(10).draw();
    }
}
// https://stackoverflow.com/questions/895659/how-do-i-block-or-restrict-special-characters-from-input-fields-with-jquery
// i added \s so people can input spaces
$('#myInput').on('input', function () {
    $(this).val($(this).val().replace(/[^a-zA-Z0-9\s]/gi, ""));
});

# WikiMusic
## Overview
The name came from the idea that wikipedia is a encyclopedia for information and WikiMusic is for music.

## UX
In this project I wish to achieve a UX that is a nice and simple way to find some information based on search criteria.
I made the colors easy to look at and the pictures as calming and relaxing as possible.
I created the website as a single page application, showing the current top 100 songs and the ability to search for an Artist, Album or Song.
## Features
### Existing Functionality

1. Mobile first responsive design so that the application looks good and performs well on multiple device resolution.
2. The search form allows you to search for an Artist, Album or Song name Using the [LastFM](https://www.last.fm/api/) API.
3. You can search for an Artist, Album or Song. Following an Album search, you can click on the view songs button to view the songs in that Album.
4. View top 100 songs is a table that shows you the current top 100 songs. You can also sort them by rank, name Artist and playcount. You can search for songs in the top 100.
5. The top 100 charts is responsive and goes from showing 10 on each page to showing 25 when the resolution passes a certain breakpoint.



### Future Enhancements
1. If I was doing this in the future I would love to use [Spotifys](https://developer.spotify.com/) api and be able to play music because with lastFM api I wasn't able to do this.
2. I Would like to add smoother animations.
3. I would like to be able to think of a good plan for the website, I struggled a bit to think of a name and what exactly am I trying to do.
4. Would like to make it more professional.

## Technologies Used
1. [HTML5](https://en.wikipedia.org/wiki/HTML5 )
    1. I used HTML for the basic structure of the website.
2. [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets )
    1. CSS was used to style the HTML.
    2. The style sheet was mostly kept separate from the html.
3. [Bootstrap Version 4.4.1](https://getbootstrap.com/ )
    1. Bootstrap components such as grid, card, button, table, navbar where used in my project to simplify creating responsive web application.
4. [Jquery](https://jquery.com/)
    1. Jquery was used for document traversal and manipulation, event handling, animation, and Ajax.
5. [LastFM](https://www.last.fm/api/)
    1. I used lastFM's API to retrieve information about albums and songs.
6. [DataTables](https://datatables.net/)
    1. I used DataTables to layout my chart and to implement the pagination buttons and search bar. 
7. [VSCODE](https://code.visualstudio.com/) 
    1. VSCODE was used as the development environment.
8. [Github](https://github.com/)
    1. Github was used for my version control in the project. 
9. [Font-awesome Version 5.11.1](https://fontawesome.com/) 
    1. Font-awesome was used to get some icon for my footer.


## Testing
1. I used Chrome Dev Tools for debug Testing.
    1. I used the inspect feature to check different elements on my page.
    2. I used the coverage tab to check my css was being used on the given page.
    3. I used the network tab to see what was taking a long time to load and what wasn't loading.
    4. I used the computed tab to see the final state of a given element.
    5. I used the device toolbar to check that my website was rendered in a responsive manner on all device's.
    6. I installed the chrome [Lighthouse](https://developers.google.com/web/tools/lighthouse) plugin to use the audit feature to check Performance, progressive web app, Best practices, accessibility and SEO.
2. Application Testing
    1. I tested that everything worked okay when resizing the browser.
    2. I ran all my tests on localhost (root website) then pushed it onto github (where ran off the subdomain). Checked that all resources loaded properly off the root and subdomain.
    4. I put console logs where the data changed values in my code to find bug.
    5. I checked the chrome console for errors and what line they where on and fixed bugs this way too.
    6. I checked on mobile to see that everything was working correctly.
    7. When I was implementing the animations I had some problems with it working on mobile but after looking up a few threads I found a solution
    8. I tried to get the application to work on safari on mobile but couldn't seem to get it working properly. There is content overflow due to font rendering and I couldn't solve this problem. I changed the size of the buttons and this didn't work on iphone in safari but worked for chrome. buttons wrapped but on safari it didn't. I ran my css through an [autoprefixer](https://autoprefixer.github.io) but this didn't seem to fix the problem.
    9. When you have the top 100 charts showing 25 on each page if you search the charts you then get white space at the bottom of the page below the footer. I might be a better ux if the footer stayed at the bottom of the page and the body expanded to fill the space
    10. When I started the project I tried many different apis including [Deezer](https://developers.deezer.com/) and [Spotify's](https://developer.spotify.com/) api but wasn't able to use these because they required a application server.

## Deployment
I used [Live Server](https://github.com/ritwickdey/vscode-live-server) on my windows PC and once I was happy I committed to github to check that everything ran smoothly there as well. 

## Credits
### Content
I used [Bootstrap Version 4.4.1](https://getbootstrap.com/) grid system.
I used [DataTables](https://datatables.net/) to present my table.
I used [StackOverflow](https://stackoverflow.com/) to solve problems that I couldn't figure out
### Media
I used [Pexels](https://www.pexels.com/) for my images.    
### Acknowledgements
I got one of my friends to help me set up a [Firebase](https://firebase.google.com/) server but this was way to complex for me to follow and thought it would be best for me to not use it.



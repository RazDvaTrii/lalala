function loader() {
    // document.getElementById('submitButton').style.display = "none";
    document.getElementById('loaderGif').style.display = "block";
    document.getElementById('loaderBack').style.display = "block";
    setTimeout(function() {
    document.getElementById('loaderGif').style.display = "none";
    document.getElementById('loaderBack').style.display = "none";
    },2100);  
  }
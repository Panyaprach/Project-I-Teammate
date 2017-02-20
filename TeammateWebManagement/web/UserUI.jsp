<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
    <title>Teammate Finder Management</title>
  </head>
  <body>
    <!-- Navigation Animation
    <nav class="w3-sidenav w3-white w3-border w3-animate-left" style="display:none" id="mySidenav">
      <a href="javascript:void(0)" onclick="w3_close()"
      class="w3-closenav w3-large w3-teal">Close &times;</a>
    -->
    <nav class="w3-sidenav w3-white w3-border" style="display:15%">
      <a class="w3-border-bottom w3-teal w3-large" href="#">Menu</a>
      <a class="w3-border-bottom w3-gray" href="#">User</a>
      <a class="w3-border-bottom" href="AdvertiseUI.jsp">Advertise</a>
      <a class="w3-border-bottom" href="MadicalUI.jsp">Madical</a>
      <a class="w3-border-bottom" href="LocationUI.jsp">Location</a>
      <a class="w3-border-bottom" href="SportUI.jsp">Sport</a>
    </nav>

    <div id="main" style="margin-left:15%" class="w3-animate-opacity">
      <header class="w3-container w3-teal">
      <!-- Navigation Animation icon
        <span class="w3-opennav w3-xlarge" onclick="w3_open()" id="openNav">&#9776;</span>
      -->
        <h1>Teammate Finder</h1>
      </header>
      <!--Do Something Here-->
      <div class="w3-container w3-teal">
        <h3>User</h3>
      </div>

      <table><tr><td>
      <form class="w3-container" action="#">
        <p>
        <label class="w3-label w3-text-teal"><b>First Name</b></label>
        <input class="w3-input w3-border w3-sand" name="first" type="text"></p>
        <p>
        <label class="w3-label w3-text-teal"><b>Last Name</b></label>
        <input class="w3-input w3-border w3-sand" name="last" type="text"></p>
        <p>
        <button class="w3-btn w3-teal">Add</button></p>
      </form>
      </td></tr></table>
    </div>
    <!-- Side-Navigation animation function
    <script>
      function w3_open() {
        document.getElementById("main").style.marginLeft = "15%";
        document.getElementById("mySidenav").style.width = "15%";
        document.getElementById("mySidenav").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
      }
      function w3_close() {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidenav").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
      }
    </script>
    -->
  </body>
</html>

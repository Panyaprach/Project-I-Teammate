
<%@page import="database.service.Medical"%>
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
            <a class="w3-border-bottom" href="CustomerController">Customer</a>
            <a class="w3-border-bottom" href="AdvertiseController">Advertise</a>
            <a class="w3-border-bottom w3-gray" href="#">Medical</a>
            <a class="w3-border-bottom" href="LocationController">Location</a>
            <a class="w3-border-bottom" href="SportController">Sport</a>
        </nav>

        <div id="main" style="margin-left:15%" class="w3-animate-opacity">
            <header class="w3-container w3-teal">
                <!-- Navigation icon
                  <span class="w3-opennav w3-xlarge" onclick="w3_open()" id="openNav">&#9776;</span>
                -->
                <h1>Teammate Finder</h1>
            </header>
            <!--Do Something Here-->
            <div class="w3-container w3-teal">
                <h3>Medical</h3>
            </div>
            <label class="w3-label w3-text-teal"><b>Update</b></label>
            <p>
                <a href="MedicalController" class="w3-btn w3-red w3-right"> Back </a>
            </p>
            <form class="w3-container" action="UpdateMedicalController" accept-charset="UTF-8">
                <%
                    try {
                        Medical ad = (Medical) session.getAttribute("listResultMedical");
                %>
                <br>
                <img src="<%= ad.getImagePath()%>" width="300">
                <input type="hidden" name="id" value="<%= ad.getId()%>">
                <p>
                    <label>Content</label>
                    <input name="content" class="w3-input w3-animate-input" style="width:30%" type="text" value="<%= ad.getContent()%>"></p>
                <p>
                    <label>Description</label>
                    <input name="description" class="w3-input w3-animate-input" style="width:30%" type="text" value="<%= ad.getDescription()%>"></p>
                <p>
                    <label>Picture</label>
                    <input name="pic"class="w3-input w3-animate-input" style="width:30%" type="text" value="<%= ad.getImagePath()%>"></p>  
                <p><input type="hidden" name="img_id" value="<%=ad.getImg_id()%>">
                <button class="w3-btn w3-teal" type="submit">Update</button>
                <%
                    } catch (Exception e) {

                    }
                %>
            </form>
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
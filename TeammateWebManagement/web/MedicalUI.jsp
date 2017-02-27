<%@page import="database.service.Medical"%>
<%@page import="java.util.List"%>
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
            <a class="w3-border-bottom  w3-gray" href="#">Medical</a>
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
                <h3>Madical</h3>
            </div>
            <form class="w3-container">
                <p>
                    <label>Content</label>
                    <input class="w3-input" type="text"></p>
                <p>
                    <label>Description</label>
                    <input class="w3-input" type="text"></p>
                <p>
                    <label>Picture</label>
                    <input class="w3-input" type="text"></p>
                <center>
                    <table>
                        <tr>
                            <td>
                                <button class="w3-btn w3-teal">Add</button>
                            </td>
                            <td>
                                <button class="w3-btn w3-teal">Update</button>
                            </td>
                            <td>
                                <button class="w3-btn w3-teal">Delete</button>
                            </td>
                        </tr>
                    </table>
                </center>
            </form>
            <%
                try {
                    List<Medical> medicalList = (List<Medical>) session.getAttribute("listResultMedical");
                    if (medicalList != null) {
            %>
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <td>id</td>
                    <td>content</td>
                    <td>description</td>
                    <td>image</td>
                </tr>
                <%
                    for (Medical acc : medicalList) {
                %>
                <tr>
                    <td><% out.println(acc.getId()); %></td>
                    <td><% out.println(acc.getContent()); %></td>
                    <td><% out.println(acc.getDescription()); %></td>  
                    <td><% out.println(acc.getImage()); %></td>   
                </tr>
                <%
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                %>
            </table>
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

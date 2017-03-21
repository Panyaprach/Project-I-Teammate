<%@page import="database.service.Customer"%>
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
            <a class="w3-border-bottom w3-gray" href="#">Customer</a>
            <a class="w3-border-bottom" href="AdvertiseController">Advertise</a>
            <a class="w3-border-bottom" href="MedicalController">Medical</a>
            <a class="w3-border-bottom" href="LocationController">Location</a>
            <a class="w3-border-bottom" href="SportController">Sport</a>
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
            <label class="w3-label w3-text-teal"><b>Search</b></label>
            <form class="w3-container" action="SearchCustomerControl">
                <table>
                    <tr>
                        <td>
                            <p><input class="w3-input w3-border w3-sand" name="search" type="text"></p>
                        </td>
                        <td>
                            <button class="w3-btn w3-teal" type="submit">Search</button>
                        </td>
                    </tr>
                </table>
            </form>
            <%
                try {
                    List<Customer> customerList = (List<Customer>) session.getAttribute("listResultCustomer");
                    if (customerList != null) {
            %>
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <td></td>
                    <td><b>Picture</b></td>
                    <td><b>ID</b></td>
                    <td><b>Username</b></td>
                    <td><b>Name</b></td>
                    <td><b>Date of birth</b></td>
                    <td><b>Status</b></td>
                </tr>
                <form action="BanControl">
                    <%
                        for (Customer acc : customerList) {
                    %>
                    <tr>
                        <td><input class="w3-check" type="checkbox" name="ban" value="<%= acc.getC_id()%>"></td>
                            <% if (acc.getImg_id() != 0) {%>
                        <td><img src="<%= acc.getImagePath()%>" width="75"></td>
                            <% } else { %>
                        <td><img src="http://www.magicalmaths.org/wp-content/uploads/2012/11/questions_answers_5.jpg" width="100"></td>
                            <% } %>
                        <td><% out.println(acc.getC_id()); %></td>
                        <td><% out.println(acc.getUsername()); %></td>
                        <td><% out.println(acc.getFirstname() + " " + acc.getLastname()); %></td>  
                        <td><% out.println(acc.getBirthdate()); %></td> 
                        <td><% out.println(acc.getStatus()); %></td>
                    </tr>
                    <%
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    %>
            </table>     
            <center><p>
                    <button class="w3-btn w3-red" type="submit">Ban</button>
                    </form>
                </p></center>
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

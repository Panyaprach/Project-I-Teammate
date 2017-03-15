<%@page import="database.service.Medical"%>
<%@page import="java.util.List"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
            <form class="w3-container" method="post" action="AddMedicalController" accept-charset="UTF-8" enctype="multipart/form-data">
                <p>
                    <label>Content</label>
                    <input name="content" class="w3-input w3-animate-input" style="width:30%" type="text"></p>
                <p>
                    <label>Description</label>
                    <input name="description" class="w3-input w3-animate-input" style="width:30%" type="text"></p>
                <p>
                    <label>Picture</label>
                    <input name="pic"class="w3-input" style="width:30%" type="file"></p>  
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="w3-btn w3-teal" type ="submit">Add</button>
                </p>
            </form>
            <%
                try {
                    List<Medical> medicalList = (List<Medical>) session.getAttribute("listResultMedical");
                    if (medicalList != null) {
            %>
            
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <td>Picture</td>
                    <td>ID</td>
                    <td>Content</td>
                    <td>Description</td>
                    <td></td>
                </tr>
                <%
                    int count=0;
                    for (Medical acc : medicalList) {
                    String updateId = "update"+count;
                        String deleteId = "delete"+count;
                        count++;       
                %>
                <tr>    
                    <td><img src="<%= acc.getImagePath() %>" width="100"></td>
                    <td><% out.println(acc.getId()); %></td>
                    <td><% out.println(acc.getContent()); %></td>
                    <td><% out.println(acc.getDescription()); %></td>
                    <td>
                        <div class="w3-padding w3-xlarge w3-text-teal">
                            <form id="<%= updateId%>" action="UpdateMedicalJSPController">
                                <input type="hidden" name="id" value="<%=acc.getId()%>">
                                <a href="#" onclick="document.getElementById('<%= updateId%>').submit()"><i class="material-icons">content_paste</i></a>
                            </form>
                            <form id="<%= deleteId%>" action="DeleteMedicalController">
                                <input type="hidden" name="id" value="<%=acc.getId()%>">
                                <a href="#" onclick="document.getElementById('<%= deleteId%>').submit()" ><i class="material-icons">delete</i></a>
                            </form>
                        </div>
                    </td>
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

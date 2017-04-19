
package database.service;

import java.io.*;
import java.sql.Date;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet(name = "AddAdvertiseController", urlPatterns = {"/AddAdvertiseController"})
@MultipartConfig
public class AddAdvertiseController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String content = request.getParameter("content");
            content = new String(content.getBytes("iso-8859-1"),"utf-8");
            String description = request.getParameter("description");
            description = new String(description.getBytes("iso-8859-1"),"utf-8");
            String path = request.getParameter("pic");
            String expired = request.getParameter("expired");
            int year = Integer.parseInt(expired.substring(0,4));
            int month = Integer.parseInt(expired.substring(5, 7));
            int day = Integer.parseInt(expired.substring(8, 10));
            Date expired_date = new Date(year-1900,month-1,day);
            System.out.println(expired_date);
           try{
               Image image = new Image();
               image.setPath(path);
               image.insertImage();
               //out.print(content+" "+description);
               Advertise ads = new Advertise();
               ads.setContent(content);
               ads.setDescription(description);
               ads.setExpired_date(expired_date);
               ads.insertAdvertise(path);
           } catch(Exception e){
               e.printStackTrace();
           }
            RequestDispatcher rd = request.getRequestDispatcher("AdvertiseController");
            rd.forward(request, response);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
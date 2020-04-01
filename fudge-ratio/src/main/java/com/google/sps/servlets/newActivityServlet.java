package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/new-act")
public class newActivityServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        //Get the name of the activity and the new time taken to complete it
        String name = request.getParameter("name");
        String newTime = (String)request.getParameter("newTime");
        String type = (String) request.getParameter("type");

        //Find this activity in datastore
        Entity result = new Entity("Activity");

        //Setting properties to entity
        result.setProperty("name", name);
        result.setProperty("expectedTime", newTime);
        result.setProperty("type", type);
        result.setProperty("numUsed", 1);

        //Posting new entity 
        datastore.put(result);
        response.sendRedirect("/ActivitiesManager.html");
    }
}
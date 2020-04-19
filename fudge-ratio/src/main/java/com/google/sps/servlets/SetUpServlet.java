package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.PreparedQuery.TooManyResultsException;
import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;

@WebServlet("/setup")
public class SetUpServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        //Getting activities that exist
        Query query = new Query("Activity");
        PreparedQuery results = datastore.prepare(query);
        Set activities = new HashSet();

        for (Entity entity : results.asIterable()) {
            String name = (String) entity.getProperty("name");
            activities.add(name);
        }

        //Creating new ones
        String[] names = {"Math", "Computer Science", "English", "Science", "History", 
                            "Music", "Art", "Paperwork", "Emails", "Cleaning", "Cooking", 
                            "Shopping"};

        String[] types = {"Schoolwork", "Schoolwork", "Schoolwork", "Schoolwork", "Schoolwork", 
                            "Schoolwork", "Schoolwork", "Job-related tasks", "Job-related tasks", 
                            "Housework", "Housework", "Housework"};

        double expectedTime = 0.00;
        double avgFudgeRatio = 0.00;
        long numUsed = 0;

        for (int i = 0; i < names.length; i++) {
            if(activities.contains(names[i])) {
                continue;
            }
            Entity result = new Entity("Activity");

            result.setProperty("name", names[i]);
            result.setProperty("avgTime", expectedTime);
            result.setProperty("type", types[i]);
            result.setProperty("avgFudge", avgFudgeRatio);
            result.setProperty("numUsed", numUsed);
            datastore.put(result);
        }

        response.sendRedirect("/index.html");
    }
}
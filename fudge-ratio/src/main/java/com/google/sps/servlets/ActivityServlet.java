package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.PreparedQuery.TooManyResultsException;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.io.IOException;
import com.google.gson.Gson;
import com.google.sps.data.Activity;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/data")
public class ActivityServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        //Get the name of the activity and the new time taken to complete it
        String name = request.getParameter("name");
        String newTimeString = (String)request.getParameter("newTime");
        Double newTime = Double.parseDouble(newTimeString);

        //Find this activity in datastore
        Query query = new Query("Activity").setFilter(new FilterPredicate("name", FilterOperator.EQUAL, name));
        PreparedQuery pq = datastore.prepare(query);
        Entity result = pq.asSingleEntity();

        //Update number of times that activity was done
        int numUsed = (int) result.getProperty("numUsed");
        numUsed = numUsed + 1;

        //Update expected time for activity
        String expectedTimeString = (String) result.getProperty("expectedTime");
        Double expectedTime = Double.parseDouble(expectedTimeString);
        expectedTime = (expectedTime + newTime) / numUsed;

        //Setting properties to entity
        result.setProperty("expectedTime", expectedTime);
        result.setProperty("numUsed", numUsed);

        //Posting new entity 
        datastore.put(result);
        response.sendRedirect("/index.html");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Activity");

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);

        List<Activity> activities = new ArrayList<>();
        for (Entity entity : results.asIterable()) {
            long id = entity.getKey().getId();
            String name = (String) entity.getProperty("name");
            String type = (String) entity.getProperty("type");
            String expectedTime = (String) entity.getProperty("expectedTime");
            long numUsed = (long) entity.getProperty("numUsed");

            Activity activity = new Activity(id, name, type, expectedTime, numUsed);
            activities.add(activity);
        }

        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(activities));
  }
}
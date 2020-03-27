package com.google.sps.servlets;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.gson.Gson;
import java.util.*; 
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/data")
public class DataServlet extends HttpServlet {


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    }



    private double calculateRatio(String start, String end, int expected){
        //parse the starting time time string (in format 00:00:00 (hrs:min:second))
        int startHr = Integer.parseInt(start.substring(0, 2));
        int startMin = Integer.parseInt(start.substring(3, 5));
        int startSec = Integer.parseInt(start.substring(6, 8));

        //parse the ending time time string (in format 00:00:00 (hrs:min:second))
        int endHr = Integer.parseInt(end.substring(0, 2));
        int endMin = Integer.parseInt(end.substring(3, 5));
        int endSec = Integer.parseInt(end.substring(6, 8));

        //convert the starting time to minutes
        double startInMinutes = (startHr * 60) + startMin + (startSec / 60);
        //convert the ending time to minutes
        double endInMinutes = (endHr * 60) + endMin + (endSec / 60);
        //calculate duration and ratio
        double actualDuration = endInMinutes - startInMinutes;
        double ratio = actualDuration / expected; 
        return ratio;
    }
}

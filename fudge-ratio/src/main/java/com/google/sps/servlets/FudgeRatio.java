package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;
import com.google.gson.Gson;

@WebServlet("/data")
public class FudgeRatio extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	throws IOException {
		final String start = request.getParameter("start");
		final String end = request.getParameter("end");
		final int expected = Integer.parseInt(request.getParameter("expected"));

		final Gson gson = new Gson();
		final Map < String,
		Double > result = new HashMap < String,
		Double > ();
		result.put("ratio", calculateRatio(start, end, expected));

		response.setContentType("application/json;");
		response.getWriter().println(gson.toJson(result));
	}


    /**
     * Changes the fudege ratio (actual/expected time) by converting start and end time to seconds.
     * @param start   This is the user's start time for a task. 
     *                This is a string in the format "00:00:00" (hrs:min:second)
     *
     * @param end     This is the end time of the task, in the 
     *                same format as the start string.
     */
    private double calculateRatio(String start, String end, int expected){
        //parse the starting time string 
        final int startHr = Integer.parseInt(start.substring(0, 2));
        final int startMin = Integer.parseInt(start.substring(3, 5));
        final int startSec = Integer.parseInt(start.substring(6, 8));

        //parse the ending time string 
        final int endHr = Integer.parseInt(end.substring(0, 2));
        final int endMin = Integer.parseInt(end.substring(3, 5));
        final int endSec = Integer.parseInt(end.substring(6, 8));

        //convert the starting time to seconds
        double startInSeconds = (startHr * 3600) + (startMin * 60) + startSec;
        //convert the ending time to seconds
        double endInSeconds = (endHr * 3600) + (endMin * 60) + endSec;
        //calculate duration and ratio
        double actualDuration = endInSeconds  - startInSeconds;
        double ratio = actualDuration / expected; 
        return ratio;
    }
}
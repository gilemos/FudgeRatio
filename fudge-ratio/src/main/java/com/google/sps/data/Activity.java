package com.google.sps.data;
import java.util.ArrayList; 

public final class Activity {

    private final long id; //Activity unique id
    private final String name; //Activity name
    private final String type; //Type of the activity
    private final double avgDuration; //Average time to complete activity (in minutes)
    private final double avgFudgeRatio; //Average fudge ratio
    private final long numUsed; //Number of times the activity was done

    public Activity(long id, String name, String type, long numUsed, double avgDuration, double avgFudge) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.numUsed = numUsed;
        this.avgDuration = avgDuration;
        this.avgFudgeRatio = avgFudge;
    }
}
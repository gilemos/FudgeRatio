package com.google.sps.data;
import java.util.ArrayList; 

public final class Activity {

    private final long id; //Activity unique id
    private final String name; //Activity name
    private final String type;
    private final String expectedDuration; //Expected time to complete activity
    private final long numUsed; //Number of times the activity was done

    public Activity(long id, String name, String type, String expectedDuration, long numUsed) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.expectedDuration = expectedDuration;
        this.numUsed = numUsed;
    }
}
package com.smartdine.dto;

public class AiResponse {

    private String reply;
    private String intent;
    private Object data;

    public AiResponse() {}

    public AiResponse(String reply, String intent, Object data) {
        this.reply = reply;
        this.intent = intent;
        this.data = data;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
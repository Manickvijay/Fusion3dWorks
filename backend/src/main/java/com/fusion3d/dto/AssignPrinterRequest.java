package com.fusion3d.dto;

public class AssignPrinterRequest {
    private String orderId;
    private String printerId;
    private String timeShift = "Daytime Quick Turnaround";

    public AssignPrinterRequest() {}

    public AssignPrinterRequest(String orderId, String printerId, String timeShift) {
        this.orderId = orderId;
        this.printerId = printerId;
        this.timeShift = timeShift;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getPrinterId() {
        return printerId;
    }

    public void setPrinterId(String printerId) {
        this.printerId = printerId;
    }

    public String getTimeShift() {
        return timeShift;
    }

    public void setTimeShift(String timeShift) {
        this.timeShift = timeShift;
    }
}

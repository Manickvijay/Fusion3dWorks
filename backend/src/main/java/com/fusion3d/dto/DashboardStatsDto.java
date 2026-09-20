package com.fusion3d.dto;

import java.util.Map;

public class DashboardStatsDto {
    private double totalRevenue;
    private int totalOrders;
    private int activeOrders;
    private int completedOrders;
    private int printersTotal;
    private int printersBusy;
    private int registeredUsersCount;
    private Map<String, Integer> ordersByStatus;

    public DashboardStatsDto() {}

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public int getActiveOrders() {
        return activeOrders;
    }

    public void setActiveOrders(int activeOrders) {
        this.activeOrders = activeOrders;
    }

    public int getCompletedOrders() {
        return completedOrders;
    }

    public void setCompletedOrders(int completedOrders) {
        this.completedOrders = completedOrders;
    }

    public int getPrintersTotal() {
        return printersTotal;
    }

    public void setPrintersTotal(int printersTotal) {
        this.printersTotal = printersTotal;
    }

    public int getPrintersBusy() {
        return printersBusy;
    }

    public void setPrintersBusy(int printersBusy) {
        this.printersBusy = printersBusy;
    }

    public int getRegisteredUsersCount() {
        return registeredUsersCount;
    }

    public void setRegisteredUsersCount(int registeredUsersCount) {
        this.registeredUsersCount = registeredUsersCount;
    }

    public Map<String, Integer> getOrdersByStatus() {
        return ordersByStatus;
    }

    public void setOrdersByStatus(Map<String, Integer> ordersByStatus) {
        this.ordersByStatus = ordersByStatus;
    }
}

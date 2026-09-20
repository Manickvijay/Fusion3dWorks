package com.fusion3d.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "printers")
public class Printer {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String type;
    private String status = "Idle"; // "Idle", "Printing", "Maintenance", "Calibrating"
    private String currentJobId;
    private String currentJobName;
    private String layerProgress = "0 / 0";
    private int percentage = 0;
    private String timeLeft = "--";
    private String tempNozzle = "24°C";
    private String tempBed = "25°C";
    private String preferredShift;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "printer_spool_colors", joinColumns = @JoinColumn(name = "printer_id"))
    @Column(name = "color_hex")
    private List<String> spoolColors = new ArrayList<>();

    public Printer() {}

    public Printer(String id, String name, String type, String status, String currentJobId, String currentJobName, String layerProgress, int percentage, String timeLeft, String tempNozzle, String tempBed, List<String> spoolColors, String preferredShift) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.currentJobId = currentJobId;
        this.currentJobName = currentJobName;
        this.layerProgress = layerProgress;
        this.percentage = percentage;
        this.timeLeft = timeLeft;
        this.tempNozzle = tempNozzle;
        this.tempBed = tempBed;
        if (spoolColors != null) {
            this.spoolColors = spoolColors;
        }
        this.preferredShift = preferredShift;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentJobId() {
        return currentJobId;
    }

    public void setCurrentJobId(String currentJobId) {
        this.currentJobId = currentJobId;
    }

    public String getCurrentJobName() {
        return currentJobName;
    }

    public void setCurrentJobName(String currentJobName) {
        this.currentJobName = currentJobName;
    }

    public String getLayerProgress() {
        return layerProgress;
    }

    public void setLayerProgress(String layerProgress) {
        this.layerProgress = layerProgress;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public String getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(String timeLeft) {
        this.timeLeft = timeLeft;
    }

    public String getTempNozzle() {
        return tempNozzle;
    }

    public void setTempNozzle(String tempNozzle) {
        this.tempNozzle = tempNozzle;
    }

    public String getTempBed() {
        return tempBed;
    }

    public void setTempBed(String tempBed) {
        this.tempBed = tempBed;
    }

    public String getPreferredShift() {
        return preferredShift;
    }

    public void setPreferredShift(String preferredShift) {
        this.preferredShift = preferredShift;
    }

    public List<String> getSpoolColors() {
        return spoolColors;
    }

    public void setSpoolColors(List<String> spoolColors) {
        this.spoolColors = spoolColors;
    }
}

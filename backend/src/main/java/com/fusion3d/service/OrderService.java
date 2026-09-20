package com.fusion3d.service;

import com.fusion3d.dto.CreateOrderDto;
import com.fusion3d.dto.OrderItemDto;
import com.fusion3d.dto.OrderStatusUpdateRequest;
import com.fusion3d.model.Order;
import com.fusion3d.model.OrderItem;
import com.fusion3d.model.OrderTimelineStep;
import com.fusion3d.model.Printer;
import com.fusion3d.repository.OrderRepository;
import com.fusion3d.repository.PrinterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService {

    public static final List<String> PIPELINE_STAGES = List.of(
            "Order Placed",
            "Design Stage",
            "Preview Design Sent",
            "Ready for Printing",
            "Printing Started",
            "Printing Complete",
            "QA Testing the Product",
            "Packing",
            "Shipping to Delivery Partner",
            "Delivered"
    );

    private static final Map<String, Integer> STAGE_PROGRESS = Map.of(
            "Order Placed", 10,
            "Design Stage", 20,
            "Preview Design Sent", 35,
            "Ready for Printing", 50,
            "Printing Started", 65,
            "Printing Complete", 78,
            "QA Testing the Product", 85,
            "Packing", 90,
            "Shipping to Delivery Partner", 95,
            "Delivered", 100
    );

    private final OrderRepository orderRepository;
    private final PrinterRepository printerRepository;

    public OrderService(OrderRepository orderRepository, PrinterRepository printerRepository) {
        this.orderRepository = orderRepository;
        this.printerRepository = printerRepository;
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmailIgnoreCaseOrderByCreatedAtDesc(email);
    }

    @Transactional(readOnly = true)
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrder(CreateOrderDto dto) {
        String orderId = "ORD-" + (1000 + new Random().nextInt(9000));
        String trackingNumber = "BD-" + (10000000 + new Random().nextInt(90000000));

        Order order = new Order();
        order.setId(orderId);
        order.setDate(LocalDate.now().toString());
        order.setTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        order.setCreatedAt(System.currentTimeMillis());

        order.setCustomerName(dto.getCustomerName() != null ? dto.getCustomerName() : "Valued Maker");
        order.setCustomerEmail(dto.getCustomerEmail() != null ? dto.getCustomerEmail() : "user@gmail.com");
        order.setCustomerPhone(dto.getCustomerPhone() != null ? dto.getCustomerPhone() : "+1 (555) 438-9021");

        order.setSubtotal(dto.getSubtotal());
        order.setShippingFee(dto.getShippingFee());
        order.setTotal(dto.getTotal());
        order.setPaymentMethod(dto.getPaymentMethod() != null ? dto.getPaymentMethod() : "Credit Card (Stripe Encrypted)");

        order.setStatus("Order Placed");
        order.setStatusProgress(10);
        order.setEstimatedCompletion("In 24–48 hours");
        order.setTrackingNumber(trackingNumber);
        order.setDeliveryPartner("BlueDart Express");
        order.setAssignedPrinter(null);

        // Shipping details
        order.setShippingFullName(dto.getShippingFullName());
        order.setShippingAddress(dto.getShippingAddress());
        order.setShippingCity(dto.getShippingCity());
        order.setShippingState(dto.getShippingState());
        order.setShippingZip(dto.getShippingZip());
        order.setShippingPhone(dto.getShippingPhone());

        // Initial 10-step timeline
        List<OrderTimelineStep> timeline = new ArrayList<>();
        for (int i = 0; i < PIPELINE_STAGES.size(); i++) {
            String stage = PIPELINE_STAGES.get(i);
            boolean isDone = (i == 0);
            String time = isDone ? "Just now" : "Pending";
            String note = isDone ? "CAD model order received and queued for design engineer." : "Pending " + stage;
            timeline.add(new OrderTimelineStep(order, stage, time, isDone, note));
        }
        order.setTimeline(timeline);

        // Items
        List<OrderItem> orderItems = new ArrayList<>();
        if (dto.getItems() != null) {
            for (OrderItemDto itemDto : dto.getItems()) {
                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProductId(itemDto.getProductId());
                item.setName(itemDto.getName());
                item.setImage(itemDto.getImage());
                item.setPrice(itemDto.getPrice());
                item.setQuantity(itemDto.getQuantity() > 0 ? itemDto.getQuantity() : 1);
                item.setCustomText(itemDto.getCustomText());
                item.setSelectedColorsJson(itemDto.getSelectedColorsJson());
                item.setUserImages(itemDto.getUserImages());
                item.setPrintTimeMinutes(itemDto.getPrintTimeMinutes());
                item.setCategory(itemDto.getCategory());
                item.setMaterial(itemDto.getMaterial());
                orderItems.add(item);
            }
        }
        order.setItems(orderItems);

        // Initial Design Proof
        if (!orderItems.isEmpty()) {
            order.setDesignProofImage(orderItems.get(0).getImage());
            order.setDesignProofModelType("keychain");
            order.setDesignProofApproved(false);
            order.setDesignProofNotes("Order placed. Designer is generating customized parametric STL preview.");
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(String orderId, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderId));

        String newStatus = request.getStatus();
        if (newStatus != null && !newStatus.isBlank()) {
            order.setStatus(newStatus);
            order.setStatusProgress(STAGE_PROGRESS.getOrDefault(newStatus, order.getStatusProgress()));

            int targetIndex = PIPELINE_STAGES.indexOf(newStatus);
            if (targetIndex >= 0 && order.getTimeline() != null) {
                for (int i = 0; i < order.getTimeline().size(); i++) {
                    OrderTimelineStep step = order.getTimeline().get(i);
                    if (i <= targetIndex) {
                        step.setDone(true);
                        if ("Pending".equals(step.getTime())) {
                            step.setTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
                        }
                        if (i == targetIndex && request.getNote() != null && !request.getNote().isBlank()) {
                            step.setNote(request.getNote());
                        }
                    }
                }
            }
        }

        if (request.getAssignedPrinter() != null) order.setAssignedPrinter(request.getAssignedPrinter());
        if (request.getDeliveryPartner() != null) order.setDeliveryPartner(request.getDeliveryPartner());
        if (request.getTrackingNumber() != null) order.setTrackingNumber(request.getTrackingNumber());

        if (request.getDesignProofImage() != null) order.setDesignProofImage(request.getDesignProofImage());
        if (request.getDesignProofNotes() != null) order.setDesignProofNotes(request.getDesignProofNotes());
        if (request.getDesignProofApproved() != null) order.setDesignProofApproved(request.getDesignProofApproved());

        // Update Printer Farm state if printer assigned and started printing
        if (request.getPrinterId() != null && ("Printing Started".equals(newStatus) || "Ready for Printing".equals(newStatus))) {
            printerRepository.findById(request.getPrinterId()).ifPresent(printer -> {
                printer.setStatus("Printing");
                printer.setCurrentJobId(orderId);
                printer.setCurrentJobName("Order " + orderId);
                printer.setPercentage(15);
                printer.setTimeLeft(request.getTimeLeft() != null ? request.getTimeLeft() : "45m");
                printerRepository.save(printer);
            });
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order cancelOrder(String orderId, String reason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderId));

        order.setStatus("Cancelled");
        order.setStatusProgress(0);
        order.setCancelledAt(System.currentTimeMillis());
        order.setCancellationReason(reason != null ? reason : "Customer requested cancellation");

        String cancelTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        order.getTimeline().add(new OrderTimelineStep(order, "Order Cancelled", cancelTime, true, "Cancelled by user: " + order.getCancellationReason()));

        return orderRepository.save(order);
    }

    @Transactional
    public Order customerApproveDesign(String orderId) {
        OrderStatusUpdateRequest update = new OrderStatusUpdateRequest();
        update.setStatus("Ready for Printing");
        update.setNote("Customer approved 3D design proof in online portal.");
        update.setDesignProofApproved(true);
        return updateOrderStatus(orderId, update);
    }

    @Transactional
    public Order customerRequestDesignChanges(String orderId, String feedback) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderId));

        order.setStatus("Design Stage");
        order.setStatusProgress(20);
        order.setDesignProofApproved(false);
        order.setDesignProofUserFeedback(feedback);

        for (OrderTimelineStep step : order.getTimeline()) {
            if ("Preview Design Sent".equals(step.getStatus())) {
                step.setDone(false);
                step.setNote("Revision requested by customer: \"" + feedback + "\"");
            }
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order assignOrderToPrinter(String orderId, String printerId, String timeShift) {
        Printer printer = printerRepository.findById(printerId)
                .orElseThrow(() -> new IllegalArgumentException("Printer not found with id: " + printerId));

        OrderStatusUpdateRequest update = new OrderStatusUpdateRequest();
        update.setStatus("Printing Started");
        update.setAssignedPrinter(printer.getName());
        update.setPrinterId(printer.getId());
        update.setTimeLeft("40m");
        update.setNote("Assigned to " + printer.getName() + " (" + (timeShift != null ? timeShift : "Daytime Quick Turnaround") + ")");

        return updateOrderStatus(orderId, update);
    }
}

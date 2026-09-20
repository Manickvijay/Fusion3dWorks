package com.fusion3d.service;

import com.fusion3d.dto.DashboardStatsDto;
import com.fusion3d.model.Order;
import com.fusion3d.model.Printer;
import com.fusion3d.repository.OrderRepository;
import com.fusion3d.repository.PrinterRepository;
import com.fusion3d.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final PrinterRepository printerRepository;
    private final UserRepository userRepository;

    public DashboardService(OrderRepository orderRepository, PrinterRepository printerRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.printerRepository = printerRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        List<Order> orders = orderRepository.findAll();
        List<Printer> printers = printerRepository.findAll();
        long usersCount = userRepository.count();

        double totalRevenue = 0;
        int activeOrders = 0;
        int completedOrders = 0;
        Map<String, Integer> ordersByStatus = new HashMap<>();

        for (Order o : orders) {
            totalRevenue += o.getTotal();
            String status = o.getStatus() != null ? o.getStatus() : "Order Placed";
            ordersByStatus.put(status, ordersByStatus.getOrDefault(status, 0) + 1);

            if ("Delivered".equalsIgnoreCase(status)) {
                completedOrders++;
            } else if (!"Cancelled".equalsIgnoreCase(status)) {
                activeOrders++;
            }
        }

        int printersBusy = 0;
        for (Printer p : printers) {
            if ("Printing".equalsIgnoreCase(p.getStatus())) {
                printersBusy++;
            }
        }

        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalRevenue(Math.round(totalRevenue * 100.0) / 100.0);
        stats.setTotalOrders(orders.size());
        stats.setActiveOrders(activeOrders);
        stats.setCompletedOrders(completedOrders);
        stats.setPrintersTotal(printers.size());
        stats.setPrintersBusy(printersBusy);
        stats.setRegisteredUsersCount((int) usersCount);
        stats.setOrdersByStatus(ordersByStatus);

        return stats;
    }
}

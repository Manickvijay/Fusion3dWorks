package com.fusion3d.config;

import com.fusion3d.model.*;
import com.fusion3d.repository.OrderRepository;
import com.fusion3d.repository.PrinterRepository;
import com.fusion3d.repository.ProductRepository;
import com.fusion3d.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PrinterRepository printerRepository;
    private final OrderRepository orderRepository;

    @Value("${fusion3d.seed-default-data:true}")
    private boolean seedDefaultData;

    public DataInitializer(UserRepository userRepository,
                           ProductRepository productRepository,
                           PrinterRepository printerRepository,
                           OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.printerRepository = printerRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public void run(String... args) {
        if (!seedDefaultData) {
            logger.info("Database seeding skipped (seed-default-data is false)");
            return;
        }

        seedUsers();
        seedPrinters();
        seedProducts();
        seedOrders();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        logger.info("Seeding default users...");

        User customer = new User(
                "USR-101",
                "Alex Rivera",
                "user@gmail.com",
                "Pass1234",
                "customer",
                "+1 (555) 438-9021",
                "742 Evergreen Terrace, Springfield, OR 97477",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                "2026-01-15",
                "Active"
        );
        customer.setOrdersCount(3);
        customer.setTotalSpent(79.97);
        customer.setFavoriteColor("Silk Gold");

        User admin = new User(
                "ADM-201",
                "Chief Maker David",
                "admin@gmail.com",
                "Pass1234",
                "admin",
                "+1 (800) 555-F3D",
                "Fusion3D Central Print Lab & Prototyping Hub, San Francisco, CA",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                "2025-11-01",
                "Active (Staff)"
        );
        admin.setFavoriteColor("Cyber Cyan");

        User user2 = new User(
                "USR-102",
                "Samantha Lee",
                "samantha.lee@example.com",
                "Pass1234",
                "customer",
                "+1 (555) 892-3310",
                "144 Ocean Boulevard, Santa Monica, CA 90401",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
                "2026-02-10",
                "Active"
        );
        user2.setOrdersCount(2);
        user2.setTotalSpent(52.98);

        User user3 = new User(
                "USR-103",
                "Jordan Martinez",
                "jordan.m@designstudio.io",
                "Pass1234",
                "customer",
                "+1 (555) 234-5678",
                "500 Tech Parkway, Austin, TX 78701",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
                "2026-03-01",
                "Active"
        );
        user3.setOrdersCount(5);
        user3.setTotalSpent(198.50);

        userRepository.saveAll(List.of(customer, admin, user2, user3));
        logger.info("Default users seeded successfully.");
    }

    private void seedPrinters() {
        if (printerRepository.count() > 0) return;

        logger.info("Seeding default 3D print fleet...");

        Printer p1 = new Printer(
                "PRINTER-BAMBU-A1",
                "Bambu Lab A1 (AMS Lite)",
                "High-Speed Multi-Color CoreXY / Direct Drive (500 mm/s)",
                "Printing",
                "ORD-8821",
                "Personalized 3D Dual-Color Keychain",
                "162 / 210",
                77,
                "12m",
                "220°C",
                "65°C",
                List.of("#F59E0B", "#0F172A", "#06B6D4", "#FFFFFF"),
                "Daytime Quick Turnaround"
        );

        Printer p2 = new Printer(
                "PRINTER-1",
                "Bambu Lab X1-Carbon #1",
                "Enclosed High-Temp CoreXY (AMS 4-Spool)",
                "Idle",
                null,
                null,
                "0 / 0",
                0,
                "--",
                "24°C",
                "25°C",
                List.of("#E2B872", "#18181B", "#EF4444", "#10B981"),
                "Daytime & Nighttime"
        );

        Printer p3 = new Printer(
                "PRINTER-2",
                "Prusa MK4 #2",
                "Precision Single-Nozzle FDM",
                "Idle",
                null,
                null,
                "0 / 0",
                0,
                "--",
                "25°C",
                "24°C",
                List.of("#E2B872"),
                "Daytime Quick Turnaround"
        );

        Printer p4 = new Printer(
                "PRINTER-3",
                "Creality K1 Max #3",
                "Large Format High-Speed FDM (300x300x300mm)",
                "Idle",
                null,
                null,
                "0 / 0",
                0,
                "--",
                "26°C",
                "24°C",
                List.of("#06B6D4", "#0F172A"),
                "Night-Time Overnight Batch"
        );

        Printer p5 = new Printer(
                "PRINTER-4",
                "Elegoo Saturn 4 Ultra #4",
                "12K High-Def Photopolymer UV Resin",
                "Idle",
                null,
                null,
                "0 / 0",
                0,
                "--",
                "N/A (Tilt-Release Resin)",
                "30°C",
                List.of("#FFFFFF"),
                "Night-Time Overnight Batch"
        );

        printerRepository.saveAll(List.of(p1, p2, p3, p4, p5));
        logger.info("Default 3D print fleet seeded successfully.");
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;

        logger.info("Seeding default 3D products...");

        Product prod1 = new Product();
        prod1.setId("prod-keychain-dual");
        prod1.setName("Personalized Dual-Color 3D Name Keychain");
        prod1.setCategory("3d-keychain");
        prod1.setCategoryLabel("3D Keychains");
        prod1.setPrice(12.99);
        prod1.setOriginalPrice(16.99);
        prod1.setRating(4.9);
        prod1.setReviewsCount(148);
        prod1.setPrintTime("45m");
        prod1.setPrintTimeMinutes(45);
        prod1.setBadge("Best Seller");
        prod1.setDimensions("75 x 28 x 6 mm");
        prod1.setMaterial("PLA+ Silk PolyTerra");
        prod1.setLayerHeight("0.16mm Fine Detail");
        prod1.setWeight("18g");
        prod1.setDescription("Custom extruded 3D typography keychain featuring crisp dual-layer color contrast. Engineered with reinforced split-ring loop that withstands everyday pocket use without snapping.");
        prod1.setImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80");
        prod1.setGallery(List.of(
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80"
        ));
        prod1.setModelType("keychain");
        prod1.setAllowCustomText(true);
        prod1.setCustomTextPlaceholder("e.g. EMILY, DAVID, or MAKER");
        prod1.setRequiresUserImage(false);
        prod1.setCustomizableSectionsJson("[{\"id\":\"top_text\",\"name\":\"Top Lettering / Text Color\",\"defaultColor\":\"#F59E0B\",\"options\":[{\"name\":\"Silk Gold\",\"hex\":\"#F59E0B\"},{\"name\":\"Pure White\",\"hex\":\"#FFFFFF\"},{\"name\":\"Neon Coral\",\"hex\":\"#F43F5E\"},{\"name\":\"Cyan Blue\",\"hex\":\"#06B6D4\"},{\"name\":\"Emerald\",\"hex\":\"#10B981\"}]},{\"id\":\"base_plate\",\"name\":\"Base Plate / Backing Color\",\"defaultColor\":\"#0F172A\",\"options\":[{\"name\":\"Matte Obsidian\",\"hex\":\"#0F172A\"},{\"name\":\"Deep Space Navy\",\"hex\":\"#1E3A8A\"},{\"name\":\"Graphite Gray\",\"hex\":\"#475569\"},{\"name\":\"Pastel Lilac\",\"hex\":\"#A855F7\"}]}]");

        ProductReview rev1 = new ProductReview("rev-1", prod1, "Jessica Miller", 5, "3 days ago", "The dual color lettering is super sharp and the split-ring loop is very sturdy. Exactly as previewed in the 3D model!", true, List.of("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"));
        ProductReview rev2 = new ProductReview("rev-2", prod1, "Daniel Craig", 5, "1 week ago", "Ordered 3 of these as gifts for my team. Fast delivery via BlueDart and zero stringing on the text.", true, List.of("https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80"));
        prod1.setReviews(List.of(rev1, rev2));

        Product prod2 = new Product();
        prod2.setId("prod-cake-topper-wedding");
        prod2.setName("Custom Calligraphy Wedding & Birthday Cake Topper");
        prod2.setCategory("cake-toppers");
        prod2.setCategoryLabel("Cake Toppers");
        prod2.setPrice(24.50);
        prod2.setOriginalPrice(32.00);
        prod2.setRating(5.0);
        prod2.setReviewsCount(92);
        prod2.setPrintTime("1h 25m");
        prod2.setPrintTimeMinutes(85);
        prod2.setBadge("Popular Gift");
        prod2.setDimensions("160 x 180 x 4 mm");
        prod2.setMaterial("Food-Safe PETG");
        prod2.setLayerHeight("0.20mm Clean Smooth");
        prod2.setWeight("32g");
        prod2.setDescription("Laser-sharp calligraphy script extruded in food-contact compliant PETG. Designed with dual reinforced tapered prongs for effortless insertion into tiered cakes.");
        prod2.setImage("https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80");
        prod2.setGallery(List.of(
                "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"
        ));
        prod2.setModelType("topper");
        prod2.setAllowCustomText(true);
        prod2.setCustomTextPlaceholder("e.g. Mr & Mrs Johnson, or Happy 30th");
        prod2.setRequiresUserImage(false);
        prod2.setCustomizableSectionsJson("[{\"id\":\"script_finish\",\"name\":\"Script Finish Color\",\"defaultColor\":\"#E2B872\",\"options\":[{\"name\":\"Metallic Gold\",\"hex\":\"#E2B872\"},{\"name\":\"Gloss White\",\"hex\":\"#FFFFFF\"},{\"name\":\"Rose Gold\",\"hex\":\"#F43F5E\"},{\"name\":\"Matte Black\",\"hex\":\"#0F172A\"}]}]");

        Product prod3 = new Product();
        prod3.setId("prod-lithophane-lamp");
        prod3.setName("Custom 3D Lithophane LED Night Light Lamp");
        prod3.setCategory("custom-gifts");
        prod3.setCategoryLabel("Customized Gifts");
        prod3.setPrice(34.99);
        prod3.setOriginalPrice(45.00);
        prod3.setRating(4.9);
        prod3.setReviewsCount(118);
        prod3.setPrintTime("4h 10m");
        prod3.setPrintTimeMinutes(250);
        prod3.setBadge("Customer Favorite");
        prod3.setDimensions("120 x 120 x 150 mm");
        prod3.setMaterial("High-Density White PLA Litho-grade");
        prod3.setLayerHeight("0.12mm Ultra High Precision");
        prod3.setWeight("145g");
        prod3.setDescription("Transform your favorite high-resolution photo into a 3D curved translucent lithophane. When backlit by the included warm-white touch LED base, your photo illuminates in photographic greyscale fidelity.");
        prod3.setImage("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80");
        prod3.setGallery(List.of("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"));
        prod3.setModelType("lithophane");
        prod3.setAllowCustomText(true);
        prod3.setCustomTextPlaceholder("Optional base inscription (e.g. Together Forever)");
        prod3.setRequiresUserImage(true);
        prod3.setMinImages(1);
        prod3.setMaxImages(4);
        prod3.setImageInstructions("Please upload 1 to 4 clear, well-lit portraits or family photos. High contrast images produce the most striking 3D lithophane translucency.");
        prod3.setCustomizableSectionsJson("[{\"id\":\"base_wood\",\"name\":\"Base Tone\",\"defaultColor\":\"#0F172A\",\"options\":[{\"name\":\"Dark Walnut Base\",\"hex\":\"#0F172A\"},{\"name\":\"Natural Beech Base\",\"hex\":\"#E2B872\"},{\"name\":\"Pure White Base\",\"hex\":\"#FFFFFF\"}]}]");

        productRepository.saveAll(List.of(prod1, prod2, prod3));
        logger.info("Default 3D products seeded successfully.");
    }

    private void seedOrders() {
        if (orderRepository.count() > 0) return;

        logger.info("Seeding default orders...");

        Order o1 = new Order();
        o1.setId("ORD-8821");
        o1.setDate("2026-09-19");
        o1.setTime("14:30");
        o1.setCreatedAt(System.currentTimeMillis() - 45 * 60 * 1000);
        o1.setCustomerName("Alex Rivera");
        o1.setCustomerEmail("user@gmail.com");
        o1.setCustomerPhone("+1 (555) 438-9021");
        o1.setSubtotal(25.98);
        o1.setShippingFee(0.00);
        o1.setTotal(25.98);
        o1.setPaymentMethod("Credit Card (Visa)");
        o1.setStatus("Printing Started");
        o1.setStatusProgress(65);
        o1.setEstimatedCompletion("Today, 5:45 PM");
        o1.setTrackingNumber("BD-88219412");
        o1.setDeliveryPartner("BlueDart Express");
        o1.setAssignedPrinter("Bambu Lab A1 (AMS Lite)");
        o1.setShippingFullName("Alex Rivera");
        o1.setShippingAddress("742 Evergreen Terrace");
        o1.setShippingCity("Springfield");
        o1.setShippingState("OR");
        o1.setShippingZip("97477");
        o1.setDesignProofImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80");
        o1.setDesignProofModelType("keychain");
        o1.setDesignProofApproved(true);
        o1.setDesignProofNotes("Custom 3D extrusion with dual-tone filament chamfered border.");

        OrderItem item1 = new OrderItem();
        item1.setOrder(o1);
        item1.setProductId("prod-keychain-dual");
        item1.setName("Personalized Dual-Color 3D Name Keychain");
        item1.setImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80");
        item1.setPrice(12.99);
        item1.setQuantity(2);
        item1.setCustomText("ALEX & EMILY");
        item1.setSelectedColorsJson("{\"top_text\":\"#F59E0B\",\"base_plate\":\"#0F172A\"}");
        item1.setPrintTimeMinutes(45);
        o1.setItems(List.of(item1));

        List<OrderTimelineStep> steps = new ArrayList<>();
        steps.add(new OrderTimelineStep(o1, "Order Placed", "14:30", true, "CAD model order recorded."));
        steps.add(new OrderTimelineStep(o1, "Design Stage", "14:40", true, "3D typography extruded & positioned."));
        steps.add(new OrderTimelineStep(o1, "Preview Design Sent", "14:48", true, "Design proof approved by customer."));
        steps.add(new OrderTimelineStep(o1, "Ready for Printing", "14:55", true, "Assigned to Bambu Lab A1 AMS 4-color."));
        steps.add(new OrderTimelineStep(o1, "Printing Started", "15:05", true, "Bed: 65°C, Extruder: 220°C. Layer 162/210."));
        steps.add(new OrderTimelineStep(o1, "Printing Complete", "Pending", false, "Awaiting machine completion."));
        steps.add(new OrderTimelineStep(o1, "QA Testing the Product", "Pending", false, "Dimensional caliper check."));
        steps.add(new OrderTimelineStep(o1, "Packing", "Pending", false, "Packaging in padded bubble tin."));
        steps.add(new OrderTimelineStep(o1, "Shipping to Delivery Partner", "Pending", false, "Courier pickup scheduled."));
        steps.add(new OrderTimelineStep(o1, "Delivered", "Pending", false, "Pending delivery."));
        o1.setTimeline(steps);

        orderRepository.save(o1);
        logger.info("Default orders seeded successfully.");
    }
}

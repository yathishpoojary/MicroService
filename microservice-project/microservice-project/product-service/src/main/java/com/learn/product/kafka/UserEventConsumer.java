package com.learn.product.kafka;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class UserEventConsumer {
    private static final Logger log = LoggerFactory.getLogger(UserEventConsumer.class);

    @KafkaListener(topics = "user-created", groupId = "product-service-group")
    public void handleUserCreatedEvent(String message) {
        log.info("Product Service received Kafka event: {}", message);
        // You can add logic here, e.g., assign default products to new user
    }
}

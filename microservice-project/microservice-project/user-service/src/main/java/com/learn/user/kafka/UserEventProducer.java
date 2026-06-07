package com.learn.user.kafka;
import com.learn.user.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserEventProducer {
    private static final Logger log = LoggerFactory.getLogger(UserEventProducer.class);
    private static final String TOPIC = "user-created";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendUserCreatedEvent(User user) {
        String message = "User created: id=" + user.getId() + ", name=" + user.getName() + ", email=" + user.getEmail();
        log.info("Sending Kafka event -> Topic: {}, Message: {}", TOPIC, message);
        kafkaTemplate.send(TOPIC, message);
    }
}

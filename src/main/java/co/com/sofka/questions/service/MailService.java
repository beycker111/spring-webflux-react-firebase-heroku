package co.com.sofka.questions.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    private static final String FROM = "reto.heroku.sofka@gmail.com";

    public MailService() {
    }

    public Mono<String> sendMail(String to, String subject, String body){

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(FROM);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);

        javaMailSender.send(simpleMailMessage);

        return Mono.just("¡Ok!");
    }
}

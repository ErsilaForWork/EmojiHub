package kz.sendingdata;

import kz.sendingdata.service.DataService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SendingDataApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(SendingDataApplication.class, args);
        DataService service = context.getBean(DataService.class);
        System.out.println("Yes");
        service.saveAll();
        System.out.println("Sended");
    }
}
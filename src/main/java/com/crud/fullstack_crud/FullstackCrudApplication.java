package com.crud.fullstack_crud;

import com.crud.fullstack_crud.entities.User;
import com.crud.fullstack_crud.repositories.UserRepsitory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
public class FullstackCrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(FullstackCrudApplication.class, args);
    }


    @Bean
    public CommandLineRunner start(UserRepsitory userRep, RepositoryRestConfiguration repRestConfig) {


        return args -> {
            repRestConfig.exposeIdsFor(User.class);
            User user1 = new User(null, "exemple1", "name exemple1", "exemple1@gmail.com");
            User user2 = new User(null, "exemple2", "name exemple2", "exemple2@gmail.com");
            User user3 = new User(null, "exemple3", "name exemple3", "exemple3@gmail.com");



          /*  compteR.findAll().forEach(compte -> {
                System.out.println(compte.getType()+" "+compte.getCode()+" "+compte.getSolde()+" Dhs.");
            });*/
        };

    }


}

package com.crud.fullstack_crud.entities;

import lombok.*;
import org.springframework.beans.factory.annotation.Required;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor //@RequiredArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //@Column(nullable = false) //@NonNull
    private String username;

    private String fullname;

    private String email;

}

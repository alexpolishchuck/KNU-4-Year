package com.example.lab1.Controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardsController {

    @GetMapping("/test2")
    // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public void test2()
    {
        var authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        System.out.println(authorities);
    }
}

package com.example.lab1.Controllers;

import com.example.lab1.Security.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LogoutController extends SecurityContextLogoutHandler {
    private final SecurityConfig securityConfig;

    @Autowired
    public LogoutController(SecurityConfig securityConfig) {
        this.securityConfig = securityConfig;
    }

    @Override
    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                       Authentication authentication)
    {
        super.logout(httpServletRequest, httpServletResponse, authentication);

        String returnToUri = ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();
        String logoutUrl = UriComponentsBuilder
                .fromHttpUrl(securityConfig.getIssuer()
                        + "v2/logout?client_id={clientId}&returnTo={returnTo}")
                .encode()
                .buildAndExpand(securityConfig.getClientId(), returnToUri)
                .toUriString();

        try {
            httpServletResponse.sendRedirect(logoutUrl);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

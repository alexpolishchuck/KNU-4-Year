package com.example.lab1.Controllers;

import com.example.lab1.Security.SecurityConfig;
import com.auth0.AuthenticationController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.auth0.IdentityVerificationException;
import com.auth0.Tokens;
import com.auth0.jwt.JWT;
import com.example.lab1.Security.TokenAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Controller
public class LoginController {

    private final AuthenticationController authenticationController;

    @Autowired
    public LoginController(SecurityConfig securityConfig) throws UnsupportedEncodingException {
        this.authenticationController = securityConfig.authenticationController();
    }

    @GetMapping("/login")
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String redirectUri = request.getScheme() + "://" + request.getServerName();
        if ((request.getScheme().equals("http") && request.getServerPort() != 80)
                || (request.getScheme().equals("https") && request.getServerPort() != 443)) {
            redirectUri += ":" + request.getServerPort();
        }
        redirectUri += "/login_callback";

        String authorizeUrl = authenticationController.buildAuthorizeUrl(request, response, redirectUri)
                .withParameter("scope", "openid profile email")
                .build();

        response.sendRedirect(authorizeUrl);
    }

    @GetMapping(value="/login_callback")
    public void callback(HttpServletRequest request, HttpServletResponse response) throws IdentityVerificationException, IOException {
        Tokens tokens = authenticationController.handle(request, response);
        TokenAuthentication tokenAuth = new TokenAuthentication(JWT.decode(tokens.getIdToken()));
        SecurityContextHolder.getContext().setAuthentication(tokenAuth);
        response.sendRedirect("/test2");
    }

    @GetMapping("/register")
    public void GetHome(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        String redirectUri = createRedirectUri(request);

        String authorizeUrl = authenticationController.buildAuthorizeUrl(request, response, redirectUri)
                .withParameter("scope", "openid profile email")
                .withParameter("screen_hint", "signup")
                .build();

        response.sendRedirect(authorizeUrl);
    }

    private String createRedirectUri(HttpServletRequest request){
        String redirectUri = request.getScheme() + "://" + request.getServerName();
        if ((request.getScheme().equals("http") && request.getServerPort() != 80)
                || (request.getScheme().equals("https") && request.getServerPort() != 443)) {
            redirectUri += ":" + request.getServerPort();
        }
        redirectUri += "/login_callback";

        return redirectUri;
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String welcomePage()
    {
        return "welcomePage";
    }
}

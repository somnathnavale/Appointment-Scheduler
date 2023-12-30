package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.service.interfaces.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${app.jwt_secret}")
    private String SECRET_KEY;

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username=extractUsername(token);
        return !isTokenExpired(token) && username.equals(userDetails.getUsername());
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims,T> resolveClaims) {
        Claims claims=extractAllClaims(token);
        return resolveClaims.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignInKey()).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keys=SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keys);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }

    private String generateToken(HashMap<String,Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                .signWith(getSignInKey(),Jwts.SIG.HS256)
                .compact();
    }
}

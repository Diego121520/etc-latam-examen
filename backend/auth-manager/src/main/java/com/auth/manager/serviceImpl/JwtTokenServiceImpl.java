package com.auth.manager.serviceImpl;

import com.auth.manager.config.RSAEncryptionUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@ApplicationScoped
public class JwtTokenServiceImpl {

    private static final long expirationTime = 21600000;

    private final RSAEncryptionUtil rsaEncryptionUtil;

    public String createToken(){
        return Jwt.issuer("jwt-token")
                .subject("3")
                .expiresAt(System.currentTimeMillis()+3600)
                .sign();
    }

    public String generateToken(String subject) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(rsaEncryptionUtil.getPrivateKey())
                .compact();
    }

    public String getSubjectFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(rsaEncryptionUtil.getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(rsaEncryptionUtil.getPrivateKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
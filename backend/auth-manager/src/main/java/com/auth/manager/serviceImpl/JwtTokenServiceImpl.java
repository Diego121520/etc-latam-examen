package com.auth.manager.serviceImpl;

import com.auth.manager.config.RSAEncryptionUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@ApplicationScoped
public class JwtTokenServiceImpl {

    private static final long EXPIRATION_TIME = 3600;

    private final RSAEncryptionUtil rsaEncryptionUtil;

    public String createToken(Long userId){
        return Jwt.issuer("jwt-token")
                .subject(Long.toString(userId))
                .expiresAt(System.currentTimeMillis() + EXPIRATION_TIME)
                .sign();
    }

    public String getSubjectFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(rsaEncryptionUtil.getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

}
package com.auth.manager.config;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@ApplicationScoped
public class RSAEncryptionUtil {

    @ConfigProperty(name = "rsa.private.key.path")
    String privateKeyPath;

    @ConfigProperty(name = "rsa.public.key.path")
    String publicKeyPath;

    private static final String ALGORITHM = "RSA";
    private static final String TRANSFORMATION = "RSA/ECB/OAEPWithSHA-256AndMGF1Padding";

    private  PrivateKey privateKey;
    private  PublicKey publicKey;

    @PostConstruct
    public void init() {
        privateKey = loadPrivateKey(privateKeyPath);
        publicKey = loadPublicKey(publicKeyPath);
    }

    public String encrypt(String password) {
        try {
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, getPublicKey());
            byte[] encryptedData = cipher.doFinal(password.getBytes());
            return Base64.getEncoder().encodeToString(encryptedData);

        } catch (NoSuchAlgorithmException | NoSuchPaddingException |
                 InvalidKeyException | IllegalBlockSizeException | BadPaddingException e) {
            throw new RuntimeException("Hubo un problema al encriptar la contraseña", e);
        }
    }

    public String decrypt(String password) throws Exception {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, getPrivateKey());
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(password));
        return new String(decryptedData);
    }

    private PrivateKey loadPrivateKey(String path) {

        try {
            // Leer el archivo de la clave privada
            String privateKeyPEM = new String(Files.readAllBytes(Paths.get(path)));

            privateKeyPEM = parseKey(privateKeyPEM);

            // Decodificar la clave base64
            byte[] encoded = Base64.getDecoder().decode(privateKeyPEM);

            // Crear la especificación de clave privada
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);

            // Generar la clave privada RSA
            KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);

            privateKey = keyFactory.generatePrivate(keySpec);

            return keyFactory.generatePrivate(keySpec);

        } catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Hubo un al cargar la llave privada", e);
        }
    }

    private PublicKey loadPublicKey(String path) {

         try {
             // Leer el archivo de la clave pública
             String publicKeyPEM = new String(Files.readAllBytes(Paths.get(path)));

             publicKeyPEM = parseKey(publicKeyPEM);

             // Decodificar la clave base64
             byte[] encoded = Base64.getDecoder().decode(publicKeyPEM);

             // Crear la especificación de clave pública
             X509EncodedKeySpec keySpec = new X509EncodedKeySpec(encoded);

             // Generar la clave pública RSA
             KeyFactory keyFactory = KeyFactory.getInstance(ALGORITHM);

             return keyFactory.generatePublic(keySpec);

         } catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException e) {
             throw new RuntimeException("Hubo un al cargar la llave pública", e);
         }
    }

    private String parseKey(String publicKeyPEM) {
        return publicKeyPEM.replaceAll("\\s+", ""); // Eliminar todos los espacios en blanco
    }

    public PrivateKey getPrivateKey() {
        return privateKey;
    }

    public PublicKey getPublicKey() {
        return publicKey;
    }
}

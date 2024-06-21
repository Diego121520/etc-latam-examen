package com.user.manager.enums;

public enum Gender {
    MALE("Masculino"), FEMALE("Femenino");

    private final String name;

    Gender(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

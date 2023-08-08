package cz.dev.buddymovie.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    /**
     * Check if string contains at least one digit, one lowercase letter,
     * one uppercase letter, one special character and 8 characters long
     * @param value actual password
     * @param context context
     * @return true if password is strong enough
     */
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$");
    }
}

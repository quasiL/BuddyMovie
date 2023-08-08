package cz.dev.buddymovie.validation;

import org.springframework.beans.BeanWrapperImpl;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Objects;

public class PasswordMatchingValidator implements ConstraintValidator<PasswordMatching, Object> {

    private String password;
    private String confirmPassword;

    @Override
    public void initialize(PasswordMatching matching) {
        this.password = matching.password();
        this.confirmPassword = matching.confirmPassword();
    }

    /**
     * Check if two provided passwords are equal
     * @param value password and confirmed password
     * @param context context
     * @return true if two provided passwords are equal
     */
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        var passwordValue = new BeanWrapperImpl(value).getPropertyValue(password);
        var confirmPasswordValue = new BeanWrapperImpl(value).getPropertyValue(confirmPassword);

        return Objects.equals(passwordValue, confirmPasswordValue);
    }
}

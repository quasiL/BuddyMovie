package cz.dev.buddymovie.contoller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc api;

    @Test
    void anyone_CanTryToLoginWithWrongCredentials() throws Exception {
        api.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"anyemail@test.com\",\"password\":\"password\"\"}"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void existingUser_shouldNotBeAbleToRegister() throws Exception {
        ResultActions result = api.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"admin@test.com\",\"password\":\"password\",\"confirmPassword\":\"password!\",\"name\":\"Name\",\"surname\":\"Surname\",\"sex\":\"MALE\"}"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void existingUser_shouldNotBeAbleToLoginWithWrongPassword() throws Exception {
        ResultActions result = api.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"next@test.com\",\"password\":\"wrong\"}"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isUnauthorized())
                .andExpect(status().reason(containsString("User not found")));
    }
}
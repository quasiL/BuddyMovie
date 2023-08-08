package cz.dev.buddymovie.contoller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MainControllerTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc api;

    @Test
    void notLoggedIn_shouldNotSeeSecuredEndpoint() throws Exception {
        api.perform(get("/api/v1/main/hello"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void notLoggedIn_shouldNotSeeAdmin() throws Exception {
        api.perform(get("/api/v1/main/admin"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void simpleUser_shouldNotSeeAdmin() throws Exception {
        api.perform(get("/api/v1/main/admin"))
                .andExpect(status().isForbidden());
    }

//    @Test
//    @WithAdminUser
//    //@WithMockUser(authorities = "ROLE_ADMIN")
//    void adminUser_shouldSeeAdminEndpoint() throws Exception {
//        api.perform(get("/api/v1/main/admin"))
//                .andExpect(status().isOk())
//                .andExpect(content().string(containsStringIgnoringCase("Your roles: [ROLE_USER, ROLE_ADMIN]")));
//    }

}
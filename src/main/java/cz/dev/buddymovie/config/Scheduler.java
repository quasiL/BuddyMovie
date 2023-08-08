package cz.dev.buddymovie.config;

import cz.dev.buddymovie.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class Scheduler {

    private final UserService userService;

    @Scheduled(fixedRate = 60000)
    public void checkOffers() {
        userService.updateAllExpiredMovieOffers();
        log.info("Update all expired movie offers");
    }
}

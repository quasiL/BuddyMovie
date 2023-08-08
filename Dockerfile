FROM openjdk:17
WORKDIR /
COPY ./target/BuddyMovie-1.0.1.jar BuddyMovie-1.0.1.jar
EXPOSE 8081
CMD ["java", "-jar", "BuddyMovie-1.0.1.jar"]
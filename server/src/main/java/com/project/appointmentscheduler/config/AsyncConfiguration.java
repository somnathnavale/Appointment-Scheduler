package com.project.appointmentscheduler.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class AsyncConfiguration {
    @Bean(name = "asyncTaskExecutor")
    public ThreadPoolTaskExecutor asyncTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2); // Set the initial number of threads in the pool
        executor.setMaxPoolSize(4); // Set the maximum number of threads in the pool
        executor.setQueueCapacity(50); // Set the queue capacity for holding pending tasks
        executor.setThreadNamePrefix("AsyncTask-"); // Set a prefix for thread names
        executor.initialize();
        return executor;
    }
}

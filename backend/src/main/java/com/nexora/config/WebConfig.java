package com.nexora.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resolve path to absolute for compatibility
        File directory = new File(uploadDir);
        String absolutePath = directory.getAbsolutePath();
        
        registry.addResourceHandler("/api/v1/uploads/**")
                .addResourceLocations("file:" + absolutePath + "/");
    }
}

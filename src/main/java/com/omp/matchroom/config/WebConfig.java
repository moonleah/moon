package com.omp.matchroom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	/*
	 * 로그인 인증 Interceptor 설정
	 */
	// @Autowired
	// CertificationInterceptor certificationInterceptor;

	// private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
	// "classpath:/static/", "classpath:/public/", "classpath:/",
	// "classpath:/resources/", "classpath:/META-INF/resources/",
	// "classpath:/META-INF/resources/webjars/" };

	/*
	 * @Override public void addInterceptors(InterceptorRegistry registry) {
	 * 
	 * registry.addInterceptor(certificationInterceptor) .addPathPatterns("/**.do")
	 * .excludePathPatterns(); }
	 */

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("classpath:static/", "classpath:resources/");

	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/user").setViewName("user");

	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
		commonsMultipartResolver.setDefaultEncoding("UTF-8");
		commonsMultipartResolver.setMaxUploadSize(50 * 1024 * 1024);
		return commonsMultipartResolver;
	}

}
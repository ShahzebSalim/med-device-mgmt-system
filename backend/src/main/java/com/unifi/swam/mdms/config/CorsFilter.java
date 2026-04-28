package com.unifi.swam.mdms.config;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                      ContainerResponseContext responseContext) throws IOException {
        
        // Allow all origins
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        
        // Allow all HTTP methods
        responseContext.getHeaders().add("Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
        
        // Allow all headers
        responseContext.getHeaders().add("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        
        // Allow credentials
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        
        // Max age for preflight cache (24 hours)
        responseContext.getHeaders().add("Access-Control-Max-Age", "86400");
    }
}
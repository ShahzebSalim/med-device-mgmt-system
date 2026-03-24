package com.unifi.swam.mdms.rest.errors;

import com.unifi.swam.mdms.services.exceptions.ConflictException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ConflictExceptionMapper implements ExceptionMapper<ConflictException> {

    @Override
    public Response toResponse(ConflictException exception) {
        return Response.status(Response.Status.CONFLICT)
                .entity(new ApiError(exception.getMessage()))
                .build();
    }
}

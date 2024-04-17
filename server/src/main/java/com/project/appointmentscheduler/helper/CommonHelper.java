package com.project.appointmentscheduler.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.appointmentscheduler.entity.Occurrence;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class CommonHelper {

    public int getIntOccurrenceByEnumKey(Occurrence key){
        switch (key){
            case ONCE -> {
                return 0;
            }
            case DAILY -> {
                return 1;
            }
            case WEEKLY -> {
                return 7;
            }
            case MONTHLY -> {
                return 30;
            }
            default ->{
                return -1;
            }
        }
    }

    public String convertDatesToJsonArray(List<LocalDateTime> dates) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String[] formattedDates = dates.stream()
                .map(formatter::format)
                .toArray(String[]::new);
        return convertToJsonArray(formattedDates);
    }

    public String convertToJsonArray(Object obj) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}

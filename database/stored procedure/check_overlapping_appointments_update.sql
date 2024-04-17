CREATE DEFINER=`root`@`localhost` PROCEDURE `check_overlapping_appointments_update`(
	IN array_of_start_times TEXT,
    IN array_of_end_times TEXT,
    IN array_of_instance_ids TEXT,
    IN p_scheduled_by long,
    IN p_scheduled_with long,
    OUT result boolean
)
BEGIN
	DECLARE array_of_start_times_len INT DEFAULT 0;
    DECLARE array_of_end_times_len INT DEFAULT 0;
    DECLARE i INT DEFAULT 0;
    DECLARE start_time_val TIMESTAMP;
    DECLARE end_time_val TIMESTAMP;
    DECLARE instance_id long;

    SET array_of_start_times_len = JSON_LENGTH(array_of_start_times);
    SET array_of_end_times_len = JSON_LENGTH(array_of_end_times);

    IF array_of_start_times_len = 0 OR array_of_end_times_len = 0 THEN
        SET result = FALSE;
    ELSE
        SET result = FALSE;
        
        -- Loop through the arrays of start and end times
        main_loop: WHILE i < array_of_start_times_len AND i < array_of_end_times_len DO
            SET start_time_val = JSON_UNQUOTE(JSON_EXTRACT(array_of_start_times, CONCAT('$[', i, ']')));
            SET end_time_val = JSON_UNQUOTE(JSON_EXTRACT(array_of_end_times, CONCAT('$[', i, ']')));
			SET instance_id = JSON_UNQUOTE(JSON_EXTRACT(array_of_instance_ids, CONCAT('$[', i, ']')));
            
            -- Check if start time and end time fall between start_time and end_time
            IF EXISTS (
                SELECT 1
                FROM 
                (
					SELECT * FROM appointment_instance WHERE start_date_time > now() and appointment_id IN( 
						SELECT appointment_id FROM appointment 
						where scheduled_by=p_scheduled_by or scheduled_by=p_scheduled_with or 
						scheduled_with=p_scheduled_by or scheduled_with=p_scheduled_with)
                ) as ai
                WHERE ai.appointment_instance_id <> instance_id AND (
    -- Check for overlapping time ranges
    (
        (start_time_val BETWEEN ai.start_date_time AND ai.end_date_time) 
        AND (start_time_val <> ai.end_date_time)
    )
    OR
    (
        (end_time_val BETWEEN ai.start_date_time AND ai.end_date_time) 
        AND (end_time_val <> ai.start_date_time)
    )
    OR
    -- Check if the provided time range fully encompasses the appointment instance
    (
        (start_time_val < ai.start_date_time) 
        AND (end_time_val > ai.end_date_time)
    )
)
            ) THEN
                SET result = TRUE;
                LEAVE main_loop;
            END IF;

            SET i = i + 1;
        END WHILE main_loop;
    END IF;
END

-- set @result = null;
-- call appointmentscheduler.check_overlapping_appointments_update(
-- 	'["2024-04-20 11:00:00","2024-04-21 11:00:00"]',
-- 	'["2024-04-20 13:00:00","2024-04-21 13:00:00"]',
-- 	'[27,28]',
--     1,
--     3,
--     @result
-- );
-- select @result;

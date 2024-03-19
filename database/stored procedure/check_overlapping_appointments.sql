CREATE DEFINER=`root`@`localhost` PROCEDURE `check_overlapping_appointments`(
    IN array_of_start_times TEXT,
    IN array_of_end_times TEXT,
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

            -- Check if start time and end time fall between start_time and end_time
            IF EXISTS (
                SELECT 1
                FROM 
                (
					SELECT * FROM appointment_instance WHERE appointment_id IN( 
						SELECT appointment_id FROM appointment 
						where scheduled_by=p_scheduled_by or scheduled_by=p_scheduled_with or 
						scheduled_with=p_scheduled_by or scheduled_with=p_scheduled_with)
                ) as ai
                WHERE (start_time_val BETWEEN ai.start_date_time AND ai.end_date_time)
                   OR (end_time_val BETWEEN ai.start_date_time AND ai.end_date_time)
            ) THEN
                SET result = TRUE;
                LEAVE main_loop;
            END IF;

            SET i = i + 1;
        END WHILE main_loop;
    END IF;
END
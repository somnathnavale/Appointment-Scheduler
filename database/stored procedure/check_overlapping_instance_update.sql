CREATE DEFINER=`root`@`localhost` PROCEDURE `check_overlapping_instance_update`(
	IN start_date_val TEXT,
    IN end_date_val TEXT,
    IN p_scheduled_by long,
    IN p_scheduled_with long,
    IN p_instance_id long,
    OUT result boolean
)
BEGIN
    DECLARE overlapping_count INT DEFAULT 0;

SELECT COUNT(*) INTO overlapping_count FROM (
    SELECT * FROM appointment_instance WHERE appointment_id 
    IN (SELECT appointment_id FROM appointment 
        WHERE scheduled_by = p_scheduled_by 
        OR scheduled_by = p_scheduled_with 
        OR scheduled_with = p_scheduled_by 
        OR scheduled_with = p_scheduled_with)
) as ai
WHERE appointment_instance_id <> p_instance_id 
AND (
    ((start_date_val BETWEEN ai.start_date_time AND ai.end_date_time) AND (start_date_val <> ai.end_date_time))
    OR ((end_date_val BETWEEN ai.start_date_time AND ai.end_date_time) AND (end_date_val <> ai.start_date_time))
    OR ((start_date_val < ai.start_date_time) AND (end_date_val > ai.end_date_time))  -- Check if the provided time range fully encompasses the appointment instance
);
        
IF overlapping_count>0 THEN SET result=true; 
ELSE SET result=false;
END IF;

END
package com.project.appointmentscheduler.service;

import com.project.appointmentscheduler.constants.EmailSubjects;
import com.project.appointmentscheduler.constants.EmailTemplates;
import com.project.appointmentscheduler.dto.EmailDetails;
import com.project.appointmentscheduler.entity.Appointment;
import com.project.appointmentscheduler.entity.AppointmentInstance;
import com.project.appointmentscheduler.entity.Occurrence;
import com.project.appointmentscheduler.entity.User;
import com.project.appointmentscheduler.service.interfaces.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailSender;

    @Async
    private void sendEmail(EmailDetails emailDetails) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            helper.setFrom(emailSender);
            helper.setTo(emailDetails.getTo());
            if(emailDetails.getCc()!=null){
                helper.setCc(emailDetails.getCc());
            }
            helper.setSubject(emailDetails.getSubject());
            helper.setText(emailDetails.getBody(), true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println(e);
        }
    }

    @Async
    public void sendUserRegistrationEmail(String to, String fullName){
        Context context = new Context();
        context.setVariable("fullName", fullName);

        String htmlContent = templateEngine.process(EmailTemplates.USER_REGISTRATION, context);
        EmailDetails emailDetails= EmailDetails.builder().to(to).subject(EmailSubjects.USER_REGISTRATION).body(htmlContent).build();

       sendEmail(emailDetails);
    }

    private void sendAppointmentEmails(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime, String action, AppointmentInstance instance){
        User scheduledWith = appointment.getScheduledWith();
        User scheduledBy = appointment.getScheduledBy();

        Context context = new Context();

        context.setVariable("scheduledBy", scheduledBy.getFirstname()+" "+ scheduledBy.getLastname());
        context.setVariable("scheduledWith", scheduledWith.getFirstname()+" "+ scheduledWith.getLastname());

        context.setVariable("title", appointment.getTitle());
        context.setVariable("date", startDateTime.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy: EEEE")));
        context.setVariable("startTime", startDateTime.format(DateTimeFormatter.ofPattern("HH:mm a")));
        context.setVariable("endTime", endDateTime.format(DateTimeFormatter.ofPattern("HH:mm a")));
        context.setVariable("location", appointment.getLocation());
        context.setVariable("type", appointment.getType());

        String template;
        String subject;

        if(appointment.getOccurrence()== Occurrence.ONCE){

            if(action=="register"){
                template=EmailTemplates.APPOINTMENT_REGISTRATION;
                subject=EmailSubjects.APPOINTMENT_REGISTRATION;
            }else{

                if(instance!=null){
                    template=EmailTemplates.APPOINTMENT_INSTANCE_UPDATE;
                    subject=EmailSubjects.APPOINTMENT_INSTANCE_UPDATE;
                    context.setVariable("status", instance.getStatus());
                }else {
                    template=EmailTemplates.APPOINTMENT_UPDATE;
                    subject=EmailSubjects.APPOINTMENT_UPDATE;
                }
            }

        }else{
            if(action=="register"){
                template=EmailTemplates.APPOINTMENT_REGISTRATION_RECURRING;
                subject=EmailSubjects.APPOINTMENT_REGISTRATION_RECURRING;

                context.setVariable("occurrence", appointment.getOccurrence().name().charAt(0)+appointment.getOccurrence().name().substring(1).toLowerCase() );
                context.setVariable("endDate", endDateTime.format(DateTimeFormatter.ofPattern("MMMM dd, yyyy: EEEE")));
            }else{

                if(instance!=null){
                    template=EmailTemplates.APPOINTMENT_INSTANCE_UPDATE;
                    subject=EmailSubjects.APPOINTMENT_INSTANCE_UPDATE;
                    context.setVariable("status", instance.getStatus());
                }else {
                    template = EmailTemplates.APPOINTMENT_UPDATE;
                    subject = EmailSubjects.APPOINTMENT_UPDATE;
                }
            }
        }

        String htmlContent = templateEngine.process(template, context);

        subject = subject.replace("<<scheduledWith>>", scheduledWith.getFirstname()+" "+scheduledWith.getLastname());

        EmailDetails emailDetails= EmailDetails.builder().to(scheduledBy.getEmail()).cc(scheduledWith.getEmail()).subject(subject).body(htmlContent).build();

        sendEmail(emailDetails);
    }

    @Async
    public void sendAppointmentRegistrationEmail(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime){
        sendAppointmentEmails(appointment,startDateTime,endDateTime,"register",null);
    }

    @Async
    public void sendAppointmentUpdateEmail(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime){
        sendAppointmentEmails(appointment,startDateTime,endDateTime,"update",null);
    }

    @Async
    public void sendAppointmentInstanceUpdateEmail(Appointment appointment, LocalDateTime startDateTime ,LocalDateTime endDateTime, AppointmentInstance appointmentInstance){
        sendAppointmentEmails(appointment,startDateTime,endDateTime,"update",appointmentInstance);
    }
}

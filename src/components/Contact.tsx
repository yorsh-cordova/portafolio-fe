import React, { useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function parseEmailJsError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const emailError = error as { status?: number; text?: string; message?: string };
    const rawMessage = emailError.text || emailError.message || '';
    const normalized = rawMessage.toLowerCase();

    if (normalized.includes('domain') || normalized.includes('origin')) {
      return 'EmailJS blocked this request because the domain is not allowed. Add localhost and your production domain in EmailJS Allowed Origins.';
    }

    if (normalized.includes('service') || normalized.includes('service id')) {
      return 'Invalid EmailJS Service ID. Verify REACT_APP_EMAILJS_SERVICE_ID in your .env file.';
    }

    if (normalized.includes('template') || normalized.includes('template id')) {
      return 'Invalid EmailJS Template ID. Verify REACT_APP_EMAILJS_TEMPLATE_ID in your .env file.';
    }

    if (normalized.includes('public key') || normalized.includes('user id') || normalized.includes('apikey')) {
      return 'Invalid EmailJS Public Key. Verify REACT_APP_EMAILJS_PUBLIC_KEY in your .env file.';
    }

    if (rawMessage !== '') {
      return `EmailJS error: ${rawMessage}`;
    }

    if (emailError.status) {
      return `EmailJS request failed with status ${emailError.status}.`;
    }
  }

  return 'Unable to send message right now. Please try again in a few minutes.';
}

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusSeverity, setStatusSeverity] = useState<'success' | 'error'>('success');

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    setNameError(trimmedName === '');
    setEmailError(trimmedEmail === '' || !isValidEmail);
    setMessageError(trimmedMessage === '');
    setStatusMessage('');

    if (trimmedName === '' || trimmedEmail === '' || trimmedMessage === '' || !isValidEmail) {
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatusSeverity('error');
      setStatusMessage('Contact form is not configured yet. Add EmailJS keys in environment variables.');
      return;
    }

    try {
      setIsSending(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: trimmedName,
          email: trimmedEmail,
          from_email: trimmedEmail,
          from_name: trimmedName,
          reply_to: trimmedEmail,
          message: trimmedMessage,
        },
        {
          publicKey,
        },
      );

      setStatusSeverity('success');
      setStatusMessage('Message sent successfully. I will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setStatusSeverity('error');
      setStatusMessage(parseEmailJsError(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
            onSubmit={sendEmail}
          >
            <div className='form-flex'>
              <TextField
                required
                id="contact-name"
                name="name"
                type="text"
                label="Your Name"
                placeholder="What's your name?"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                required
                id="contact-email"
                name="email"
                type="email"
                label="Email"
                placeholder="How can I reach you?"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter a valid email address" : ""}
                inputProps={{ maxLength: 120 }}
              />
            </div>
            <TextField
              required
              id="contact-message"
              name="message"
              label="Message"
              placeholder="Send me any inquiries or questions"
              variant="outlined"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
              inputProps={{ maxLength: 3000 }}
            />
            {statusMessage !== '' && (
              <Alert severity={statusSeverity} sx={{ mb: 2 }}>
                {statusMessage}
              </Alert>
            )}
            <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
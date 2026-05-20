interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactForm>(event);

  const { name, email, message } = body;

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and message are required',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format',
    });
  }

  // Forward to FormSubmit.co
  const config = useRuntimeConfig();
  const contactEmail = config.public?.contactEmail || 'johnpaulwile@gmail.com';
  const formSubmitUrl = `https://formsubmit.co/helpers/form`;
  try {
    await $fetch(formSubmitUrl, {
      method: 'POST',
      body: {
        _to: contactEmail,
        _subject: `New contact form submission from ${name}`,
        _captcha: 'false',
        _template: 'table',
        name,
        email,
        message,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('FormSubmit error:', error);
    // Don't fail the request if FormSubmit is down — just log it
  }

  return { success: true };
});

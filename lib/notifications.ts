export async function sendEmailNotification(payload: {
  subject: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  details?: Record<string, string>;
}) {
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    "5e8f6780-e765-454a-b1e3-5aee058ff921";

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", payload.subject);
  formData.append("from_name", "GYP SIGNATURES Website");
  if (payload.name) formData.append("Customer Name", payload.name);
  if (payload.phone) formData.append("Customer Phone", payload.phone);
  if (payload.email) formData.append("Customer Email", payload.email);
  if (payload.message) formData.append("Message / Vision", payload.message);

  if (payload.details) {
    for (const [key, val] of Object.entries(payload.details)) {
      formData.append(key, val);
    }
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to send email alert:", err);
    return null;
  }
}

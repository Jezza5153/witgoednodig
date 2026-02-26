const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, interest, message } = req.body;

    // Validation
    if (!name || !phone || !email || !interest) {
        return res.status(400).json({ error: 'Vul alle verplichte velden in.' });
    }

    const interestLabels = {
        wasmachine: 'Wasmachine (€20/mnd)',
        droger: 'Droger (€20/mnd)',
        combinatie: 'Was-droogcombinatie (€30/mnd)',
        overig: 'Advies gewenst',
    };

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0284c7, #0369a1); padding: 20px 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">Nieuwe aanvraag via Witgoednodig.nl</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 140px;">Naam</td>
                        <td style="padding: 10px 0; color: #334155;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Telefoon</td>
                        <td style="padding: 10px 0; color: #334155;"><a href="tel:${phone}" style="color: #0284c7;">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; font-weight: 600;">E-mail</td>
                        <td style="padding: 10px 0; color: #334155;"><a href="mailto:${email}" style="color: #0284c7;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Interesse</td>
                        <td style="padding: 10px 0; color: #334155;">${interestLabels[interest] || interest}</td>
                    </tr>
                    ${message ? `
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Opmerking</td>
                        <td style="padding: 10px 0; color: #334155;">${message}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>
        </div>
    `;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Witgoednodig <info@witgoednodig.nl>',
                to: ['molmansjan95@gmail.com'],
                reply_to: email,
                subject: `Nieuwe aanvraag: ${interestLabels[interest] || interest} - ${name}`,
                html: htmlContent,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Resend error:', data);
            return res.status(500).json({ error: 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.' });
        }

        return res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Er ging iets mis. Probeer het later opnieuw.' });
    }
}

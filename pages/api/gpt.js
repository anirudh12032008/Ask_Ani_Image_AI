const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { prompt, model } = req.body;
        console.log(prompt);
        const response = await axios.post(
            `https://api.openai.com/v1/engines/${model}/completions`,
            {
                prompt: prompt,
                max_tokens: 1000,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
        console.error('Text generation error:', error);
        res.status(500).json({ error: 'Text generation error' });
    }
};

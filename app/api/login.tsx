import type { NextApiRequest, NextApiResponse } from 'next';


/* export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = process.env.API_URL;
    console.log(apiUrl);

    if (req.method === 'GET') {
        // Handle a GET request
        res.status(200).json({ name: 'John Doe' });
    }  
    if (req.method === 'POST') {
        // Process a POST request
        const { username, password } = req.body;

        // Send API request to login
        fetch(`${apiUrl}/api/auth/login/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => res.status(200).json(data))
          .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} */
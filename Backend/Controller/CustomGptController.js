import 'dotenv/config';
import axios from 'axios';
import NodeCache from 'node-cache';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const myCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const rateLimiter = new RateLimiterMemory({
  points: 3, // 5 requests
  duration: 1, // per second
});

let jsonFormat = [{
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
}];

let CohereKEY = process.env.CohereKEY;
let customData;

export const customDataCollector = (req, res) => {
  customData = req.body.data;
  console.log(customData)
  if (customData) {
    res.json({ message: 'Custom data uploaded successfully. How can I help you?' });
  } else {
    res.status(400).json({ message: 'Failed to upload custom data.' });
  }
};

export const customGptChat = async (req, res) => {
  const userMessage = req.body.message;

  if (!customData) {
    return res.status(400).json({ message: 'No custom data available. Please upload custom data first.' });
  }

  const cacheKey = `${customData}_${userMessage}`;
  const cachedResponse = myCache.get(cacheKey);
  console.log(myCache)
  if (cachedResponse) {
    console.log("answer is inside cached response")
    return res.json({ message: cachedResponse });
  }

  try {
    await rateLimiter.consume(req.ip); // Consume 1 point per request

    const response = await axios.post('https://api.cohere.ai/generate', {
      prompt: `Context: ${customData}\nQuestion: ${userMessage}\nAnswer:`,
      model: 'command-r-plus', // Use an appropriate model ID
      max_tokens: 150,
    }, {
      headers: { Authorization: `Bearer ${CohereKEY}` }
    });

    
    const generatedText = response.data.text;
    myCache.set(cacheKey, generatedText);

    res.json({ message: generatedText });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    console.error('Error with Cohere API:', error);
    res.status(500).json({ message: 'Error processing your request.' });
  }
};


export const QuizGenerator=async(req,res)=>{
  
  const { numberOfQuestions } = req.body;
    console.log(numberOfQuestions)
    if (!customData) {
        return res.status(400).json({ message: 'No custom data available. Please upload custom data first.' });
    }

    // Generate questions based on custom data
    try {
        const response = await axios.post('https://api.cohere.ai/generate', {
            prompt: `Generate ${numberOfQuestions} quiz questions based on the following data: ${customData} in the json format as like this ${jsonFormat}`,
            model: 'command-r-plus',
            max_tokens: 150 * numberOfQuestions, // Adjust max_tokens based on number of questions
        }, {
            headers: { Authorization: `Bearer ${CohereKEY}` }
        });

        let input = response.data.text
        
        // Extract JSON using string methods
        const startIndex = input.indexOf('```json\n') + 8; // 8 is the length of '```json\n'
        const endIndex = input.indexOf('\n```', startIndex);
        const jsonString = input.substring(startIndex, endIndex);

        try {
            const jsonData = JSON.parse(jsonString);
            res.json({ jsonData });
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            res.status(500).json({ message: 'Error parsing JSON response from Cohere API.' });
        }
       
    } catch (error) {
        console.error('Error with Cohere API:', error);
        res.status(500).json({ message: 'Error processing your request.' });
    }



}

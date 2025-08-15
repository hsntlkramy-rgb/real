"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeProperty = analyzeProperty;
const openai_1 = __importDefault(require("openai"));
// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});
async function analyzeProperty(description, title, price, location) {
    var _a, _b, _c, _d, _e;
    try {
        const prompt = `
    Analyze the following real estate property and provide:
    1. Lifestyle tags (3-5 relevant tags from this list: "Modern", "Family-Friendly", "Remote Work Friendly", "Luxury", "Investment", "Quiet", "Urban", "Suburban", "Garden", "High-End", "Accessible", "Tech Hub", "Peaceful", "Spacious", "City Views", "Premium Amenities", "Health Focused", "Co-working", "Flexible", "Growing Area", "High Yield", "Exclusive")
    2. Persona scores (0.0 to 1.0) for each persona based on how well this property matches:
       - remoteWorker: Properties with office space, good internet, quiet areas, modern amenities
       - family: Properties with multiple bedrooms, gardens, safe neighborhoods, schools nearby
       - investor: Properties in growing areas, good rental potential, value appreciation
       - retiree: Properties with accessibility, health facilities nearby, peaceful locations
       - luxury: Properties with premium amenities, exclusive locations, high-end finishes

    Property Details:
    Title: ${title}
    Description: ${description}
    Price: ${price}
    Location: ${location}

    Respond with JSON in this exact format:
    {
      "tags": ["tag1", "tag2", "tag3"],
      "personas": {
        "remoteWorker": 0.0,
        "family": 0.0,
        "investor": 0.0,
        "retiree": 0.0,
        "luxury": 0.0
      }
    }
    `;
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a real estate analysis expert. Analyze properties and assign appropriate lifestyle tags and persona scores based on the property characteristics."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
        });
        const result = JSON.parse(response.choices[0].message.content || "{}");
        // Validate and normalize the response
        const analysis = {
            tags: Array.isArray(result.tags) ? result.tags.slice(0, 5) : [],
            personas: {
                remoteWorker: Math.max(0, Math.min(1, ((_a = result.personas) === null || _a === void 0 ? void 0 : _a.remoteWorker) || 0)),
                family: Math.max(0, Math.min(1, ((_b = result.personas) === null || _b === void 0 ? void 0 : _b.family) || 0)),
                investor: Math.max(0, Math.min(1, ((_c = result.personas) === null || _c === void 0 ? void 0 : _c.investor) || 0)),
                retiree: Math.max(0, Math.min(1, ((_d = result.personas) === null || _d === void 0 ? void 0 : _d.retiree) || 0)),
                luxury: Math.max(0, Math.min(1, ((_e = result.personas) === null || _e === void 0 ? void 0 : _e.luxury) || 0)),
            }
        };
        return analysis;
    }
    catch (error) {
        console.error("Failed to analyze property with OpenAI:", error);
        // Fallback analysis based on simple keyword matching
        const description_lower = description.toLowerCase();
        const title_lower = title.toLowerCase();
        const fallbackAnalysis = {
            tags: [],
            personas: {
                remoteWorker: 0.3,
                family: 0.3,
                investor: 0.3,
                retiree: 0.3,
                luxury: 0.3,
            }
        };
        // Simple keyword-based fallback
        if (description_lower.includes('office') || description_lower.includes('work') || title_lower.includes('studio')) {
            fallbackAnalysis.tags.push('Remote Work Friendly');
            fallbackAnalysis.personas.remoteWorker = 0.8;
        }
        if (description_lower.includes('family') || description_lower.includes('bedroom') || description_lower.includes('garden')) {
            fallbackAnalysis.tags.push('Family-Friendly');
            fallbackAnalysis.personas.family = 0.8;
        }
        if (description_lower.includes('luxury') || description_lower.includes('premium') || title_lower.includes('penthouse')) {
            fallbackAnalysis.tags.push('Luxury');
            fallbackAnalysis.personas.luxury = 0.9;
        }
        if (description_lower.includes('investment') || description_lower.includes('rental') || description_lower.includes('yield')) {
            fallbackAnalysis.tags.push('Investment');
            fallbackAnalysis.personas.investor = 0.9;
        }
        if (description_lower.includes('quiet') || description_lower.includes('peaceful') || description_lower.includes('retirement')) {
            fallbackAnalysis.tags.push('Peaceful');
            fallbackAnalysis.personas.retiree = 0.8;
        }
        if (fallbackAnalysis.tags.length === 0) {
            fallbackAnalysis.tags.push('Modern');
        }
        return fallbackAnalysis;
    }
}
//# sourceMappingURL=openai.js.map
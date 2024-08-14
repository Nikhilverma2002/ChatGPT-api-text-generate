const { OpenAI } = require("@langchain/openai");
const process = require("process");
require("dotenv").config();

const llm = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.API_KEY,
});

function calculateEndTime(startTime, durationMinutes) {
  const [time, period] = startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + durationMinutes;
  let endHours = Math.floor(totalMinutes / 60);
  let endMinutes = totalMinutes % 60;

  if (period === "PM" && endHours < 12) {
    endHours += 12;
  }

  const endPeriod = endHours >= 12 ? "PM" : "AM";
  endHours = endHours % 12 || 12;

  return `${endHours}:${endMinutes.toString().padStart(2, "0")} ${endPeriod}`;
}

const startTime = "5:00 PM";
const durationMinutes = 75;
const endTime = calculateEndTime(startTime, durationMinutes);

const mbsa = async () => {
  let init = "what is formula for potassium carbonate";
  const text = `Process the following statement "${init}" and then return me the response in the following format JSON({'answer': your response, 'type': General(if the statement is general)/ Meeting(if statement is related to scheduling meeting or anything related to meetings)}). If there are more than one sentences in the statement, return me as list of JSONs.`;

  try {
    const llmResult = await llm.predict(text);
  } catch (error) {
    console.error("Error during LLM prediction:", error);
  }
};

// Initiate the async function
mbsa();

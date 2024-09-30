import fetch from 'node-fetch';

// Function to fetch tasks from a given URL
async function fetchTasksFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Function to calculate remaining time
function remainingTime(endDateStr) {
    const endDate = new Date(endDateStr);
    const currentDate = new Date();
    const timeDifference = endDate - currentDate;

    if (timeDifference <= 0) {
        return "off";
    }

    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `[00ff00][c][b][تم التفعيل]\n[2513ed]الوقت المتبقي لنهاية الكود:\n[fff64d]${remainingDays} يوم\n${remainingHours} ساعة\n${remainingMinutes} دقيقة`;
}

// Function to check task by name
async function tmy(taskName) {
    const tasks = await fetchTasksFromUrl("https://pastebin.com/raw/82uG38wU");
    for (const [name, endDate] of tasks) {
        if (name === taskName) {
            return remainingTime(endDate);
        }
    }
    return "[f51616][c][b]كود تفعيل خاطأ او مستعمل او منتهي";
}

// API handler
export default async function handler(req, res) {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ error: "Key parameter is required" });
    }

    const result = await tmy(key);
    res.status(200).send(result);
                                        }

import axios from 'axios';
import { format, differenceInSeconds } from 'date-fns';

export default async function handler(req, res) {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ error: "Parameter 'key' is required." });
    }

    const fetchTasksFromUrl = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const remainingTime = (endDateStr) => {
        const endDate = new Date(endDateStr);
        const currentDate = new Date();

        const timeDifference = differenceInSeconds(endDate, currentDate);

        if (timeDifference <= 0) {
            return "off";
        }

        const remainingDays = Math.floor(timeDifference / (3600 * 24));
        const remainingHours = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const remainingMinutes = Math.floor((timeDifference % 3600) / 60);

        return `
[00ff00][c][b][تم التفعيل]\n
[2513ed]الوقت المتبقي لنهاية الكود :\n
[fff64d]${remainingDays} يوم\n${remainingHours} ساعة\n${remainingMinutes} دقيقة
        `;
    };

    const tmy = async (taskName) => {
        const tasks = await fetchTasksFromUrl("https://pastebin.com/raw/TCL907z8");
        for (const [name, endDate] of Object.entries(tasks)) {
            if (name === taskName) {
                return remainingTime(endDate);
            }
        }
        return "[f51616][c][b]كود تفعيل خاطأ او مستعمل او منتهي";
    };

    const result = await tmy(key);
    res.status(200).send(result);
      }import axios from 'axios';
import { format, differenceInSeconds } from 'date-fns';

export default async function handler(req, res) {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ error: "Parameter 'key' is required." });
    }

    const fetchTasksFromUrl = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const remainingTime = (endDateStr) => {
        const endDate = new Date(endDateStr);
        const currentDate = new Date();

        const timeDifference = differenceInSeconds(endDate, currentDate);

        if (timeDifference <= 0) {
            return "off";
        }

        const remainingDays = Math.floor(timeDifference / (3600 * 24));
        const remainingHours = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const remainingMinutes = Math.floor((timeDifference % 3600) / 60);

        return `
[00ff00][c][b][تم التفعيل]\n
[2513ed]الوقت المتبقي لنهاية الكود :\n
[fff64d]${remainingDays} يوم\n${remainingHours} ساعة\n${remainingMinutes} دقيقة
        `;
    };

    const tmy = async (taskName) => {
        const tasks = await fetchTasksFromUrl("https://pastebin.com/raw/TCL907z8");
        for (const [name, endDate] of Object.entries(tasks)) {
            if (name === taskName) {
                return remainingTime(endDate);
            }
        }
        return "[f51616][c][b]كود تفعيل خاطأ او مستعمل او منتهي";
    };

    const result = await tmy(key);
    res.status(200).send(result);
    }

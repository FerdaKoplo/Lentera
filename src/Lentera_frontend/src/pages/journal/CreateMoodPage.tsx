import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  toNanoTimestamp,
  formatDate,
  formatTime,
} from "../../utils/formatTime";

const moods = ["yippe", "happy", "meh", "bad", "awful"];

const CreateMoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(""); // format: yyyy-mm-dd
  const [selectedTime, setSelectedTime] = useState<string>(""); // format: hh:mm
  const [timestamp, setTimestamp] = useState<bigint | null>(null);

  const navigate = useNavigate();

  const handleDateTimeChange = (date: string, time: string) => {
    if (date && time) {
      const ts = toNanoTimestamp(date, time);
      setTimestamp(ts);
    }
  };

  const handleNext = () => {
    if (selectedMood && timestamp) {
      navigate("/create-journal/details", {
        state: {
          mood: selectedMood,
          timestamp: timestamp.toString(),
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <h2 className="text-2xl font-semibold">How are you?</h2>

      <div className="flex flex-col items-start gap-1">
        <label htmlFor="date" className="text-sm font-medium">
          Select Date:
        </label>
        <input
          id="date"
          type="date"
          className="px-2 py-1 border rounded-md"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            handleDateTimeChange(e.target.value, selectedTime);
          }}
        />
      </div>

      <div className="flex flex-col items-start gap-1">
        <label htmlFor="time" className="text-sm font-medium">
          Select Time:
        </label>
        <input
          id="time"
          type="time"
          className="px-2 py-1 border rounded-md"
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
            handleDateTimeChange(selectedDate, e.target.value);
          }}
        />
      </div>

      {timestamp !== null && timestamp !== 0n && (
        <div className="text-center text-gray-600">
          <p>Date: {formatDate(timestamp)}</p>
          <p>Time: {formatTime(timestamp)}</p>
        </div>
      )}

      <div className="flex gap-4 flex-wrap justify-center mt-4">
        {moods.map((mood) => (
          <img
            key={mood}
            src={`/assets/moods/${mood}.svg`}
            alt={mood}
            className={`w-20 h-20 cursor-pointer transition-all duration-200 border-4 rounded-full ${
              selectedMood === mood
                ? "border-green-500 scale-110"
                : "border-transparent"
            }`}
            onClick={() => setSelectedMood(mood)}
          />
        ))}
      </div>

      <button
        className="mt-6 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
        disabled={!selectedMood || !timestamp}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default CreateMoodPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "../../utils/formatTime";
import { Lentera_backend } from "../../../../declarations/Lentera_backend";

const emotions = [
  "happy",
  "excited",
  "grateful",
  "calm",
  "confident",
  "confuse",
  "indifferent",
  "numb",
  "overwhelmed",
  "tired",
  "anxious",
  "sad",
  "lonely",
  "frustated",
  "desperated",
];
const triggers = [
  "work",
  "school",
  "deadline",
  "family",
  "friends",
  "partner",
  "overthinking",
  "guilt",
  "trauma",
  "physical",
  "economy",
];

const CreateJournalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mood, timestamp } = location.state || {};

  const [note, setNote] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const toggleSelect = (
    item: string,
    list: string[],
    setList: (l: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async () => {
    if (!mood || !timestamp || !note) return;

    try {
      const result = await Lentera_backend.createJournal(
        note,
        mood,
        [selectedEmotions],
        [selectedTriggers],
        BigInt(timestamp)
      );

      if ("ok" in result) {
        navigate("/");
      } else {
        console.error("Create journal failed:", result.err);
        alert("Failed to create journal: " + result.err);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred while creating the journal.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Create Your Journal</h2>

      <div className="text-gray-600">
        <p>
          Mood: <strong>{mood}</strong>
        </p>
        <p>Date: {formatDate(BigInt(timestamp))}</p>
        <p>Time: {formatTime(BigInt(timestamp))}</p>
      </div>

      <textarea
        className="w-full border p-2 rounded-md h-40"
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div>
        <h3 className="font-medium mb-2">Select Emotions</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4">
            {emotions.slice(0, 7).map((emotion) => (
              <div
                key={emotion}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                  selectedEmotions.includes(emotion)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  toggleSelect(emotion, selectedEmotions, setSelectedEmotions)
                }
              >
                <img
                  src={`/assets/emotions/${emotion}.svg`}
                  alt={emotion}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {emotions.slice(7, 12).map((emotion) => (
              <div
                key={emotion}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                  selectedEmotions.includes(emotion)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  toggleSelect(emotion, selectedEmotions, setSelectedEmotions)
                }
              >
                <img
                  src={`/assets/emotions/${emotion}.svg`}
                  alt={emotion}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {emotions.slice(12).map((emotion) => (
              <div
                key={emotion}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                  selectedEmotions.includes(emotion)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  toggleSelect(emotion, selectedEmotions, setSelectedEmotions)
                }
              >
                <img
                  src={`/assets/emotions/${emotion}.svg`}
                  alt={emotion}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Select Emotion Triggers</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4">
            {triggers.slice(0, 6).map((trigger) => (
              <div
                key={trigger}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                  selectedTriggers.includes(trigger)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  toggleSelect(trigger, selectedTriggers, setSelectedTriggers)
                }
              >
                <img
                  src={`/assets/triggers/${trigger}.svg`}
                  alt={trigger}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {triggers.slice(6, 11).map((trigger) => (
              <div
                key={trigger}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                  selectedTriggers.includes(trigger)
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  toggleSelect(trigger, selectedTriggers, setSelectedTriggers)
                }
              >
                <img
                  src={`/assets/triggers/${trigger}.svg`}
                  alt={trigger}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="mt-4 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
        disabled={!note}
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default CreateJournalPage;

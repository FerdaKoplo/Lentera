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
        navigate("/profile/journals");
      } else {
        console.error("Create journal failed:", result.err);
        alert("Failed to create journal: " + result.err);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred while creating the journal.");
    }
  };

  const handleSubmitAnalysis = async () => {
    if (!mood || !timestamp || !note) return;

    try {
      // 1. Buat journal dulu
      const result = await Lentera_backend.createJournal(
        note,
        mood,
        [selectedEmotions],
        [selectedTriggers],
        BigInt(timestamp)
      );

      // 2. Cek jika berhasil
      if ("ok" in result) {
        const createdJournal = result.ok;

        // 3. Panggil analisis LLM
        const analysisResult = await Lentera_backend.analyzeJournal(
          createdJournal
        );

        console.log("Hasil analisis:", analysisResult);

        // 4. Arahkan ke halaman journal dengan hasil analisis atau tampilkan hasil di sini
        navigate("/profile/journals");    
      } else {
        console.error("Create journal failed:", result.err);
        alert("Failed to create journal: " + result.err);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred while creating or analyzing the journal.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col gap-6 pt-10 ">
      <h2 className="text-center text-4xl font-bold font-montserrat text-[#61B398]">
        Create Your Journal
      </h2>

      <div className="text-gray-600">
        <p>
          Mood: <strong>{mood}</strong>
        </p>
        <p>Date: {formatDate(BigInt(timestamp))}</p>
        <p>Time: {formatTime(BigInt(timestamp))}</p>
      </div>

      <textarea
        className="w-full border border-[#61B398] p-2 rounded-xl h-40"
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="border border-[#61B398] p-2 rounded-xl">
        <div className="px-8 py-6">
          <h3 className="font-medium mb-2">Emotions</h3>
          <p className="pb-6 text-[#717171]">what are your emotions today</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-4">
              {emotions.slice(0, 7).map((emotion) => (
                <div
                  key={emotion}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer ${
                    selectedEmotions.includes(emotion)
                      ? "border-[#62C6A4]"
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
                      ? "border-[#62C6A4]"
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
                      ? "border-[#62C6A4]"
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
      </div>

      <div className="border border-[#61B398] p-2 rounded-xl">
        <div className="px-8 py-6">
          <h3 className="font-medium mb-2">Emotion Triggers</h3>
          <p className="pb-6 text-[#717171]">What’s affecting you today?</p>
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
      </div>
      <div className="flex justify-between">
        <button
          className="button-design"
          disabled={!note}
          onClick={handleSubmit}
        >
          Post
        </button>
        <button
          className="button-design"
          disabled={!note}
          onClick={handleSubmitAnalysis}
        >
          Analysis
        </button>
      </div>
    </div>
  );
};

export default CreateJournalPage;

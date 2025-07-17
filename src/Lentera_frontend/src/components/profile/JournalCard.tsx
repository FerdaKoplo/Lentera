import React from "react";
import { getMoodIcon, getMoodColor } from "../../utils/moodSelector";
import type { Journal } from "../../../../declarations/Lentera_backend/Lentera_backend.did";
import { formatDate, formatTime } from "../../utils/formatTime";

type Props = {
  journal: Journal;
};

const JournalCard: React.FC<Props> = ({ journal }) => {
  const moodIcon = getMoodIcon(journal.mood);
  const moodColorClass = getMoodColor(journal.mood);
  const formattedDate = formatDate(journal.dateCreated);
  const formattedTime = formatTime(journal.timeCreated);

  return (
    <div className="flex items-center ">
      <div className="flex flex-col bg-[#F4FAF8] border-2 border-[#E2EFEA] rounded-3xl px-6 py-4 md:max-w-6xl w-full gap-3 pb-10 ">
        <div className="flex flex-row justify-between w-full pt-4">
          <div className="flex gap-8">
            <div className="w-full">
              <img src={moodIcon} alt="mood icon" className="h-auto w-20" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="whitespace-nowrap font-montserrat font-semibold">
                {formattedDate}
              </div>
              <div className="flex flex-row gap-4">
                <div
                  className={`font-montserrat font-semibold ${moodColorClass}`}
                >
                  {journal.mood}
                </div>
                <div className="whitespace-nowrap font-montserrat font-semibold">
                  {formattedTime}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center pr-3">
            <button className="bg-[#F4FAF8] border-2 rounded-full border-[#BCA7E8] hover:bg-[#BCA7E8] hover:text-white hover:shadow-md transition-all duration-200">
              <div className="px-3 py-2 font-montserrat font-normal">
                read more
              </div>
            </button>
          </div>
        </div>
        <div className="font-montserrat font-normal text-[#363636] px-20 pl-28 line-clamp-3">
          {journal.note}
        </div>
      </div>
    </div>
  );
};

export default JournalCard;

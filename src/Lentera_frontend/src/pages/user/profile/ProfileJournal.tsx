import React, { useEffect } from "react";
import useJournal from "../../../hooks/useJournal";
import JournalCard from "../../../components/profile/JournalCard";
import { groupJournalsByDate } from "../../../utils/groupJournal";

const ProfileJournal = () => {
  const { myJournals, fetchMyJournals, loading, error } = useJournal();

  useEffect(() => {
    fetchMyJournals();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading journals...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const grouped = groupJournalsByDate(myJournals);

  return (
    <div className="flex flex-col gap-8 items-center px-4">
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([date, journals]) => (
          <div key={date} className="w-full max-w-2xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{date}</h2>
            <div className="flex flex-col gap-4">
              {journals.map((journal) => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 mt-10">No journal entries found.</div>
      )}
    </div>
  );
};

export default ProfileJournal;

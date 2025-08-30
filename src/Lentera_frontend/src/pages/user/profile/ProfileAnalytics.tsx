import React, { useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useJournal from "../../../hooks/useJournal";
import useArticle from "../../../hooks/useArticle";
import { useAuth } from "../../../context/auth-context";
import { Principal } from "@dfinity/principal";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D15BA6", "#8884D8"];

const Chart = React.memo(({ data }: { data: { name: string; value: number }[] }) => (
  <PieChart width={400} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={100}
      dataKey="value"
      nameKey="name"
      label={({ name, percent }) =>
        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
      }
    >
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value: number) => `${value}`} />
    <Legend />
  </PieChart>
));

const ProfileAnalytics = () => {
  const { mentalStates, fetchMyMentalStates, fetchMyJournals, myJournals } = useJournal();
  const { getAllArticlesByAuthor, articles } = useArticle();
  const { principalId } = useAuth();

  useEffect(() => {
    fetchMyMentalStates();
  }, [fetchMyMentalStates]);

  useEffect(() => {
    if (principalId?.trim()) {
      const authorId = Principal.fromText(principalId);
      const defer = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 0));
      defer(() => {
        getAllArticlesByAuthor(authorId);
        fetchMyJournals();
      });
    }
  }, [principalId, getAllArticlesByAuthor, fetchMyJournals]);

  const aggregatedData = useMemo(() => {
    const data: { name: string; value: number }[] = [];
    mentalStates.forEach((state) => {
      state.confidence.forEach(([label, value]) => {
        const existing = data.find((d) => d.name === label);
        if (existing) {
          existing.value += value;
        } else {
          data.push({ name: label, value });
        }
      });
    });
    return data;
  }, [mentalStates]);

  return (
    <div className="p-6">
      <div className="flex items-start gap-8">
        <div className="flex items-center text-center flex-col bg-brand-light gap-5">
          <p className="text-[#4A90E2] text-2xl">{myJournals.length}</p>
          <h2 className="font-bold text-xl">JOURNALS</h2>
        </div>

        <div className="flex flex-col items-center text-center bg-brand-light gap-5">
          <p className="text-[#BD4646]  text-2xl">{articles.length}</p>
          <h2 className="font-bold text-xl">ARTICLES</h2>
        </div>
      </div>
      <Chart data={aggregatedData} />
    </div>
  )
};

export default ProfileAnalytics;

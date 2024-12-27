"use client";
import React from "react";
import TargetsCard from "../components/TargetsCard";
import StatisticsCard from "../components/StatisticsCard";
import TeamEarningsCard from "../components/TeamEarningsCard";
import TeamTabing from "../components/TeamTabing";
import useSWR from "swr";
import { getTargetStats } from "@/services/admin/admin-service";
const Page = () => {
  const { data, error } = useSWR("/admin/target-dashboard", getTargetStats);
  const targetStats = data?.data?.data;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
        <TargetsCard
          totalTarget={targetStats?.totalTargetAmount}
          totalEarning={targetStats?.totalEarnings}
        />
        <StatisticsCard />
      </div>
      <TeamEarningsCard />
      <TeamTabing />
    </div>
  );
};

export default Page;

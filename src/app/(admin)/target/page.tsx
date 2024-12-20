import React from "react";
import TargetsCard from "../components/TargetsCard";
import StatisticsCard from "../components/StatisticsCard";
import TeamEarningsCard from "../components/TeamEarningsCard";
import TeamTabing from "../components/TeamTabing";
export default function Targets() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-[20px]">
          <TargetsCard /> 
          <StatisticsCard />
      </div>
     <TeamEarningsCard />
     <TeamTabing />
    </>
  );
}

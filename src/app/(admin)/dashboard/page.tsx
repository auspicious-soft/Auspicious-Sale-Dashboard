import React from 'react'
import OverviewSection from '../components/OverViewSection'
import MultiRingDonutChart from '../components/MultiRingDonutChart'
import RecentLeads from '../components/RecentLeads' 
export default function Dashboard() {
  return (
    <> 
       <OverviewSection />
       <MultiRingDonutChart />
       <RecentLeads />
    </>
  )
}

"use client";
import { useState } from 'react';
import WebTableCard from './WebTableCard'
import MobileTableCard from './MobileTableCard'
import SEOTableCard from './SEOTableCard'
import MERNTableCard from './MERNTableCard'

// Example Components for Tab Content
const Web = () => <></>;
const Mobile = () => <></>;
const SEO = () => <></>;
const MERN = () => <></>;

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Array of Tabs with Components as Content
  const tabs = [
    { name: 'Web', component: <WebTableCard /> },
    { name: 'Mobile', component: <MobileTableCard /> },
    { name: 'SEO', component: <SEOTableCard /> },
    { name: 'MERN', component: <MERNTableCard /> },
  ];

  return (
    <div className="w-full mt-[30px] md:mt-[50px]">
      {/* Tab Buttons */}
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm  ${
              activeTab === index
                ? ' border-[#5D5FEF] bg-[#5D5FEF] text-[#fff] rounded-[30px]'
                : 'text-#10375C border-solid border-[1px] border-[#000] rounded-[30px] '
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab]?.component}
      </div>
    </div>
  );
};

export default TabbedInterface;

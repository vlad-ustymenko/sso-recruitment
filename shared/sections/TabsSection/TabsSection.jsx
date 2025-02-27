"use client";
import React from "react";
import { useTabsContext } from "../../../context/TabsContext";
import Tabs from "@/shared/components/Tabs/Tabs";

const TabsSection = () => {
  const { tabs } = useTabsContext();
  return <Tabs tabs={tabs} title="В нас є відповіді на твої питання"></Tabs>;
};

export default TabsSection;

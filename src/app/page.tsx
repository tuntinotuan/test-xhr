"use client";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import OriginalBanner from "@/components/banner/OriginalBanner";
import { useState } from "react";
import ProjectCardList from "@/components/project/ProjectCardList";
import ProjectCardGrid from "@/components/project/ProjectCardGrid";
import NotifyNormal from "@/components/notify/NotifyNormal";
import NotifyComeBack from "@/components/notify/NotifyComeBack";
import ButtonGridOrListView from "@/components/button/ButtonGridOrListView";
import HomeSidebarForBoard from "@/components/layout/home/home.sidebar.for.board";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { decrement, increment } from "@/store/slices/counterSlice";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex h-full w-full bg-efColor overflow-hidden">
      <NotifyNormal />
      <NotifyComeBack />
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebarForBoard />
        <HomeContentCover className="flex-col gap-2 px-6">
          <MainContent />
        </HomeContentCover>
      </HomeSidebarCover>
    </div>
  );
}

export type ListOrGrid = "list" | "grid";

const MainContent = () => {
  const [listOrGrid, setListOrGrid] = useState<ListOrGrid>("grid");
  const handleViewListOrGrid = () => {
    listOrGrid === "list" ? setListOrGrid("grid") : setListOrGrid("list");
  };
  return (
    <>
      <OriginalBanner
        src="/banner-design-today.jpg"
        title="What will you design to day?"
        positionTitle="center"
      ></OriginalBanner>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recent designs</h1>
        <ButtonGridOrListView
          listOrGrid={listOrGrid}
          handleViewListOrGrid={handleViewListOrGrid}
        ></ButtonGridOrListView>
      </div>
      {listOrGrid === "grid" && <ProjectCardGrid />}
      {listOrGrid === "list" && <ProjectCardList />}
    </>
  );
};

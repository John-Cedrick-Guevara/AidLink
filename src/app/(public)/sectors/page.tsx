import React from "react";
import { getAllSectors } from "./server/sectorsActions";
import SectorsGrid from "./Components/SectorList";

const page = async () => {
  const sectorts = await getAllSectors();

  return (
    <>
      <SectorsGrid sectors={sectorts} />
    </>
  );
};

export default page;

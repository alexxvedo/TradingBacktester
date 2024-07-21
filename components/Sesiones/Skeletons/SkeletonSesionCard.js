import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import SkeletonSesionCardContent from "./SkeletonSesionCardContent";

const SkeletonSesionCard = () => {
  return (
    <Card className="max-w-[500px] h-full">
      <CardHeader className="flex items-center justify-between flex-row w-full gap-2">
        <div className="max-w-[55%]">
          <Skeleton className="w-3/4 h-8 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-lg mt-2" />
        </div>
        <Skeleton className="max-w-[45%] h-10 rounded-lg" />
      </CardHeader>
      <CardBody>
        <SkeletonSesionCardContent />
      </CardBody>
    </Card>
  );
};

export default SkeletonSesionCard;
